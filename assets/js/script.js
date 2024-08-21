let fotos = ['dakar1.png', 'dakar2.png', 'dakar3.png', 'dakar4.png', 'dakar5.png', 'dakar6.png', 'dakar7.png', 'dakar8.png', 'dakar9.png'];
let largo = fotos.length;

let bandera = 0;
let final = largo - 1;
let toggle = false;
let toggleRetroceso = false;


let arrayFotografosAyudantes = [
    {'id': 1, 'ayudantes':[]},
    {'id': 2, 'ayudantes':[]},
];

let nameFotografo = 'fotografo_';
let nameAyudante = 'ayudante_';
let nameAyudantes = 'ayudantes_';
let minFotografos = 2
let maxFotografos = 10

loadFotografos();

function validateInput(input)
{
    const value = input.value;
    if (value !== '' && (value < 0 || value > 2)) {
        input.value = '0';
    }
}

function generateHtmlFotografo(fotografoId, codigo)
{
    let fotografo = '';
    fotografo += '<div class="fotografo-ayudante" id="fotografo_ayudante_'+fotografoId+'">'
    fotografo += '<div class="row fotografo" id="fotografo_'+fotografoId+'">'
    fotografo += '<div class="column input-group"><div class="input-icon"><i class="fa fa-user"></i></div>'
    fotografo += '<input class="input-form" id="name_fotografo_'+fotografoId+'" type="text" placeholder="Nombre Fotografo '+fotografoId+'" />'
    fotografo += '</div>'
    fotografo += '<div class="column input-group"><div class="input-icon"><i class="fa fa-user"></i></div>'
    fotografo += '<input class="input-form" id="last_name_fotografo_'+fotografoId+'" type="text" placeholder="Apellidos Fotografo '+fotografoId+'" />'
    fotografo += '</div>'
    fotografo += '<div class="column input-group"><div class="input-icon" title="Código del Fotografo">CF:</div>'
    fotografo += '<input class="input-form code" style="width:60px" id="code_fotografo_'+fotografoId+'"  value="'+codigo+'" disabled/>'
    fotografo += '</div>'
    fotografo += '<div class="column input-group"><i class="fa fa-sort"></i>'
    fotografo += '<input class="input-form" id="cant_ayudante_'+fotografoId+'" type="number" oninput="validateInput(this)"  onchange="imprimirAyudantes(this.value, '+fotografoId+')" placeholder="Cantidad de ayudantes" />'
    fotografo += '</div>'
    fotografo += '</div>'
    fotografo += '<div class="ayudantes_'+fotografoId+'" id="ayudantes_'+fotografoId+'"></div>'
    fotografo += '</div>'
    return fotografo;
}

function generateHtmlAyudantes(fotografoId, ayudanteId, codigo, nameAyudante, lastNameAyudante)
{
    let ayudantesHtml = '';
    ayudantesHtml += '<div class="row">'
    ayudantesHtml += '<div class="column ayudante input-group"><i class="fa fa-user"></i>'
    ayudantesHtml += '<input class="input-form" id="name_ayudante_'+fotografoId+'_'+ayudanteId+'" value="'+nameAyudante+'" type="text" placeholder="Nombre Ayudante" />'
    ayudantesHtml += '</div>'
    ayudantesHtml += '<div class="column ayudante input-group"><i class="fa fa-user"></i>'
    ayudantesHtml += '<input class="input-form" id="last_name_ayudante_'+fotografoId+'_'+ayudanteId+'" value="'+lastNameAyudante+'" type="text" placeholder="Apellidos Ayudante" />'
    ayudantesHtml += '</div>'
    ayudantesHtml += '<div class="column code-title input-group"><div class="input-icon" title="Código del Fotografo">CF:</div>'
    ayudantesHtml += '<input class="input-form code" id="code_ayudante_'+fotografoId+'_'+ayudanteId+'" style="width: 100px;" type="text" value="'+codigo+'" disabled/>'
    ayudantesHtml += '</div>'
    ayudantesHtml += '</div>'
    ayudantesHtml += '</div>'
    return ayudantesHtml;
}

function generateHtmlButtonAddDelete()
{
    let totalFotografos = arrayFotografosAyudantes.length
    let contenedor = document.getElementById('botton');
    contenedor.innerHTML = '';
    let buttonAdd = ' <div class="column"><button type="button" class="btn-event add" onclick="addFotografo()"><i class="fa fa-plus" aria-hidden="true"></i></button></div>';
    let buttonDelete = '<div class="column"><button type="button" class="btn-event delete" onclick="deleteFotografo()"><i class="fa fa-minus" aria-hidden="true"></i></button></div>'
    let botones = '';
    if(totalFotografos === minFotografos){
        botones = buttonAdd
    }

    if(totalFotografos > minFotografos && totalFotografos < maxFotografos){
        botones = buttonAdd+buttonDelete
    }

    if(totalFotografos > minFotografos && totalFotografos >= maxFotografos){
        botones = buttonDelete
    }

    contenedor.innerHTML = botones;
}

function generateHtmlAcreditacion()
{
    let contenedor = document.getElementById('print-acreditacion');
    contenedor.innerHTML = '<button type="button" class="btn-acreditacion" onclick="imprimirAcreditaciones()"><i class="fa fa-print" aria-hidden="true"></i> Imprimir Acreditaciones</button>';
}

function generateHtmlShowFotografos()
{
    let contenedor = document.getElementById('btn-show-fotografo');
    contenedor.innerHTML = '<button type="button" class="btn-acreditacion" onclick="showFormFotografo()">Mostrar Formulario</button>';
}

function loadFotografos()
{

    let contenedorCredenciales = document.getElementById('div-credenciales');
    //contenedorCredenciales.style.display = 'none'
    let totalFotografos = arrayFotografosAyudantes.length
    let contenedor = document.getElementById('fotografos');
    contenedor.innerHTML = '';
    let fotografo = ''
    for (let i = 0; i < totalFotografos; i++) {
        let fotografoId = arrayFotografosAyudantes[i].id;
        let codigo = 'F'+i+i+i+fotografoId
        fotografo += generateHtmlFotografo(fotografoId, codigo)
    }
    contenedor.innerHTML = fotografo
    generateHtmlButtonAddDelete(arrayFotografosAyudantes)
    generateHtmlAcreditacion()
    calcularCoches(0,0)
}

function addFotografo()
{
    let contenedor = document.getElementById('fotografos');
    let ultimoElemento = arrayFotografosAyudantes[arrayFotografosAyudantes.length - 1];
    let id = ultimoElemento.id;
    let fotografoId = id + 1;
    let codigo = 'F'+id+id+id+fotografoId;
    let fotografoHtml = generateHtmlFotografo(fotografoId, codigo);
    contenedor.insertAdjacentHTML('beforeend', fotografoHtml);
    let fotografo = {id: fotografoId, ayudantes: []}
    arrayFotografosAyudantes.push(fotografo);
    generateHtmlButtonAddDelete();
}

function deleteFotografo()
{
    let fotografo = arrayFotografosAyudantes.pop();
    let fotografoId = fotografo.id;
    document.getElementById('fotografo_ayudante_'+fotografoId).remove();
    generateHtmlButtonAddDelete();
}

function imprimirAyudantes(valor, fotografoId)
{

    let ayudantes = [];
    let classAyudante = document.getElementById('ayudantes_'+fotografoId);

    let id = fotografoId - 1
    let codigo = 'F'+id +id+id+fotografoId+'.aux'
    let ayudantesHtml = ''

    for (let i = 0; i < valor ; i++) {

        let ayudanteId = i + 1;
        let nameAyudanteElement = document.getElementById('name_ayudante_'+fotografoId+'_'+ayudanteId)
        let nameAyudante = (nameAyudanteElement && nameAyudanteElement.value.length > 0) ? nameAyudanteElement.value: ''

        let lastNameAyudanteElement = document.getElementById('last_name_ayudante_'+fotografoId+'_'+ayudanteId)
        let lastNameAyudante = (lastNameAyudanteElement && lastNameAyudanteElement.value.length > 0) ? lastNameAyudanteElement.value: ''

        ayudantesHtml += generateHtmlAyudantes(fotografoId, ayudanteId, codigo, nameAyudante, lastNameAyudante)

        ayudantes.push({
            id:ayudanteId,
            fotografoId: fotografoId,
            name:nameAyudante,
            last_name: lastNameAyudante
        });
    }
    ayudantesHtml += '</div>'
    classAyudante.innerHTML = ''
    classAyudante.innerHTML = ayudantesHtml
    for (let i = 0; i < arrayFotografosAyudantes.length; i++) {
        let fId = arrayFotografosAyudantes[i].id
        if(fId === fotografoId){
            arrayFotografosAyudantes[i].ayudantes = ayudantes;
        }
    }
}

function calcularCoches(totalFotografos, totalAyudantes) {

    let totalPerson = totalFotografos + totalAyudantes;
    let cantCoches = Math.ceil(totalPerson / 4);

    setCountFotografos(totalFotografos)
    setCountAyudantes(totalAyudantes)
    setCountCoches(cantCoches)
}


function setCountFotografos(number)
{
    let element = document.getElementById('count-fotografos');
    let textCount = (number === 0) ? '0' : (number < 10 ? '0' + number : number);
    element.setAttribute('data-number', textCount);
    element.style.setProperty('--slist', '#ebac79,#d65b56');
    element.textContent = 'Fotografos';
    element.style.content = `"${textCount}"`;
}

function setCountAyudantes(number)
{
    let element = document.getElementById('count-ayudantes');
    let textCount = (number === 0) ? '0' : (number < 10 ? '0' + number : number);;
    element.setAttribute('data-number', textCount);
    element.style.setProperty('--slist', '#90cbb7,#2fb1a9');
    element.textContent = 'Ayudantes';
    element.style.content = `"${textCount}"`;
}

function setCountCoches(number)
{
    let element = document.getElementById('coches');
    let textCount = (number === 0) ? '0' : (number < 10 ? '0' + number : number);;
    element.setAttribute('data-number', textCount);
    element.style.setProperty('--slist', '#a6c869,#37a65a');
    element.textContent = 'Coches';
    element.style.content = `"${textCount}"`;
}


function imprimirAcreditaciones()
{
    let credenciales = ''
    let totalFotografos = arrayFotografosAyudantes.length
    let totalAyudantes = 0
    for (let i = 0; i < totalFotografos; i++) {
        let fotografoId = arrayFotografosAyudantes[i].id

        let idNombreFotografo = document.getElementById('name_fotografo_' + fotografoId);
        let idApellidoFotografo = document.getElementById('last_name_fotografo_' + fotografoId);

        let nombreFotografo = idNombreFotografo.value;
        let apellidoFotografo = idApellidoFotografo.value;
        let codigoFotografo = document.getElementById('code_fotografo_' + fotografoId).value;

        if(nombreFotografo.length === 0){
            alert('El nombre del  fotografo:'+ fotografoId+ ' es requerido')
            idNombreFotografo.focus()
            return;
        }

        if(apellidoFotografo.length === 0){
            alert('El apellido del  fotografo:'+ fotografoId+ ' es requerido')
            idApellidoFotografo.focus()
            return;
        }
        if(nombreFotografo.length > 0 && apellidoFotografo.length > 0 && codigoFotografo.length > 0){
            credenciales += '<div class="column article" id="facreditacion_"'+fotografoId+'>'
            credenciales += '<div class="card">'
            credenciales += '<div class="banner" ></div>'
            credenciales += '<div class="image-foto"><img src="assets/images/fotografo2.png" class="icon-image-fotografo"></div>'
            credenciales += '<div class="menu"></div>'
            credenciales += '<div class="title">Fotografo '+fotografoId+'</div>'
            credenciales += '<h2 class="name">'+nombreFotografo+' '+apellidoFotografo+'</h2>'
            credenciales += '<div class="actions">'
            credenciales += '<div class="follow-info" style="margin-left: 30%">'
            credenciales += '<h2><a href="#"><small style="margin-bottom: 10%">Código</small><span>'+codigoFotografo+'</span></a></h2>'
            credenciales += '</div>'

            let ayudantes = arrayFotografosAyudantes[i].ayudantes
            let countAyudantes = ayudantes.length
            if(countAyudantes > 0) {
                credenciales += '<div class="follow-ayu"><h2>Ayudantes</h2></div>'
            }
            credenciales += '</div>'

            if(countAyudantes > 0){
                for (let r = 0; r < countAyudantes; r++) {
                    let ayudanteId = ayudantes[r].id
                    let idNombreAyudante = document.getElementById('name_ayudante_' + fotografoId +'_'+ ayudanteId);
                    let idApellidosAyudante = document.getElementById('last_name_ayudante_' + fotografoId +'_'+ ayudanteId);

                    let nombreAyudante =idNombreAyudante.value;
                    let apellidosAyudante = idApellidosAyudante.value;
                    let codigoAyudante = document.getElementById('code_ayudante_' + fotografoId +'_'+ ayudanteId).value;

                    if(nombreAyudante.length === 0){
                        alert('El nombre del  ayudante:'+ ayudanteId+ ' es requerido')
                        idNombreAyudante.focus()
                        return;
                    }

                    if(apellidosAyudante.length === 0){
                        alert('El apellido del  ayudante:'+ ayudanteId+ ' es requerido')
                        idApellidosAyudante.focus()
                        return;
                    }

                    let nombreCompleto = nombreAyudante+' '+apellidosAyudante+' '+codigoAyudante
                    credenciales += '<div class="desc">'
                    credenciales += '<div class="name">'
                    credenciales += '<img src="assets/images/icon1.png" style="width: 25px; height: 25px;"/>'
                    credenciales += '<span class="name-ayu">'+nombreCompleto+'</span>'
                    credenciales += '</div>'
                    credenciales += '</div>'
                    totalAyudantes++;
                }
            }
            credenciales += '</div>'
            credenciales += '</div>'
        }
    }
    let contenedorFogografo = document.getElementById('div-fotografo');

    contenedorFogografo.style.display = 'none';
    let contenedorCredenciales = document.getElementById('div-credenciales');
    contenedorCredenciales.innerHTML = credenciales
    generateHtmlShowFotografos();
    calcularCoches(totalFotografos, totalAyudantes)
}


function retroceso_todo() {
let a = document.getElementById('imagen');
if (toggleRetroceso) {
a.src = 'assets/images/' + fotos[0];
bandera = 0;
} else {
a.src = 'assets/images/' + fotos[final];
bandera = final;
}
toggleRetroceso = !toggleRetroceso;
}

function avance_todo() {
let a = document.getElementById('imagen');
let b = largo - 1;
a.src = 'assets/images/' + fotos[b];
bandera = b;

}

function imprimirFoto() {
let K = document.getElementById('imagen');
K.src = 'assets/images/' + fotos[bandera];
}

function cargaImagen(x) {
if (x == '+') {
bandera = (bandera + 1) % fotos.length;
} else if (x === '-') {
bandera = (bandera - 1 + fotos.length) % fotos.length;
}
imprimirFoto();
}

function avance_todo() {
let a = document.getElementById('imagen');
if (toggle) {
a.src = 'assets/images/' + fotos[0];
bandera = 0;
} else {
a.src = 'assets/images/' + fotos[final];
bandera = final;
}
toggle = !toggle; // Alterna el valor de toggle
}

function showFormFotografo()
{
let contenedorFogografo = document.getElementById('div-fotografo');
contenedorFogografo.style.display= 'block';

let contenedorCredenciales = document.getElementById('div-credenciales');

contenedorCredenciales.innerHTML = ''

let contenedorShowFotografo = document.getElementById('btn-show-fotografo');

contenedorShowFotografo.innerHTML = ''

}




