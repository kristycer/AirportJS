'use strict';

describe('Feature Test:', function(){
  var plane;
  var airport;
  var weather;

  beforeEach(function(){
    plane = new Plane();
    airport = new Airport();
  });

  describe('under normal conditions',function(){
    beforeEach(function(){
      spyOn(Math,'random').and.returnValue(0);
    });

    it('planes can be instructed to land at an airport', function(){
      plane.land(airport);
      expect(airport.planes()).toContain(plane);
    });

    it('planes can take off', function(){
      plane.land(airport);
      plane.takeoff();
      expect(airport.planes()).not.toContain(plane);
    });
  });

  describe('under stormy conditions', function(){
    it('does not allow plane to take off if stormy weather', function(){
      spyOn(Math,'random').and.returnValue(0);
      plane.land(airport)
      spyOn(airport._weather,'isStormy').and.returnValue(true);
      expect(function(){ plane.takeoff();}).toThrowError('cannot takeoff it is stormy');
      expect(airport.planes()).toContain(plane);
    });

    it('does not allow plane to land if stormy weather', function(){
      spyOn(Math,'random').and.returnValue(1);
      expect(function(){ plane.land(airport);}).toThrowError('cannot land it is stormy');
      expect(airport.planes()).toEqual([]);
    });
  });
});
