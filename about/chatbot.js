const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// Send message function
async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;
    
    // Display user message
    addMessage(message, 'user');
    userInput.value = '';
    
    // Disable send button
    sendBtn.disabled = true;
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
        // Call your API
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        });
        
        const data = await response.json();
        
        // Remove typing indicator
        removeTypingIndicator();
        
        // Display AI response
        if (data.reply) {
            addMessage(data.reply, 'bot');
        } else {
            addMessage('Sorry, I\'m unable to answer right now. Please try again later!', 'bot');
        }
        
    } catch (error) {
        removeTypingIndicator();
        addMessage('Oops! Something went wrong. Please refresh the page and try again.', 'bot');
        console.error('Error:', error);
    } finally {
        // Re-enable send button
        sendBtn.disabled = false;
    }
}

// Add message to chat window
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    // Add avatar for bot messages
    if (sender === 'bot') {
        const avatar = document.createElement('img');
        avatar.src = '../Pic/ai-avatar.jpg';
        avatar.alt = 'AI Assistant';
        avatar.className = 'message-avatar';
        messageDiv.appendChild(avatar);
    }
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    // Convert markdown links to clickable buttons/links
    let formattedText = text;
    
    // Handle Resume links - open modal
    formattedText = formattedText.replace(
        /\[View Resume\]\(([^)]+)\)/gi,
        '<button onclick="openPdfModal(\'../resume/Angela_resume.pdf\')" class="resume-link-btn">View Resume</button>'
    );
    
    // Handle LinkedIn links - open in new tab
    formattedText = formattedText.replace(
        /\[LinkedIn Profile\]\(([^)]+)\)/gi,
        '<a href="$1" target="_blank" class="linkedin-link-btn">LinkedIn Profile</a>'
    );
    
    // Handle any other markdown links
    formattedText = formattedText.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" target="_blank">$1</a>'
    );
    
    contentDiv.innerHTML = `<p>${formattedText}</p>`;
    messageDiv.appendChild(contentDiv);
    
    // Add user avatar after content
    if (sender === 'user') {
        // Optional: add user avatar if you have one
        // const avatar = document.createElement('img');
        // avatar.src = '../Pic/user-avatar.png';
        // avatar.className = 'message-avatar';
        // messageDiv.appendChild(avatar);
    }
    
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const wrapper = document.createElement('div');
    wrapper.className = 'typing-indicator-wrapper';
    wrapper.id = 'typingIndicator';
    
    const avatar = document.createElement('img');
    avatar.src = '../Pic/ai-avatar.jpg';
    avatar.alt = 'AI Assistant';
    avatar.className = 'message-avatar';
    
    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.innerHTML = '<span></span><span></span><span></span>';
    
    wrapper.appendChild(avatar);
    wrapper.appendChild(indicator);
    chatMessages.appendChild(wrapper);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Remove typing indicator
function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
}

// Handle Enter key press
function handleKeyPress(event) {
    if (event.key === 'Enter' && !sendBtn.disabled) {
        sendMessage();
    }
}

// Click suggested question
function askQuestion(question) {
    userInput.value = question;
    sendMessage();
}

// Open PDF Modal
function openPdfModal(pdfUrl) {
    const modal = document.getElementById('pdfModal');
    const viewer = document.getElementById('pdfViewer');
    viewer.src = pdfUrl;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Close PDF Modal
function closePdfModal() {
    const modal = document.getElementById('pdfModal');
    const viewer = document.getElementById('pdfViewer');
    modal.classList.remove('active');
    viewer.src = ''; // Clear iframe
    document.body.style.overflow = ''; // Restore scrolling
}

// Click outside modal to close
window.onclick = function(event) {
    const modal = document.getElementById('pdfModal');
    if (event.target === modal) {
        closePdfModal();
    }
}

// ESC key to close modal
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closePdfModal();
    }
});