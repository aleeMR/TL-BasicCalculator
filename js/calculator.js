// Variables
// ***************************************************************
const pantalla = document.querySelector('.screen');

const numeros = document.querySelectorAll('.number');
numeros.forEach( (button) => {
    button.addEventListener('click', calcular);
})

const operadores = document.querySelectorAll('.operator');
operadores.forEach( (button) => {
    button.addEventListener('click', calcular);
})

let punto = 0;

// Funciones
// ***************************************************************
function calcular(e) {
    let digito = e.target.value;

    if (!isNaN(digito))
        agregarNum(digito);
    else {
        if (digito == ".")
            decimal();
        else if (digito == "=")
            igual();
        else if (digito == "CE")
            borrarDigito();
        else if (digito == "C")
            borrarTodo();
        else
            agregarOp(digito);
    }
}

function decimal() {
    if (punto == 0) {
        punto = 1;
        if (isNaN(pantalla.value.slice(-1)))
            pantalla.value += "0.";
        else
            pantalla.value += ".";
    } else
        return;
}

function igual() {
    const expresion = pantalla.value;
    pantalla.value = eval(expresion);
}

function borrarTodo() {
    punto = 0;
    pantalla.value = "0";
}

function borrarDigito() {
    if (pantalla.value.slice(-1) == ".")
        punto = 0;

    pantalla.value = pantalla.value.substring(0, pantalla.value.length-1);
    if (pantalla.value == "")
        pantalla.value = "0";
}

function agregarNum(num) {
    if (pantalla.value.length == 1 && pantalla.value[0] == 0)
        pantalla.value = num;
    else if (pantalla.value[pantalla.value.length-2] == "+" || pantalla.value[pantalla.value.length-2] == "-" && pantalla.value.slice(-1) == 0) {
        borrarDigito();
        pantalla.value += num;
    } else
        pantalla.value += num;
}

function agregarOp(op) {
    punto = 0;
    
    if (!isNaN(pantalla.value.slice(-1)))
        pantalla.value += op;
    else {
        borrarDigito();
        pantalla.value += op;
    }
}
