var database = firebase.database();
var votos=0;
function  hola(id) {
    validar(id);
   
    guardastore(id);
    }

//guardar datos
function guardar_datos(id){
    firebase.database().ref('/'+id).set({
        id,
        votos:0
    }); 
}

//obtener votos
function obtenr_votos(id){
    
    const Ref = firebase.database().ref();
Ref.child('/').child(id).get(id).then((snapshot) => {
 votos=snapshot.val().votos;
    votar(votos,id)
});
    
}

function votar(votos,id){
    
    firebase.database().ref('/'+id).update({
        id,
        votos:votos+1    
    });
    
}
//guardar id en storage
function guardastore(id){
    if(localStorage.getItem(id)==null){
        
        localStorage.setItem(id,id);
        obtenr_votos(id);
    }
    else{
        alert("ya votaste por esta img")
    }
       
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
            hola(id);
        }
    });
}
