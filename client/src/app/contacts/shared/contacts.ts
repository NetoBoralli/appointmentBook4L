export class Contact{
    public id:number;
    public username:string;
    public email:string;
    public phone:number;
    public address:string;
    // public sex:string;
    public obs:string;
    public fav: boolean;

    constructor(id?, username?, email?, phone?, address?, obs?, fav?){ /* sex?, */
        this.id = id;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.address = address;
        // this.sex = sex;
        this.obs = obs;
        this.fav = fav;
    }
}