// name-carousel.js
document.addEventListener('DOMContentLoaded', function() {
    const nameItems = document.querySelectorAll('.name-item');
    let currentIndex = 0;
    
    function switchName() {
        nameItems[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % nameItems.length;
        nameItems[currentIndex].classList.add('active');
    }
    
    setInterval(switchName, 3500);
});