const body = document.body;
const btnThemeIcon = document.querySelector('#btn-theme');
const btnThemeButton = document.querySelector('button[aria-label="toggle theme"]');
const btnHamburgerButton = document.querySelector('.nav__hamburger');

// 1. Check Local Storage on Load
const getBodyTheme = localStorage.getItem('portfolio-theme');
const getBtnTheme = localStorage.getItem('portfolio-btn-theme');

if (getBodyTheme) {
    body.className = getBodyTheme; // Apply saved theme (light or dark)
}

if (getBtnTheme && btnThemeIcon) {
    // If we saved a specific icon class (fa-sun or fa-moon), apply it
    btnThemeIcon.className = `fas ${getBtnTheme}`; 
}

// 2. Helper to check if dark mode is currently active
const isDark = () => body.classList.contains('dark');

// 3. The Function to Set the Theme
const setTheme = (bodyClass, btnClass) => {
    // Remove old classes
    body.classList.remove('light', 'dark');
    if (btnThemeIcon) {
        btnThemeIcon.classList.remove('fa-sun', 'fa-moon');
        btnThemeIcon.classList.add(btnClass);
    }
    
    // Add new class to body
    body.classList.add(bodyClass);

    // Save to Local Storage
    localStorage.setItem('portfolio-theme', bodyClass);
    localStorage.setItem('portfolio-btn-theme', btnClass);
};

// 4. The Toggle Logic
const toggleTheme = () => {
    if (isDark()) {
        // Switch to Light
        setTheme('light', 'fa-moon');
    } else {
        // Switch to Dark
        setTheme('dark', 'fa-sun');
    }
};

// 5. Add Event Listener
if (btnThemeButton) {
    btnThemeButton.addEventListener('click', toggleTheme);
} 

// --- HAMBURGER MENU LOGIC ---
const displayList = () => {
    const navUl = document.querySelector('.nav__list');
    const icon = btnHamburgerButton ? btnHamburgerButton.querySelector('i') : null;

    if (!icon || !navUl) return;

    if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        navUl.classList.add('display-nav-list');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        navUl.classList.remove('display-nav-list');
    }
};

if (btnHamburgerButton) btnHamburgerButton.addEventListener('click', displayList);

// --- SCROLL UP BUTTON LOGIC ---
const scrollUp = () => {
    const btnScrollTop = document.querySelector('.scroll-top');
    if (!btnScrollTop) return;

    if (body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        btnScrollTop.style.display = 'block';
    } else {
        btnScrollTop.style.display = 'none';
    }
};

document.addEventListener('scroll', scrollUp);