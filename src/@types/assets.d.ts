type IHeathHistory = {
  status: string;
  timestamp: string;
};
type IMetrics = {
  lastUptimeAt: string;
  totalCollectsUptime: number;
  totalUptime: number;
};

type ISpecifications = {
  maxTemp: number;
  power: number;
  rpm: number | null;
};

export interface IAssets {
  assignedUserIds: number[];
  companyId: number;
  healthHistory: IHeathHistory[];
  healthscore: number;
  id: number;
  image: string;
  metrics: IMetrics;
  model: string;
  name: string;
  sensors: string[];
  status: string;
  unitId: number;
  specifications: ISpecifications;
}
