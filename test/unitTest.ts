import { CongestionCalculator, RouteFinder } from '../src/ultility';
import { RoadNetwork, Vehicle, VehicleType } from '../src/type';
import { roadNetwork as data } from '../src/data/roadNetwork';


describe('CongestionCalculator', () => {
  test('should calculate correct congestion value for empty array', () => {
    const vehicles: Vehicle[] = [];
    expect(CongestionCalculator.getCongestionValue(vehicles)).toBe(0);
  });

  test('should calculate correct congestion value for single vehicle', () => {
    const vehicles: Vehicle[] = [
      { id: '1', type: 'Car' as VehicleType }
    ];
    expect(CongestionCalculator.getCongestionValue(vehicles)).toBe(2);
  });

  test('should calculate correct congestion value for multiple vehicles', () => {
    const vehicles: Vehicle[] = [
      { id: '1', type: 'Car' as VehicleType},
      { id: '2', type: 'Bus' as VehicleType},
      { id: '3', type: 'Bike' as VehicleType}
    ];
    // Car (2) + Bus (4) + Bike (1) = 7
    expect(CongestionCalculator.getCongestionValue(vehicles)).toBe(7);
  });

  test('should handle duplicate vehicle types correctly', () => {
    const vehicles: Vehicle[] = [
      { id: '1', type: 'Car' as VehicleType},
      { id: '2', type: 'Car' as VehicleType},
      { id: '3', type: 'Bus' as VehicleType}
    ];
    // Car (2) + Car (2) + Bus (4) = 8
    expect(CongestionCalculator.getCongestionValue(vehicles)).toBe(8);
  });
});

describe('RouteFinder', () => {
  let sampleNetwork: RoadNetwork;
  
  beforeEach(() => {
    // Use imported data instead of manual setup
    sampleNetwork = data;
  });

  test('should handle start and end being the same road', () => {
    const routeFinder = new RouteFinder(sampleNetwork);
    const route = routeFinder.findLeastCongestedRoute('road1', 'road1');
    expect(route).toEqual(['road1']);
  });
});

describe('Example Test Suite', () => {
  test('should pass', () => {
    expect(true).toBe(true);
  });
});