import EffectCard from '../components/card/EffectCard';
import MonsterCard from '../components/card/MonsterCard';
import TrapCard from '../components/card/TrapCard';
import dwarf from '../data/cards/warrior/dwarf.json';
import thousand_year_gold_dragon from '../data/cards/dragon/thousand-year-gold-dragon.json';
import { TCard } from '../types';

export const totalCardData = [...dwarf, ...thousand_year_gold_dragon];

export const getCardData = (id: number) => {
  return totalCardData.find((card) => card.id === id);
};

export const getDeckData = (deck: string): any[] => {
  return totalCardData
    .filter((card) => card.deck === deck)
    .map((item) => {
      if (item.type === 'monster') {
        return new MonsterCard(item.id, 'up', 'atk', {} as any, item.atk, item.def);
      }
      if (item.type === 'effect') {
        return new EffectCard(item.id, 'up', 'atk', {} as any);
      }
      if (item.type === 'trap') {
        return new TrapCard(item.id, 'up', 'atk', {} as any);
      }
    });
};
