const boton = document.getElementById('boton')
const capital = document.getElementById('monto')
const numeroCuotas = document.getElementById('cuotas')
const ingresos = document.getElementById('ingresos')
const nombre = document.getElementById('nombre')
const tituloCalculadora = document.getElementById('tituloCalculadora')
const apellido = document.getElementById('apellido')
const divSaludo = document.querySelector('#divSaludo')
const divPrestamo = document.querySelector('#divPrestamo')
const maximoCapital = 5000
const maximoCuotas = 12


function crearSaludo (user){
    const saludarTitulo = document.createElement('h2');
    saludarTitulo.innerText = `Hola ${user.nombre} ${user.apellido}, te otorgaremos un préstamo con las siguientes características:`;
    divSaludo.append(saludarTitulo)
}

function montoCuota(prestamo){
    let interes = 0
    const datos1 = {
        cuotasElegidas: numeroCuotas.value
    }
    
    //Operador ternario
    datos1.cuotasElegidas<=6 ? interes = 2 : interes = 5

    let valorCuota = (prestamo/datos1.cuotasElegidas)*(1+(interes/100))
    return valorCuota
}




function calculadora(){
    const datos = {
        capitalDatos: capital.value,
        numeroCuotasDatos: numeroCuotas.value,
        ingresosDatos: ingresos.value
    }

    //desestructuracion
    const {capitalDatos, numeroCuotasDatos, ingresosDatos} = datos
    
    
    if (capitalDatos<=maximoCapital && numeroCuotasDatos<=6 && (ingresosDatos>capitalDatos || montoCuota(capitalDatos)<ingresosDatos)){
        const prestamoParrafo = document.createElement('p')
        prestamoParrafo.innerText = `Capital: ${capitalDatos} Cuota mensual:${montoCuota(capitalDatos)}`
        divPrestamo.append(prestamoParrafo)
    } else if(capitalDatos<=maximoCapital && numeroCuotasDatos>6 && numeroCuotasDatos<=maximoCuotas && (ingresosDatos>capitalDatos || montoCuota(capitalDatos)<ingresosDatos)) {
        const prestamoParrafo = document.createElement('p')
        prestamoParrafo.innerText = `Capital: ${capitalDatos} Cuota mensual:${montoCuota(capitalDatos)}`
        divPrestamo.append(prestamoParrafo)
    } else if(capitalDatos<=maximoCapital && numeroCuotasDatos<=12 && montoCuota(capitalDatos)>ingresosDatos){
        const prestamoParrafo = document.createElement('p')
        prestamoParrafo.innerText = `No cumple con los requisitos crediticios para cumplir con la cuota mensual`
        divPrestamo.append(prestamoParrafo)
    } else {
        const prestamoParrafo = document.createElement('p')
        prestamoParrafo.innerText = `Requisitos: máximo de capital 5.000 USD y máximo de cuotas 12`
        divPrestamo.append(prestamoParrafo)
    }
}



boton.onclick = (e) => {
    e.preventDefault()
    
    // saludo a usuario
    const usuario = {
        nombre: nombre.value,
        apellido: apellido.value,
    }
    localStorage.setItem('usuarioStorage', JSON.stringify(usuario))
    crearSaludo(usuario)
    calculadora()

    // eliminar form
    boton.style.display = "none";
    capital.style.display = "none";
    numeroCuotas.style.display = "none";
    ingresos.style.display = "none";
    nombre.style.display = "none";
    apellido.style.display = "none";
    tituloCalculadora.style.display = "none";

}



