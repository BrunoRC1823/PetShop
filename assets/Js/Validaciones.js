export function valida(input) {
    const tipoInput = input.dataset.tipo;
    if (validadores[tipoInput]) {
        validadores[tipoInput](input);
    }
    if (input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector(".input-message-error").innerHTML="";
    } else {
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector(".input-message-error").innerHTML=mostrarMensajeError(tipoInput,input);
    }
};

const tipoError = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
];

const mensajeError = {
    nombre: {
        valueMissing: "Este campo no puede estar vacío"
    },
    email: {
        valueMissing: "Este campo no puede estar vacío",
        typeMismatch: "El correo no es válido"
    },
    password: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "Debe contener al menos 6 y menos de 12 caracteres, debe contener al menos una letra minúscula y una mayúscula, un numero y no tener caracteres especiales!"
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacío",
        customError: "Tiene que ser mayor de 18 años"
    },
    numero:{
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch:"El formato requerido es XXXXXXXXXX 10 números"
    },    
    direccion:{
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch:"Este campo deber contener entre 10 y 40 caracteres"
    },
    ciudad:{
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch:"Este campo deber contener entre 4 y 30 caracteres"
    },
    estado:{
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch:"Este campo deber contener entre 4 y 30 caracteres"
    }
}
const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeError(tipoInput,input){
    let mensaje ="";
    tipoError.forEach(error => {
        if(input.validity[error]){
            mensaje = mensajeError[tipoInput][error];
        }
    });
    return mensaje;
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = '';
    let esFechaFutura = fechaFutura(fechaCliente);
    if (esFechaFutura) {
        mensaje = "La fecha no puede ser mayor a la fecha actual"
    } else {
        let esMayor = mayorEdad(fechaCliente);
        if (!esMayor) {
            mensaje = "Tiene que ser mayor de 18 años"
        }
    }
    input.setCustomValidity(mensaje);
};
function mayorEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFecha = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return diferenciaFecha <= fechaActual;
}
function fechaFutura(fecha) {
    const fechaActual = new Date();
    return fecha > fechaActual;
}