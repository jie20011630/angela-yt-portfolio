// project-filter.js
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card-new');  // ← 改這裡！
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.classList.remove('hidden');
                    // Re-trigger animation
                    setTimeout(() => {
                        card.classList.add('animate-in');
                    }, 10);
                } else {
                    card.classList.add('hidden');
                    card.classList.remove('animate-in');
                }
            });
        });
    });
});