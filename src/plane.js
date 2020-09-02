'use strict';

class Plane {

    constructor() {
        this.__location
    }
    land(airport){
      airport.clearForLanding(this);
        this.__location = airport;
    };

    takeoff() {
        this.__location.clearForTakeOff();
    }
}
