import { ProtocolStep, ModuleItem, TradeRecord, EconomicEvent } from '../types';

export const PROTOCOL_STEPS: ProtocolStep[] = [
  {
    id: 1,
    stepNumber: '01',
    title: 'Pre-Market Trendlines',
    timing: 'UP TO 9:30 PM (PHT / NY OPEN)',
    badge: 'STRUCTURAL CONTEXT',
    description: 'Update all higher-timeframe trendlines, support & resistance zones, and Forex Factory red-folder filters before session bell.',
    deepDive: {
      rule: 'Map 4H and 1H directional order flow. Do not place any market or pending orders prior to 9:30 PM.',
      action: 'Check Forex Factory for high-impact USD events. Mark previous day high (PDH) and previous day low (PDL).',
      invalidation: 'If red-folder CPI or FOMC drops within 15 minutes of open, desk activates standby hold.',
      mistakeToAvoid: 'Entering prematurely during Asian or London afternoon drift without New York volume.'
    }
  },
  {
    id: 2,
    stepNumber: '02',
    title: 'Mark Session Levels',
    timing: 'EXACTLY AT 9:30 PM',
    badge: 'LEVEL LOCK',
    description: 'Pinpoint and lock the active Session High and Session Low on your TradingView layout. No trading prior to this timestamp.',
    deepDive: {
      rule: 'Lock the exact candle extrema between 8:00 PM and 9:30 PM PHT. This creates the primary expansion boundary.',
      action: 'Draw horizontal line on Session High and Session Low. Set alerts 2 pips outside each level.',
      invalidation: 'Any false wick that does not close outside boundary is strictly disregarded.',
      mistakeToAvoid: 'Altering session boundaries dynamically once the 9:30 PM candle is initiated.'
    }
  },
  {
    id: 3,
    stepNumber: '03',
    title: 'Wait for 15M Breakout',
    timing: 'STRUCTURAL EXPANSION',
    badge: 'VOLUME CONFIRMATION',
    description: 'Require a verified body close on the 15-Minute candle beyond marked session limits. Never front-run the momentum.',
    deepDive: {
      rule: 'The candle body MUST print and finalize beyond the session level on the 15-minute timeframe. Wicks do NOT count.',
      action: 'Wait for the 15M candle close at 9:45 PM or 10:00 PM. Confirm volume expansion relative to pre-session average.',
      invalidation: 'A wick-out that closes inside the session range indicates liquidity sweep, not breakout.',
      mistakeToAvoid: 'Jumping into an open candle before the countdown timer hits 00:00.'
    }
  },
  {
    id: 4,
    stepNumber: '04',
    title: 'Wait for the Pullback',
    timing: 'PATIENCE FILTER',
    badge: 'DISCIPLINE DRILL',
    description: 'Chasing impulses is forbidden. Let price breathe and retrace back into historical support/resistance structure.',
    deepDive: {
      rule: 'Never market-buy green expansion tops or market-sell red exhaustion spikes.',
      action: 'Drop to 5M/3M timeframe to identify the mitigation of broken structure or fair value confluence.',
      invalidation: 'If price accelerates parabolically without pulling back, we let it go. Discipline > Fear of Missing Out.',
      mistakeToAvoid: 'Buying the highs due to FOMO when green candles shoot up rapidly.'
    }
  },
  {
    id: 5,
    stepNumber: '05',
    title: 'Apply Fibonacci Tool',
    timing: 'CONFLUENCE ANCHOR',
    badge: 'SNIPER CALIBRATION',
    description: 'Pull swing Fibonacci retracements to align your sniper entry, invalidation level, and target 1:3 mathematical trajectory.',
    deepDive: {
      rule: 'Anchor Fibonacci from the impulsive swing low to the swing high (or vice-versa for shorts).',
      action: 'Target the proprietary structural confluence zone matching broken session structural line.',
      invalidation: 'Retracement beyond structural invalidation voids the impulse structure; trade canceled.',
      mistakeToAvoid: 'Drawing Fibonacci backwards or anchoring to arbitrary internal noise.'
    }
  },
  {
    id: 6,
    stepNumber: '06',
    title: 'Fixed SL & Risk Budget',
    timing: 'CAPITAL PRESERVATION',
    badge: 'MATHEMATICAL SHIELD',
    description: 'Calculate exact position lot size so your stop loss never exceeds your predetermined risk budget. Zero second-guessing.',
    deepDive: {
      rule: 'Exact 1.0% or 0.5% account capital risked. Position size is mathematically derived: (Account × Risk%) / (Pips × PipValue).',
      action: 'Place Stop Loss 2-3 pips beyond structural swing invalidation. Pre-input target Take Profit at exact 1:3 RRR.',
      invalidation: 'Moving Stop Loss wider during an active trade is grounds for immediate desk expulsion.',
      mistakeToAvoid: 'Roughly estimating lot size with round numbers (e.g. standard 1.00 lot blindly).'
    }
  },
  {
    id: 7,
    stepNumber: '07',
    title: 'Execute & Close The Day',
    timing: 'TERMINATION PROTOCOL',
    badge: 'THE CORE RULE',
    description: '1 Trade A Day. If Win: 1:3 RRR banked. If Loss: SL hit. Either way: Close TradingView, log audit, and shut down.',
    deepDive: {
      rule: 'Strict 1 position maximum per 24 hours. At 2:00 AM PHT, mandatory Breakeven lock or chart terminal shutdown.',
      action: 'Enter position. Set alerts for TP / SL / 2:00 AM Breakeven. Step away from the monitor immediately.',
      invalidation: 'Revenge trading is physically impossible when your trading screen is shut down.',
      mistakeToAvoid: 'Sitting in front of the charts staring at fluctuating tick candles and second-guessing.'
    }
  }
];

export const PHASE_1_MODULES: ModuleItem[] = [
  {
    number: '01',
    title: 'Phase 1 Start',
    tag: 'FOUNDATION',
    keyword: 'DISCIPLINE',
    duration: '24 mins',
    summary: 'Welcome to the program'
  },
  {
    number: '02',
    title: 'Objective and Trader Identity',
    tag: 'MINDSET SHIFT',
    keyword: 'MECHANICAL',
    duration: '31 mins',
    summary: 'What is intra day trading'
  },
  {
    number: '03',
    title: 'RJS Core System',
    tag: 'CORE EDGE',
    keyword: 'PROTOCOL',
    duration: '42 mins',
    summary: 'Ryan Jade strategy and its concepts, learn the concepts and indicator then execute the strategy'
  },
  {
    number: '04',
    title: 'Forex Factory Updated',
    tag: 'RISK FILTER',
    keyword: 'CLEARANCE',
    duration: '28 mins',
    summary: 'Learn when to trade and when not to trade, reduce the risk of losing by not exposing yourself to risky markets'
  },
  {
    number: '05',
    title: 'Trading Flow, Review and Power of Fibonacci',
    tag: 'ENTRY ANCHOR',
    keyword: 'CONFLUENCE',
    duration: '38 mins',
    summary: 'Updating your chart, knowing when to close your position'
  },
  {
    number: '06',
    title: 'Psychology of TP',
    tag: 'GREED CONTROL',
    keyword: 'TARGET',
    duration: '35 mins',
    summary: 'Solution to fix these problems: Overconfidence = Overtrading = Too many losses'
  },
  {
    number: '07',
    title: 'Psychology of SL',
    tag: 'ACCEPTANCE',
    keyword: 'VALIDATED',
    duration: '33 mins',
    summary: 'Reason behind your losses'
  }
];

export const PHASE_2_MODULES: ModuleItem[] = [
  {
    number: '01',
    title: 'Phase 2 Start',
    tag: 'EXPANSION',
    keyword: 'WELCOME',
    duration: '45 mins',
    summary: 'Congrats and welcome'
  },
  {
    number: '02',
    title: 'Protecting Your Trading Journey',
    tag: 'RISK ARCHITECTURE',
    keyword: 'STRATEGY',
    duration: '39 mins',
    summary: '4 strategy vs 1 strategy (T, C, P)'
  },
  {
    number: '03',
    title: 'Swing',
    tag: 'CLASSIFICATION',
    keyword: 'SWING',
    duration: '40 mins',
    summary: 'Identify scalp, intra day, swing'
  },
  {
    number: '04',
    title: 'RJS + Support and Resistance',
    tag: 'HTF CONFLUENCE',
    keyword: 'LEVELS',
    duration: '44 mins',
    summary: 'Applying a new concept to RJS'
  },
  {
    number: '05',
    title: 'Aiming a 1:4 and 1:5 RRR',
    tag: 'SCALE MULTIPLIER',
    keyword: 'ASYMMETRY',
    duration: '52 mins',
    summary: 'Maximizing opportunity in the market'
  },
  {
    number: '06',
    title: 'Surprise Module',
    tag: 'EXCLUSIVE DESK',
    keyword: 'EXCLUSIVE',
    duration: '48 mins',
    summary: 'Exclusive desk masterclass unlocked in Phase 2'
  },
  {
    number: '07',
    title: 'POI For a Swing',
    tag: 'SWING ENTRY',
    keyword: 'SWINGPOI',
    duration: '46 mins',
    summary: 'Finding and identifying a swing trade'
  },
  {
    number: '08',
    title: 'Handling a Swing Position',
    tag: 'TRADE MANAGEMENT',
    keyword: 'CLOSEPOSITION',
    duration: '42 mins',
    summary: 'When to close a position'
  }
];

export const INITIAL_AUDIT_LOGS: TradeRecord[] = [
  {
    id: 't-01',
    tradeNumber: 1,
    date: 'OCT 20, 2026',
    pair: 'USTECH100',
    direction: 'BUY',
    sessionTime: '9:30 PM PHT',
    breakoutConfirmed: true,
    fibLevel: 'CONFLUENCE',
    riskRewardTarget: '1:3.0',
    status: 'TP_1_3',
    pnlR: 3.0,
    notes: 'Clean 15M body close above pre-market high on USTECH100. Target 3 (+3.0R) banked cleanly.'
  },
  {
    id: 't-02',
    tradeNumber: 2,
    date: 'OCT 21, 2026',
    pair: 'USTECH100',
    direction: 'SELL',
    sessionTime: '9:30 PM PHT',
    breakoutConfirmed: true,
    fibLevel: 'CONFLUENCE',
    riskRewardTarget: 'BE',
    status: 'BE_HIT',
    pnlR: 0.0,
    notes: 'High-impact news caution protocol day. Reached +1.2R, moved SL to BE as mandated. Closed at 0.0R.'
  },
  {
    id: 't-03',
    tradeNumber: 3,
    date: 'OCT 22, 2026',
    pair: 'USTECH100',
    direction: 'BUY',
    sessionTime: '9:30 PM PHT',
    breakoutConfirmed: true,
    fibLevel: 'CONFLUENCE',
    riskRewardTarget: '1:3.0',
    status: 'SL_HIT',
    pnlR: -1.0,
    notes: 'Invalidation triggered cleanly on USTECH100. Strict risk preserved. Screen closed at 10:15 PM.'
  }
];

export const WEEKLY_FOREX_CALENDAR: EconomicEvent[] = [
  {
    day: 'MON',
    date: 'OCT 26',
    time: '10:00 PM PHT',
    event: 'US ISM Manufacturing PMI',
    impact: 'MEDIUM',
    deskStatus: 'TRADABLE',
    directive: 'Normal 9:30 PM execution. Maintain standard 1:3 RRR target.'
  },
  {
    day: 'TUE',
    date: 'OCT 27',
    time: '10:00 PM PHT',
    event: 'US CB Consumer Confidence',
    impact: 'MEDIUM',
    deskStatus: 'TRADABLE',
    directive: 'Clean structure expected. Standard 1 trade protocol.'
  },
  {
    day: 'WED',
    date: 'OCT 28',
    time: '8:15 PM PHT',
    event: 'US ADP Non-Farm Employment',
    impact: 'HIGH',
    deskStatus: 'TRADABLE',
    directive: 'News drops 75 mins prior to NY Open. Levels will be calibrated by 9:30 PM.'
  },
  {
    day: 'THU',
    date: 'OCT 29',
    time: '8:30 PM PHT',
    event: 'US Core PCE Price Index (Red Folder)',
    impact: 'HIGH',
    deskStatus: 'CAUTION_1_1',
    directive: 'Red folder release. Tighten SL, lock Breakeven at 1:1, or Stand Down.'
  },
  {
    day: 'FRI',
    date: 'OCT 30',
    time: '8:30 PM PHT',
    event: 'US Non-Farm Payrolls (NFP) & Unemployment',
    impact: 'HIGH',
    deskStatus: 'STAND_DOWN',
    directive: 'EXTREME VOLATILITY. Desk Stand Down mandated. Zero executions.'
  }
];

export const FAQS = [
  {
    q: 'Why do we only trade strictly after 9:30 PM?',
    a: 'In Philippine Time (PHT), 9:30 PM marks the official New York Session equity bell (9:30 AM EST). This is when institutional volume floods the markets, creating authentic 15-minute breakouts and genuine Fibonacci follow-through. By never opening charts before 9:30 PM, you avoid Asian and early London fakeouts, spread traps, and useless screen time.'
  },
  {
    q: 'How do the two 90-minute private calls work?',
    a: 'If you choose the Full Mentorship, you receive two dedicated 90-minute private 1-on-1 sessions directly with Ryan Jade on Zoom/Google Meet. The first call occurs after you complete Phase 1 to audit your 20-trade journal and eliminate execution flaws. The second call takes place in Phase 2 to calibrate advanced swing points and scale position sizing.'
  },
  {
    q: 'What if I purchase the Standalone Vault and want calls later?',
    a: 'Under our Mentorship Credit Guarantee, 100% of the money you pay for the Standalone Vault can be credited directly towards the Full Mentorship Program if you decide to upgrade within 30 days. You only pay the difference, making your entry completely risk-free.'
  },
  {
    q: 'What happens on high-impact US Red Folder news days?',
    a: 'We release a standardized Weekly Market Readiness Protocol every Sunday. On days with extreme releases (like NFP, CPI, or FOMC rate drops), we enforce a strict NO TRADE DAY or a 1:1 Take Profit / Breakeven Lockout to completely protect your capital from violent slippage and spread widening.'
  },
  {
    q: 'Why are there secret keywords at the end of video modules?',
    a: 'To maintain desk integrity and ensure no student skips fundamental risk management, every lesson reveals a single-word verification code. You log these onto your fillable audit PDF to prove you watched and absorbed each rule before receiving clearance to book diagnostic calls or unlock Phase 2.'
  },
  {
    q: 'Is this applicable to Forex, Crypto, or Prop Firm Challenges?',
    a: 'The mechanical 1-trade-a-day system is optimized specifically for major Forex pairs (EUR/USD, GBP/USD) during the NY session, but the mathematical 1:3 RRR risk management framework has helped hundreds of students pass FTMO, FundedNext, and 5%ers challenges with zero overtrading violations.'
  }
];
