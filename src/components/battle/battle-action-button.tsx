import { useBattleStore } from '../../store/battle-store';
import { useMonsterStore } from '../../store/monster-store';

export function BattleActionButton() {
  const { winner, startBattle, resetBattle, right, left, hasBattle } = useBattleStore();
  const { resetSelectedMonsters } = useMonsterStore();

  function handleReset() {
    resetBattle();
    resetSelectedMonsters();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (!right.monster || !left.monster) return null;

  return (
    <div className='flex flex-col items-center justify-center'>
      {winner ? (
        <>
          <h3 className="text-2xl font-bold text-green-400">Vencedor: {winner.name}!</h3>
          <button onClick={handleReset} className='hover:cursor-pointer mt-4 px-6 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors duration-300'>
            Descançar da batalha!
          </button>
        </>
      ) : (
        !hasBattle && (
          <button onClick={startBattle} className='hover:cursor-pointer mt-4 px-6 py-2 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition-colors duration-300'>
            LUTEM!
          </button>
        )
      )}
    </div>
  )
} 