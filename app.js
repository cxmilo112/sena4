console.log("JS cargado correctamente");

const URL = 'SENACTPI.matriculados.json';

function validarLogin() {
  const user = document.getElementById('usuario').value.trim();
  const pass = document.getElementById('contrasena').value.trim();
  if (pass === 'adso2993013' && user) {
    localStorage.setItem('usuario', user);
    mostrarApp(user);
  } else alert('Usuario o contraseña incorrectos');
}

function mostrarApp(user) {
  document.getElementById('login').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  document.getElementById('nombreUsuario').textContent = user;
  cargarDatos();
}

function cargarDatos() {
  fetch(URL)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector('#tablaAprendices tbody');
      tbody.innerHTML = '';
      data.forEach(item => {
        const tr = document.createElement('tr');
        if (item.ESTADO_APRENDIZ === 'Retiro Voluntario') {
          tr.classList.add('resaltado');
        }
        tr.innerHTML = `
          <td>${item.NOMBRE} ${item.PRIMER_APELLIDO} ${item.SEGUNDO_APELLIDO}</td>
          <td><a href="#" onclick='guardarFicha(${JSON.stringify(item)})'>${item.FICHA}</a></td>
          <td>${item.PROGRAMA}</td>
          <td>${item.NIVEL_DE_FORMACION}</td>
          <td>${item.ESTADO_APRENDIZ}</td>
          <td>${item.ESTADO_FICHA}</td>
        `;
        tbody.appendChild(tr);
      });
    });
}

function filtrarAprendices() {
  const ficha = document.getElementById('buscarFicha').value.trim();
  const programa = document.getElementById('buscarPrograma').value.trim().toLowerCase();

  fetch(URL)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector('#tablaAprendices tbody');
      tbody.innerHTML = '';
      data.forEach(item => {
        const fichaMatch = ficha === '' || String(item.FICHA) === ficha;
        const programaMatch = programa === '' || item.PROGRAMA.toLowerCase().includes(programa);
        if (fichaMatch && programaMatch) {
          const tr = document.createElement('tr');
          if (item.ESTADO_APRENDIZ === 'Retiro Voluntario') {
            tr.classList.add('resaltado');
          }
          tr.innerHTML = `
            <td>${item.NOMBRE} ${item.PRIMER_APELLIDO} ${item.SEGUNDO_APELLIDO}</td>
            <td><a href="#" onclick='guardarFicha(${JSON.stringify(item)})'>${item.FICHA}</a></td>
            <td>${item.PROGRAMA}</td>
            <td>${item.NIVEL_DE_FORMACION}</td>
            <td>${item.ESTADO_APRENDIZ}</td>
            <td>${item.ESTADO_FICHA}</td>
          `;
          tbody.appendChild(tr);
        }
      });
    });
}

function guardarFicha(item) {
  localStorage.setItem('codigoFicha', item.FICHA);
  localStorage.setItem('nombrePrograma', item.PROGRAMA);
  localStorage.setItem('nivelFormacion', item.NIVEL_DE_FORMACION);
  localStorage.setItem('estadoFicha', item.ESTADO_FICHA);
  alert('Ficha guardada correctamente');
}

function cerrarSesion() {
  localStorage.clear();
  document.getElementById('app').classList.add('hidden');
  document.getElementById('login').classList.remove('hidden');
}

window.onload = () => {
  const user = localStorage.getItem('usuario');
  if (user) mostrarApp(user);
};
