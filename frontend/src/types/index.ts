export interface MongooseDocument {
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export type UserRole =
  | "admin"
  | "plant_manager"
  | "line_supervisor"
  | "maintenance_engineer";

export interface User extends MongooseDocument {
  name: string;
  email: string;
  role: UserRole;
  assignedFactory?: string | null;
}

export type FactoryStatus = "active" | "maintenance" | "inactive";

export interface Factory extends MongooseDocument {
  name: string;
  code: string;
  location: string;
  totalCapacity: number;
  status: FactoryStatus;
}

export type LineStatus = "active" | "stopped" | "maintenance";

export interface Line extends MongooseDocument {
  factoryId: string;
  name: string;
  lineCode: string;
  status: LineStatus;
  designedSpeed: number;
}

export interface ProductionMetrics extends MongooseDocument {
  lineId: string;
  factoryId: string;
  timestamp: string;
  productionVolume: {
    bottles: number;
    packs: number;
    pallets: number;
  };
  speed: {
    actual: number;
    target: number;
  };
  cycleTime: {
    avg: number;
    min: number;
    max: number;
  };
  oee: {
    overall: number;
    availability: number;
    performance: number;
    quality: number;
  };
  lossTree: {
    breakdown: number;
    cleansing: number;
    changeover: number;
    idle: number;
    minorStops: number;
  };
  usageKpi: {
    energyPerLiter: number;
    energyPerBottle: number;
    waterPerLiter: number;
    waterPerBottle: number;
  };
  statusTimeline: Array<{
    status: "running" | "stopped" | "maintenance" | "faulty" | "idle";
    startedAt: string;
    endedAt?: string | null;
    reason?: string;
  }>;
}
