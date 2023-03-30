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

type ICheckList = {
  completed: boolean;
  task: string;
};
export interface ICompanies {
  id: number;
  name: string;
}
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

export interface IUsers {
  companyId: number;
  email: string;
  id: number;
  name: string;
  unitId: number;
}

export interface IUnits {
  companyId: number;
  id: number;
  name: string;
}

export interface IWorkOrders {
  assetId: number;
  assignedUserIds: number[];
  checklist: ICheckList[];
  description: string;
  id: number;
  priority: string;
  status: string;
  title: string;
}
