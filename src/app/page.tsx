'use client';

import { useState } from 'react';
import { VehicleType, } from '../type';
import { RouteFinder } from '../ultility';
import map from '../../public/mapOutlate.jpg'
import Image from 'next/image';
import { roadNetwork as initialRoadNetwork } from '../data/roadNetwork';

interface Vehicle {
  type: VehicleType;
  id: string;
}

interface RoadData {
  name: string;
  connectedRoads: string[];
  vehicles: Vehicle[];
}

type RoadNetwork = Record<string, RoadData>;

const getVehicleColorClass = (vehicleType: string) => {
  const colorMap = {
    'Bike': 'bg-green-500 hover:bg-green-600',
    'Car': 'bg-blue-500 hover:bg-blue-600',
    'default': 'bg-purple-500 hover:bg-purple-600'
  };
  
  return colorMap[vehicleType as keyof typeof colorMap] || colorMap.default;
};

export default function Home() {
  const [roadNetwork, setRoadNetwork] = useState<Record<string, {
    name: string;
    connectedRoads: string[];
    vehicles: { type: VehicleType, id: string }[];
  }>>(initialRoadNetwork);
  const [startRoad, setStartRoad] = useState<string>('');
  const [endRoad, setEndRoad] = useState<string>('');
  const [route, setRoute] = useState<string[]>([]);

  const addVehicle = (roadName: string, vehicleType: VehicleType) => {
    setRoadNetwork((prev: RoadNetwork) => {
      const road = prev[roadName];
      if (!road) return prev;

      return {
        ...prev,
        [roadName]: {
          ...road,
          vehicles: [...road.vehicles, {
            type: vehicleType,
            id: crypto.randomUUID()
          }]
        }
      };
    });
  };

  const removeVehicle = (roadName: string, vehicleId: string) => {
    setRoadNetwork((prev: RoadNetwork) => {
      const road = prev[roadName];
      if (!road) return prev;

      return {
        ...prev,
        [roadName]: {
          ...road,
          vehicles: road.vehicles.filter(v => v.id !== vehicleId)
        }
      };
    });
  };

  const findRoute = () => {
    if (!startRoad || !endRoad) return;
    const foundRoute = new RouteFinder(roadNetwork).findLeastCongestedRoute(startRoad, endRoad);
    setRoute(foundRoute);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        Road Navigation System
      </h1>
      
      <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Find Route</h2>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <select
            className="border rounded-md p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            value={startRoad}
            onChange={(e) => setStartRoad(e.target.value)}
          >
            <option value="">Select start road</option>
            {Object.keys(roadNetwork).map(road => (
              <option key={road} value={road}>{road}</option>
            ))}
          </select>
          <select
            className="border rounded-md p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            value={endRoad}
            onChange={(e) => setEndRoad(e.target.value)}
          >
            <option value="">Select end road</option>
            {Object.keys(roadNetwork).map(road => (
              <option key={road} value={road}>{road}</option>
            ))}
          </select>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors"
            onClick={findRoute}
          >
            Find Route
          </button>
        </div>
        {route.length > 0 && (
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md">
            <p className="text-blue-800 dark:text-blue-200 font-medium">
              Route: {route.join(' > ')}
            </p>
          </div>
        )}
      </div>

      {/* Map Layout */}
      <div className="relative w-full h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-8">
        <div className="absolute inset-0">
          <div className="relative">
            <Image src={map} alt="Map" />
            <svg
              className="absolute top-0 left-0 w-full h-full"
              style={{ pointerEvents: 'none' }}
            >
            </svg>
            
            {/* Optional: Add route selection controls */}
          </div>
          {/* Vehicle Indicators */}
          
        </div>
        <div className="absolute inset-0">
          <svg
            className="absolute top-0 left-0 w-full h-full"
            style={{ pointerEvents: 'none' }}
          >
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(roadNetwork).map(([roadName, road]) => (
          <div key={roadName} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">{roadName}</h3>
            <div className="flex gap-2 mb-4">
              {['Bike', 'Car', 'Bus'].map((type) => (
                <button
                  key={type}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors
                    ${type === 'Bike' ? 'bg-green-500 hover:bg-green-600' : 
                      type === 'Car' ? 'bg-blue-500 hover:bg-blue-600' : 
                      'bg-purple-500 hover:bg-purple-600'} text-white`}
                  onClick={() => addVehicle(roadName, type as VehicleType)}
                >
                  Add {type}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {road?.vehicles && road.vehicles.length > 0 ? (
                road.vehicles.map((vehicle, index) => (
                  <div 
                    key={vehicle.id || `vehicle-${index}`}
                    className={`
                      px-3 
                      py-1.5 
                      rounded-md 
                      text-sm 
                      font-medium 
                      text-white 
                      transition-colors
                      ${getVehicleColorClass(vehicle.type)}
                    `}
                  >
                    {vehicle.type}
                    <button onClick={() => removeVehicle(roadName, vehicle.id)} className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
