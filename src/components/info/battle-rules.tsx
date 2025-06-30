export function BattleRules() {
  return (
    <section className="p-4">
      <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-green-900 border-2 border-yellow-700 shadow-lg p-4 max-w-2xl mx-auto">
        <h2 className="text-yellow-300 font-extrabold tracking-widest text-lg uppercase drop-shadow-lg mb-4">Regras da Batalha</h2>
        <ul className="list-disc list-inside text-white space-y-2 text-base">
          <li>O monstro com a maior <span className="text-blue-400 font-bold">velocidade</span> faz o primeiro ataque; se ambas as velocidades forem iguais, o monstro com o maior <span className="text-red-400 font-bold">ataque</span> vai primeiro.</li>
          <li>Cada monstro tem <span className="text-yellow-400 font-bold">2 itens</span>:</li>
          <ul className="ml-6 list-[circle]">
            <li><span className="text-yellow-400 font-bold">Ataque forte</span>: Dobra o valor do ataque normal, pode ser usado 1 vez.</li>
            <li><span className="text-blue-400 font-bold">Defesa</span>: Protege de um ataque, pode ser usada 2 vezes.</li>
          </ul>
        </ul>
      </div>
    </section>
  );
}