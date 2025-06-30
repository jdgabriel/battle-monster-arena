import { Shield, Sword } from 'lucide-react';
import type { Monster } from '../../types/monster';

type ItemsState = {
  strongAttack: boolean;
  defense: number;
};

type ItemsDisplayProps = {
  items: ItemsState;
  monster: Monster;
};

export const ItemsDisplay = ({ items, monster }: ItemsDisplayProps) => {
  return (
    <div className="grid grid-cols-2 gap-2 w-60 items-end">
      {/* Ataque Forte */}
      <div className={`flex flex-col items-center border border-gray-500 p-2 bg-gray-800 w-full ${!items.strongAttack ? 'opacity-20' : ''}`.replace(/rounded-[a-z0-9]+/g, '').replace(/rounded/g, '')}>
        <div className="flex flex-row items-center justify-center gap-2">
          <Sword className="size-6 text-yellow-400" />
          <span className="text-lg font-bold">{monster.attack * 2}</span>
        </div>
        <span className="text-xs text-gray-400 mt-1 text-center">Ataque Forte</span>
      </div>
      {/* Defesa */}
      <div className={`flex flex-col items-center border border-gray-500 p-2 bg-gray-800 w-full ${items.defense <= 0 ? 'opacity-20' : ''}`.replace(/rounded-[a-z0-9]+/g, '').replace(/rounded/g, '')}>
        <div className="flex flex-row items-center justify-center gap-2">
          <Shield className="size-6 text-yellow-400" />
          <span className="text-lg font-bold">{items.defense > 0 ? `${items.defense}x` : '0x'}</span>
        </div>
        <span className="text-xs text-gray-400 mt-1 text-center">Defesa</span>
      </div>
    </div>
  );
}; 
