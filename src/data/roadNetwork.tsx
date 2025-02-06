import { RoadNetwork } from "../type";

export const roadNetwork: RoadNetwork = {
    'NE 44th St': {
        name: 'NE 44th St',
        connectedRoads: ['202nd Ave NE', '201st Ave NE'],
        vehicles: []
    },
    'NE 42nd Way': {
        name: 'NE 42nd Way',
        connectedRoads: ['NE 42nd St'],
        vehicles: []
    },
      'NE 42nd St': {
        name: 'NE 42nd St',
        connectedRoads: ['NE 42nd Way', 'NE 39th St', '203rd Ave NE'],
        vehicles: []
      },
      'NE 39th St': {
        name: 'NE 39th St',
        connectedRoads: ['NE 39th Ln', '203rd Ave NE', '204th Ave NE','NE 42nd St'],
        vehicles: []
      },
      'NE 39th Ln': {
        name: 'NE 39th Ln',
        connectedRoads: ['NE 39th St'],
        vehicles: []
      },
      '201st Ave NE': {
        name: '201st Ave NE',
        connectedRoads: ['NE 44th St', 'NE 42nd St'],
        vehicles: []
      },
      '202nd Ave NE': {
        name: '202nd Ave NE',
        connectedRoads: ['NE 44th St', 'NE 42nd St'],
        vehicles: []
      },
      '203rd Ave NE': {
        name: '203rd Ave NE',
        connectedRoads: ['NE 42nd St', '204th Ave NE', 'NE 39th St'],
        vehicles: []
      },
      '204th Ave NE': {
        name: '204th Ave NE',
        connectedRoads: ['NE 39th St', '203rd Ave NE', '206th Ave NE', '205th Ave NE'],
        vehicles: []
      },
      '205th Ave NE': {
        name: '205th Ave NE',
        connectedRoads: ['204th Ave NE'],
        vehicles: []
      },
      '206th Ave NE': {
        name: '206th Ave NE',
        connectedRoads: ['204th Ave NE'],
        vehicles: []
      }
  };