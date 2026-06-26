const pantalla = document.getElementById("pantalla");

let historial =
JSON.parse(localStorage.getItem("historial")) || [];

mostrarHistorial();

function agregar(valor){
    pantalla.value += valor;
}

function limpiar(){
    pantalla.value = "";
}

function calcular(){

    try{

        let operacion = pantalla.value;
        let resultado = eval(operacion);

        guardarOperacion(
            `${operacion} = ${resultado}`
        );

        pantalla.value = resultado;

    }

    catch{

        pantalla.value = "Error";

    }

}

function raiz(){

    let numero = Number(pantalla.value);

    let resultado = Math.sqrt(numero);

    guardarOperacion(
        `√${numero} = ${resultado}`
    );

    pantalla.value = resultado;

}

function cuadrado(){

    let numero = Number(pantalla.value);

    let resultado = numero * numero;

    guardarOperacion(
        `${numero}² = ${resultado}`
    );

    pantalla.value = resultado;

}

function porcentaje(){

    let numero = Number(pantalla.value);

    let resultado = numero / 100;

    guardarOperacion(
        `${numero}% = ${resultado}`
    );

    pantalla.value = resultado;

}

function guardarOperacion(op){

    historial.unshift(op);

    if(historial.length > 10){
        historial.pop();
    }

    localStorage.setItem(
        "historial",
        JSON.stringify(historial)
    );

    mostrarHistorial();

}

function mostrarHistorial(){

    const lista =
    document.getElementById("historial");

    lista.innerHTML = "";

    historial.forEach(op => {

        lista.innerHTML += `<li>${op}</li>`;

    });

}

function borrarHistorial(){

    historial = [];

    localStorage.removeItem("historial");

    mostrarHistorial();

}

/* API DEL CLIMA */

const API_KEY =
"78bb99c31c5d73d73219aeffd234100e";

function obtenerClima(){

    const clima =
    document.getElementById("clima");

    clima.innerHTML =
    "Obteniendo ubicación...";

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(

            async function(posicion){

                const lat =
                posicion.coords.latitude;

                const lon =
                posicion.coords.longitude;

                try{

                    const respuesta =
                    await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`
                    );

                    const datos =
                    await respuesta.json();

                    clima.innerHTML = `
                        <p><strong>📍 Ciudad:</strong> ${datos.name}</p>
                        <p><strong>🌡️ Temperatura:</strong> ${datos.main.temp} °C</p>
                        <p><strong>🤔 Sensación:</strong> ${datos.main.feels_like} °C</p>
                        <p><strong>☁️ Estado:</strong> ${datos.weather[0].description}</p>
                        <p><strong>💧 Humedad:</strong> ${datos.main.humidity}%</p>
                    `;

                }

                catch(error){

                    clima.innerHTML =
                    "Error al obtener el clima.";

                }

            },

            function(){

                clima.innerHTML =
                "Debes permitir la ubicación.";

            }

        );

    }

    else{

        clima.innerHTML =
        "Tu navegador no soporta geolocalización.";

    }

}