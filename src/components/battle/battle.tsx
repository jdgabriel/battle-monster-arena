import { useEffect } from 'react';
import { useBattleStore } from '../../store/battle-store';
import { useMonsterStore } from '../../store/monster-store';
import { DisplayBattleLogs } from './display-battle-logs';
import { MonsterBattleCard } from './monster-battle-card';
import { VersusIcon } from './versus-icon';

export const Battle = () => {
  const { monsters, selectedMonsters } = useMonsterStore();
  const {
    right,
    left,
    prepareBattle,
    resetBattle,
  } = useBattleStore();

  useEffect(() => {
    const [m1, m2] = selectedMonsters
      .map((id) => monsters.find((m) => m.id === id))
      .filter(Boolean);
    prepareBattle(m1, m2);
  }, [selectedMonsters, monsters, prepareBattle, resetBattle]);

  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-green-900 border-3 border-yellow-700 p-4 shadow-2xl">
      <h2 className="text-yellow-300 font-extrabold tracking-widest text-lg uppercase drop-shadow-lg text-center mb-6">Arena</h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-8">
        <div className="flex flex-col items-center space-y-2 mb-6 md:mb-0">
          <MonsterBattleCard monster={right.monster} currentHp={right.hp} items={right.items} />
        </div>
        <div className="flex flex-col items-center justify-center mx-0 md:mx-4 mb-6 md:mb-0">
          <VersusIcon />
        </div>
        <div className="flex flex-col items-center space-y-2">
          <MonsterBattleCard monster={left.monster} currentHp={left.hp} items={left.items} />
        </div>
      </div>
      <DisplayBattleLogs />
    </div>
  );
}; 
