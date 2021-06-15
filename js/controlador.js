//Codigo para generar información de categorias y almacenarlas en un arreglo.
var categorias = [];
(()=>{
  //Este arreglo es para generar textos de prueba
  let textosDePrueba=[
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, modi!",
      "Quos numquam neque animi ex facilis nesciunt enim id molestiae.",
      "Quaerat quod qui molestiae sequi, sint aliquam omnis quos voluptas?",
      "Non impedit illum eligendi voluptas. Delectus nisi neque aspernatur asperiores.",
      "Ducimus, repellendus voluptate quo veritatis tempora recusandae dolorem optio illum."
  ]
  
  //Genera dinamicamente los JSON de prueba para esta evaluacion,
  //Primer ciclo para las categorias y segundo ciclo para las apps de cada categoria

  
  let contador = 1;
  for (let i=0;i<5;i++){//Generar 5 categorias
      let categoria = {
          nombreCategoria:"Categoria "+i,
          descripcion:textosDePrueba[Math.floor(Math.random() * (5 - 1))],
          aplicaciones:[]
      };
      for (let j=0;j<10;j++){//Generar 10 apps por categoria
          let aplicacion = {
              codigo:contador,
              nombre:"App "+contador,
              descripcion:textosDePrueba[Math.floor(Math.random() * (5 - 1))],
              icono:`img/app-icons/${contador}.webp`,
              instalada:contador%3==0?true:false,
              app:"app/demo.apk",
              calificacion:Math.floor(Math.random() * (5 - 1)) + 1,
              descargas:1000,
              desarrollador:`Desarrollador ${(i+1)*(j+1)}`,
              imagenes:["img/app-screenshots/1.webp","img/app-screenshots/2.webp","img/app-screenshots/3.webp"],
              comentarios:[
                  {comentario:textosDePrueba[Math.floor(Math.random() * (5 - 1))],calificacion:Math.floor(Math.random() * (5 - 1)) + 1,fecha:"12/12/2012",usuario:"Juan"},
                  {comentario:textosDePrueba[Math.floor(Math.random() * (5 - 1))],calificacion:Math.floor(Math.random() * (5 - 1)) + 1,fecha:"12/12/2012",usuario:"Pedro"},
                  {comentario:textosDePrueba[Math.floor(Math.random() * (5 - 1))],calificacion:Math.floor(Math.random() * (5 - 1)) + 1,fecha:"12/12/2012",usuario:"Maria"},
              ]
          };
          contador++;
          categoria.aplicaciones.push(aplicacion);
      }
      categorias.push(categoria);
  }
})();
  
  console.log(categorias);
  
  // Guardar todo en localStorage
  var localStorage = window.localStorage;
  localStorage.clear();
  localStorage.setItem('categorias', JSON.stringify(categorias));
// Convertir en tipo objeto la cadena 'categorias que esta almacenada en localStorage'
  var categorys = JSON.parse(localStorage.getItem('categorias'));
  console.log(categorys)

  
 

 //  Funcion para listar las categorias en la lista desplegable
 function listarCategorias(){
     for (let i = 0; i < categorys.length; i++) {
         document.getElementById('categoriaSeleccionada').innerHTML +=
         `<option value=${ i }>${categorys[i].nombreCategoria}</option>`
     }
 }
// 
listarCategorias();

// Funcion seleccionar categoria cuando se desplega la lista de categorias almacenar la categoria seleccionada
function seleccionarCategoria(){
    let categoriaSeleccionada = document.getElementById('categoriaSeleccionada').value;
   generarApps(categoriaSeleccionada) ;
}
// Generar las apps segun la categoria seleccionada
function generarApps(categoria){
    
    document.getElementById('apps').innerHTML = '';
    for (let i = 0; i < categorys[categoria].aplicaciones.length; i++) {
    let estrellas = '';
    for (let j = 0; j < categorys[categoria].aplicaciones[i].calificacion; j++) {
        estrellas += '<i class="fas fa-star"></i>';    
    }
    for (let j = 0; j < 5 - categorys[categoria].aplicaciones[i].calificacion; j++) {
        estrellas += '<i class="far fa-star"></i>';
        
    }
        document.getElementById('apps').innerHTML += 
        `
                <div class="col-lg-2 col-md-3 col-6">
                <div class="card shadow" >
                    <div class="card-body" onclick="detailApp(${categorys[categoria].aplicaciones[i].codigo})">
                        <img src="${categorys[categoria].aplicaciones[i].icono}" class="img-fluid">
                        <div class="text-center">${categorys[categoria].aplicaciones[i].nombre}</div>
                        <div class="text-center">${categorys[categoria].aplicaciones[i].desarrollador}</div>
                        <div class="estrellas">${estrellas}</div>
                    </div>
                </div>
                <div class="text-center">
                <button class="btn btn-danger" onclick="eliminarApp(${categorys[categoria].aplicaciones[i].codigo})"><i class="fas fa-trash fa-1x"></i> </button>
                </div>
                
            </div>
        `
        
    }
}
// Abrir la modal para el detalle de la app seleccionada
function detailApp(codigoApp){
    let cate = JSON.parse(localStorage.getItem('categorias'));
    let categoriaSele = document.getElementById('categoriaSeleccionada').value;
    let estrellas = '';
    $('#modal-detalle').modal('show');
    document.getElementById('comentarios').innerHTML = '';
        for (let i = 0; i < cate[categoriaSele].aplicaciones.length; i++) {
            if (codigoApp == cate[categoriaSele].aplicaciones[i].codigo){
                console.log('Aplicacion a Mostrar', cate[categoriaSele].aplicaciones[i].nombre);
                document.getElementById('nombre-app').innerHTML =  cate[categoriaSele].aplicaciones[i].nombre;
                document.getElementById('imagen-app').setAttribute('src', cate[categoriaSele].aplicaciones[i].icono);
                document.getElementById('desarrollador-app').innerHTML = cate[categoriaSele].aplicaciones[i].desarrollador;
                document.getElementById('descripcion-app').innerHTML = cate[categoriaSele].aplicaciones[i].descripcion;
                document.getElementById('estrellas-app').innerHTML = '';
                for (let j = 0; j < cate[categoriaSele].aplicaciones[i].calificacion; j++) {
                    estrellas += '<i class="fas fa-star"></i>';    
                }
                for (let j = 0; j < 5 - cate[categoriaSele].aplicaciones[i].calificacion; j++) {
                    estrellas += '<i class="far fa-star"></i>';
                    
                }
                
                document.getElementById('estrellas-app').innerHTML += estrellas ;
                if (cate[categoriaSele].aplicaciones[i].calificacion >= 3) {
                    document.querySelector('#estrellas-app').classList.remove('estrella-roja');
                    document.querySelector('#estrellas-app').classList.add('estrellaVerde');

                }
                else {
                    document.querySelector('#estrellas-app').classList.remove('estrella-verde');
                    document.querySelector('#estrellas-app').classList.add('estrella-roja');
                }
                for (let k = 0; k < cate[categoriaSele].aplicaciones[i].comentarios.length; k++) {
                    document.getElementById('comentarios').innerHTML +=
                `
                    <div class="col-2">
                            <img src="img/user.webp" class="rounded-circle">
                        </div>
                        <div class="col-10">
                            <b id="comentario-usuario">${cate[categoriaSele].aplicaciones[i].comentarios[k].usuario}</b>
                            <p id="comentario-texto" class="text-muted">${cate[categoriaSele].aplicaciones[i].comentarios[k].comentario}</p>
                        </div>
                
                `
                }
                
            }
            
        }
        
        
    
}
function eliminarApp(codigo){
    let indice = codigo-1;
    console.log('Se eliminara la app con codigo',codigo);
    let caSe = document.getElementById('categoriaSeleccionada').value;
    categorys[caSe].aplicaciones.splice(indice, 1);
    console.log(categorys);
    localStorage.setItem('categorias', JSON.stringify(categorys));
    console.log(categorys);
    
    
    
}

// Generar los iconos para nueva app

function listarIconos(){
    for (let i = 1; i <= 50; i++) {
        document.getElementById('icono').innerHTML +=
        `<option value="img/app-icons/${i}.webp">${i}.webp</option>`
    }
}
listarIconos();

// Function para Ver las imagenesde los iconos
function verImagen(){
    if (document.getElementById('icono').value != ''){
        document.getElementById('formImagenApp').setAttribute('src', document.getElementById('icono').value)
    }
    else{
        document.getElementById('formImagenApp').setAttribute('src', 'img/meme.jpg');

    }
}

// Function para guardar una nueva app
function guardarApp(){
    
    let categoSele = document.getElementById('categoriaSeleccionada').value;
    
    let txtNombre = document.getElementById('nombre').value;
    let txtDescripcion = document.getElementById('descripcion').value;
    let txtIcono = document.getElementById('icono').value
    let txtCalificacion = document.getElementById('calificacion').value;
    let txtDescargas = document.getElementById('descargas').value;
    let txtDesarrollador = document.getElementById('desarrollador').value;
    let app = {
        nombre: txtNombre,
        descripcion: txtDescripcion,
        icono: txtIcono,
        calificacion: txtCalificacion ,
        descargas: txtDescargas,
        desarrollador: txtDesarrollador 
    }
    console.log(app);
    categorys[categoSele].aplicaciones.push(app);
    console.log(categorys);
    localStorage.setItem('categorias', JSON.stringify(categorys));
    generarApps(categoSele);
    
    $('#modal-nueva-app').modal('hide');
}



