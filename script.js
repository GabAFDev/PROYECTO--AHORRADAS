// ---------------------- UTILITIES ----------------------//

// query selectors //
const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)


// This function shows a screen and hide the others which are not in use //

const showScreens = (screenName) => {
    const screens = $$('.screen')

    for (let screen of screens) {
        screen.classList.add('hidden')
    }

    $(`#container${screenName}`).classList.remove('hidden')
}

// This function removes hidden class//

const remove = (selectors) => {
    for (const selector of selectors) {
        $(selector).classList.remove('hidden')
    }
}

// This function adds hidden class//

const add = (selectors) => {
    for (const selector of selectors) {
        $(selector).classList.add('hidden')
    }
}

// This function creates Random IDs //

const randomId = () => self.crypto.randomUUID()

// -------------------- LOCAL STORAGE --------------------//

// enviar datos
const setData = (key, data) => localStorage.setItem(key, JSON.stringify(data))
// pedir info
const getData = (key) => JSON.parse(localStorage.getItem(key))

// cuando se inicialice va aguardar toda las operaciones de (trae la info del localStorage)
const allOperation = getData('operations') || [] // que me traiga la info del local, pero si no hay, que traiga un array vacio

const askForData = () => {
    getData()

}

// Obtener operación por su ID
const getOperationById = (id) => {
    const operations = getData('operations');
    return operations.find(operation => operation.id === id) || null;
};


// -------------------- OPERATIONS --------------------//

//New operation 

const iterateOperations = (operations) => {
    for (const operation of operations) {
        $('#tableOperations').innerHTML += `
        <tr class="border-b">
                    <td class="p-4">${operation.description}</td>
                    <td class="mt-6 ml-5 py-1 px-2 inline-block bg-[#886a8e]  rounded-full">${operation.category}</td>
                    <td class="p-2">${operation.date}</td>
                    <td class="p-2">${operation.amount}</td>
                    <td class="p-2 flex flex-col space-y-2">
                        <button class="text-[12px] text-green-300 hover:text-slate-500" onclick="showFormEdit('${operation.id}')">Editar</button>
                        <button class="text-[12px] text-red-300 hover:text-slate-500"  onclick="showDeleteOperation('${operation.id}')">Eliminar</button>
                    </td>
                </tr>
    `
    }
}


//guarda el value de los inputs como objetos


const infoForm = () => {
    return {
        id: randomId(),
        description: $('#descriptionNo').value,
        amount: $('#amountNo').value,
        type: $('#typeSelect').value,
        category: $('#inputCategories').value,
        date: $('#inputDate').value
    };
}


// editar operacion
const showFormEdit = (operationId) => {
    add(['.balance-screen', '#addButtonNo'])
    remove(['.new-operarion-screen', '#addEditButtonNo'])
    // trae el mismo id que tiene la operacion en la cual hiciste click sin inportar cuantas veces lo vuelvas a clickear va a seguir siendo el mismo id 
    console.log(operationId)

    // traigo lo que esta en el localStorage y el find me trae el array de la operacion a la que le hago click
    const operationSelected = getData('operations').find(operation => operation.id === operationId)
    console.log(operationSelected)

    // aca le decimos que por cada value del input me muestre el que ya esta prescrito en el localStorage de la operacion en la que le estoy haciendo click
    $('#descriptionNo').value = operationSelected.description
    $('#amountNo').value = operationSelected.amount
    $('#typeSelect').value = operationSelected.type
    $('#inputCategories').value = operationSelected.category
    $('#inputDate').value = operationSelected.date

    // ahora me voy al boton aceptar para meter el id 
    // le agrego un atributo. data-id ahora tiene el id de la operacion que clickeamos
    $('#addEditButtonNo').setAttribute('data-id', operationId)
}



// eliminar operacion
const showDeleteOperation = (operationId) => {
    remove(['#deleteWindow'])

    $('#deleteButtonNo').setAttribute('data-id', operationId)
    $('#deleteButtonNo').addEventListener('click', () => {
        const operationId = $('#deleteButtonNo').getAttribute('data-id')
        console.log(operationId)
        deleteDate(operationId)
    })
}

const deleteDate = (operationId) => {
    // pedimos las operaciones y las filtramos diciendo que nos arme un array con las operaciones que no coinciden con el id de la opacion clickeada, menos, a la si coincide 
    const currentData = getData('operations').filter(operation => operation.id != operationId)
    setData('operations', currentData)
    window.location.reload()
}

// -------------------- CATEGORIES --------------------//



// This function sets the default categories as first shown in screen //


const defaultCategories = [
    {
        id: randomId(),
        categoryName: "Comida"
    },
    {
        id: randomId(),
        categoryName: "Servicios"
    },
    {
        id: randomId(),
        categoryName: "Salidas"
    },
    {
        id: randomId(),
        categoryName: "Educación"
    },
    {
        id: randomId(),
        categoryName: "Transporte"
    },
    {
        id: randomId(),
        categoryName: "Trabajo"
    },
]

// This variable contains all categories as an array, default plus modifications //

const allCategories = getData("categories") || defaultCategories

//This function creates an object for new categories//

const createCategory = () => {
    return {
        id: randomId(),
        categoryName: $('#categoriesInput').value
    }
}

//This function reder categories

const renderCategories = (categories) => {
    for (const category of categories) {
        $("#categoriesTable").innerHTML += `
            <tr class="flex w-[100%] justify-between">
                <td>${category.categoryName}</td>
                <td>
                    <button class="edit-category" onclick= "showScreens('EditCategory')">Editar</button>
                    <button>Eliminar</button>
                </td>
            </tr>
        `
    }
}
// -------------------- EVENTS --------------------//

const initialize = () => {
    // en operations envia allOperation (este tiene todas las operaciones realizadas almacenadas)
    setData('operations', allOperation)
    setData('categories', allCategories)
    // ambes de iniciar  renderOperations abajo de la misma , la inicializamos aca con las operaciones ya obtenidas y parseadas del localStorage
    iterateOperations(allOperation)
    renderCategories(allCategories)

    // ---- MENU EVENTS ---- //


    $('#burger-btn').addEventListener('click', () => {
        $('#burgerMenu').classList.toggle('hidden');
    });

    $('#showBalance').addEventListener('click', () => {
        showScreens("Balance")
    }) 

    $('#showCategories').addEventListener('click', () => {
        showScreens("Categories")
    }) 

    $('#showReports').addEventListener('click', () => {
        showScreens("Reports")
    })

    // ---- BURGER MENU EVENTS ---- //


    $('#show-Balance').addEventListener('click', () => {
        showScreens("Balance")
    }) 

    $('#show-Categories').addEventListener('click', () => {
        showScreens("Categories")
    }) 

    $('#show-Reports').addEventListener('click', () => {
        showScreens("Reports")
    })


    //nueva operacion


    $('#btnNewOperation').addEventListener('click', () => {
        add(['.balance-screen',])
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


    $('#addButtonNo').addEventListener('click', () => {
        // guardamos los valores de los inputs en una costante
        // const newOperation = saveOperationInfo()
        // setData('operations', newOperation)

        // pasos antes de iterar rn psntalla:
        //1. te volves a traer la info actualizada del local (se vuelve en formato array por que getData lo pasea)
        const updatedtData = getData('operations')
        // 2. pusheas la funcion saveOperationInfo() que tiene todos los values del formulario
        updatedtData.push(infoForm())
        // 3. ahora ya modificado ahora si se puede mandar a setData el cual lo introduce al localStorage
        setData('operations', updatedtData) // haciendo estos pasos metimos al objeto adentro de un array para poder ser iterado
        window.location.reload()
    })

    // editar operacion
    $('#addEditButtonNo').addEventListener('click', () => {
        const operationId = $('#addEditButtonNo').getAttribute('data-id')
        // hacemos un map que nos trae un array modificado
        const currentData = getData('operations').map(operation => {
            // operation.id es el id de la operacion que estoy recorriendo, opId es el id del atributo del boton
            if (operation.id === operationId) {
                return infoForm()
            }
            return operation
        })
        // le pasamos al localStorage el array modificado
        setData('operations', currentData)
        window.location.reload()
    })

    // CATEGPRIES SCREEN EVENTS//
    //Cancel on edit category

    $('#cancelButton').addEventListener('click', () => {
        remove(['#containerCategories'])
        add(['#containerEditCategory'])
    })
}

window.addEventListener('load', initialize())





