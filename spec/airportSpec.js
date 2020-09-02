'use strict';

describe('Airport', function(){
  var airport;
  var plane;
  var weather;

  beforeEach(function(){
    weather = jasmine.createSpyObj('weather', ['isStormy'])
    airport = new Airport(weather);
    plane = jasmine.createSpy('plane');
  });

  it('has no planes by default', function(){
    expect(airport.planes()).toEqual([]);
  });

  describe('under normal conditions',function(){
    beforeEach(function(){
      weather.isStormy.and.returnValue(false);
    });

    it('can clear planes for landing', function(){
      airport.clearForLanding(plane);
      expect(airport.planes()).toEqual([plane]);
    });

    it('can clear planes for take off', function(){
      airport.clearForLanding(plane);
      airport.clearForTakeOff(plane);
      expect(airport.planes()).toEqual([]);
    });
  });

  describe('Under stormy conditions', function(){
    beforeEach(function(){
      weather.isStormy.and.returnValue(true);
    });

    it('does not clear planes for take off', function(){
      expect(function(){ airport.clearForTakeOff(plane);}).toThrowError('cannot takeoff it is stormy');
    });

    it('does not allow plane to land', function(){
      expect(function(){ airport.clearForLanding(plane);}).toThrowError('cannot land it is stormy');
    });
  });
});
