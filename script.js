const $ = (selector) => document.querySelector(selector)

const remove = (selectors) => {
    for (const selector of selectors) {
        $(selector).classList.remove('hidden')
    }
}
const add = (selectors) =>  {
    for (const selector of selectors) {
        $(selector).classList.add('hidden')
    }
}


// FUNCIONALIDAD DE BOTONES

const initializacionButtons = () => {

    // menu hamburguesa
$('#burger-btn').addEventListener('click', () => {
    $('#burger-menu').classList.toggle('hidden');
});

    //nueva operacion
$('#btnNewOperation').addEventListener('click', () => {
    add(['.balance-screen', ])
    remove(['.new-operarion-screen'])
})

// cancelar nueva operacion
$('#cancelButtonNo').addEventListener('click', () => {
    remove(['.balance-screen'])
    add(['.new-operarion-screen'])
})

// ocultar filtros
$('#hiddenFilters').addEventListener('click', () => {
    $('.section-filters').style.height = '20vh'
    add(['.filters', '#hiddenFilters'])
    remove(['#haddenFilters'])
})
// mostrar filtros
$('#haddenFilters').addEventListener('click', () => {
    $('.section-filters').style.height = '63vh'
    remove(['.filters', '#hiddenFilters'])
    add(['#haddenFilters'])
})
}

initializacionButtons()



// funciones localStorage
const setData = (key, data) => localStorage.setItem(key, JSON.stringify(data))
// pedir info
const getData = (key) => JSON.parse(localStorage.getItem(key))




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




$('#addButtonNo').addEventListener('click', () => {
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




// funcion que verifica si la operacion quisiera duplicarse

function isOperationDuplicate(newOperation, operations) {
    // compara la operacion a agregar con la ya existente en el localStorage
    const duplicateOperations = operations.filter(existingOperation => {
        return JSON.stringify(existingOperation) === JSON.stringify(newOperation);
    });

    // Si hay operaciones duplicadas, el tamaño de duplicateOperations será mayor que cero
    return duplicateOperations.length > 0;
}


