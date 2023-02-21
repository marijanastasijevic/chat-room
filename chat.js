export class Chatroom {
    
    constructor(r, u){
        this.room = r;
        this.username = u;
        this.chats = db.collection('chats');
        this.unsub;
    }

    //geteri i seteri za room
    get room () {
        return this._room;
    }

    set room(r){
        this._room = r;
        
    }

    //geteri i seteri za username
    get username(){
        return this._username;
    }

    set username(u) {
        if(this.proveriUsername(u)){
            this._username = u;
            
        }
        else{
            alert('Nevalidno korisnicko ime!!!');
        }
    }

    //provera validnosti unetog username
    proveriUsername(u){
        if(u.length <= 2 || u.length >= 10){
            return false;
        }

        let sviPrazni = true;

        for(let i = 0; i < u.length; i++){
            if(u[i] != ' ' && u[i] != '    '){
                sviPrazni = false;
            }
        }

        return !sviPrazni;
    }

    //Update room
    updateRoom(ur){
        this.room = ur;
        if(this.unsub){
            this.unsub(); 
        }
    }

    //metod za dodavanje ceta
    async addChat(message) {
        let date = new Date();
        let ts = firebase.firestore.Timestamp.fromDate(date);

        let docChat = {
            message: message,
            username: this.username,
            room: this.room,
            created_at: ts
        }
    
        return this.chats.add(docChat);
    }

    // pracenje poruka u bazi i ispis dodatih poruka
    getChats(callback) { 
        this.unsub = this.chats
        .where('room', '==', this.room)
        .orderBy('created_at')
        .onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                let type = change.type;
                let doc = change.doc;
                if(type == 'added'){
                    callback(doc.data());
                }
            })
        })
        
    }
}
