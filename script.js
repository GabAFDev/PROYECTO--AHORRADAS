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

// cancelar nueva operacion
$('#cancelButtonNo').addEventListener('click', () => {
    $('.balance-screen').classList.toggle('hidden')
    $('.new-operarion-screen').classList.toggle('hidden')
})


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





// SECCION AGREGAR NUEVA OPERACION 
const newOperation = () => {
    return {
        description: $('#descriptionNo').value,
        amount: $('#amountNo').value,
        type: $('#typeSelect').value,
        category: $('#inputCategories').value,
        date: $('#inputDate').value
    };
}

const dates = {
    operations: [],
    categories: []
}

const button = $('#addButtonNo');


button.addEventListener('click', () => {
    // const operation = newOperation()

    const { operations } = dates

    const operation = newOperation();
    if (!isOperationDuplicate(operation, operations)) {
        operations.push(operation);
        console.log(dates);

        // lo volvemos un objeto json y lo seteamos al localStorage
        const parsedDates = JSON.stringify(dates);
        localStorage.setItem('dates', parsedDates);
    } else {
        alert('La operación ya existe y no se puede repetir.');
    }
})




// funcion que verifica si la operacion quiere ser duplicada 

function isOperationDuplicate(newOperation, operations) {
    // compara la operacion a agregar con la ya existente en el localStorage
    const duplicateOperations = operations.filter(existingOperation => {
        return JSON.stringify(existingOperation) === JSON.stringify(newOperation);
    });

    // Si hay operaciones duplicadas, el tamaño de duplicateOperations será mayor que cero
    return duplicateOperations.length > 0;
}