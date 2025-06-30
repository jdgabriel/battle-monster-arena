import type { Monster } from '../types/monster';

export const monstersList: Monster[] = [
  {
    id: '1',
    name: 'Fire Lizard',
    attack: 18,
    defense: 9,
    hp: 38,
    speed: 15,
    imageUrl: 'https://api.dicebear.com/9.x/bottts/svg?seed=firelizard',
  },
  {
    id: '2',
    name: 'Aqua Serpent',
    attack: 14,
    defense: 10,
    hp: 44,
    speed: 11,
    imageUrl: 'https://api.dicebear.com/9.x/bottts/svg?seed=aquaserpent',
  },
  {
    id: '3',
    name: 'Stone Rhino',
    attack: 13,
    defense: 10,
    hp: 52,
    speed: 7,
    imageUrl: 'https://api.dicebear.com/9.x/bottts/svg?seed=stonerhino',
  }
]; 