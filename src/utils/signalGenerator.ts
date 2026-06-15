import { OTCSignal, SignalDirection, DayStats } from '../types';

// Deterministic seedable random number generator
export class SeededRandom {
  private seed: number;

  constructor(seedStr: string) {
    let hash = 0;
    for (let i = 0; i < seedStr.length; i++) {
      hash = seedStr.charCodeAt(i) + ((hash << 5) - hash);
    }
    this.seed = Math.abs(hash);
    if (this.seed === 0) this.seed = 8888;
  }

  // Float between [0, 1)
  next(): number {
    // Elegant sinusoidal PRNG with seed updates
    const x = Math.sin(this.seed++) * 10000;
    return x - Math.floor(x);
  }

  // Integer between [min, max]
  randomRange(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }
}

// Convert any browser time to UTC+6 (Bangladesh Standard Time)
export function getBangladeshTime(dateInput?: Date): Date {
  const d = dateInput || new Date();
  // Get universal timestamp
  const utcMs = d.getTime() + d.getTimezoneOffset() * 60000;
  // Bangladesh is UTC+6
  return new Date(utcMs + (3600000 * 6));
}

// Parse Date components in UTC+6 context
export function getDhakaTimeComponents(dateInput?: Date) {
  const dhakaDate = getBangladeshTime(dateInput);
  return {
    year: dhakaDate.getFullYear(),
    month: dhakaDate.getMonth() + 1, // 1-indexed
    day: dhakaDate.getDate(),
    hour: dhakaDate.getHours(),
    minute: dhakaDate.getMinutes(),
    second: dhakaDate.getSeconds(),
    formattedDate: `${dhakaDate.getDate().toString().padStart(2, '0')}/${(dhakaDate.getMonth() + 1).toString().padStart(2, '0')}/${dhakaDate.getFullYear()}`,
    formattedTime: dhakaDate.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    rawDate: dhakaDate
  };
}

// Format date into DD/MM/YYYY
export function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// Generate the 10 signals deterministically for a given UTC+6 Date, Hour, Pair, and Expiry length
export function generateHourlySignals(
  targetDate: string, // DD/MM/YYYY
  hour: number,       // 0-23
  pair: string,       // e.g. "USD/BDT (OTC)"
  expiry: string,      // e.g. "1 Min", "5 Min"
  currentDhakaTime: { rawDate: Date; hour: number; minute: number; second: number }
): OTCSignal[] {
  // Extract Day/Month/Year from date string for seeding
  const [dayStr, monthStr, yearStr] = targetDate.split('/');
  const yr = parseInt(yearStr) || 2026;
  const mo = parseInt(monthStr) || 6;
  const dy = parseInt(dayStr) || 15;

  // We seed based on Year, Month, Day, Hour, Pair, and Expiry to guarantee identical codes across all browsers!
  const seedString = `${yr}-${mo}-${dy}-${hour}-${pair}-${expiry}`;
  const rng = new SeededRandom(seedString);

  const signals: OTCSignal[] = [];

  // Expiry length in minutes for active calculations
  const expiryMinutes = parseInt(expiry.split(' ')[0]) || 5;

  // Generate 10 spaced slots throughout the hour (6-minute windows)
  // Window i: from (i*6) to (i*6 + 4)
  for (let i = 0; i < 10; i++) {
    const minStart = i * 6;
    const minEnd = i * 6 + 4;
    const minute = rng.randomRange(minStart, minEnd);

    // Direction (CALL or PUT)
    const direction: SignalDirection = rng.next() > 0.48 ? 'CALL' : 'PUT';

    // Accuracy (87.5% - 98.8%)
    const accuracy = Math.round((87.5 + rng.next() * 11.3) * 10) / 10;

    // Deterministic outcome for completed signals:
    // We want a high success rate (e.g. 90% Win rate with Martingale 1, 74% Direct)
    const outcomeRoll = rng.next();
    let step: string = 'Direct';
    let isWin = true;

    if (outcomeRoll < 0.74) {
      step = 'Direct';
      isWin = true;
    } else if (outcomeRoll < 0.90) {
      step = 'M1 (Martingale)';
      isWin = true;
    } else {
      step = 'Direct'; // Loss
      isWin = false;
    }

    // Time representation
    const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

    // Signal precise start calendar time in UTC+6
    // Construct Date for signal start in Dhaka time
    const signalStartDate = new Date(currentDhakaTime.rawDate.getTime());
    signalStartDate.setHours(hour, minute, 0, 0);

    const signalEndDate = new Date(signalStartDate.getTime() + (expiryMinutes * 60 * 1000));
    const nowDhaka = currentDhakaTime.rawDate;

    // Determine current live status
    let status: 'PENDING' | 'ACTIVE' | 'WIN' | 'LOSE' = 'PENDING';

    if (nowDhaka.getTime() < signalStartDate.getTime()) {
      status = 'PENDING';
    } else if (nowDhaka.getTime() >= signalStartDate.getTime() && nowDhaka.getTime() <= signalEndDate.getTime()) {
      status = 'ACTIVE';
    } else {
      // Completed, use seed-based outcome
      status = isWin ? 'WIN' : 'LOSE';
    }

    signals.push({
      id: `${seedString}-sig-${i}`,
      pair,
      date: targetDate,
      time: timeStr,
      hour,
      minute,
      direction,
      expiry,
      accuracy,
      status,
      step
    });
  }

  return signals;
}

// Generate premium deterministic statistics for the day
export function generateDayStats(
  targetDate: string,
  pair: string,
  expiry: string
): DayStats {
  const seedString = `${targetDate}-${pair}-${expiry}-dashboard-stats`;
  const rng = new SeededRandom(seedString);

  const totalSignals = 240; // 24 hours * 10 signals/hour
  const directWins = rng.randomRange(168, 182); // 70-75% Direct
  const martingaleWins = rng.randomRange(42, 51); // 17-21% Martingale M1
  const losses = totalSignals - directWins - martingaleWins;

  const winRate = Math.round(((directWins + martingaleWins) / totalSignals) * 1000) / 10;

  const trendIndex = rng.next();
  let trend: 'UPWARD' | 'DOWNWARD' | 'SIDEWAYS' = 'UPWARD';
  if (trendIndex < 0.4) {
    trend = 'UPWARD';
  } else if (trendIndex < 0.75) {
    trend = 'SIDEWAYS';
  } else {
    trend = 'DOWNWARD';
  }

  return {
    winRate,
    totalSignals,
    directWins,
    martingaleWins,
    losses,
    trend
  };
}
