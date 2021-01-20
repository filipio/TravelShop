import { UserTrip } from "./userTrip";

export class UserData {
    key : string;
    email: string;
    roles: any;
    trips: any;

    constructor(email : string){
        this.email = email;
        this.roles = {};
        this.trips = {};
    }
}
