import { create } from 'zustand';
import { monstersList } from '../system/monsters-seed';
import type { Monster } from '../types/monster';

type MonsterStore = {
  monsters: Monster[];
  selectedMonsters: string[];
  addMonster: (monster: Omit<Monster, 'id'>) => void;
  toggleSelectMonster: (monsterId: string) => void;
  resetSelectedMonsters: () => void;
};

const initialMonsters: Monster[] = monstersList;

export const useMonsterStore = create<MonsterStore>((set, get) => ({
  monsters: initialMonsters,
  selectedMonsters: [],
  addMonster: (monster) =>
    set((state) => ({
      monsters: [...state.monsters, { id: crypto.randomUUID(), ...monster }],
    })),
  toggleSelectMonster: (monsterId) => {
    const { selectedMonsters } = get();
    const isSelected = selectedMonsters.includes(monsterId);
    let newSelectedMonsters: string[];

    if (isSelected) {
      newSelectedMonsters = selectedMonsters.filter((id) => id !== monsterId);
    } else {
      if (selectedMonsters.length < 2) {
        newSelectedMonsters = [...selectedMonsters, monsterId];
      } else {
        newSelectedMonsters = selectedMonsters;
      }
    }
    set({ selectedMonsters: newSelectedMonsters });
  },
  resetSelectedMonsters: () => set({ selectedMonsters: [] }),
})); 