export class Auth {
    constructor(private token: string, private username: string, private expTime: string){}

    public get getUserName() {
        return this.username;
    }

    public get getToken() {
        return this.token;
    }
    
    public get getExpTime() {
        return this.expTime;
    }
}