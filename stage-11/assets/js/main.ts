/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', (): void => {
    const hamburger = document.getElementById('hamburger') as HTMLButtonElement | null;
    const navMenu = document.querySelector('.nav-menu') as HTMLElement | null;

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (): void => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll<HTMLAnchorElement>('.nav-link').forEach((link: HTMLAnchorElement): void => {
            link.addEventListener('click', (): void => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e: MouseEvent): void => {
            const target = e.target as Node;
            if (!hamburger.contains(target) && !navMenu.contains(target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});

// Smooth scroll for anchor links
document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor: HTMLAnchorElement): void => {
    anchor.addEventListener('click', function (this: HTMLAnchorElement, e: Event): void {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href) {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Form validation helper
function validateForm(formElement: HTMLFormElement): boolean {
    const inputs = formElement.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach((input: HTMLInputElement | HTMLTextAreaElement): void => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

// Contact form handler
const contactForm = document.querySelector<HTMLFormElement>('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (this: HTMLFormElement, e: SubmitEvent): void {
        e.preventDefault();

        if (validateForm(this)) {
            // Here you would typically send the form data to the server
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        }
    });
}

console.log('🚀 MyApp initialized successfully');
