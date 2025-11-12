// 觀察器設定
const observerOptions = {
    threshold: 0.1,              // 當元素 10% 進入視窗時觸發
    rootMargin: '0px 0px -50px 0px'  // 提前 50px 觸發動畫
};

// 創建 Intersection Observer
const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // 元素進入視窗時，添加動畫類別
            entry.target.classList.add('animate-in');
            
            // 可選：一次性動畫（不重複觸發）
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 初始化動畫功能
function initScrollAnimations() {
    // 找到所有需要動畫的元素
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animateElements.length === 0) {
        console.warn('⚠️ 沒有找到 .animate-on-scroll 元素');
        return;
    }
    
    // 開始觀察每個元素
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    console.log(`✅ 成功設定 ${animateElements.length} 個動畫元素`);
}

// 進階功能：延遲動畫效果
function addStaggeredAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
    });
}

// 等待頁面載入完成後執行
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 頁面載入完成，初始化滾動動畫...');
    initScrollAnimations();
    addStaggeredAnimation();
});

// 可選：提供手動重新初始化的功能
window.refreshScrollAnimations = initScrollAnimations;