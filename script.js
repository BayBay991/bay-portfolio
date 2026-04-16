document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navbarMenu = document.getElementById('navbar-menu');
            const navbarToggler = document.getElementById('navbar-toggler');
            if (navbarMenu && navbarToggler && navbarMenu.classList.contains('active')) {
                navbarMenu.classList.remove('active');
                navbarToggler.classList.remove('active');
            }
        });
    });

    // Navbar Toggler (Mobile Menu)
    const navbarToggler = document.getElementById('navbar-toggler');
    const navbarMenu = document.getElementById('navbar-menu');

    if (navbarToggler && navbarMenu) {
        navbarToggler.addEventListener('click', () => {
            navbarMenu.classList.toggle('active');
            navbarToggler.classList.toggle('active');
        });
    }

    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const applyTheme = (theme) => {
        if (theme === 'light') {
            body.classList.add('light-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Ikon bulan untuk mode terang
        } else {
            body.classList.remove('light-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Ikon matahari untuk mode gelap
        }
    };

    // Check localStorage for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme');
    applyTheme(savedTheme || 'dark');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });
    }

    // Back to Top and WhatsApp Button Logic
    const backToTopButton = document.getElementById('back-to-top');
    const whatsappButton = document.getElementById('whatsapp-button');

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            if (backToTopButton) backToTopButton.classList.add('show');
            if (whatsappButton) whatsappButton.classList.add('show');
        } else {
            if (backToTopButton) backToTopButton.classList.remove('show');
            if (whatsappButton) whatsappButton.classList.remove('show');
        }
    };

    window.addEventListener('scroll', toggleVisibility);
    toggleVisibility(); // Initial check on load

    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});