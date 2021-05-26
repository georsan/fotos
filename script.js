var database = firebase.database();
var puntos=0;
var voto=0;



document.addEventListener("DOMContentLoaded",function(event){
    
    swal({
        title: "Bienvenido!",
        text: "Cuentas con 3 votos,el primero tiene un valor de 5 puntos, el segundo vale 3 y el ultimo 1",
        
      });
    for(var i=0;i<9;i++){
        if(localStorage.getItem(i) != null){
            document.getElementById(i).style.backgroundImage='url(heart-solid.svg)';
        }
        
    }
});





function  hola(id) {
    validar(id);
    guardastore(id);
        
      
   }
   
    
    

//guardar datos
function guardar_datos(id){
    firebase.database().ref('/'+id).set({
        id,
        puntos:0
    }); 
}

//obtener votos
function obtenr_votos(id,voto){
    
    const Ref = firebase.database().ref();
Ref.child('/').child(id).get(id).then((snapshot) => {
 puntos=snapshot.val().puntos;
    
    if(voto==1){
        puntos=puntos+5;
    }
    else if (voto==2) {
        puntos=puntos+3;
    } else {
        puntos=puntos+1;
    }
    votar(puntos,id);
});
    
}

function votar(puntos,id){
    alert(puntos)
    firebase.database().ref('/'+id).update({
        id,
        puntos    
    });
    
}
//guardar id en storage
function guardastore(id){
    if(localStorage.getItem(id)==null){
        if(localStorage.voto == 3){
            swal("Ya gastaste los 3 votos");
          }
          else{
             
            if (localStorage.voto) {
                localStorage.voto = Number(localStorage.voto)+1;
              
            } else {
                localStorage.voto = 1;
              }
            
              localStorage.setItem(id,id);
              obtenr_votos(id,localStorage.voto);
              document.getElementById(id).style.backgroundImage='url(heart-solid.svg)';
              
             
    }
}
    else{
        document.getElementById(id).style.backgroundImage='url(heart-solid.svg)';
      
    }
       
}

function click(numer){
    localStorage.voto=numer; 
    return localStorage.voto;
}


//saber si el id esta en la db,si no esta lo guarda 
function validar(id){
    var starCountRef = firebase.database().ref('/' + id + '/id');
    starCountRef.on('value', (snapshot) => {
    const data = snapshot.val();
        if(data==id){
            
        }
        else{
            guardar_datos(id);
            
        }
    });
}
