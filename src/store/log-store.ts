import { create } from 'zustand';

export type ItemsState = {
  strongAttack: boolean;
  defense: number;
};

type LogEntry = {
  message: string;
  method: keyof LoggerMethods;
  timestamp: number;
};

type LogStoreState = {
  logs: LogEntry[];
};

type LoggerMethods = {
  round: (round: number) => void;
  attack: (attacker: string, defender: string) => void;
  strongAttack: (attacker: string) => void;
  defense: (defender: string) => void;
  damage: (defender: string, damage: number, hpLeft: number) => void;
  defeat: (defeated: string) => void;
  winner: (winner: string) => void;
  clear: () => void;
};

type LogStore = LogStoreState & {
  logger: LoggerMethods;
};

const initialState: LogStoreState = {
  logs: []
};

type BattleEvent = { 
  type: 'log';
  method:LogEntry['method'];
  args: unknown[];
}

const getLogMessage: (event: Extract<BattleEvent, { type: 'log' }>) => string = (event) => {
  const messages: Record<string, (args: unknown[]) => string> = {
    round: ([round]) => `--- INÍCIO DA RODADA #${round} ---`,
    attack: ([monster1, monster2]) => `${monster1} atacou ${monster2}!`,
    strongAttack:  ([monster]) => `${monster} usou Ataque Forte!`,
    defense: ([monster]) => `${monster} defendeu o ataque!`,
    damage:  ([monster, damage, hpLeft]) => `${monster} recebeu ${damage} de dano e está com ${hpLeft} de vida.`,
    defeat:  ([monster]) => `${monster} foi derrotado!`,
    winner:  ([monster]) => `${monster} é o vencedor!`,
  };
  return messages[event.method]?.(event.args) ?? '';
};

export const useLogStore = create<LogStore>((set) => {
  const addLogAndEvent = (event: Extract<BattleEvent, { type: 'log' }>) =>
    set((state) => ({
      logs: [...state.logs, { method: event.method, message: getLogMessage(event), timestamp: Date.now() }]
    }));

  return {
    ...initialState,
    logger: {
      round: (round) => addLogAndEvent({ type: 'log', method: 'round', args: [round] }),
      attack: (attacker, defender) => addLogAndEvent({ type: 'log', method: 'attack', args: [attacker, defender] }),
      strongAttack: (attacker) => addLogAndEvent({ type: 'log', method: 'strongAttack', args: [attacker] }),
      defense: (defender) => addLogAndEvent({ type: 'log', method: 'defense', args: [defender] }),
      damage: (defender, damage, hpLeft) => addLogAndEvent({ type: 'log', method: 'damage', args: [defender, damage, hpLeft] }),
      defeat: (defeated) => addLogAndEvent({ type: 'log', method: 'defeat', args: [defeated] }),
      winner: (winner) => addLogAndEvent({ type: 'log', method: 'winner', args: [winner] }),
      clear: () => set({ logs: []}),
    },
  };
}); 