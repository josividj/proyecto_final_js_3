alumnos = [];
numerosAlumno = [];
primosPC = [];

function esPrimo(numero) {
    for (let i = 2; i < numero; i++) {
        if (numero % i === 0) {
            return false;
        }
    }
    return numero !== 1;
}

function obtenerNumerosPrimos(numeros) {
    const numerosPrimos = [];
    for (let i = 0; i < numeros.length; i++) {
        if (esPrimo(numeros[i])) {
            numerosPrimos.push(numeros[i]);
        }
    }
    return numerosPrimos;
}

function registrarUsuario(numerosAlumno, primosAlumno) {
    const numerosPC = JSON.parse(localStorage.getItem('numerosPC'));
    const nuevoAlumno = new Alumno(inputNombre.value, inputEscuela.value, numerosAlumno, primosAlumno, numerosPC, primosPC);
    alumnos.push(nuevoAlumno);
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
}

function actualizarNumerosElegidos(numeros) {
    inputNumeros.placeholder = numeros.join(', ');
}

function actualizarNumerosPC(numero) {
    inputNumerosPC.placeholder = numero.join(', ');
}


function cargarNumeros() {
    for (let i = 0; i < 5; i++) {
        let numero = parseInt(prompt("Ingrese un número entre 100 y 900"));
        while (isNaN(numero) || numero < 100 || numero > 900) {
            numero = parseInt(prompt("El número ingresado no es válido. Ingrese un número entre 100 y 900"));
        }
        numerosAlumno.push(numero);
    }
    actualizarNumerosElegidos(numerosAlumno);
    localStorage.setItem('numerosAlumno', JSON.stringify(numerosAlumno));
    return numerosAlumno;
}


function cargarNumerosPC() {
    for (let i = 0; i < 5; i++) {
        let numeroCompu = Math.round(Math.random() * (900 - 100) + 100);
        numerosPC.push(numeroCompu);
    }
    console.log(numerosPC);
    actualizarNumerosPC(numerosPC);
    localStorage.setItem('numerosPC', JSON.stringify(numerosPC));
    return numerosPC;
}

function validarInputs() {
    const nombre = inputNombre.value.trim();
    const escuela = inputEscuela.value.trim();

    if (nombre === '' || escuela === '') {
        return false; // Retorna falso si alguno de los campos está vacío
    }

    const soloCaracteresNombre = /^[A-Za-z\s]+$/;
    const soloCaracteresEscuela = /^[A-Za-z0-9\s]+$/;

    if (!soloCaracteresNombre.test(nombre) || !soloCaracteresEscuela.test(escuela)) {
        return false; // Retorna falso si alguno de los campos contiene caracteres no permitidos
    }

    return true; // Retorna verdadero si ambos campos cumplen con las condiciones
}

function recuperarAlumnos() {
    const alumnosGuardados = JSON.parse(localStorage.getItem('alumnos'));
    if (alumnosGuardados) {
        let alumnos = alumnosGuardados;
        return alumnos;
    } else {
        return [];
    }
}

function limpiarFormulario(form) {
    form.reset();
    localStorage.clear();
    inputNombre2.placeholder = '';
    numerosPC.length = 0;
    inputPrimosAlumnos.placeholder = '';
    inputPrimosPC.placeholder = '';

    alumnos.length = 0;
    numerosAlumno.length = 0;
    numerosPC.length = 0;
}

const apiKey = '495bee143c6358e72c8c4534b98c19a8'

function obtenerDatosClima() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=Paris,FR&appid=495bee143c6358e72c8c4534b98c19a8&units=metric`)
        .then((response) => {
            const objetosTemp = response.json();
            objetosTemp.then((temp) => {
                console.log(temp);
            });

            // console.log(`La temperatura actual en París es de ${temperatura}°C.`);
        });
    // .catch(error => {
    //     console.log('Error:', error);
    // });
}

// obtenerDatosClima();

// function obtenerDatosClima() {
//     // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

//   fetch(`http://api.openweathermap.org/geo/1.0/direct?q=Paris,FR&limit=1&appid=${apiKey}`)
//     .then(response => response.json())
//     .then(data => {
//       // Aquí puedes manejar los datos de la respuesta de la API
//       console.log(data);
//       // Por ejemplo, puedes extraer la temperatura y mostrarla en el HTML
//       const temperatura = data.main.temp;
//       const elementoTemperatura = document.getElementById('temperatura');
//       elementoTemperatura.textContent = temperatura;
//     })
//     .catch(error => {
//       console.log('Error:', error);
//     });
// }