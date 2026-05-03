export interface ApiUsageDataPoint {
  date: string;
  hits: number;
  tts: number;
  stt: number;
  translate: number;
}

export const apiUsageMockData: ApiUsageDataPoint[] = [
  { date: "Apr 4",  hits: 820,  tts: 480,  stt: 210,  translate: 130 },
  { date: "Apr 6",  hits: 1340, tts: 860,  stt: 310,  translate: 290 },
  { date: "Apr 8",  hits: 780,  tts: 520,  stt: 480,  translate: 160 },
  { date: "Apr 10", hits: 1900, tts: 740,  stt: 290,  translate: 440 },
  { date: "Apr 12", hits: 1050, tts: 1180, stt: 560,  translate: 210 },
  { date: "Apr 14", hits: 2200, tts: 890,  stt: 380,  translate: 530 },
  { date: "Apr 16", hits: 1400, tts: 1350, stt: 720,  translate: 310 },
  { date: "Apr 18", hits: 960,  tts: 670,  stt: 310,  translate: 490 },
  { date: "Apr 20", hits: 2500, tts: 1100, stt: 830,  translate: 420 },
  { date: "Apr 22", hits: 1750, tts: 1480, stt: 490,  translate: 610 },
  { date: "Apr 24", hits: 2100, tts: 920,  stt: 960,  translate: 380 },
  { date: "Apr 26", hits: 2800, tts: 1640, stt: 620,  translate: 540 },
  { date: "Apr 28", hits: 1900, tts: 1280, stt: 1080, translate: 440 },
  { date: "Apr 30", hits: 3100, tts: 1520, stt: 740,  translate: 700 },
  { date: "May 2",  hits: 2600, tts: 1860, stt: 890,  translate: 580 },
];
