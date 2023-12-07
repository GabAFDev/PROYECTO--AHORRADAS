const $ = (selector) => document.querySelector(selector)

// FUNCIONALIDAD DE BOTONES

// menu hamburguesa
$('#burger-btn').addEventListener('click', () => {
    $('#burger-menu').classList.toggle('hidden');
});