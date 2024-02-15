//Tema elegido: Página que ofece servicios de diseño y remodelación de ambientes, ofreciendo un presupuesto
//inicial mínimo en base al tipo de ambiente seleccionado y superficie.



console.log(localStorage);


// CARGA DE USUARIO Y DIRECCIONAMIENTO EN LOCALSTORAGE
const usuariosStorage = localStorage.getItem("usuarios");
const usuarios = usuariosStorage ? JSON.parse(usuariosStorage) : [];

localStorage.setItem("usuarios", JSON.stringify(usuarios));

//FORMULARIO PARA CARGA DE USUARIO

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  
  let inputs = e.target.elements;
  let nombre = inputs.nombre.value;
  let mail = inputs.mail.value;
  let telefono = inputs.telefono.value;
  
  //BUSQUEDA DEL NOMBRE CARGADO EN LOCALSTORAGE -USUARIO EXISTENTE EN LA BASE-
  const usuarioExistente = usuarios.find((item) => item.nombre === nombre);

//USUARIO EXISTENTE EN LA BASE DE DATOS
  if (usuarioExistente) {

//SI EL USUARIO EXISTE SE ACTUALIZAN DATOS Y SE DA LA BIENVENIDA
    usuarioExistente.mail = mail;
    usuarioExistente.telefono = telefono;
    let div = document.createElement("div");
    div.innerHTML = `
      <h2>Bienvenido, Ud es el cliente Id Nº : ${usuarioExistente.id}</h2>
      `;
      document.body.append(div);
    } else {

//USUARIO NUEVO - CARGA DE DATOS EN STORAGE - BIENVENIDA CON MUESTRA DE DATOS
     
      usuarios.push({ id: usuarios.length + 1, nombre, mail, telefono });
      const usuarioNuevo = usuarios.find((item) => item.nombre === nombre);
      let div = document.createElement("div");
      div.innerHTML = `
      <h2>Bienvenido, Ud es el cliente Id Nº : ${usuarioNuevo.id}</h2>
      <p>Nombre: ${usuarioNuevo.nombre}</p>
      <b>Mail: ${usuarioNuevo.mail}</b>
      `;
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      document.body.append(div);
  }
  //RESETEO DEL FORMULARIO PARA CARGA DE DATOS
  e.target.reset();
});

//OPCIONES DE SERVICIOS Y PRESUPUESTOS

console.log(localStorage);

//OPCION DISENOS

//CARGA INICIAL DE ARRAY DISENOS

const disenos = [
  { id_diseno: 1, ambiente_diseno: "Comedor", precio_diseno: 1100, total_diseno: 0, metros: 0 },
  { id_diseno: 2, ambiente_diseno: "Living", precio_diseno: 1200, total_diseno: 0, metros: 0 },
  { id_diseno: 3, ambiente_diseno: "Cocina", precio_diseno: 1300, total_diseno: 0, metros: 0 },
  { id_diseno: 4, ambiente_diseno: "Baño", precio_diseno: 1400, total_diseno: 0, metros: 0 },
  { id_diseno: 5, ambiente_diseno: "Habitación", precio_diseno: 1000, total_diseno: 0, metros: 0 },
];

//ARMADO DE CONTENEDORES

//CONTENEDOR PRINCIPAL

const contenedorPrincipal = document.createElement("div");
contenedorPrincipal.classList.add("contenedor-principal");
document.body.append(contenedorPrincipal);

//CONTENEDOR SECUNDARIO OPCION DISENO

const contenedorDisenos = document.createElement("div");
contenedorDisenos.classList.add("contenedor-disenos");
contenedorDisenos.innerHTML = "<h1>Diseños</h1>";
contenedorPrincipal.append(contenedorDisenos);

//PRESENTACION DE LAS CONDICIONES DE LA OPCION DISENO, CARGA DE METROS Y CARGA EN EL DIV

disenos.forEach((item) => {
  let div = document.createElement("div");
  div.innerHTML = `
    <h2>${item.ambiente_diseno}</h2>
    <p>Precio por m2: ${item.precio_diseno}</p>
    <label for="metros${item.id_diseno}">Metros cuadrados:</label>
    <input type="number" id="metros${item.id_diseno}" name="metros" value="${item.metros}" required>
  `;
  contenedorDisenos.append(div);
});

//CALCULO DE TODOS LOS VALORES INGRESADOS POR MEDIO DE BOTON "CALCULAR DATOS"
  
let errores = 0;

const botonCalcularTodos = document.createElement("button");
botonCalcularTodos.textContent = "Calcular Totales";
botonCalcularTodos.addEventListener("click", calcularTodos);
contenedorDisenos.append(botonCalcularTodos);

//FUNCION CALCULAR DATOS GENERANDO CALCULO INDIVIDUAL POR ITEM TOMANDO LOS METROS INGRESADOS POR CADA UNO. 
//SI HAY ERRORES SE ACUMULAN EN UNA VARIABLE Y SE MUESTRA MENSAJE DE ERROR (LIBRERIA) RETORNANDO A LA CARGA.

function calcularTodos() {
  disenos.forEach((item) => {
    const metrosInput = document.getElementById(`metros${item.id_diseno}`);
    const metros = parseFloat(metrosInput.value);

    if (!isNaN(metros)) {
      item.metros = metros;
      item.total_diseno = metros * item.precio_diseno;
    }else{
      //VERIFICA SI HAY ERRORES EN LA CARGA Y MUESTRA EL ERROR CON LIBRERIA
      errores++;
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Los valores ingresados no son metros!",
        footer: '<a href="#">Corrija los valores ingresadosr</a>'
      });
      return; 
    }
  
  });

  if (errores === 0) {

    // SI NO HAY ERRORES CALCULA EL TOTAL GENERAL POR REDUCE EN EL ARRAY
    const totalGeneral = disenos.reduce((acum, diseno) => acum + diseno.total_diseno, 0);

    // RENDERIZA Y CARGA DATOS EN EL LOCALSTORAGE
    renderizar(disenos, totalGeneral);
    localStorage.setItem('disenos', JSON.stringify(disenos));
  }

  //VUELVE LA VARIABLE ERRORES A 0
  errores = 0;
}

//R4ENDERIZA LOS DATOS ACUMULADOS EN EL LOCALSTORAGE MODALIDAD DISENO

function renderizar(disenos, totalGeneral) {
  contenedorDisenos.innerHTML = "<h1>Diseños</h1>";

  disenos.forEach((item) => {
    if (item.total_diseno !== 0) {
      let div = document.createElement("div");
      div.innerHTML = `
        <h2>${item.ambiente_diseno}</h2>
        <p>Precio por m2: ${item.precio_diseno}</p>
        <p>Total: ${item.total_diseno}</p>
      `;

      contenedorDisenos.append(div);
    }
  });

  // DEVUELVE EL TOTAL GENERAL
  let divTotal = document.createElement("div");
  divTotal.innerHTML = `<h2>Total General: ${totalGeneral}</h2>`;
  contenedorDisenos.append(divTotal);
}

 
//OPCION DISENOS

//CARGA INICIAL DE ARRAY REMODELACIONES

const remodelaciones = [
  { id_remodelacion: 1, ambiente_remodelacion: "Comedor", precio_remodelacion: 2100, total_remodelacion: 0, metros_remodelacion: 0 },
  { id_remodelacion: 2, ambiente_remodelacion: "Living", precio_remodelacion: 2200, total_remodelacion: 0, metros_remodelacion: 0 },
  { id_remodelacion: 3, ambiente_remodelacion: "Cocina", precio_remodelacion: 2300, total_remodelacion: 0, metros_remodelacion: 0 },
  { id_remodelacion: 4, ambiente_remodelacion: "Baño", precio_remodelacion: 2400, total_remodelacion: 0, metros_remodelacion: 0 },
  { id_remodelacion: 5, ambiente_remodelacion: "Habitación", precio_remodelacion: 2000, total_remodelacion: 0, metros_remodelacion: 0 },
];



const contenedorRemodelaciones = document.createElement("div");
contenedorRemodelaciones.classList.add("contenedor-remodelaciones");
contenedorRemodelaciones.innerHTML = "<h1>Remodelaciones</h1>";
contenedorPrincipal.append(contenedorRemodelaciones);

//PRESENTACION Y CARGA DE METROS

remodelaciones.forEach((item) => {
  let div = document.createElement("div");
  div.innerHTML = `
    <h2>${item.ambiente_remodelacion}</h2>
    <p>Precio por m2: ${item.precio_remodelacion}</p>
    <label for="metrosR${item.id_remodelacion}">Metros cuadrados:</label>
    <input type="number" id="metrosR${item.id_remodelacion}" name="metros" value="${item.metros_remodelacion}" required>
  `;
  contenedorRemodelaciones.append(div);
});
let erroresR =0;

const botonCalcularTodosR = document.createElement("button");
botonCalcularTodosR.textContent = "Calcular Totales";
botonCalcularTodosR.addEventListener("click", calcularTodosR);
contenedorRemodelaciones.append(botonCalcularTodosR);

function calcularTodosR() {
  remodelaciones.forEach((item) => {
    const metrosRInput = document.getElementById(`metrosR${item.id_remodelacion}`);
    const metrosR = parseFloat(metrosRInput.value);

    if (!isNaN(metrosR)){
      item.metros_remodelacion = metrosR;
      item.total_remodelacion = metrosR * item.precio_remodelacion;
    } else {
      erroresR++;
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Los valores ingresados no son metros!",
        footer: '<a href="#">Corrija los valores ingresadosr</a>'
      });
      return; 
    }

  });

  if (erroresR === 0){


  const totalGeneralR = remodelaciones.reduce((acum, remodelacion) => acum + remodelacion.total_remodelacion, 0 );
  
  renderizarR(remodelaciones, totalGeneralR);
  localStorage.setItem('remodelaciones', JSON.stringify(remodelaciones));
}

erroresR = 0;
}

function renderizarR(remodelaciones, totalGeneralR) {
  contenedorRemodelaciones.innerHTML = "<h1>Remodelaciones</h1>";

  remodelaciones.forEach((item) => {
    if (item.total_remodelacion !== 0) {
      let div = document.createElement("div");
      div.innerHTML = `
        <h2>${item.ambiente_remodelacion}</h2>
        <p>Precio por m2: ${item.precio_remodelacion}</p>
        <p>Total: ${item.total_remodelacion}</p>
      `;
      
      contenedorRemodelaciones.append(div);
    }
  });

  let divTotalR = document.createElement("div");
  divTotalR.innerHTML = `<h2>Total General: ${totalGeneralR}</h2>`;
  contenedorRemodelaciones.append(divTotalR);
} 
