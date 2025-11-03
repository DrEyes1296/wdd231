// scripts/navigation.js

document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-button');
    const nav = document.getElementById('main-nav').querySelector('ul');

    if (menuButton && nav) {
        menuButton.addEventListener('click', () => {
            nav.classList.toggle('open');
        });
    }
});