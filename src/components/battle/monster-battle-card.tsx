import type { ItemsState } from '../../store/log-store';
import type { Monster } from '../../types/monster';
import { MonsterCard } from '../monster/monster-card';
import { EmptyMonsterCard } from './empty-monster-card';
import { ItemsDisplay } from './items-display';

interface MonsterBattleCardProps {
  monster?: Monster;
  currentHp?: number | null;
  items?: ItemsState;
}

export function MonsterBattleCard({ monster, currentHp, items }: MonsterBattleCardProps) {
  if (!monster) return <EmptyMonsterCard />;

  return (
    <>
      <MonsterCard disabled monster={monster} isSelected={false} currentHp={currentHp ?? monster.hp} />
      {items && <ItemsDisplay items={items} monster={monster} />}
    </>
  );
} 