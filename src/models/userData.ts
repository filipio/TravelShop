import { TripModel } from "./trip-model";
import { UserTrip } from "./userTrip";

export class UserData {
    key : string;
    email: string;
    roles: any;
    trips: any;
    test : Object[];

    constructor(email : string){
        this.email = email;
        this.roles = {};
        this.trips = {};
        // this.test = new Object[5];
        // this.test[0] = {super : "jest super"};
    }

}
