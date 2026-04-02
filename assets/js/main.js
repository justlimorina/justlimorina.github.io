/* ============================================================
   main.js — Limorina's Personal Page
   M3 Navigation Drawer + utilities
   ============================================================ */

'use strict';

// ---- Year -------------------------------------------------------
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---- Elements ---------------------------------------------------
const navDrawer  = document.getElementById('navDrawer');
const scrim      = document.getElementById('drawerScrim');

// ---- Open / Close -----------------------------------------------
function openNav() {
    if (!navDrawer || !scrim) return;
    navDrawer.classList.add('is-open');
    scrim.classList.add('is-visible');
    navDrawer.removeAttribute('aria-hidden');
    // Trap focus inside drawer
    document.body.style.overflow = 'hidden';
}

function closeNav() {
    if (!navDrawer || !scrim) return;
    navDrawer.classList.remove('is-open');
    scrim.classList.remove('is-visible');
    navDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

// Close drawer when clicking scrim
if (scrim) {
    scrim.addEventListener('click', closeNav);
}

// Close on Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navDrawer && navDrawer.classList.contains('is-open')) {
        closeNav();
    }
});

// ---- Top App Bar scroll elevation --------------------------------
const topAppBar = document.getElementById('topAppBar');
if (topAppBar) {
    window.addEventListener('scroll', function () {
        if (window.scrollY > 4) {
            topAppBar.style.boxShadow =
                '0px 2px 4px rgba(0,0,0,.2), 0px 4px 8px rgba(0,0,0,.1)';
        } else {
            topAppBar.style.boxShadow = '';
        }
    }, { passive: true });
}

// ---- Theme Management -------------------------------------------
const themeToggleBtn = document.getElementById('themeToggleBtn');
const body = document.body;

// Check for saved theme or system preference
const savedTheme = localStorage.getItem('theme');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
    body.classList.add('dark-theme');
    updateThemeIcon(true);
}

function updateThemeIcon(isDark) {
    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector('.material-icons');
    if (icon) {
        icon.textContent = isDark ? 'light_mode' : 'dark_mode';
    }
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const isDark = body.classList.toggle('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcon(isDark);
    });
}

// ---- M3 Ripple effect on Cards ----------------------------------
function createRipple(event) {
    const card = event.currentTarget;
    const existingRipple = card.querySelector('.md-ripple');
    if (existingRipple) existingRipple.remove();

    const circle   = document.createElement('span');
    const diameter = Math.max(card.clientWidth, card.clientHeight);
    const radius   = diameter / 2;

    const rect = card.getBoundingClientRect();
    circle.style.width  = circle.style.height = `${diameter}px`;
    circle.style.left   = `${event.clientX - rect.left - radius}px`;
    circle.style.top    = `${event.clientY - rect.top  - radius}px`;
    circle.classList.add('md-ripple');

    card.appendChild(circle);
    circle.addEventListener('animationend', () => circle.remove());
}

document.querySelectorAll('.md-card').forEach(card => {
    card.style.position = 'relative';
    card.style.overflow = 'hidden';
    card.addEventListener('click', createRipple);
});