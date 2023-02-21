import {Chatroom} from './chat.js';
import {ChatUI} from './ui.js'


// DOM
let ul = document.getElementById('listMessage');
let formaMessage = document.getElementById('formMessage');
let inputMessage = document.getElementById('message');
let formaUpdate = document.getElementById('formUpdate');
let inputUpdate = document.getElementById('update');
let divPromenaSobe = document.getElementById('promenaSobe');
let formColor = document.getElementById('formColor');
let inputColor = document.getElementById('inputColor');
let body = document.querySelector('body');


//ucitavanje usera iz ls
let user = 'Anonymus';
if(localStorage.username != null){
    user = localStorage.username;  
}


//ispisivanje trenutnog usera
let divUsernameIspis = document.getElementById('username-ispis');

let pUsername = document.createElement('p');

divUsernameIspis.appendChild(pUsername);
pUsername.textContent = user;
pUsername.classList.add('novi-username');

setTimeout(() => {
    divUsernameIspis.removeChild(pUsername);
    pUsername.style.border = 'none';
}, 3000)


//ucitavanje kanala iz ls
let kanal = '#js';
if(localStorage.kanal != null){
    kanal = localStorage.kanal;
}


//ucitavanje boje
let bojaPozadine = 'rgb(255, 255, 255)';

if(localStorage.bojaPozadine != null){
    bojaPozadine = localStorage.bojaPozadine;
}

body.style.backgroundColor = bojaPozadine;

// OBJEKTI KLASE
let chatroom = new Chatroom(kanal, user);
let chatUI = new ChatUI(ul);


chatroom.getChats(data => { 
    chatUI.templateLi(data)
})
chatroom.username = user;



//slanje poruke
formaMessage.addEventListener('submit', e => {
    e.preventDefault();

    let poruka = inputMessage.value;

    if(poruka != ""){
        chatroom.addChat(poruka)
        .then(() => {
            formaMessage.reset() 
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
})

//promena usename
formaUpdate.addEventListener('submit', e => {
    e.preventDefault();

    let updateUser = inputUpdate.value;
    chatroom.username = updateUser;

    localStorage.setItem('username', updateUser);

    formaUpdate.reset();

    window.location.reload();

})


//promena kanala
divPromenaSobe.addEventListener('click', e => {
    e.preventDefault();

    if(e.target.tagName === 'BUTTON'){
       let novaSoba = e.target.textContent;
       console.log(novaSoba);
       localStorage.setItem("kanal", novaSoba);

       let btnSoba = document.getElementsByClassName('btn');
       let btn = Array.from(btnSoba);
        btn.forEach(b => {
            if(b.textContent == novaSoba){
                b.style.backgroundColor = 'rgb(148, 26, 112)';
                b.style.border = '5px solid rgb(32, 30, 31)'
            }
            else{
                b.style.backgroundColor = 'rgb(123, 7, 54)';
                b.style.border = '1px solid  rgb(123, 7, 54)'
            }
        })
        
        chatroom.updateRoom(novaSoba);

        chatUI.clearUL();

        chatroom.getChats(data => {
            chatUI.templateLi(data)
        })
    }
})

//promena pozadinske boje
formColor.addEventListener('submit', e => {
    e.preventDefault();

    let izabranaBoja = inputColor.value;

    localStorage.setItem('bojaPozadine', izabranaBoja);

    setTimeout(() => {
        body.style.backgroundColor = izabranaBoja;
    }, 500)
})

//brisanje poruke
ul.addEventListener('click', e => {
    e.preventDefault();

    if(e.target.tagName === "I"){
        
    }
})
