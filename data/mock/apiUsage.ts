export interface ApiUsageDataPoint {
  date: string;
  hits: number;
  tts: number;
  stt: number;
  translate: number;
}

export const apiUsageMockData: ApiUsageDataPoint[] = [
  { date: "Apr 4",  hits: 820,  tts: 480,  stt: 210,  translate: 130 },
  { date: "Apr 6",  hits: 1340, tts: 720,  stt: 390,  translate: 230 },
  { date: "Apr 8",  hits: 980,  tts: 540,  stt: 270,  translate: 170 },
  { date: "Apr 10", hits: 1600, tts: 900,  stt: 480,  translate: 220 },
  { date: "Apr 12", hits: 1150, tts: 640,  stt: 310,  translate: 200 },
  { date: "Apr 14", hits: 2100, tts: 1200, stt: 590,  translate: 310 },
  { date: "Apr 16", hits: 1780, tts: 980,  stt: 510,  translate: 290 },
  { date: "Apr 18", hits: 940,  tts: 530,  stt: 240,  translate: 170 },
  { date: "Apr 20", hits: 2340, tts: 1340, stt: 640,  translate: 360 },
  { date: "Apr 22", hits: 1920, tts: 1080, stt: 520,  translate: 320 },
  { date: "Apr 24", hits: 2600, tts: 1480, stt: 700,  translate: 420 },
  { date: "Apr 26", hits: 2200, tts: 1240, stt: 600,  translate: 360 },
  { date: "Apr 28", hits: 3100, tts: 1760, stt: 840,  translate: 500 },
  { date: "Apr 30", hits: 2750, tts: 1560, stt: 740,  translate: 450 },
  { date: "May 2",  hits: 3400, tts: 1940, stt: 920,  translate: 540 },
];
