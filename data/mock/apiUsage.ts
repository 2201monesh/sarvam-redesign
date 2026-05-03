export interface ApiUsageDataPoint {
  date: string;
  hits: number;
}

export const apiUsageMockData: ApiUsageDataPoint[] = [
  { date: "Apr 4",  hits: 820  },
  { date: "Apr 6",  hits: 1340 },
  { date: "Apr 8",  hits: 980  },
  { date: "Apr 10", hits: 1600 },
  { date: "Apr 12", hits: 1150 },
  { date: "Apr 14", hits: 2100 },
  { date: "Apr 16", hits: 1780 },
  { date: "Apr 18", hits: 940  },
  { date: "Apr 20", hits: 2340 },
  { date: "Apr 22", hits: 1920 },
  { date: "Apr 24", hits: 2600 },
  { date: "Apr 26", hits: 2200 },
  { date: "Apr 28", hits: 3100 },
  { date: "Apr 30", hits: 2750 },
  { date: "May 2",  hits: 3400 },
];
