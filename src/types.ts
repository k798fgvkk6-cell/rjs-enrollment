export type Currency = 'PHP' | 'USD';

export interface ProtocolStep {
  id: number;
  stepNumber: string;
  title: string;
  timing: string;
  badge: string;
  description: string;
  deepDive: {
    rule: string;
    action: string;
    invalidation: string;
    mistakeToAvoid: string;
  };
}

export interface ModuleItem {
  number: string;
  title: string;
  tag: string;
  keyword: string;
  duration: string;
  summary: string;
}

export interface TradeRecord {
  id: string;
  tradeNumber: number;
  date: string;
  pair: string;
  direction: 'BUY' | 'SELL';
  sessionTime: string;
  breakoutConfirmed: boolean;
  fibLevel: string;
  riskRewardTarget: string;
  status: 'TP_HIT' | 'SL_HIT' | 'BE_HIT' | 'TP_1_1' | 'TP_1_2' | 'TP_1_3';
  pnlR: number;
  notes: string;
  pnlDollar?: number;
  isCustomDollar?: boolean;
}

export interface EconomicEvent {
  day: string;
  date: string;
  time: string;
  event: string;
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  deskStatus: 'TRADABLE' | 'CAUTION_1_1' | 'STAND_DOWN';
  directive: string;
}
