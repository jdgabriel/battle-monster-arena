import { useBattleStore } from '../../store/battle-store';
import { useMonsterStore } from '../../store/monster-store';
import { MonsterCard } from './monster-card';

export const MonsterList = () => {
  const { monsters, selectedMonsters } = useMonsterStore();
  const { hasBattle } = useBattleStore();

  return (
    <div className={`bg-gray-900 p-4 shadow-lg transition-opacity duration-300 ${hasBattle ? 'opacity-50 pointer-events-none' : ''}`}>
      <h2 className="text-yellow-300 font-extrabold tracking-widest text-lg uppercase drop-shadow-lg mb-4">Selecione seu Monstro</h2>
      <div className="flex flex-row pt-4 items-center justify-center h-full gap-4">
        {monsters.map((monster) => (
          <MonsterCard
            key={monster.id}
            monster={monster}
            isSelected={selectedMonsters.includes(monster.id)}
          />
        ))}
      </div>
    </div>
  );
}; 