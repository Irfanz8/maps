export type VehicleType = 'Bike' | 'Car' | 'Bus';

export interface Vehicle {
  type: VehicleType;
  id: string;
}

export interface Road {
  name: string;
  connectedRoads: string[];
  vehicles: Vehicle[];
}

export interface RoadNetwork {
  [roadName: string]: Road;
}