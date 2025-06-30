import { create } from 'zustand';
import type { Monster } from '../types/monster';
import type { ItemsState } from './log-store';
import { useLogStore } from './log-store';

type MonsterBattleObj = {
  monster?: Monster;
  hp: number | null;
  items: ItemsState;
};

type BattleState = {
  hasBattle: boolean;
  right: MonsterBattleObj;
  left: MonsterBattleObj;
  winner: Monster | null;
};

type BattleStore = BattleState & {
  prepareBattle: (right?: Monster, left?: Monster) => void;
  startBattle: () => Promise<void>;
  resetBattle: () => void;
};

const defaultItems: ItemsState = { strongAttack: true, defense: 2 };

const initialState: BattleState = {
  hasBattle: false,
  right: { monster: undefined, hp: null, items: { ...defaultItems } },
  left: { monster: undefined, hp: null, items: { ...defaultItems } },
  winner: null,
};

export const useBattleStore = create<BattleStore>((set, get) => ({
  ...initialState,
  prepareBattle: (right, left) => {
    useLogStore.getState().logger.clear();
    set({
      ...initialState,
      right: {
        monster: right,
        hp: right?.hp ?? null,
        items: { ...defaultItems },
      },
      left: {
        monster: left,
        hp: left?.hp ?? null,
        items: { ...defaultItems },
      },
    });
  },
  resetBattle: () => set(initialState),
  startBattle: async () => {
    const { right, left } = get();
    if (!right.monster || !left.monster) return;

    set({ hasBattle: true, winner: null });
    const simRight = { ...right.monster, currentHp: right.hp!, items: { ...right.items } };
    const simLeft = { ...left.monster, currentHp: left.hp!, items: { ...left.items } };

    let attacker =
      simRight.speed > simLeft.speed || (simRight.speed === simLeft.speed && simRight.attack > simLeft.attack)
        ? simRight
        : simLeft;
    let defender = attacker.id === simRight.id ? simLeft : simRight;

    let round = 1;
    let done = false;
    const { logger } = useLogStore.getState();
    const stepDelay = 400;

    while (!done) {
      logger.round(round);
      await new Promise((res) => setTimeout(res, stepDelay));

      let damage = Math.max(1, attacker.attack - defender.defense);

      if (attacker.items.strongAttack && Math.random() < 0.5) {
        damage *= 2;
        attacker.items.strongAttack = false;
        logger.strongAttack(attacker.name);
        set((state) => ({
          right: attacker.id === simRight.id ? { ...state.right, items: { ...attacker.items } } : state.right,
          left: attacker.id === simLeft.id ? { ...state.left, items: { ...attacker.items } } : state.left,
        }));
        await new Promise((res) => setTimeout(res, stepDelay));
      }

      logger.attack(attacker.name, defender.name);
      await new Promise((res) => setTimeout(res, stepDelay));

      if (defender.items.defense > 0 && Math.random() < 0.5) {
        damage = 0;
        defender.items.defense -= 1;
        logger.defense(defender.name);
        set((state) => ({
          right: defender.id === simRight.id ? { ...state.right, items: { ...defender.items } } : state.right,
          left: defender.id === simLeft.id ? { ...state.left, items: { ...defender.items } } : state.left,
        }));
        await new Promise((res) => setTimeout(res, stepDelay));
      }

      const hpBeforeAttack = defender.currentHp;
      defender.currentHp = Math.max(0, defender.currentHp - damage);

      for (let h = hpBeforeAttack; h >= defender.currentHp; h--) {
        set((prev) => ({
          right: defender.id === simRight.id ? { ...prev.right, hp: h } : prev.right,
          left: defender.id === simLeft.id ? { ...prev.left, hp: h } : prev.left,
        }));
        await new Promise((res) => setTimeout(res, 60));
      }

      logger.damage(defender.name, damage, defender.currentHp);
      await new Promise((res) => setTimeout(res, stepDelay));

      if (defender.currentHp <= 0) {
        logger.defeat(defender.name);
        await new Promise((res) => setTimeout(res, stepDelay));
        logger.winner(attacker.name);
        await new Promise((res) => setTimeout(res, stepDelay));
        done = true;
      } else {
        [attacker, defender] = [defender, attacker];
        round++;
      }
    }

    set({
      winner: [right.monster, left.monster].find((m) => m?.id === attacker.id) || null,
      hasBattle: false,
      right: { ...get().right, items: simRight.items },
      left: { ...get().left, items: simLeft.items },
    });
  },
})); 