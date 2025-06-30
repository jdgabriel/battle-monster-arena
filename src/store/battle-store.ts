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
    const monsterRight = { ...right.monster, currentHp: right.hp!, items: { ...right.items } };
    const monsterLeft = { ...left.monster, currentHp: left.hp!, items: { ...left.items } };

    let attacker =
      monsterRight.speed > monsterLeft.speed || (monsterRight.speed === monsterLeft.speed && monsterRight.attack > monsterLeft.attack)
        ? monsterRight
        : monsterLeft;
    let defender = attacker.id === monsterRight.id ? monsterLeft : monsterRight;

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
          right: attacker.id === monsterRight.id ? { ...state.right, items: { ...attacker.items } } : state.right,
          left: attacker.id === monsterLeft.id ? { ...state.left, items: { ...attacker.items } } : state.left,
        }));
        await new Promise((res) => setTimeout(res, stepDelay));
      }

      logger.attack(attacker.name, defender.name);
      await new Promise((res) => setTimeout(res, stepDelay));

      const defenderMaxHp = defender.hp ?? defender.currentHp;
      // Com 30% ou menos de vida, o item de Defesa é usado. Caso ainda tenha.
      const defenderLowHp = defender.currentHp <= 0.3 * defenderMaxHp;

      if (defender.items.defense > 0 && defenderLowHp) {
        damage = 0;
        defender.items.defense -= 1;
        logger.defense(defender.name);
        set((state) => ({
          right: defender.id === monsterRight.id ? { ...state.right, items: { ...defender.items } } : state.right,
          left: defender.id === monsterLeft.id ? { ...state.left, items: { ...defender.items } } : state.left,
        }));
        await new Promise((res) => setTimeout(res, stepDelay));
      }

      const hpBeforeAttack = defender.currentHp;
      defender.currentHp = Math.max(0, defender.currentHp - damage);

      for (let h = hpBeforeAttack; h >= defender.currentHp; h--) {
        set((prev) => ({
          right: defender.id === monsterRight.id ? { ...prev.right, hp: h } : prev.right,
          left: defender.id === monsterLeft.id ? { ...prev.left, hp: h } : prev.left,
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
      right: { ...get().right, items: monsterRight.items },
      left: { ...get().left, items: monsterLeft.items },
    });
  },
})); 