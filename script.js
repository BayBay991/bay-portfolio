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

    // Back to Top Button Logic
    const backToTopButton = document.getElementById('back-to-top');
    const whatsappButton = document.getElementById('whatsapp-button');

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            if (backToTopButton) backToTopButton.classList.remove('hide');
            if (whatsappButton) whatsappButton.classList.remove('hide');
        } else {
            if (backToTopButton) backToTopButton.classList.add('hide');
            if (whatsappButton) whatsappButton.classList.add('hide');
        }
    };

    window.addEventListener('scroll', toggleVisibility);
    toggleVisibility(); // Initial check

    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});