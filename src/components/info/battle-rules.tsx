import { Shield, Sword, Zap } from 'lucide-react';

export function BattleRules() {
  return (
    <section className="p-4">
      <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-green-900 border-2 border-yellow-700 shadow-lg p-4 max-w-2xl mx-auto">
        <h2 className="text-yellow-300 font-extrabold tracking-widest text-lg uppercase drop-shadow-lg mb-4">Regras da Batalha</h2>
        <p>
          O monstro com a maior <span className="text-yellow-300 font-bold inline-block">Velocidade <Zap className="size-4 inline-block" /></span> faz o primeiro ataque;
          se ambas as velocidades forem iguais, o monstro com o maior{" "}
          <span className="text-red-400 font-bold inline-block">Ataque <Sword className="size-4 inline-block" /></span> vai primeiro.
        </p>

        <ul className="list-disc list-inside text-white space-y-2 text-base">
          <li>Cada monstro possui<span className="text-yellow-400 font-bold">2 itens</span> dentro da arena:</li>
          <ul className="ml-6 list-none">
            <li><span className="text-red-400 font-bold inline-block">Ataque forte <Sword className="size-4 inline-block" /></span> - Dobra o valor do ataque normal, pode ser usado 1 vez.</li>
            <li><span className="text-blue-400 font-bold inline-block">Defesa <Shield className="size-4 text-blue-400 inline-block" /></span> -  Protege de um ataque, pode ser usada 2 vezes.</li>
          </ul>
          <li>
            O monstro que estiver com{" "}
            <span className="text-yellow-400 font-bold">30% ou menos de vida</span>{" "}
            irá usar automaticamente{" "}
            <span className="text-blue-400 font-bold inline-block">Defesa <Shield className="size-4 text-blue-400 inline-block" /></span>, caso ainda tenha.</li>
        </ul>
      </div>
    </section>
  );
}