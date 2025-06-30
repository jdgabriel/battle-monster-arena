import { HeartCrack, RefreshCw, Shield, Sword, Swords, Trophy, Zap } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useBattleStore } from '../../store/battle-store';
import { useLogStore } from '../../store/log-store';

const logIcons = {
  round: <RefreshCw className="inline w-4 h-4 text-blue-400 mr-1" />, // round
  attack: <Sword className="inline w-4 h-4 text-red-400 mr-1" />, // attack
  strongAttack: <Zap className="inline w-4 h-4 text-yellow-400 mr-1" />, // strong attack
  defense: <Shield className="inline w-4 h-4 text-blue-400 mr-1" />, // defense
  damage: <HeartCrack className="inline w-4 h-4 text-pink-400 mr-1" />, // damage
  defeat: <Swords className="inline w-4 h-4 text-gray-400 mr-1" />, // defeat
  winner: <Trophy className="inline w-4 h-4 text-yellow-400 mr-1" />, // winner
};

export const DisplayBattleLogs = () => {
  const scrollStartBattle = useRef<HTMLDivElement>(null);
  const scrollLogs = useRef<HTMLDivElement>(null);
  const { right, left } = useBattleStore();
  const { logs } = useLogStore();

  useEffect(() => {
    if (right.monster && left.monster) {
      scrollStartBattle.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [right.monster, left.monster]);

  useEffect(() => {
    scrollLogs.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  console.log(logs);

  return (
    <>
      <div className="mt-6 data-[disabled=true]:hidden data-[disabled=true]:pointer-events-none" data-disabled={logs.length === 0}>
        <h3 className="text-xl font-bold mb-2 text-yellow-400">Registro da Batalha</h3>
        <div className="h-48 bg-gray-900 rounded-lg p-4 overflow-y-auto border-2 border-gray-700">
          {logs.length > 0 && (
            <ul className="text-sm text-white space-y-1">
              {logs.map((log) => {
                return (
                  <li key={log.timestamp} className="flex items-center gap-1">
                    {logIcons[log.method as keyof typeof logIcons]}
                    <span>{log.message}</span>
                  </li>
                );
              })}
            </ul>
          )}
          <div ref={scrollLogs} />
        </div>
      </div>
      <div ref={scrollStartBattle} />
    </>
  );
};