import { Vehicle, VehicleType, RoadNetwork } from '../type';

// Custom priority queue implementation
class CustomPriorityQueue<T> {
  private items: { element: T; priority: number }[] = [];

  constructor(private comparator: (a: number, b: number) => number) {}

  enqueue(element: T, priority: number): void {
    this.items.push({ element, priority });
    this.items.sort((a, b) => this.comparator(a.priority, b.priority));
  }

  dequeue(): T {
    if (this.isEmpty()) {
      throw new Error('Queue is empty');
    }
    return this.items.shift()!.element;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

class CongestionCalculator {
  private static values: Record<VehicleType, number> = {
    Bike: 1,
    Car: 2,
    Bus: 4
  };

  static getCongestionValue(vehicles: Vehicle[]): number {
    return vehicles.reduce((total, vehicle) => {
      return total + (this.values[vehicle.type] || 0);
    }, 0);
  }
}

class RouteFinder {
  constructor(private roadNetwork: RoadNetwork) {}

  findLeastCongestedRoute(start: string, end: string): string[] {
    const visited = new Set<string>();
    const distances: Record<string, number> = {};
    const previous: Record<string, string | null> = {};
    const priorityQueue = new CustomPriorityQueue<{ road: string, priority: number }>(
      (a, b) => a - b
    );

    // Initialize distances and priority queue
    for (const road in this.roadNetwork) {
      distances[road] = Infinity;
      previous[road] = null;
    }
    distances[start] = 0;
    priorityQueue.enqueue({ road: start, priority: 0 }, 0);

    while (!priorityQueue.isEmpty()) {
      const { road: currentRoad } = priorityQueue.dequeue();
      if (currentRoad === end) break;
      if (visited.has(currentRoad)) continue;
      visited.add(currentRoad);

      const connections = this.roadNetwork[currentRoad].connectedRoads;
      for (const nextRoad of connections) {
        if (visited.has(nextRoad)) continue;
        const congestion = CongestionCalculator.getCongestionValue(this.roadNetwork[nextRoad].vehicles);
        const newDistance = distances[currentRoad] + 1 + congestion; // 1 for the road length, adjust if needed

        if (newDistance < distances[nextRoad]) {
          distances[nextRoad] = newDistance;
          previous[nextRoad] = currentRoad;
          priorityQueue.enqueue({ road: nextRoad, priority: newDistance }, newDistance);
        }
      }
    }

    // Reconstruct the shortest path
    const route: string[] = [];
    let currentRoad: string | null = end;
    while (currentRoad) {
      route.unshift(currentRoad);
      currentRoad = previous[currentRoad];
    }

    return route[0] === start ? route : [];
  }
}

export { CongestionCalculator, RouteFinder };