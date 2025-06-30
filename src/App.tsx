import { Battle } from "./components/battle/battle";
import { BattleRules } from "./components/info/battle-rules";
import { MonsterForm } from "./components/monster/monster-form";
import { MonsterList } from "./components/monster/monster-list";

export function App() {
  return (
    <div className="bg-gray-900 min-h-screen text-white font-mono p-4 sm:p-8">
      <header className="text-center mb-8 sm:mb-12">
        <h1 className="text-4xl uppercase sm:text-5xl font-extrabold text-yellow-400 drop-shadow-lg">
          Arena de Batalha dos Monstros
        </h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 sm:mb-12">
        <div className="border-2 border-gray-700 col-span-1 divide-y divide-gray-500">
          <MonsterForm />
          <BattleRules />
        </div>
        <div className="max-h-[54rem] overflow-y-auto border-2 border-gray-700 col-span-1 md:col-span-2">
          <MonsterList />
        </div>
      </div>
      <Battle />
    </div>
  )
}

