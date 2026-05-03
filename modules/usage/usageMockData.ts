export const serviceData = [
  { service: "Saarika",       requests: 4820 },
  { service: "Bulbul",        requests: 3140 },
  { service: "Mayura",        requests: 2900 },
  { service: "Sarvam-2B",     requests: 1650 },
  { service: "Transliterate", requests: 980  },
];

export const dailyDataByPeriod: Record<string, { day: string; requests: number }[]> = {
  "7d": [
    { day: "Apr 27", requests: 1200 }, { day: "Apr 28", requests: 1850 },
    { day: "Apr 29", requests: 1400 }, { day: "Apr 30", requests: 2100 },
    { day: "May 1",  requests: 1750 }, { day: "May 2",  requests: 3400 },
    { day: "May 3",  requests: 2900 },
  ],
  "30d": [
    { day: "Apr 7",  requests: 5400 }, { day: "Apr 14", requests: 7200 },
    { day: "Apr 21", requests: 6800 }, { day: "Apr 28", requests: 9100 },
    { day: "May 3",  requests: 8600 },
  ],
  "90d": [
    { day: "Feb", requests: 18200 }, { day: "Mar", requests: 24600 },
    { day: "Apr", requests: 31400 }, { day: "May", requests: 12800 },
  ],
  "6m": [
    { day: "Dec", requests: 9400  }, { day: "Jan", requests: 14200 },
    { day: "Feb", requests: 18200 }, { day: "Mar", requests: 24600 },
    { day: "Apr", requests: 31400 }, { day: "May", requests: 12800 },
  ],
  "1y": [
    { day: "Jun", requests: 4200  }, { day: "Jul", requests: 6800  },
    { day: "Aug", requests: 8100  }, { day: "Sep", requests: 9400  },
    { day: "Oct", requests: 11200 }, { day: "Nov", requests: 10800 },
    { day: "Dec", requests: 9400  }, { day: "Jan", requests: 14200 },
    { day: "Feb", requests: 18200 }, { day: "Mar", requests: 24600 },
    { day: "Apr", requests: 31400 }, { day: "May", requests: 12800 },
  ],
};

export const periodLabels: Record<string, string> = {
  "7d":  "last 7 days",
  "30d": "last 30 days",
  "90d": "last 90 days",
  "6m":  "last 6 months",
  "1y":  "last year",
};

export const ALL_MODEL_ROWS = [
  { model: "Saarika v2",    id: "saarika",       type: "ASR",         requests: 4820, tokens: "38.2M", credits: 1910, amount: "₹19,782" },
  { model: "Bulbul v2",     id: "bulbul",        type: "TTS",         requests: 3140, tokens: "21.6M", credits: 1256, amount: "₹13,002" },
  { model: "Mayura v1",     id: "mayura",        type: "Translation", requests: 2900, tokens: "17.4M", credits: 870,  amount: "₹9,003"  },
  { model: "Sarvam-2B",     id: "sarvam2b",      type: "LLM",         requests: 1650, tokens: "9.8M",  credits: 660,  amount: "₹6,831"  },
  { model: "Transliterate", id: "transliterate", type: "NLP",         requests: 980,  tokens: "4.1M",  credits: 196,  amount: "₹2,029"  },
];

export interface FilterOption { value: string; label: string; }

export const MODEL_OPTIONS: FilterOption[] = [
  { value: "saarika",       label: "Saarika v2"    },
  { value: "bulbul",        label: "Bulbul v2"     },
  { value: "mayura",        label: "Mayura v1"     },
  { value: "sarvam2b",      label: "Sarvam-2B"     },
  { value: "transliterate", label: "Transliterate" },
];

export const API_KEY_OPTIONS: FilterOption[] = [
  { value: "key_prod", label: "Production"  },
  { value: "key_dev",  label: "Development" },
  { value: "key_stg",  label: "Staging"     },
];

export const STATUS_OPTIONS: FilterOption[] = [
  { value: "2xx", label: "2xx — Success"      },
  { value: "4xx", label: "4xx — Client Error" },
  { value: "5xx", label: "5xx — Server Error" },
];

export const ENV_OPTIONS: FilterOption[] = [
  { value: "production",  label: "Production"  },
  { value: "development", label: "Development" },
  { value: "staging",     label: "Staging"     },
];

export const PERIOD_OPTIONS: FilterOption[] = [
  { value: "7d",  label: "7D"  },
  { value: "30d", label: "30D" },
  { value: "90d", label: "90D" },
  { value: "6m",  label: "6M"  },
  { value: "1y",  label: "1Y"  },
];
