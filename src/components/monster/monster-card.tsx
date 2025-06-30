import { Heart, Shield, Sword, Zap } from 'lucide-react';
import { useMonsterStore } from '../../store/monster-store';
import type { Monster } from '../../types/monster';

type MonsterSelectionCardProps = {
  monster: Monster;
  isSelected: boolean;
  currentHp?: number;
  disabled?: boolean;
};

export const MonsterCard = ({ monster, isSelected, currentHp, disabled = false }: MonsterSelectionCardProps) => {
  const { toggleSelectMonster } = useMonsterStore();

  const hpValue = typeof currentHp === 'number' ? currentHp : monster.hp;

  return (
    <div
      className={`w-60 shadow-2xl bg-gradient-to-br from-gray-800 via-gray-900 to-gray-700 relative overflow-hidden border-2 transition-all duration-300
        ${disabled ? '' : 'cursor-pointer'}
        ${isSelected ? 'border-yellow-400 scale-105' : (!disabled ? 'border-gray-500 hover:border-yellow-300' : 'border-gray-500')}`.replace(/rounded-[a-z0-9]+/g, '').replace(/rounded/g, '')}
      style={isSelected ? { boxShadow: '0 0 24px 4px rgba(255, 215, 0, 0.3), 0 2px 8px 0 rgba(0,0,0,0.5)' } : {}}
      onClick={disabled ? undefined : () => toggleSelectMonster(monster.id)}
      tabIndex={disabled ? -1 : 0}
    >
      {/* Artwork and Speed Cost */}
      <div className="relative">
        <img
          src={monster.imageUrl}
          alt={monster.name}
          className="w-full h-60 object-cover object-top"
        />
        <div className="absolute top-2 left-2 bg-black/40 bg-opacity-60 rounded-full min-w-[5rem] h-9 flex items-center justify-center text-white font-bold text-lg border-2 border-gray-400 gap-1">
          <Zap className="size-5 text-yellow-300" />
          <span>{monster.speed}</span>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-3 bg-gray-800">
        <h3 className="text-base font-bold text-white text-center mb-3 truncate">{monster.name}</h3>

        {/* Main Stats: Attack and Defense */}
        <div className="flex justify-around items-center text-white mb-3">
          <div className="flex items-center gap-2">
            <Sword className="text-red-400 w-5 h-5" />
            <span className="font-bold text-lg">{monster.attack}</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="text-blue-400 w-5 h-5" />
            <span className="font-bold text-lg">{monster.defense}</span>
          </div>
        </div>

        {/* HP Bar */}
        <div className="text-gray-400 text-md mt-4">
          <div className="flex justify-between items-center mb-1">
            <span className="font-bold text-green-400 flex items-center gap-1"><Heart className="size-5" /> HP</span>
            <span>{hpValue} / {monster.hp}</span>
          </div>
          <div className="bg-gray-600 w-full h-4 rounded-md overflow-hidden">
            <div
              className='bg-green-500 h-full'
              style={{ width: `${Math.max(0, Math.min(100, (hpValue / monster.hp) * 100))}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 