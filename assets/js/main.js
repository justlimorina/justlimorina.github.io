/* ============================================================
   main.js — Limorina's Personal Page
   M3 Navigation Drawer + Dynamic color calculations + utilities
   ============================================================ */

import { argbFromHex, themeFromSourceColor, applyTheme } from 'https://esm.run/@material/material-color-utilities';
import 'https://esm.run/@material/web/all.js';

// ---- Year -------------------------------------------------------
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---- Elements ---------------------------------------------------
const navDrawer  = document.getElementById('navDrawer');
const scrim      = document.getElementById('drawerScrim');

// ---- Open / Close -----------------------------------------------
export function openNav() {
    if (!navDrawer || !scrim) return;
    navDrawer.classList.add('is-open');
    scrim.classList.add('is-visible');
    navDrawer.removeAttribute('aria-hidden');
    // Lock scrolling on mobile viewports when drawer is open
    if (window.innerWidth < 1200) {
        document.body.style.overflow = 'hidden';
    }
}

export function closeNav() {
    if (!navDrawer || !scrim) return;
    navDrawer.classList.remove('is-open');
    scrim.classList.remove('is-visible');
    navDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

// Make drawer methods global for inline onclick handlers
window.openNav = openNav;
window.closeNav = closeNav;

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

// Reset scroll override on resize if screen becomes desktop
window.addEventListener('resize', () => {
    if (window.innerWidth >= 1200) {
        document.body.style.overflow = '';
    } else if (navDrawer && navDrawer.classList.contains('is-open')) {
        document.body.style.overflow = 'hidden';
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

// ---- Dynamic Theme Management (seed: #DC143C) ------------------
const sourceColor = argbFromHex('#DC143C');
const theme = themeFromSourceColor(sourceColor);

let isDark = localStorage.getItem('theme') === 'dark' || 
             (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);

function updateTheme() {
    // Apply theme dynamic color properties to documentElement
    applyTheme(theme, { target: document.documentElement, dark: isDark });
    
    // Toggle dark-theme class on body
    if (isDark) {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
    
    // Update switch icon text content
    const updateIcon = (btnId) => {
        const btn = document.getElementById(btnId);
        if (btn) {
            const icon = btn.querySelector('.material-icons') || btn.querySelector('md-icon');
            if (icon) {
                icon.textContent = isDark ? 'light_mode' : 'dark_mode';
            }
        }
    };
    updateIcon('themeToggleBtn');
    updateIcon('railThemeToggleBtn');
}

// Perform initial dynamic theme render
updateTheme();

// Handle theme toggle button events
const themeToggleBtn = document.getElementById('themeToggleBtn');
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        isDark = !isDark;
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateTheme();
    });
}

const railThemeToggleBtn = document.getElementById('railThemeToggleBtn');
if (railThemeToggleBtn) {
    railThemeToggleBtn.addEventListener('click', () => {
        isDark = !isDark;
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateTheme();
    });
}