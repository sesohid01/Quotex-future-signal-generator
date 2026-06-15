export interface OTCMarketPair {
  symbol: string; // e.g. "USD/BDT (OTC)"
  name: string;   // e.g. "US Dollar / Bangladeshi Taka"
  payout: number; // e.g. 92 (92% payout)
  flag: string;   // flag code or emoji
}

export type SignalDirection = 'CALL' | 'PUT';

export interface OTCSignal {
  id: string;
  pair: string;
  date: string;       // DD/MM/YYYY
  time: string;       // HH:MM (UTC+6 Dhaka)
  hour: number;       // The hour slot (0-23)
  minute: number;     // The exact minute of entry
  direction: SignalDirection;
  expiry: string;     // e.g. "1 Min", "5 Min"
  accuracy: number;   // e.g. 93.4 (deterministic accuracy score)
  status: 'PENDING' | 'ACTIVE' | 'WIN' | 'LOSE';
  step: string;       // e.g. "Direct", "M1" (Martingale 1)
}

export interface DayStats {
  winRate: number;
  totalSignals: number;
  directWins: number;
  martingaleWins: number;
  losses: number;
  trend: 'UPWARD' | 'DOWNWARD' | 'SIDEWAYS';
}

