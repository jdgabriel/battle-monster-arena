import { useBattleStore } from "../../store/battle-store";
import { useMonsterStore } from "../../store/monster-store";

export function WinnerMessage() {
  const { resetSelectedMonsters } = useMonsterStore();
  const {
    winner,
    startBattle,
    resetBattle,
  } = useBattleStore();

  function handleReset() {
    resetBattle();
    resetSelectedMonsters();
  };

  return (
    <>
      {winner ? (
        <div>
          <h3 className="text-2xl font-bold text-green-400">Vencedor: {winner.name}!</h3>
          <button onClick={handleReset} className='mt-4 px-6 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors duration-300'>
            Reiniciar Batalha
          </button>
        </div>
      ) : (
        <button onClick={startBattle} className='mt-4 px-6 py-2 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition-colors duration-300'>
          Lutar!
        </button>
      )}
    </>
  );
}