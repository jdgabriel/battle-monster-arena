import VersusImage from '../../assets/vs.png';
import { BattleActionButton } from './battle-action-button';

export function VersusIcon() {
  return (
    <>
      <img src={VersusImage} alt="Versus" className="size-54" />
      <BattleActionButton />
    </>
  );
}