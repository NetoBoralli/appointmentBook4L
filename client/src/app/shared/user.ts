export class User {
    public id:number;
    public username:string;
    public password:string;

    constructor(id?, username?, password?){
        this.id = id;
        this.username = username; 
        this.password = password;
    }
}