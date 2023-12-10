const $ = (selector) => document.querySelector(selector)

// FUNCIONALIDAD DE BOTONES

// menu hamburguesa
$('#burger-btn').addEventListener('click', () => {
    $('#burger-menu').classList.toggle('hidden');
});

//nueva operacion
$('#btnNewOperation').addEventListener('click', () => {
    $('.balance-screen').classList.add('hidden')
    $('.new-operarion-screen').classList.toggle('hidden')
})

<<<<<<< HEAD
// cancelar nueva operacion
=======
>>>>>>> 9402b662107b571c14e47080a74b6bcc1990c4b1
$('#cancelButtonNo').addEventListener('click', () => {
    $('.balance-screen').classList.toggle('hidden')
    $('.new-operarion-screen').classList.toggle('hidden')
})
<<<<<<< HEAD
=======

>>>>>>> 9402b662107b571c14e47080a74b6bcc1990c4b1
// ocultar filtros
$('#hiddenFilters').addEventListener('click', () => {
    $('.section-filters').style.height = '20vh'
    $('.filters').classList.toggle('hidden')
    $('#hiddenFilters').classList.toggle('hidden')
    $('#haddenFilters').classList.toggle('hidden')
})
 // mostrar filtros
$('#haddenFilters').addEventListener('click', () => {
    $('.section-filters').style.height = '63vh'
    $('.filters').classList.toggle('hidden')
    $('#hiddenFilters').classList.toggle('hidden')
    $('#haddenFilters').classList.toggle('hidden')
})