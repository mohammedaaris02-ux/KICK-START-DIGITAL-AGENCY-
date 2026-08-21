/**
 * Kickstart Digital - Custom Script
 * Optimized vanilla JS for premium interactions and responsive navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 0. Flat routing verified

    // 1. Sticky Header Functionality
    const header = document.getElementById('site-header');
    const scrollThreshold = 30;

    const handleScroll = () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check on load
    handleScroll();

    // 2. Mobile Menu Navigation (Full-screen overlay drawer)
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const menuOverlay = document.getElementById('mobile-menu-overlay');
    const body = document.body;

    const toggleMenu = () => {
        const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isOpen);
        menuOverlay.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (!isOpen) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    };

    menuToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    const mobileLinks = document.querySelectorAll('.mobile-nav-link, .btn-mobile-cta');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.setAttribute('aria-expanded', 'false');
            menuOverlay.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // 3. Accessibility & Keyboard Navigation - Close menu on escape
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
            toggleMenu();
            menuToggle.focus();
        }
    });

    // 4. Subtle Creative Object Hover Synchronization
    const glassPanels = document.querySelectorAll('.glass-layer');
    const centerObject = document.querySelector('.center-dimensional-object');
    const pulseNodes = document.querySelectorAll('.pulse-node');

    glassPanels.forEach(panel => {
        panel.addEventListener('mouseenter', () => {
            if (centerObject) {
                centerObject.style.transform = 'translate(-50%, -55%) rotate(6deg) scale(1.04)';
            }
            pulseNodes.forEach(node => {
                node.style.animationPlayState = 'paused';
                node.style.fill = 'var(--color-accent-secondary)';
            });
        });

        panel.addEventListener('mouseleave', () => {
            if (centerObject) {
                centerObject.style.transform = '';
            }
            pulseNodes.forEach(node => {
                node.style.animationPlayState = 'running';
                node.style.fill = 'var(--color-highlight)';
            });
        });
    });

    // 5. Interactive Digital Framework (Standard Section Visual)
    const frameworkRows = document.querySelectorAll('.growth-standard-framework-row');
    const stepLabel = document.querySelector('.growth-standard-framework-step');
    const activeNode = document.querySelector('.progression-node-active');
    const progressFill = document.querySelector('.progress-bar-fill');

    const updateActiveRow = (row, index) => {
        // Remove active class from all rows
        frameworkRows.forEach(r => r.classList.remove('active-row'));
        // Add to active one
        row.classList.add('active-row');

        // Update indicators
        if (stepLabel) stepLabel.textContent = `0${index + 1} / 03`;
        
        if (activeNode) {
            // map node offset values: 14%, 50%, 86%
            const nodeOffsets = ['14%', '50%', '86%'];
            activeNode.style.top = nodeOffsets[index];
        }

        if (progressFill) {
            const fillWidths = ['33%', '66%', '100%'];
            progressFill.style.width = fillWidths[index];
        }
    };

    frameworkRows.forEach((row, index) => {
        // Mouse enter event
        row.addEventListener('mouseenter', () => updateActiveRow(row, index));
        // Keyboard focus navigation
        row.addEventListener('focus', () => updateActiveRow(row, index));
    });

    // 6. Subtle Mouse Hover Parallax Depth Effect (Desktop Only, Reduced Motion Respect)
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 900px)').matches;

    if (!isReduced && !isMobile) {
        document.querySelectorAll('.kd-services-floating-wrapper').forEach(wrapper => {
            const inner = wrapper.querySelector('.kd-services-floating-inner');
            if (!inner) return;

            wrapper.addEventListener('mousemove', (e) => {
                const rect = wrapper.getBoundingClientRect();
                const x = e.clientX - rect.left - (rect.width / 2);
                const y = e.clientY - rect.top - (rect.height / 2);
                
                // Map coordinates: maximum movement X: 4px, Y: 4px
                const moveX = (x / (rect.width / 2)) * 4;
                const moveY = (y / (rect.height / 2)) * 4;

                inner.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });

            wrapper.addEventListener('mouseleave', () => {
                inner.style.transform = 'translate(0px, 0px)';
            });
        });
    }
});
