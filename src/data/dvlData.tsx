// dvlData.ts

export interface DvlReading {
    timestamp: number; // Unix timestamp in milliseconds
    vx: number;        // Velocity in x direction (meters per second)
    vy: number;        // Velocity in y direction (meters per second)
    vz: number;        // Velocity in z direction (meters per second)
    distance: number;  // Distance traveled in meters (can be used for incremental updates)
  }
  
  // Sample DVL data for a simulated ROV movement in a hull inspection pattern
  const dvlData: DvlReading[] = [
    { timestamp: 1633072800000, vx: 1.0, vy: 0, vz: 0, distance: 0 },
    { timestamp: 1633072860000, vx: 0.8, vy: 0.5, vz: 0, distance: 5 },
    { timestamp: 1633072920000, vx: 0, vy: 1.0, vz: 0, distance: 10 },
    { timestamp: 1633072980000, vx: -0.8, vy: 0.5, vz: 0, distance: 15 },
    { timestamp: 1633073040000, vx: -1.0, vy: 0, vz: 0, distance: 20 },
    { timestamp: 1633073100000, vx: -0.8, vy: -0.5, vz: 0, distance: 25 },
    { timestamp: 1633073160000, vx: 0, vy: -1.0, vz: 0, distance: 30 },
    { timestamp: 1633073220000, vx: 0.8, vy: -0.5, vz: 0, distance: 35 },
    { timestamp: 1633073280000, vx: 1.0, vy: 0, vz: 0, distance: 40 },
    { timestamp: 1633073340000, vx: 0.8, vy: 0.5, vz: 0, distance: 45 },
    { timestamp: 1633073400000, vx: 0, vy: 1.0, vz: 0, distance: 50 },
    { timestamp: 1633073460000, vx: -0.8, vy: 0.5, vz: 0, distance: 55 },
    { timestamp: 1633073520000, vx: -1.0, vy: 0, vz: 0, distance: 60 },
    { timestamp: 1633073580000, vx: -0.8, vy: -0.5, vz: 0, distance: 65 },
    { timestamp: 1633073640000, vx: 0, vy: -1.0, vz: 0, distance: 70 },
    { timestamp: 1633073700000, vx: 0.8, vy: -0.5, vz: 0, distance: 75 },
    { timestamp: 1633073760000, vx: 1.0, vy: 0, vz: 0, distance: 80 },
    { timestamp: 1633073820000, vx: 0.8, vy: 0.5, vz: 0, distance: 85 },
    { timestamp: 1633073880000, vx: 0, vy: 1.0, vz: 0, distance: 90 },
    { timestamp: 1633073940000, vx: -0.8, vy: 0.5, vz: 0, distance: 95 },
    { timestamp: 1633074000000, vx: -1.0, vy: 0, vz: 0, distance: 100 },
    { timestamp: 1633074060000, vx: -0.8, vy: -0.5, vz: 0, distance: 105 },
    { timestamp: 1633074120000, vx: 0, vy: -1.0, vz: 0, distance: 110 },
    { timestamp: 1633074180000, vx: 0.8, vy: -0.5, vz: 0, distance: 115 },
    { timestamp: 1633074240000, vx: 1.0, vy: 0, vz: 0, distance: 120 },
    { timestamp: 1633074300000, vx: 0.8, vy: 0.5, vz: 0, distance: 125 },
    { timestamp: 1633074360000, vx: 0, vy: 1.0, vz: 0, distance: 130 },
    { timestamp: 1633074420000, vx: -0.8, vy: 0.5, vz: 0, distance: 135 },
    { timestamp: 1633074480000, vx: -1.0, vy: 0, vz: 0, distance: 140 },
    { timestamp: 1633074540000, vx: -0.8, vy: -0.5, vz: 0, distance: 145 },
    { timestamp: 1633074600000, vx: 0, vy: -1.0, vz: 0, distance: 150 },
    { timestamp: 1633074660000, vx: 0.8, vy: -0.5, vz: 0, distance: 155 },
    { timestamp: 1633074720000, vx: 1.0, vy: 0, vz: 0, distance: 160 },
    { timestamp: 1633074780000, vx: 0.8, vy: 0.5, vz: 0, distance: 165 },
    { timestamp: 1633074840000, vx: 0, vy: 1.0, vz: 0, distance: 170 },
  ];
  
  export default dvlData;
  