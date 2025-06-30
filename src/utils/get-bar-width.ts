export default function (hp: number, max: number) {
  return `${Math.max(0, Math.min(100, (hp / max) * 100))}%`;
}