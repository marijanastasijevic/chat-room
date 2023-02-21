export class ChatUI {

    constructor(l){
        this.list = l;
    }

    //geter i seter za listu
    get list(){
        return this._list;
    }

    set list(l){
        this._list = l
    }

    //ispisivanje forme za vreme slanja poruke
    formaVreme(data){
        let date = data.created_at.toDate();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();

        day = String(day).padStart(2, "0");
        month = String(month).padStart(2, "0");
        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");

        let now = new Date();
        let nowDay = now.getDate();
        let nowMonth = now.getMonth() + 1;
        let nowYear = now.getFullYear();

        let ispis;

        if(day == nowDay && month == nowMonth && year == nowYear){
            ispis = `${hours}:${minutes}`
        }
        else{
            ispis = `${day}.${month}.${year}. - ${hours}:${minutes}`
        }

        return ispis;
    }

    //iscrtavanje poruke 
    templateLi(data){
        let formaVreme = this.formaVreme(data);
        let trenutniUser = localStorage.getItem('username');

        let liItem;

        if(data.username == trenutniUser){
            liItem = 
            `<li class="desno">
                <span class="username">${data.username}:</span>
                <span class="message">${data.message}</span>
                <div class="data">${formaVreme}</div>
                <img class='img-trash'><i class="fa fa-trash-o"></i></img>
            </li>`
        }
        else{
            liItem = 
            `<li class="levo">
                <span class="username">${data.username}:</span>
                <span class="message">${data.message}</span>
                <div class="data">${formaVreme}</div>
                <img class='img-trash'><i class="fa fa-trash-o"></i></img>
            </li>`
        }

        this._list.innerHTML += liItem
    }

    //brisanje poruke
    clearUL() {
        this.list.innerHTML = '';
    }
}
