console.clear();
console.log('hola desde chat');
const socket = io();
const $D = document;



// Lementos del Doom
let message = $D.getElementById('message');
let username = $D.getElementById('nombre');
let btn = $D.getElementById('send');
let btnXUser = [];

let output = $D.getElementById('output');
let actions = $D.getElementById('actions');
let List_usuarios = $D.getElementById('List_usuarios');
let Dest = $D.getElementById('Dest');
let destinatario = null;

let Action_default = `<h5>estados:</h5>` ;
let usuarios= {};

function Ususario_escribiendo(user){
    
    }
    function Listar_usuarios(usuarios){
        List_usuarios.innerHTML = "";
        btnXUser = {};
    //    let Users_Name = Object.keys(usuarios);
       Object.entries(usuarios.users).forEach(([key, value]) => {
                List_usuarios.innerHTML += `
                 <li class="nav-item">
                <a id="${value}" href="#" 
                class="nav-link active py-3 border-bottom" aria-current="page" title="${key}" data-bs-toggle="tooltip" data-bs-placement="right">
                 ${key}
                </a>
                </li>`;

                
               
      });
     
               
     

        // arreglo.map(function(elementoActual, indice, arregloOriginal) {  ... código });

    }

message.addEventListener('keypress',()=>{
    socket.emit('chat:typing',username.value);
})

List_usuarios.addEventListener('mouseenter',()=>{
    $D.querySelectorAll("#List_usuarios a").forEach(elem => elem.addEventListener("click", (event)=>{
        console.clear();
        Dest.innerHTML = `<em>${event.target.innerText}</em>`;
        destinatario = event.target.innerText;
         console.log('Destinatario ',event.target.innerText,destinatario);
    }))
})

//actualizando el listado de usuarios
socket.on('Act:listado',(L_usuarios)=>{
console.clear();
usuarios = L_usuarios;
Listar_usuarios(usuarios);
console.log('Listado de usuarios:',L_usuarios);

})

socket.on('chat:typing',(user)=>{
    if (user != username.value) {
        // alert('usuario escribiendo');
        actions.innerText = `el usuario (${user}) Esta escribiendo... `;
       
        console.log(`el usuario ${user} esta escribiendo` )
    }
})

btn.addEventListener('click',function(){
   Message= {
        username: username.value,
        destino:destinatario,
        message: message.value,
    }
    if (Message.destino != null) {
        console.clear();
        let id_socket_destino = usuarios['users'][Message.username];//[Message.username];
       
        console.log('Mensage enviado a ',id_socket_destino,Message.destino );
        
        console.log('data : ',Message,`de: ${Message.username} A: ${Message.destino} -> ${id_socket_destino} => ${Message.message}`);
        socket.emit('chat:privado',Message);
        return;
        // io.to(id_socket_destino).emit(data);
        
    }
    socket.emit('chat:message',Message);
    console.log('Has enviado un sms',Message);
    message.value = '';
})


// ----------------- cosas de comunicacion ----------------------------

socket.on('chat:message',(data)=>{
    actions.innerHTML = Action_default;
    output.innerHTML +=`<p><strong>${data.username}:</strong>${data.message} </p>`;
    console.log('recibiendo mensage masivo desde el servidor',data);
})

