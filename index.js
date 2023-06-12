let idUsuario = document.getElementById('ipt-id');
let nombreUsuario = document.getElementById('ipt-nombre');
let emailUsuario = document.getElementById('ipt-email');
let numeroUsuario = document.getElementById('ipt-numero');
let paisUsuario = document.getElementById('ipt-nacionalidad');
let trContenedor = document.getElementById('table-body');

//evitar el envio del formulario
let formRegistro = document.getElementById('form-registro'); 
formRegistro.addEventListener('click', function (e) {
    e.preventDefault();
})
let formSearch = document.getElementById('form-search'); 
formSearch.addEventListener('click', function (e) {
    e.preventDefault();
})
let formRutas = document.getElementById('form-rutas'); 
formRutas.addEventListener('click', function (e) {
    e.preventDefault();
})
let formTicket = document.getElementById('form-ticket'); 
formTicket.addEventListener('click', function (e) {
    e.preventDefault();
})


//declaracion del contador para el id de la tabla
let contador = 1;
let usuarios =[]

//creacion de objeto usuario
function agregarUsuario() {
    let usuario = {
        idU : idUsuario.value,
        nombre : nombreUsuario.value,
        email : emailUsuario.value,
        numeroUsuario : numeroUsuario.value,
        paisUsuario : paisUsuario.value,
    }
    // añade el objeto a un arreglo de objetos
    usuarios.push(usuario);

    trContenedor.innerHTML+= 
    `
    <tr class="fila-contenedora text-center">
        <th scope="row" class="td-id">${usuario.idU}</th>
        <td>${usuario.nombre}</td>
        <td>${usuario.email}</td>
        <td>${usuario.numeroUsuario}</td>
        <td>${usuario.paisUsuario}</td>
        <td id="td-botones" class="text-center">
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" onclick="eliminarFila(this)" class="btn btn-danger">Borrar</button>
                <button type="button" onclick="editarFila(this)" class="btn btn-success">Editar</button>
            </div>
        </td>
    </tr>
    `
        }

function eliminarFila(evento1){
    //declaracion de variables
    console.log(usuarios);

    let btnEliminar = evento1;
    let filaAEliminar = btnEliminar.closest('.fila-contenedora');
    let tdId = filaAEliminar.querySelector('.td-id');
    //eliminar los datos del array de objetos
    usuarios.forEach((e,index)=> e.idU == tdId.textContent.trim() ? usuarios.splice(index,1) : "");
    console.log(usuarios);
    //eliminar fila de la tabla
    filaAEliminar.remove();
    
}


function editarFila(evento2){
    let btnEditar = evento2;
    let filaAEditar = btnEditar.closest('.fila-contenedora');
    [...filaAEditar.children].forEach((e)=>{ 
        console.log(e)
        let tdInput = document.createElement('input');
        tdInput.value = e.textContent;
        tdInput.type ='text'
        
        console.log(e.id)
        if(e.id != 'td-botones'){
            console.log(tdInput);
            //vaciar el contenido del td
            e.innerHTML = "";
            //agregar el nodo input dentro del td
            e.appendChild(tdInput);
        }
        else{
            let divBotones = e.firstElementChild;
            divBotones.innerHTML =  ` 
            <button type="button" btn onclick=guardarCambios(this) class="btn-info">guardar</button>
            `
            }
        }
    )
}

function guardarCambios(evento3){
    let btnGuardar = evento3;
    let filaAGuardar = btnGuardar.closest('.fila-contenedora');

    //obtenemos los hijos de la fila  
    [...filaAGuardar.children].forEach((input,indexInput)=>{ 
        let primerElemento = input.firstElementChild
        let valorElemento = input.firstElementChild.value
       

       // le pasamos el contenido del input con texcontent que elimina automaticamente el input
        if(input.id != 'td-botones'){
            input.textContent =  valorElemento;
        }
        else{
            let divBotones = primerElemento;
            divBotones.innerHTML = `
            <button type="button" onclick="eliminarFila(this)" class="btn btn-danger">Borrar</button>
            <button type="button" onclick="editarFila(this)" class="btn btn-success">Editar</button>
            `
            }
        }
    )
}

function buscar() {
    const buscado = document.getElementById('searchInput').value.toLowerCase();
    const rows = trContenedor.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        const columns = rows[i].getElementsByTagName('td');
        let found = false;
        for (let j = 0; j < columns.length; j++) {
            const columnValue = columns[j].textContent.toLowerCase();
            if (columnValue.includes(buscado)) {
                found = true;
                break;
            }
        }
        if (found) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}

const formRegistroBtn = document.getElementById('form-registro-btn');
formRegistroBtn.addEventListener('click', agregarUsuario);

const formSearchBtn = document.getElementById('form-search-btn');
formSearchBtn.addEventListener('click', buscar);


// codigo seccion gestion de rutas--------------------------------------------------------

let rutas  = []
const urlImagenRuta= document.getElementById('url-rutas')
const idRutas = document.getElementById('ipt-id-ruta');
const nombreRutas = document.getElementById('ipt-nombre-ruta');
const valorRutas = document.getElementById('ipt-valor-ruta');
const origenRutas = document.getElementById('ipt-origen-ruta');
const destinoRutas = document.getElementById('ipt-destino-ruta');
const fidelizacionRutas = document.getElementById('ipt-fidelizacion-ruta');

function agregarRuta() {
    let ruta = {
        imagenRuta : urlImagenRuta.value,
        idR : idRutas.value,
        nombreRuta : nombreRutas.value,
        valor : valorRutas.value,
        origen : origenRutas.value,
        destino : destinoRutas.value,
        fidelizacion : fidelizacionRutas.value
    }
    // añade el objeto a un arreglo de objetos
    rutas.push(ruta);

    let contenedorCards = document.getElementById('contenedor-cards');
    contenedorCards.innerHTML+=
    
    `
    <div class="col  contenedor-card">
        <div class="card h-100">
          <img src="${ruta.imagenRuta}" class="card-img-top" alt="imagen del destino"/>
          <div class="card-body">
            <h5 class="card-title text-center">${ruta.nombreRuta}</h5>
            
            <div class="input-group flex-nowrap" id="contenedor-id">
              <span class="input-group-text" id="addon-wrapping">ID</span>
              <input  type="text" class="form-control text-center bg-transparent eliminar"  placeholder="${ruta.idR}" aria-label="Username" aria-describedby="addon-wrapping" disabled>
            </div>

            <div class="input-group flex-nowrap ">
              <span class="input-group-text" id="addon-wrapping">ruta</span>
              <input type="text" class="form-control text-center" placeholder="${ruta.valor}" aria-label="Username" aria-describedby="addon-wrapping" disabled>
            </div>

            <div class="input-group flex-nowrap ">
              <span class="input-group-text" id="addon-wrapping">origen</span>
              <input type="text" class="form-control text-center" placeholder="${ruta.origen}" aria-label="Username" aria-describedby="addon-wrapping" disabled>
            </div>

            <div class="input-group flex-nowrap ">
              <span class="input-group-text" id="addon-wrapping">destino</span>
              <input type="text" class="form-control text-center" placeholder="${ruta.destino} " aria-label="Username" aria-describedby="addon-wrapping" disabled>
            </div>

            <div class="input-group flex-nowrap ">
              <span class="input-group-text" id="addon-wrapping">fidelizacion</span>
              <input type="text" class="form-control text-center" placeholder="${ruta.fidelizacion}" aria-label="Username" aria-describedby="addon-wrapping" disabled>
            </div>
            <button class="btn btn-primary del-btn " onclick="eliminarCard(this)" type="button">delete</button>    

            </div>
       </div>
       </div>

    `
    formRutas.reset();
}

function eliminarCard(boton){
    btnCardEliminar = boton;
    //se supone que id es unico para cada card, el nombre puede que no 
    idCard = btnCardEliminar.closest('.card-body').querySelector('#contenedor-id').querySelector('.eliminar').placeholder;
    // borrar del array de objetos
    rutas.forEach((e,index) => idCard.trim() == e.idR ? rutas.splice(index,1) : "");
    // borrar card
    btnCardEliminar.closest('.contenedor-card').remove();
    



}

const formRutasBtn = document.getElementById('form-rutas-btn').addEventListener('click', agregarRuta);

//seccion compras
const formBtnTicket = document.getElementById('form-ticket-btn').addEventListener('click', añadirTIcket); 

const selectNomCompras = document.getElementById('select-nombre-compras');
const selectRutaCompras = document.getElementById('select-ruta-compras');

function siguientePaso() {

}


function añadirOpciones() {
    let btnTabCompra = document.getElementById('compras-tab');
    let btnTabResumen = document.getElementById('resumen-tab');

    if(btnTabCompra.hasAttribute('disabled')){
        btnTabCompra.removeAttribute('disabled');
        btnTabResumen.setAttribute('disabled', '');
    }
    selectNomCompras.innerHTML = "";
    selectRutaCompras.innerHTML = "";
    usuarios.forEach(usuario => {
        let option = document.createElement('option'); 
        option.value = usuario.nombre
        option.textContent = usuario.nombre
        selectNomCompras.appendChild(option);
            }
        )
    rutas.forEach((ruta) => {
        let option = document.createElement('option'); 
        option.value = ruta.nombreRuta;
        option.textContent = ruta.nombreRuta;
        selectRutaCompras.appendChild(option); 
        }
    )   
}


function calcularValorRuta(){
    let valorNeto = 0 ;
    let fidelizacion = 0;
    const factura = document.getElementById('factura');
    rutas.forEach((e) => {
       if( selectRutaCompras.value == e.nombreRuta){
            valorNeto = (Number(e.valor) * 1.04 )* 1.16; 
            factura.innerHTML = `
            <p>nombre: ${e.nombreRuta} </p>
            <p>id: ${e.idR} </p>
            <p>valor ticket ${e.valor} </p>
            <p>con impuestos: ${valorNeto} </p>
            <p>de: ${e.origen} </p>
            <p>para: ${e.destino} </p>
            <p>fidelizacion: ${e.fidelizacion} </p>

            `;
        

        }
    }) 
    alert(valorNeto)
}


function añadirTIcket(){
    let datosUsuario = usuarios.filter((e) => e.nombre == selectNomCompras.value);
    let datosRuta = rutas.filter((e) => e.nombreRuta == selectRutaCompras.value);
    let contenedorTicket = document.getElementById('contenedor-ticket');
    contenedorTicket.innerHTML =`
    <div class="col-md-12">
                          <h3 class="text-center bg-dark text-white" >ticket</h3>
                        </div>
                        <div class="col-md-2">
                          <label for="ipt-idU-ticket" class="form-label">cc</label>
                          <input type="text" class="form-control" id="ipt-idU-ticket" value="${datosUsuario[0]['idU']}" disabled>
                        </div>
                        <div class="col-md-2">
                          <label for="ipt-nombreU-ticket" class="form-label">Nombre</label>
                          <input type="text" class="form-control" id="ipt-nombreU-ticket" value="${datosUsuario[0]['nombre']}" disabled>
                        </div>
                        <div class="col-md-2">
                          <label for="ipt-emailU-ticket" class="form-label">Email</label>
                          <div class="input-group">
                            <span class="input-group-text" id="inputGroupPrepend2">@</span>
                            <input type="text" class="form-control" id="Email"  aria-describedby="inputGroupPrepend2" value="${datosUsuario[0]['email']} "disabled>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <label for="ipt-numeroU-ticket" class="form-label">numero</label>
                          <input type="text" class="form-control" id="ipt-numero-ticket" value="${datosUsuario[0]['numeroUsuario']} " disabled>
                        </div>

                        <div class="col-md-2">
                          <label for="ipt-pais-ticket" class="form-label">pais</label>
                          <input type="text" class="form-control" id="ipt-pais-ticket" value="${datosUsuario[0]['paisUsuario']}" disabled>
                        </div>
                        <!-- informacion rutas -->
                        <div class="col-md-12">
                          <h5 class="bg-gray text-dark text-center"> informacion de la ruta</h5>
                        </div>
                        <div class="col-md-4">
                          <label for="ipt-idU-ticket" class="form-label"> id</label>
                           <input type="text" class="form-control bg-white" value="${datosRuta[0]['idR']}" id="ipt-idU-ticket" value="Mark" disabled>
                        </div>
                        <div class="col-md-4">
                          <label for="ipt-nombreU-ticket" class="form-label">Nombre de ruta</label>
                          <input type="text" class="form-control" id="ipt-nombreU-ticket" value="${datosRuta[0]['nombreRuta']}" disabled>
                        </div>
                        <div class="col-md-4">
                          <label for="ipt-emailU-ticket" class="form-label">valor con impuestos</label>
                          <div class="input-group">
                            <input type="text" class="form-control" id="Email"  aria-describedby="inputGroupPrepend2" value="${datosRuta[0]['valor']}" disabled>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <label for="ipt-numeroU-ticket" class="form-label">ciudad de origen</label>
                          <input type="text" class="form-control" id="ipt-numero-ticket" valor="${datosRuta[0]['origen']}" disabled>
                        </div>

                        <div class="col-md-4">
                          <label for="ipt-pais-ticket" class="form-label">cuidad destino</label>
                          <input type="text" class="form-control" id="ipt-pais-ticket" value="${datosRuta[0]['destino']}" disabled>
                        </div>
                        <div class="col-md-4">
                          <label for="ipt-pais-ticket" class="form-label">fidelizacion</label>
                          <input type="text" class="form-control" id="ipt-pais-ticket" value="${datosRuta[0]['fidelizacion']}" disabled>
                        </div>

                        <div class="col-md-12">
                            <button type="button" class="btn btn-success w-100" onclick="mostrarTab('resumen')">Comprar</button>
                            </div>
    `
}

function mostrarTab(tabId) {
    let tab = document.getElementById(tabId);
    let tabLink = document.getElementById(tabId + '-tab');
    let btnTabCompra = document.getElementById('compras-tab');
    let btnTabResumen = document.getElementById('resumen-tab');
    
    if(btnTabResumen.hasAttribute('disabled')){
        btnTabResumen.removeAttribute('disabled');
        btnTabCompra.setAttribute('disabled', '');
    }

    if (tab && tabLink) {
      let tabs = new bootstrap.Tab(tabLink);
      tabs.show();
    }
 

}
  



