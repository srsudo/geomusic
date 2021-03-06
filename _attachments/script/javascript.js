/** 
* JAVASCRIPT.JS
* This document was created by Granada University's students Ángel Bueno, Emilio Martínez and Mª Soledad Pascual for a GEOMUSIC proyect in 'High Performances Architecture' subject.
* More info: http://http://geneura.ugr.es/~jmerelo/asignaturas/AAP/ and http://geomusic.iriscouch.com/geomusic/_design/geomusic/index.html
* This code has been programmed to be Free Software and it can be used by who want it :).
* Granada, July 2012.
**/

/**
* VARIABLES GLOBALES
**/

//Mapa de google maps único
var map;
//Geolocalización del lugar
var geocoder;
//Ventana de información de google maps
var infowindow;
//El tipo de búsqueda con la que estamos trabajando
var tipobusqueda;
//Un string JSON donde se guardan los grupos favoritos del usuario de la sesión
var json_grupos;
//Variables que se utilizan para instanciar los metodos de la API al deslogeo
var sole=0;
var emilio=0;
var angel=0;
/**
* FUNCIONES	
**/
	
/**
* Función para inicializar el mapa de google maps. Debe lanzarse cada vez que quermos que se muestre un mapa.
**/
function initialize(){
	//Iniciamos las variables por defecto del mapa y sus objetos.
	geocoder = new google.maps.Geocoder();
	infowindow = new google.maps.InfoWindow({
		maxWidht:800
	});
	var latlng = new google.maps.LatLng(0,0);
	var myOptions = {
		zoom: 1,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	//El mapa se encontrará en cualquier div con id "map_canvas"
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	map.setCenter(latlng);
	map.setZoom(1);
}

/**
* Función para comprobar el paso a la creación del mapa y la búsqueda de datos.
**/
function crearmapa(valor){
	if(valor=="1"){
		var comprobar=document.getElementById('bandabuscar').value;
		if(comprobar=="" || comprobar==null){
			$("#ona").html("Introduce alguna banda alma cantaro ! ");
	 	        $("#ona").show();
	   		setTimeout(function() { $("#ona").hide(); }, 2000);
		}else{
			makemap(valor);
		}

	}else if(valor=="2"){

		var comprobar1=document.getElementById('lugarbuscar').value;
		if(comprobar1=="" || comprobar1==null){
			$("#hei").html("Introduce algun lugar cohone ! ");
	 	        $("#hei").show();
	   		setTimeout(function() { $("#hei").hide(); }, 2000);
		}else{
			makemap(valor);
		}

	}
}

/**
* Función para crear el mapa en funcion de lo que estemos buscando.
**/

function makemap(valor){
		//Se da un contenido a la variable del tipo de búsqueda que será utilizada en distintas
		//funciones y así ofrecer un tipo de datos u otros.
		tipobusqueda=valor;
		//Ya podemos realizar la búsqueda
		conseguirdatos(null);
		//Y pasar al html del mapa y los resultados
		pasoamapa();
}


/**
* Función que modifica el DOM para mostrar el html de los resultados de mapa y la tabla con sus búsquedas
**/
function pasoamapa(){

	//Obtenemos el elemento a buscar para personalizar el HTML
	if (tipobusqueda==1){
		 var nombre = document.getElementById('bandabuscar').value;
	}
	else{
		var nombre = document.getElementById('lugarbuscar').value;
	}
	
	//Identificamos qué elementos queremos eliminar del DOM
	eliminarElemento('marcos');
	eliminarElemento('botones');
	
	//Creamos los distintos elementos que una vez caracterizados los engancharemos en el nodo padre del DOM
	var newdiv1=document.createElement("div");
	var newdiv2=document.createElement("div");
	var newdiv3=document.createElement("div");
	var newdiv4=document.createElement("div");
	var newul=document.createElement("ul");
	var newbutton=document.createElement("span");
	var newspinner=document.createElement("span");
	var newtittle=document.createElement("span");
	
	//Le añadimos un id a los elementos necesarios
	newdiv1.id = 'map_canvas';
	newdiv2.id='text_map';
	newdiv3.id='tabla_result';
	newdiv4.id='nombre_tabla';
	newspinner.id='spinner';
	newul.id='ul_tabla';
	newbutton.id='boton_volver';
	
	//Y le aplicamos una clase
	newdiv1.className = 'estilo_marco';
	newdiv2.className = 'estilo_marco';
	newdiv3.className= 'scroll';
	
	//Modificamos el HTML que sea necesario
	newbutton.innerHTML='<input type="submit" class="estilo_boton text_boton" value="Buscar de nuevo" onclick="pasoaseleccion()">';
	newtittle.innerHTML='<h2 id="nombre_elemento"><input id="boton_fav" type="image" value="" onclick="">'+nombre+'</h2>';
	newspinner.innerHTML='<img id="spinner" alt="grupo" src="Images/spinner.gif">';
	
	//Se anidan los elementos del DOM
	newdiv3.appendChild(newul);	
	newdiv4.appendChild(newspinner);
	newdiv4.appendChild(newtittle);
	
	newdiv2.appendChild(newbutton);	
	newdiv2.appendChild(newdiv4);
	newdiv2.appendChild(newdiv3);
	
	document.getElementById("profile").appendChild(newdiv1);
	document.getElementById("profile").appendChild(newdiv2);
	
	//Creado la estructura se puede iniciar el mapa.
	initialize();
}
/**
* Función de modifica el DOM para mostrar el apartado del usuario.
**/
function pasoperfil(){

	//Identificamos qué elementos queremos eliminar del DOM
	if (document.getElementById('marcos')){
	   eliminarElemento('marcos');
	   eliminarElemento('botones');
	}else if (document.getElementById('map_canvas')){
	   eliminarElemento('map_canvas');
	   eliminarElemento('tabla_result');
	   eliminarElemento('text_map');
	}else if(document.getElementById('cabecera_api')){
	   eliminarElemento('cabecera_api');
	   eliminarElemento('contenido_api');
	}else{
	   return;
        }
        
	//Creamos los distintos elementos que una vez caracterizados los engancharemos en el nodo padre del DOM
	var newdiv1=document.createElement("div");
	var newdiv2=document.createElement("div");
	var newdiv3=document.createElement("div");
	var newdiv4=document.createElement("div");
	var newbutton=document.createElement("span");
	var newul=document.createElement("ul");
	var newtittle=document.createElement("span");
	
	//Le añadimos un id a los elementos necesarios
	newdiv1.id = 'map_canvas';
	newdiv2.id='text_map';
	newdiv3.id='tabla_result';
	newdiv4.id='nombre_tabla';
	newtittle.id='titulo';
	newbutton.id='boton_recargar';
	
	newul.id='ul_tabla';
	
	//Y le aplicamos una clase
	newdiv1.className = 'estilo_marco';
	newdiv2.className = 'estilo_marco';
	newdiv3.className= 'scroll';
	
	//Modificamos el HTML que sea necesario
	newtittle.innerHTML='<h2>Mis favoritos :)</h2>';
	newbutton.innerHTML='<input type="submit" class="estilo_boton text_boton" value="Recargar" onclick="pasoperfil()">';
	
	//Se anidan los elementos del DOM
	newdiv3.appendChild(newul);	
	newdiv4.appendChild(newtittle);
	
	newdiv2.appendChild(newdiv4);
	newdiv2.appendChild(newdiv3);
	newdiv2.appendChild(newbutton);
	
	document.getElementById("profile").appendChild(newdiv1);
	document.getElementById("profile").appendChild(newdiv2);

	//Creado la estructura se puede iniciar el mapa.
	initialize();
	
	//Ponemos los datos del json de grupos
	ponerResultados(null, json_grupos);
	
	//Mostramos los botones de favoritos individuales para cada elemento de la tabla.
	//Estos botones son ocultados cuando se realiza una busqueda de cualquier grupo o lugar
	$('.boton_fav_ind').each(function(){
      		$(this).show();
	});
	actualizarDatosInd();
}

/**
* Función de modifica el DOM para mostrar el menú de inicio donde realizar las búsquedas
**/
function pasoaseleccion(){

	//Identificamos qué elementos queremos eliminar del DOM
	if (document.getElementById('map_canvas')){
	   eliminarElemento('map_canvas');
	   eliminarElemento('tabla_result');
	   eliminarElemento('text_map');
	}else if(document.getElementById('cabecera_api')){
	   eliminarElemento('cabecera_api');
           eliminarElemento('contenido_api');
        }else{
	   return;
	}
        
	//Creamos los distintos elementos que una vez caracterizados los engancharemos en el nodo padre del DOM
	var newdiv1=document.createElement("div");
	var newdiv2=document.createElement("div");
	var newspan1=document.createElement("span");
	var newspan2=document.createElement("span");
	var newspan3=document.createElement("span");
	var newspan4=document.createElement("span");

	//Le añadimos un id a los elementos necesarios
	newdiv1.id = 'marcos';
	newdiv2.id='botones';
	newspan1.id = 'grupo';
	newspan2.id = 'mapa';
	newspan3.id = 'botongrupo';
	newspan4.id = 'botonmapa';
		
	//Y le aplicamos una clase	
	newspan1.className='estilo_marco';
	newspan2.className='estilo_marco';

	//Modificamos el HTML que sea necesario
	newspan1.innerHTML='<img id="imagengrupo" alt="grupo" src="Images/oasislive.jpg">';
	newspan2.innerHTML='<img id="imagenmapa" alt="mapa" src="Images/mapa.gif"> ';
	newspan3.innerHTML='<input class="estilo_input text_input" type="text" id="bandabuscar" autocomplete="on" title="Buscar banda" placeholder="Buscar banda"><input class="estilo_boton text_boton" type="submit"  value="\!Busca!" onclick="crearmapa(1)"><div id="ona"></div>';
	newspan4.innerHTML='<input class="estilo_input text_input" type="text" id="lugarbuscar" title="Buscar localizacion" placeholder="Buscar localizacion"><input class="estilo_boton text_boton" type="submit" value="\!Busca!" onclick="crearmapa(2)"><div id="hei"></div>';
	
	//Se anidan los elementos del DOM
	newdiv1.appendChild(newspan1);
	newdiv1.appendChild(newspan2);
	newdiv2.appendChild(newspan3);
	newdiv2.appendChild(newspan4);
	
	document.getElementById("profile").appendChild(newdiv1);
	document.getElementById("profile").appendChild(newdiv2);
}

/**
*  Función de modifica el DOM para mostrar el menú de información
**/
function pasonosotros(){
	//alert(sole);
	if (document.getElementById('marcos')){
	   eliminarElemento('marcos');
	   eliminarElemento('botones');
	   $('#profile').empty();
	}else if (document.getElementById('map_canvas')){
		
	   if (document.getElementById('entrada')){
	   	 sole=1;
	   }else{
	 	  eliminarElemento('map_canvas');
	  	  eliminarElemento('tabla_result');
	  	  eliminarElemento('text_map');
		  $('#profile').empty();
	    }
	}else if (document.getElementById('cabecera_api')){
	   eliminarElemento('cabecera_api');
	   eliminarElemento('contenido_api');
	   $('#profile').empty();
	}else if (document.getElementById('marco1')){
	   sole=1;
	   $("#wahan").html("Necesitas registrarse ;)");
	   $("#wahan").show();
	   setTimeout(function() { $("#wahan").hide(); }, 1000);
	}else{
	   return;
        }
	//alert(sole);
	if(sole==0){

		var newdiv1=document.createElement("div");

		var newdiv2=document.createElement("div");

		var newh2=document.createElement("h1");

		var newh3a=document.createElement("h3");
		var newh3b=document.createElement("h3");
		var newh3c=document.createElement("h3");
		var newh3d=document.createElement("h3");
		var newh3e=document.createElement("h3");

		var newpa=document.createElement("p");
		var newpb=document.createElement("p");
		var newpc=document.createElement("p");
		var newpd=document.createElement("p");
		var newpe=document.createElement("p");

		newdiv1.id ='cabecera_api';
		newdiv2.id='contenido_api';
		newdiv2.className= 'scroll-s';
		
		newpa.className = 'letraka';
		newpb.className = 'letraka';
		newpc.className = 'letraka';
		newpd.className = 'letraka';
		newpe.className = 'letraka';

		newh2.innerHTML='Todo sobre nosotros ;)';

		newdiv1.appendChild(newh2);

		document.getElementById("profile").appendChild(newdiv1);

		newh3a.innerHTML='Hito 1';
		newh3b.innerHTML='Hito 2';
		newh3c.innerHTML='Hito 3';
		newh3d.innerHTML='Hito 4';

	//Aqui se describen los hitos
	newpa.innerHTML='En este primer hito, creamos el grupo de programacion formado por Angel, Emilio y Sole. Pensamos la idea que luego se convirtio en el proyecto llevado a cabo: GEOMUSIC, un proyecto de geolocalizacion, en el cual se buscan grupos de musica como tal o grupos de musica por localidades y se gestionan desde un perfil propio, pudiendo guardar los grupos que nos interesan a traves de una interfaz amena e intuitiva. Por ultimo, para terminar este hito, creamos una carpeta en la forja con el nombre del proyecto.';

	newpb.innerHTML='Durante el segundo hito, se abordaron cuestiones como el diseño de la interfaz, el tipo de base de datos a utilizar y se realizaron esquemas HTML que implementaban la pagina web propuesta, pero a bajo nivel.';

	newpc.innerHTML='En el tercer hito, se abordo realmente lo que es en sí el codigo del proyecto. En este hito, nos encontramos con muchos problemas, destacando sobre todo, el tema de NodeJs y el alojamiento web."In extremis", nuestro profe JJMerelo nos mostro la cosa más potente de nuestra vida hasta la fecha: irisCouch&Couchaap. Tras sucesivas noches de insomnio, por partes de los tres integrantes del grupo, y teniendo en cuenta que tuvimos que usar un unico ordenador debido a que no descubrimos como clonar las bases de datos, conseguimos entregar el hito a tiempo. ¡INCREIBLE!';

	newpd.innerHTML='El ultimo hito supuso un reto para todos los componentes del grupo. Dias de calor, sudor y lagrimas en el aulario de ciencias (seguido del riguroso post-tapeo) conseguimos realmente que la aplicacion cumpliese la funcionalidad especificada en el Hito 1. Ademas, se consiguio un aprendizaje gradual desde lo mas basico hasta cuestiones mas complejas. El desarrollo de esta ultima practica se hizo en largas sesiones de "hackaton" en el que todos los componentes participaron de forma activa ayudandose unos a otros, dando ideas y corrigiendo errores.';

	newh3a.appendChild(newpa);
	newh3b.appendChild(newpb);
	newh3c.appendChild(newpc);
	newh3d.appendChild(newpd);

	newdiv2.appendChild(newh3a);
	newdiv2.appendChild(newh3b);
	newdiv2.appendChild(newh3c);
	newdiv2.appendChild(newh3d);

	document.getElementById("profile").appendChild(newdiv2);
}else{
	sole=0;
	return;
}
}//Fin de metodo

function pasorest(){
        //alert(emilio);
	if (document.getElementById('marcos')){
	   //alert("marcos");
	   eliminarElemento('marcos');
	   eliminarElemento('botones');
	   $('#profile').empty();
	}else if (document.getElementById('map_canvas')){
	   //alert("marcos1");
	   if (document.getElementById('entrada')){
	   	 emilio=1;
	   }else{
	 	  eliminarElemento('map_canvas');
	  	  eliminarElemento('tabla_result');
	  	  eliminarElemento('text_map');
		  $('#profile').empty();
		}
	}else if (document.getElementById('cabecera_api')){
	   //alert("marcos2");
	   eliminarElemento('cabecera_api');
	   eliminarElemento('contenido_api');
	   $('#profile').empty();
	}else if (document.getElementById('marco1')){
	   //alert("marcos3");
	   emilio=1;
	   $("#wahan").html("Necesitas registrarse ;)");
	   $("#wahan").show();
	   setTimeout(function() { $("#wahan").hide(); }, 1000);
	}else{
	   return;
        }
        //alert(emilio);
	if(emilio =='0'){

		var newdiv1=document.createElement("div");

		var newdiv2=document.createElement("div");

		var newh2=document.createElement("h1");

		var newh3a=document.createElement("h3");
		var newh3b=document.createElement("h3");
		var newh3c=document.createElement("h3");
		var newh3d=document.createElement("h3");
		var newh3e=document.createElement("h3");

		var newpa=document.createElement("p");
		var newpb=document.createElement("p");
		var newpc=document.createElement("p");
		var newpd=document.createElement("p");
		var newpe=document.createElement("p");

		newdiv1.id ='cabecera_api';
		newdiv2.id='contenido_api';
		newdiv2.className= 'scroll-s';
		
		newpa.className = 'letraka';
		newpb.className = 'letraka';
		newpc.className = 'letraka';
		newpd.className = 'letraka';
		newpe.className = 'letraka';

		newh2.innerHTML='Peticiones REST';

		newdiv1.appendChild(newh2);

		document.getElementById("profile").appendChild(newdiv1);

		newh3a.innerHTML='https://profe:123@geomusic.iriscouch.com/_users/_design/interfaz/_view/ngrupos';
		newh3b.innerHTML='https://profe:123@geomusic.iriscouch.com/_users/_design/interfaz/_view/ntid';
		newh3c.innerHTML='https://profe:123@geomusic.iriscouch.com/_users/_design/interfaz/_view/perfil';
		newh3d.innerHTML='https://profe:123@geomusic.iriscouch.com/_users/_design/interfaz/_view/fecha';

	//Aqui se describen los hitos
	newpa.innerHTML='Devuelve el id de los usuarios, asi como el nombre y los grupos/lugares almacenados en favoritos.';

	newpb.innerHTML='Devuelve la id de todos los usuarios.';

	newpc.innerHTML='Devuelve el perfil de todos los usuarios conteniendo el nickname y el email registrado';

	newpd.innerHTML='Nos indica la fecha de creacion de cada una de las cuentas registradas';

	newh3a.appendChild(newpa);
	newh3b.appendChild(newpb);
	newh3c.appendChild(newpc);
	newh3d.appendChild(newpd);

	newdiv2.appendChild(newh3a);
	newdiv2.appendChild(newh3b);
	newdiv2.appendChild(newh3c);
	newdiv2.appendChild(newh3d);

	document.getElementById("profile").appendChild(newdiv2);
	}else{
		emilio=0;
		return;
		
	}
}//Fin de funcion

/**
*  Función de modifica el DOM para mostrar el menú de la API
**/
function pasoapi(){
	//alert(angel);
	if (document.getElementById('marcos')){
	   eliminarElemento('marcos');
	   eliminarElemento('botones');
	}else if (document.getElementById('map_canvas')){
	   if (document.getElementById('entrada')){
	   	 angel=1;
	   }else{
	 	  eliminarElemento('map_canvas');
	  	  eliminarElemento('tabla_result');
	  	  eliminarElemento('text_map');
		  $('#profile').empty();
	   }
	}else if (document.getElementById('cabecera_api')){
	   eliminarElemento('cabecera_api');
	   eliminarElemento('contenido_api');
	}else if (document.getElementById('marco1')){
	   angel=1;
	   $("#wahan").html("Necesitas registrarse ;)");
	   $("#wahan").show();
	   setTimeout(function() { $("#wahan").hide(); }, 1000);
	}else{
	   return;
        }
	//alert(angel);
	if(angel=='0'){
			
		var newdiv1=document.createElement("div");

		var newdiv2=document.createElement("div");

		var newh2=document.createElement("h1");

		var newh3a=document.createElement("h3");
		var newh3b=document.createElement("h3");
		var newh3c=document.createElement("h3");
		var newh3d=document.createElement("h3");
		var newh3e=document.createElement("h3");
		var newh3f=document.createElement("h3");
		var newh3g=document.createElement("h3");
		var newh3h=document.createElement("h3");
		var newh3i=document.createElement("h3");
		var newh3j=document.createElement("h3");
		var newh3k=document.createElement("h3");
		var newh3l=document.createElement("h3");
		var newh3m=document.createElement("h3");
		var newh3n=document.createElement("h3");
		var newh3o=document.createElement("h3");
		var newh3p=document.createElement("h3");
		var newh3q=document.createElement("h3");
		var newh3r=document.createElement("h3");
		var newh3s=document.createElement("h3");
		var newh3t=document.createElement("h3");
		var newh3u=document.createElement("h3");
		var newh3v=document.createElement("h3");
		var newh3w=document.createElement("h3");
		var newh3x=document.createElement("h3");


		var newpa=document.createElement("p");
		var newpb=document.createElement("p");
		var newpc=document.createElement("p");
		var newpd=document.createElement("p");
		var newpe=document.createElement("p");
		var newpf=document.createElement("p");
		var newpg=document.createElement("p");
		var newph=document.createElement("p");
		var newpi=document.createElement("p");
		var newpj=document.createElement("p");
		var newpk=document.createElement("p");
		var newpl=document.createElement("p");
		var newpm=document.createElement("p");
		var newpn=document.createElement("p");
		var newpo=document.createElement("p");
		var newpp=document.createElement("p");
		var newpq=document.createElement("p");
		var newpr=document.createElement("p");
		var newps=document.createElement("p");
		var newpt=document.createElement("p");
		var newpu=document.createElement("p");
		var newpv=document.createElement("p");
		var newpw=document.createElement("p");
		var newpx=document.createElement("p");


		newdiv1.id ='cabecera_api';
		newdiv2.id='contenido_api';
		newdiv2.className= 'scroll-s';

		newpa.className = 'letraka';
		newpb.className = 'letraka';
		newpc.className = 'letraka';
		newpd.className = 'letraka';
		newpe.className = 'letraka';
		newpf.className = 'letraka';
		newpg.className = 'letraka';
		newph.className = 'letraka';
		newpi.className = 'letraka';
		newpj.className = 'letraka';
		newpk.className = 'letraka';
		newpl.className = 'letraka';
		newpm.className = 'letraka';
		newpn.className = 'letraka';
		newpo.className = 'letraka';
		newpp.className = 'letraka';
		newpq.className = 'letraka';
		newpr.className = 'letraka';
		newps.className = 'letraka';
		newpt.className = 'letraka';
		newpu.className = 'letraka';
		newpv.className = 'letraka';
		newpw.className = 'letraka';
		newpx.className = 'letraka';

		newh2.innerHTML='Info de Geomusic: Metodos programados.';

		newdiv1.appendChild(newh2);

		document.getElementById("profile").appendChild(newdiv1);

		newh3a.innerHTML='initialize()';
		newh3b.innerHTML='crearMapa() , parametros: valor';
		newh3c.innerHTML='pasoamapa()';
		newh3d.innerHTML='pasoperfil()';
		newh3e.innerHTML='pasoaseleccion()';
		newh3f.innerHTML='pasonosotros()';
		newh3g.innerHTML='pasoapi()';
		newh3h.innerHTML='conseguirdatos() , parametros: fuente, tipo.';
		newh3i.innerHTML='getInfo() , parametros: url';
		newh3j.innerHTML='procesarRespuesta()';
		newh3k.innerHTML='ponerResutados() , parametros: geoArray, tituloArray, fechaArray, lugarArray, direccionArray, websiteArray';
		newh3l.innerHTML='evento() , parametros: nombre, tipo';
		newh3m.innerHTML='eliminarElemento() , parametros: id';
		newh3n.innerHTML='addMarker() , parametros: posicion, titulo, fecha, lugar, direccion, website';

		newh3o.innerHTML='infoMarker() , parametros: posicion, titulo, fecha, lugar, direccion, website';
		newh3p.innerHTML='codeAddress() , parametros: direccion1, direccion2';
		newh3q.innerHTML='toggleBounce()';
		newh3r.innerHTML='leergrupos()';
		newh3s.innerHTML='guardarfavoritos() , parametros: nombre';
		newh3t.innerHTML='eliminarfavoritos() , parametros: nombre';
		newh3u.innerHTML='comprobarElemento() , parametros: nombre, tipo';
		newh3v.innerHTML='actualizarDatos()'; 
		newh3w.innerHTML='actualizarDatosInd()'; 
		newh3x.innerHTML='makeMap() , parametros: valor'; 

	//Aqui se describen los hitos

		newpa.innerHTML = 'Inicializa el mapa de Google';
		newpb.innerHTML = 'Comprueba si se ha introducido algun valor y en caso contrario, avisa al usuario.';
		newpc.innerHTML = 'Modifica el DOM para mostrar el HTML de los resultados de mapas y de la tabla con sus busquedas';
		newpd.innerHTML = 'Nos permite acceder a los grupos favoritos en HTML';
		newpe.innerHTML = 'Nos permite acceder a la pantalla de los mapas';
		newpf.innerHTML = 'Nos permite acceder a la informacion de los hitos';
		newpg.innerHTML = 'Nos permite acceder a la pagina de la API';
		newph.innerHTML = 'Monta el enlace para realizar la peticion REST al api de LastFM';
		newpi.innerHTML = 'Realiza la peticion REST al enlace pasado por referencia';
		newpj.innerHTML = 'Recibe el XML de la peticion REST y obtiene la informacion que necesitamos';
		newpk.innerHTML = 'Pone informacion en el mapa y/o en la tabla de resultados';
		newpl.innerHTML = 'Añade evento de click en el DOM';
		newpm.innerHTML = 'Elimina un elemento del DOM.';
		newpn.innerHTML = 'Añade un marcador en el mapa.';
		newpo.innerHTML = 'Crea una ventana de informacion y gestiona los elementos del mapa';
		newpp.innerHTML = 'Codifica los parametros recibido en latitud y longitud';
		newpq.innerHTML = 'Modifica la animacion de un marcador';
		newpr.innerHTML = 'Lee los grupos que tenemos almacenados en favoritos';
		newps.innerHTML = 'Guarda el grupo recibido en favoritos';
		newpt.innerHTML = 'Elimina el grupo deseado de favoritos';
		newpu.innerHTML = 'Función que comprueba si una banda está en el Array de las bandas';
		newpv.innerHTML = 'Nos permite actualizar los datos en la base de datos';
		newpw.innerHTML = 'Actualiza los datos desde el menu usuario';
		newpx.innerHTML = 'Es el que nos permite crear los mapas usando la API de GoogleMap.';

		newh3a.appendChild(newpa);
		newh3b.appendChild(newpb);
		newh3c.appendChild(newpc);
		newh3d.appendChild(newpd);

		newh3e.appendChild(newpe);
		newh3f.appendChild(newpf);
		newh3g.appendChild(newpg);
		newh3h.appendChild(newph);
		newh3i.appendChild(newpi);
		newh3j.appendChild(newpj);
		newh3k.appendChild(newpk);
		newh3l.appendChild(newpl);
		newh3m.appendChild(newpm);
		newh3n.appendChild(newpn);
		newh3o.appendChild(newpo);
		newh3p.appendChild(newpp);
		newh3q.appendChild(newpq);
		newh3r.appendChild(newpr);
		newh3s.appendChild(newps);
		newh3t.appendChild(newpt);
		newh3u.appendChild(newpu);
		newh3v.appendChild(newpv);
		newh3w.appendChild(newpw);
		newh3x.appendChild(newpx);

		newdiv2.appendChild(newh3a);
		newdiv2.appendChild(newh3b);
		newdiv2.appendChild(newh3c);
		newdiv2.appendChild(newh3d);

		newdiv2.appendChild(newh3e);
		newdiv2.appendChild(newh3f);
		newdiv2.appendChild(newh3g);
		newdiv2.appendChild(newh3h);
		newdiv2.appendChild(newh3i);
		newdiv2.appendChild(newh3j);
		newdiv2.appendChild(newh3k);
		newdiv2.appendChild(newh3l);
		newdiv2.appendChild(newh3m);
		newdiv2.appendChild(newh3n);
		newdiv2.appendChild(newh3o);
		newdiv2.appendChild(newh3p);
		newdiv2.appendChild(newh3q);
		newdiv2.appendChild(newh3r);
		newdiv2.appendChild(newh3s);
		newdiv2.appendChild(newh3t);
		newdiv2.appendChild(newh3u);
		newdiv2.appendChild(newh3v);
		newdiv2.appendChild(newh3w);
		newdiv2.appendChild(newh3x);
		document.getElementById("profile").appendChild(newdiv2);
		angel=0;
	}else{
		angel=0;
		return;
	}
}//FIn de funcion
/**
* Función que monta el enlace para realizar la petición REST al API del lastfm
**/
function conseguirdatos(fuente, tipo){
	//Variables necesarias para montar la URL
	var url_cabecera = 'http://ws.audioscrobbler.com/2.0/?method=';
	var api_key = '&api_key=6153cd09b3c7c62ec14fdd267b1333d0';
	var format = '&format=json'
	var busqueda;
	var metodo;
	
	//En función de una u otra búsqueda el enlace tendrá un formato u otro
	//Pedimos desde un mapa 
	if (fuente == null){
		if(tipobusqueda == 1){
			busqueda = document.getElementById('bandabuscar').value;
			metodo = 'artist.getEvents&artist=';
		}
		else{
			busqueda = document.getElementById('lugarbuscar').value;
			metodo = 'geo.getEvents&location=';	
		}
	}
	//Pedimos desde un evento del perfil del usuario
	//Se tiene que poner la variable global en un valor correcto
	else{
		var busqueda = fuente;
		if(tipo==1){
			metodo = 'artist.getEvents&artist=';
			tipobusqueda=1;
		}
		else{
			metodo = 'geo.getEvents&location=';
			tipobusqueda=2;	
		}	
	}
	
	//Montamos el enlace y se lo pasamos a la función que hace la petición REST
	var url = url_cabecera+metodo+busqueda+format+api_key;
	getInfo(url);	
}

/**
* Función que realiza la petición REST al enlace pasado por referencia
**/
function getInfo(url){
	//Mostramos el spinner indicando que se está buscando
	$("#spinner").show();
	//CReamos el elemento que hace la petición
	xmlHttp = new XMLHttpRequest(); 
	//Cuando obtenemos una respuesta procesamos su respuesta
	xmlHttp.onload = procesarRespuesta;
	//Se realiza la petición
	xmlHttp.open( "GET", url, true );
	xmlHttp.send( null );
}

/**
* Función que recibe el XML de la petición REST y saca, modifica y moldea la información que nos interesa
**/
function procesarRespuesta(){
	//Ya se puede ocultar el spinner
	$("#spinner").hide();
	
	//Creamos las variables necesarias
        var adress = 'Congo';
        var geo = new Array;
        var geoArray = [];
        var tituloArray = [];
        var ciudadArray = [];
	var geoArray_part = [0,0];
	var fechaArray = [];
	var lugarArray = [];
	var direccionArray = [];
	var websiteArray = [];
	
	//Realizamos un rastreo del mensaje que obtenemos del servidor
	//Si obtenemos respuesta seguimos adelante
	if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
		//Si no se obtiene nada
        	if (xmlHttp.responseText == "Not found"){
        	    alert('No se ha podido realizar la petición');
        	}
        	else{
        		//Parseamos el XML
        		var datos = eval ( "(" + xmlHttp.responseText + ")" );
        		//Si hay mensajes de error del lastfm lo mostramos en la tabla.
        		if(datos.error > 0){
        			ponerResultados([], [datos["message"]]);
        			map.setZoom(1);
        		}
        		//Si no hay mensajes de error pero no hay información de eventos.
        		else if(datos.events.total == 0){
        			ponerResultados([], ["Parece que aun no hay fechas programadas para esta banda :("]);
        			map.setZoom(1);
        			
        		}
        		//Si hay información y es más de un resultado
        		else{	  
        			//Si se tiene varios elementos
        			if(datos.events.event.length > 1){
	        		//Rastreamos el XML según su estructura en búsqueda de eventos
	        		for(i in datos.events.event){
	        			//Obtenemos las coordenadas del evento si no ocurre ningun error
		        		geoArray_part[0] = datos.events.event[i].venue.location["geo:point"]["geo:lat"];
	        			geoArray_part[1] = datos.events.event[i].venue.location["geo:point"]["geo:long"];
	        			
	        			//Si existen las coordenadas
	        			if(geoArray_part[0] != ''){
	        				//Se añaden al array de geocoordenadas
	        				geoArray = geoArray.concat(new google.maps.LatLng(geoArray_part[0], geoArray_part[1]));
	        				//En función del tipo de búsqueda algunos campos cambian
	        				if (tipobusqueda == 1){
	        					if(datos.events.event[i].venue.location.city == ''){
	        						tituloArray = tituloArray.concat(datos.events.event[i].title);
	        					}
	        					else{
	        						tituloArray = tituloArray.concat(datos.events.event[i].venue.location.city);
	        					}
	        					ciudadArray = ciudadArray.concat(datos.events.event[i].title);
	        				}
	        				else{
	        					tituloArray = tituloArray.concat(datos.events.event[i].title);
	        					ciudadArray = ciudadArray.concat(datos.events.event.venue[i].location.city);
	        				}
	        				
	        				//Y se añaden los elementos de los arrays de la fecha,, dirección y website
	        				fechaArray = fechaArray.concat(datos.events.event[i].startDate.slice(0, 16));
	        				lugarArray = lugarArray.concat(datos.events.event[i].venue["name"]);
	        				direccionArray = direccionArray.concat(datos.events.event[i].venue.location.street);
	        				websiteArray = websiteArray.concat(datos.events.event[i].venue.website);
	        			}
	        			//Si no las hay, tiramos de plan B
	        			else{
	        				//Si el plan B da resultado seguimos pa'lante', sino pues ignoramos ese campo
	        				if(codeAddress(datos.events.event[i].venue["name"], datos.events.event[i].venue.location.city) != null){
	        					geoArray = geoArray.concat(codeAddress(datos.events.event[i].venue["name"], datos.events.event[i].venue.location.city));	        	
	        					//En función del tipo de búsqueda algunos campos cambian
	        					if (tipobusqueda == 1){
	        					if(datos.events.event[i].venue.location.city == ''){
	        						tituloArray = tituloArray.concat(datos.events.event[i].title);
	        					}
	        					else{
	        						tituloArray = tituloArray.concat(datos.events.event[i].venue.location.city);
	        					}
	        					ciudadArray = ciudadArray.concat(datos.events.event[i].title);
	        				}
	        				else{
	        					tituloArray = tituloArray.concat(datos.events.event[i].title);
	        					ciudadArray = ciudadArray.concat(datos.events.event[i].venue.location.city);
	        				}
	        					
	        					//Y se añaden los elementos de los arrays de la fecha,, dirección y website
	        					fechaArray = fechaArray.concat(datos.events.event[i].startDate.slice(0, 16));
	        					lugarArray = lugarArray.concat(datos.events.event[i].venue["name"]);
	        					direccionArray = direccionArray.concat(datos.events.event[i].venue.location.street);
	        					websiteArray = websiteArray.concat(datos.events.event[i].venue.website);
	        				}
	        			}
	        			
	        		}
	        		//Comprobamos los arrays en busca de fall0s
	        		var indice;
	        		do{
	        			indice = tituloArray.indexOf("");
	        			if(indice != -1){
	        				geoArray.splice(indice, 1);
	        				ciudadArray.splice(indice, 1);	 	   
	        				fechaArray.splice(indice, 1);
	        				lugarArray.splice(indice, 1);
	        				direccionArray.splice(indice, 1);
	        				websiteArray.splice(indice, 1);	 	      		
	        		
	        			}
	        		//Mientras haya espacios en blanco
	        		}while(indice !=-1);
	        		}
	        		//Tiene un único elemento
	        		else{
	        			//Obtenemos las coordenadas del evento si no ocurre ningun error
		        		geoArray_part[0] = datos.events.event.venue.location["geo:point"]["geo:lat"];
	        			geoArray_part[1] = datos.events.event.venue.location["geo:point"]["geo:long"];
	        			//Si existen las coordenadas
	        			if(geoArray_part[0] != ''){
	        				//Se añaden al array de geocoordenadas
	        				geoArray = geoArray.concat(new google.maps.LatLng(geoArray_part[0], geoArray_part[1]));
	        				//En función del tipo de búsqueda algunos campos cambian
	        				if (tipobusqueda == 1){
	        					if(datos.events.event.venue.location.city == ''){
	        						tituloArray = tituloArray.concat(datos.events.event.title);
	        					}
	        					else{
	        						tituloArray = tituloArray.concat(datos.events.event.venue.location.city);
	        					}
	        					ciudadArray = ciudadArray.concat(datos.events.event.title);
	        				}
	        				else{
	        					tituloArray = tituloArray.concat(datos.events.event.title);
	        					ciudadArray = ciudadArray.concat(datos.events.event.venue.location.city);
	        				}
	        				//Y se añaden los elementos de los arrays de la fecha,, dirección y website
	        				fechaArray = fechaArray.concat(datos.events.event.startDate.slice(0, 16));
	        				lugarArray = lugarArray.concat(datos.events.event.venue["name"]);
	        				direccionArray = direccionArray.concat(datos.events.event.venue.location.street);
	        				websiteArray = websiteArray.concat(datos.events.event.venue.website);
	        			}
	        			//Si no las hay, tiramos de plan B
	        			else{
	        				//Si el plan B da resultado seguimos pa'lante', sino pues ignoramos ese campo
	        				if(codeAddress(datos.events.event[i].venue["name"], datos.events.event.venue.location.city) != null){
	        					geoArray = geoArray.concat(codeAddress(datos.events.event.venue["name"], datos.events.event.venue.location.city));	        	
	        					if (tipobusqueda == 1){
	        						if(datos.events.event.venue.location.city == ''){
	        							tituloArray = tituloArray.concat(datos.events.event.title);
	        						}
	        						else{
	        							tituloArray = tituloArray.concat(datos.events.event.venue.location.city);
	        						}
	        						ciudadArray = ciudadArray.concat(datos.events.event.title);
	        					}
	        					else{
	        						tituloArray = tituloArray.concat(datos.events.event.title);
	        						ciudadArray = ciudadArray.concat(datos.events.event.venue.location.city);
	        					}
	        					//Y se añaden los elementos de los arrays de la fecha,, dirección y website
	        					fechaArray = fechaArray.concat(datos.events.event.startDate.slice(0, 16));
	        					lugarArray = lugarArray.concat(datos.events.event.venue["name"]);
	        					direccionArray = direccionArray.concat(datos.events.event.venue.location.street);
	        					websiteArray = websiteArray.concat(datos.events.event.venue.website);
	        				}
	        			}
	        		}
	        		//Cuando ya tenemos toda la información se coloca en el mapa y en la tabla
	        		ponerResultados(geoArray, tituloArray, ciudadArray, fechaArray, lugarArray, direccionArray, websiteArray);
    			}
        	}                    
    	}
    	//Si no obtenemos respuesta es porque algo ha fallado
    	else{
    		alert('Parece que algo no ha ido bien, por favor, vuelve a intentarlo.')
    	}
    	
    	//Una vez buscado el grupo de actualiza la información de los botones de guardado/borrado de la base de datos.
	actualizarDatos();
}

/**
* Función que pone la información en el mapa y/o en la tabla de resultado
**/
function ponerResultados(geoArray, tituloArray, ciudadArray, fechaArray, lugarArray, direccionArray, websiteArray){
	//Variable donde se enganchará los diferentes eventos encontrados
	var ul_tabla = document.getElementById("ul_tabla")
	//En esta variable definimos los límites del mapa a mostrar
	bounds = new google.maps.LatLngBounds();
	//Si el tituloArray es null hay que tener en cuenta que obtenemos un formato JSON en tituloArray
	//Vamos que con elementos que NO son arrays aunque el nombre lo diga así
	if(geoArray == null){
		if(tituloArray == null){
			//Creamos un nuevo div
	 		var newdiv=document.createElement("div");
			newdiv.className = 'elemento-resultado';
			//También creamos un botón para añadir/borrar de la base de datos
	 		newdiv.innerHTML = 'Parece que todavia no tienes ningun grupo agregado a favoritos';
	 		ul_tabla.appendChild(newdiv);
		}
		else{
			//En este caso el tituloArray tiene formato JSON
			eval("var miObjeto = {"+tituloArray+"}"); 
			for(i in miObjeto){
				//Creamos un nuevo div con el nombre del lugar del evento y lo añadimos a la tabla
 				var newdiv=document.createElement("div");
 				newdiv.id =i;
				newdiv.className = 'elemento-resultado';
				//También creamos un botón para añadir/borrar de la base de datos
 				newdiv.innerHTML = i+'<input class="boton_fav_ind" src="" type="image" name="'+i+'" value="'+miObjeto[i]+'" onclick="">';
 				ul_tabla.appendChild(newdiv);
			
				//Añadimos un evento al div
				evento(i, miObjeto[i]);
			}
		}
	}
	//ahora los elementos SÍ que son arrays
	//Añadimos los elementos desde procesar respuesta
	else{
		//Puede ser que estemos interesados en mostras simplemente un mensaje de error
		if(geoArray.length == 0){
			var newdiv=document.createElement("div");
			newdiv.className = 'elemento-resultado';
			newdiv.innerHTML = tituloArray[0];
			ul_tabla.appendChild(newdiv);
		}
		//O mostrar los elementos encontrados
		else{
			//Rastreamos el array de nombres		
 			for(i in tituloArray){
 				//Creamos un nuevo div con el nombre del lugar del evento y lo añadimos a la tabla
 				var newdiv=document.createElement("div");
 				newdiv.id = tituloArray[i];
				newdiv.className = 'elemento-resultado';
				//También creamos un botón para añadir/borrar de la base de datos
 				newdiv.innerHTML = tituloArray[i]+'<input class="boton_fav_ind" src="" type="image" name="'+tituloArray[i]+'" value="" onclick="">';
 				ul_tabla.appendChild(newdiv);

				//Añadimos el marcador
				addMarker(geoArray[i], tituloArray[i], ciudadArray[i], fechaArray[i], lugarArray[i], direccionArray[i], websiteArray[i]);
				//Establecemos un nuevo límite del mapa
				bounds.extend(geoArray[i]);
			}
		}
	}
	//Como no queremos mostrar el boton de añadir/borrar a la base de datos lo ocultamos
	$('.boton_fav_ind').hide();
	//Con todos los límites del mapa se mostrará un zoom apropiado
	map.fitBounds(bounds);	
}

/**
* Función que añade un evento a de click en DOM
**/
function evento(nombre, tipo){
	//Queremos que cuando se pulse un elemento de la lista de sitios y grupos favoritos se busque en el mapa
	google.maps.event.addDomListener(document.getElementById(nombre), 'click', function(){
		//Inicializamos el mapa
		initialize();
		//Cambiamos el título
		$("#titulo").html("<h2>Mis favoritos: "+nombre+".</h2>")
		//Vaciamos la tabla
		$("#ul_tabla").html("");
		//Realizamos la búsqueda
		conseguirdatos(nombre, tipo);
	});
}

/**
* Elimina un elemento del DOM
**/	
function eliminarElemento(id){
	//Tomamos el elemento en base al id facilitado
	elemento = document.getElementById(id);
	//Comprobamos si existe o no y actuamos en consecuencia
	if (!elemento){
		alert("El elemento seleccionado no existe: "+elemento);
	} else {
		padre = elemento.parentNode;
		padre.removeChild(elemento);
	}
}

/**
* Función que añade un marcador al mapa
**/
function addMarker(posicion, titulo, ciudad, fecha, lugar, direccion, website){
	//Creamos el marcador y le añadimos la información
	var marker = new google.maps.Marker({
		position: posicion,
        	map: map,
        	draggable:false,
      		animation: google.maps.Animation.DROP,
        	title: titulo
	});
	//Asociamos a cada marcador una ventana de información
	infoMarker(marker, titulo, ciudad, fecha, lugar, direccion, website);
}

/**
* Función para crear una ventana de información y gestionar los eventos del mapa
**/
function infoMarker(marker, titulo, ciudad, fecha, lugar, direccion, website){	
	//var newlatlng = new google.maps.LatLng(marker.getPosition().lat()+5, marker.getPosition().lng());
	var div = document.getElementById(titulo);
	
	//Evento para mostrar la ventana si se clicka en el marcador
	google.maps.event.addListener(marker, 'click', function(){
		//Se indica la información que va a mostrar
		infowindow.setContent(	"<h3>"+titulo+"</h3>"+
					"<p>"+ciudad+"</p>"+ 
					"<p>"+fecha+"</p>"+
					"<p>"+lugar+", "+direccion+"<br>"+
					"<a href="+website+">Direccion web</a>");
		//Se abre la ventana
		infowindow.open(marker.get('map'), marker);	
	});
	
	//Evento para mostrar la ventana de información si se clicka en el div correspondiente a un elemento de la taba del mapa
	google.maps.event.addDomListener(div, 'click', function(){
		infowindow.setContent(	"<h3>"+titulo+"</h3>"+
					"<p>"+ciudad+ "</p>"+ 
					"<p>"+fecha+"</p>"+
					"<p>"+lugar+", "+direccion+"<br>"+
					"<a href="+website+">Direccion web</a>");
					infowindow.open(marker.get('map'), marker);
	});
}

/**
* Función que codifica una dirección convencional en un elemento de latitud y longitud
**/
function codeAddress(direccion1, direccion2){
	//en principio estamos interesados en codificar la primera dirección junto la segunda
	var segunda_direccion=false;
	var direccion=direccion1+", "+direccion2;
	//Pasamos la dirección a la función del mapa
	geocoder.geocode( { 'address': direccion}, function(results, status) {
		//Si la dirección es válida se devuelve el objeto con las coordenadas
		if(status == google.maps.GeocoderStatus.OK) {
			var coord =  results[0].geometry.location;
			return coord;
        	}
        	//Si no lo es entonces se prueba con la segunda dirección
		else{
			segunda_direccion=true;
		}
	});
	//Probamos con la segunda dirección
	if(segunda_direccion == true){
		geocoder.geocode( { 'address': direccion2}, function(results, status) {
			if(status == google.maps.GeocoderStatus.OK) {
        			return results[0].geometry.location;
        		}
			else{
				return null;
				//alert("Geocode was not successful for the following reason: " + status + " Direccion2: " + direccion2);
			}
		});
	}
}

/**
* Función que modifica la animación de un marcador
**/
function toggleBounce() {
	//Si es está moviendo se para
	if (marker.getAnimation() != null) {
		marker.setAnimation(null);
	}
	//Si no, se mueve
	else{
		marker.setAnimation(google.maps.Animation.BOUNCE);
	}
}

/**
* Función que lee los grupos que cada usuario tiene guardados en la DB.
* Esta función se inicia en app.js en cuanto se loguea el usuario.
**/
function leergrupos(){
	var string_grupos;
	//Se tiene una sesión
	$.couch.session({
		success : 
			function(session) {
				//Se obtiene el usuario de la sesión
				var userCtx = session.userCtx;
				//Se accede a la base de datos que contiene a todos los usuarios
				$.couch.userDb(function(db){
					var userDocId = "org.couchdb.user:"+userCtx.name;
					//Se abre el documento del usuario donde se guardan la información del mismo dentro de la base de datos
					db.openDoc(userDocId, {
						success : 
							function(userDoc){
								//Obtenemos la información que está en el campo grupos del documento del usuario en JSON
								json_grupos=userDoc.grupos;
			                		}
					});
				});
			}
	});
}

/**
* Función para guardar en favoritos el argumento pasado como referencia
**/
function guardarfavoritos(nombre){
	//Se comprueba el nombre que va ser guardado
	var nombre_a_guardar=nombre;
	//Se muestra el gif de procesamiento
	$("#spinner").show();
	
	//Para trabajar más fácilmente pasamos de JSON a array
	var array_grupos;
	//Si el estring es null tiene que tener un valor vacío
	if(json_grupos == null){
		array_grupos = [];
	}
	else{
		array_grupos = json_grupos.split(',');
	}
	//Añadimos al array el nombre que vamos a guardar con el formato de JSON
	array_grupos.push('"'+nombre_a_guardar+'":"'+tipobusqueda+'"');	
	//Se genera de nuevo el formato JSON con la información del array
	json_grupos = array_grupos.join(",");
	
	//Se tiene una sesión
	$.couch.session({
		success:
			function(session) {
				//Se obtiene el usuario de la sesión
				var userCtx = session.userCtx;
				//Se accede a la base de datos que contiene a todos los usuarios
				$.couch.userDb(function(db){
					var userDocId = "org.couchdb.user:"+userCtx.name;
					//Se abre el documento del usuario donde se guardan la información del mismo dentro de la base de datos
					db.openDoc(userDocId, {
						success:
							function(userDoc){
								//Guardamos en el campo grupos el JSON con la nueva información
								userDoc["grupos"] = json_grupos;
								//Se guardan las modificaciones
								db.saveDoc(userDoc, {
									success: 
										function(){
											//Se actualiza la información referente a los botones de añadir/eliminar
											actualizarDatos();
											actualizarDatosInd();
											//Se puede ocultar el gif de procesamiento
											$("#spinner").hide();
										}
								});
							}
					});
				});
			}
	});
}

/**
* Función para eliminar de favoritos el argumento pasado como referencia
**/
function eliminarfavorito(nombre){
	//Se muestra el gif
	$("#spinner").show();
	
	//Se vuelve a pasar a array para facilitar las operaciones
	var array_grupos = json_grupos.split(',');
	
	//Si el array solo tiene un elemento entonces simplemente se pasa a null	
	if(array_grupos.length == 1){
		json_grupos=null;
	}
	//Si tiene más de uno se identifica el elemento del array, se elimina y se crea un string
	else{
		var nombre_a_borrar=nombre;
		var ind = array_grupos.indexOf(nombre_a_borrar+":1");
		if(ind==-1){
			ind = array_grupos.indexOf(nombre_a_borrar+":2");
		}
		array_grupos.splice(ind, 1);		
		json_grupos = array_grupos.join(",");
	}
	
	//Se tiene una sesión
	$.couch.session({
		success:
			function(session){
				//Se obtiene el usuario de la sesión
				var userCtx = session.userCtx;
				//Se accede a la base de datos que contiene a todos los usuarios
				$.couch.userDb(function(db){
					var userDocId = "org.couchdb.user:"+userCtx.name;
					//Se abre el documento del usuario donde se guardan la información del mismo dentro de la base de datos
					db.openDoc(userDocId, {
						success: 
							function(userDoc){
								//Guardamos en el campo grupos el string con la nueva información
								userDoc["grupos"] = json_grupos;
								//Se guardan las modificaciones
								db.saveDoc(userDoc, {
									success:
										function(){
											//Se actualiza la información referente a los botones de añadir/eliminar
											actualizarDatos();
											actualizarDatosInd();
											//Se oculta el gif
											$("#spinner").hide();
										}
								});
							}
					});
           			});
         		}
	});
}

/**
* Función que comprueba si una banda está en el Array de las bandas
**/
function comprobarElemento(nombre, tipo){
	//Se comprueba el tipo de elementoq eu queremos buscar y montamos como sería su JSON
	if(tipo==1){
		var nombre_buscar='"'+nombre+'":"1"';
	}
	else{
		var nombre_buscar='"'+nombre+'":"2"';
	}

	//Se comprueba y se manda respuesta
	//Si es null
	if(json_grupos == null){
		return false;
	}
	else{
		var array_grupos = json_grupos.split(',');
		//Si está en nuestros datos
		if(array_grupos.indexOf(nombre_buscar) != -1){
			return true;
		}
		//Si no lo están
		else{
			return false;
		}
	}
}

/**
* Función que se encarga de actualizar los estados de los botones de añadir o eliminar elemento a la base de datos
**/
function actualizarDatos(){
	//El nombre lo podemos obtener directamente del identificador
	var nombre = $("#nombre_elemento").text();
	//Si se encuentran en la base de datos entonces queremos un boton para que elimine
    	if(comprobarElemento(nombre, tipobusqueda)){
    		$("#boton_fav").unbind('click');
		$("#boton_fav").click(function(){eliminarfavorito(nombre);});
		$("#boton_fav").attr({'value': 'E'});
		$("#boton_fav").attr({'src':'Images/starfav.png'});
	}
	//Si en cambio no está en la base de datos el botón será para añadir
	else{
		$("#boton_fav").unbind('click');
		$("#boton_fav").click(function(){guardarfavoritos(nombre);});
		$("#boton_fav").attr({'value': 'A'});
		$("#boton_fav").attr({'src':'Images/starnofav.png'});
	}
}

/**
* Función que se encarga de actualizar los estados de los botones de añadir o eliminar elementos dentro del menú del usuario
**/
function actualizarDatosInd(){
	//Como habrá más de un elemento con un misma id se agrupan por una clase y se recorre uno a uno
	$('.boton_fav_ind').each(function(){
		//Se obtiene el nombre de cada elemento de la tabla y el tipo de elemento que es
		var nombre = $(this).attr("name");
		var tipo = $(this).attr("value");
		//Se comprueba si está en el array para eliminarlo
		if(comprobarElemento(nombre, tipo)){
			$(this).unbind('click');
			//Al click del botón se llama a la función con el parámetro del nombre del elemento
			$(this).click(function(){eliminarfavorito($(this).attr("name"));});
			$(this).attr({'value': 'E'});
			$(this).attr({'src':'Images/starfav.png'});
		}
		//O para agregarlo
		else{
			$(this).unbind('click');
			$(this).click(function(){guardarfavoritos($(this).attr("name"));});
			$(this).attr({'value': 'A'});
			$(this).attr({'src':'Images/starnofav.png'});
		}
	});
}
