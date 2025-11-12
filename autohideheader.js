function initAutoHideHeader(threshold = 100) {
    const header = document.querySelector('header');
    if (!header) {
      console.warn('Can not find header element, autoHideHeader function will not be activated');
      return;
    }
    
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > threshold) {
        header.classList.add('header--hidden');
      } else {
        header.classList.remove('header--hidden');
      }
      
      lastScrollY = currentScrollY;
    });
  }
  
  // 自動啟動效果
  initAutoHideHeader();