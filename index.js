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

    formRegistro.reset();
        }

function eliminarFila(evento1){
    //declaracion de variables
    console.log(usuarios);

    let btnEliminar = evento1;
    let filaAEliminar = btnEliminar.closest('.fila-contenedora');
    let tdId = filaAEliminar.querySelector('.td-id');
    //eliminar los datos del array de objetos
    usuarios = usuarios.filter((usuario)=> usuario.idU != tdId.textContent.trim());
    //eliminar fila de la tabla
    filaAEliminar.remove();
    
}

let datosAntesEditar = []
function editarFila(btnEditar){
    //resetea el array a cada entrada
    datosAntesEditar = [];
    let filaAEditar = btnEditar.closest('.fila-contenedora');
    [...filaAEditar.children].forEach((columna)=>{ 
        datosAntesEditar.push(columna.textContent);
        if(columna.id != 'td-botones'){
            //agregar el nodo input dentro del td
            columna.innerHTML = `<input type="text" value="${columna.textContent}">`;
        }
        else{
            let divBotones = columna.firstElementChild;
            divBotones.innerHTML =  ` 
            <button type="button" btn onclick=guardarCambios(this) class="btn-info">guardar</button>
            `
            }
        }
    )
}
//declaracion del array para que tenga un enfoque global solo con los datos del momento
let datosDespuesEditar = []
function guardarCambios(btnGuardar){
    //resetea el array a cada entrada
    datosDespuesEditar = []
    let filaAGuardar = btnGuardar.closest('.fila-contenedora');

    //obtenemos los hijos de la fila  
    [...filaAGuardar.children].forEach((columna)=>{ 
        datosDespuesEditar.push(columna.firstElementChild.value)
        // le pasamos el contenido del input con texcontent que elimina automaticamente el input
        if(columna.id != 'td-botones'){
            columna.textContent =  columna.firstElementChild.value;
        }
        else{
            let divBotones = columna.firstElementChild;
            divBotones.innerHTML = `
            <button type="button" onclick="eliminarFila(this)" class="btn btn-danger">Borrar</button>
            <button type="button" onclick="editarFila(this)" class="btn btn-success">Editar</button>
            `
            }
        }
    )

    let usuarioEditado ={
      idU : datosDespuesEditar[0],
      nombre : datosDespuesEditar[1],
      email : datosDespuesEditar[2],
      numeroUsuario : datosDespuesEditar[3],
      paisUsuario : datosDespuesEditar[4]
      }
      
      usuarios.forEach((usuario,index) => datosAntesEditar[0] ==  usuario.idU ? usuarios[index] = usuarioEditado :"");

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

let rutas  = [
     {
    imagenRuta : 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Panor%C3%A1mica_de_San_Andres.JPG/1200px-Panor%C3%A1mica_de_San_Andres.JPG',
    idR : '1',
    nombreRuta : 'San Andres Islas',
    valor : "1'200.000",
    origen : 'Bogotá D.C',
    destino : 'San Andres',
    fidelizacion : '100',
}

]
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
    console.log(ruta)

    let contenedorCards = document.getElementById('contenedor-cards');
    contenedorCards.innerHTML+=
    `
    <div class="col  contenedor-card">
        <div class="card h-100 ">
          <img src="${ruta.imagenRuta}" class="card-img-top " height="250px" alt="imagen del destino"/>
          <div class="card-body bg-gray border-3 p-2">
            <h5 class="card-title text-center ">${ruta.nombreRuta}</h5>
            
            <table class="table">
              <tbody class="text-center ">
                <tr class=" gradiente-blanco">
                  <th scope="row" class="rounded-start gradiente-rojo"><i class=" fa-sharp fa-solid fa-hashtag fa-beat"></i></th>
                  <td colspan="1" class="table-active rounded-end text-white" id="contenedor-id">${ruta.idR}</td>
                </tr>
                <tr class=" gradiente-blanco">
                  <th scope="row" class="rounded-start gradiente-rojo"><i class=" fa-duotone fa-dollar-sign fa-beat" style="--fa-primary-color: #000000; --fa-primary-opacity: 1; --fa-secondary-color: #000000; --fa-secondary-opacity: 0.4;"></i> 
                  </th>
                  <td colspan="1" class="table-active rounded-end text-white">${ruta.valor}</td>
                </tr>
                <tr class=" gradiente-blanco">
                  <th scope="row" class="rounded-start gradiente-rojo"><i class=" fa-solid fa-map-location-dot fa-beat" style="color: #000;"></i></th>
                  <td colspan="1" class="table-active rounded-end text-white">${ruta.origen}</td>
                </tr>
                <tr class=" gradiente-blanco">
                  <th scope="row" class="rounded-start gradiente-rojo"><i class=" fa-solid fa-location-dot fa-beat" style="color: #000;"></i></th>
                  <td colspan="1" class="table-active rounded-end text-white">${ruta.destino}</td>
                 </tr>
                <tr class=" gradiente-blanco">
                  <th scope="row" class="rounded-start gradiente-rojo"><i class=" fa-solid fa-crown fa-beat" style="color: #000000;"></i></th>
                  <td colspan="1" class="table-active rounded-end text-white">${ruta.fidelizacion}</td>
                </tr>
              </tbody>
            </table>
            <button class="btn btn-primary d-block" onclick="eliminarCard(this)" type="button">Eliminar</button>
          </div>  
        </div>
    </div>

    `
    formRutas.reset();
}

function eliminarCard(btnCardEliminar){
    //se supone que id es unico para cada card, el nombre puede que no 
    idCard = btnCardEliminar.closest('.card-body').querySelector('#contenedor-id').textContent;
    // borrar del array de objetos
    rutas = rutas.filter((ruta) => ruta.idR != idCard.trim());
    // borrar card
    btnCardEliminar.closest('.contenedor-card').remove();
    console.log(rutas)
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

    calcularValorRuta()
}
  



