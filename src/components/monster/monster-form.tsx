import { zodResolver } from '@hookform/resolvers/zod';
import { Heart, Shield, Sword, Zap } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMonsterStore } from '../../store/monster-store';
import { SliderInput } from '../ui/slider-input';
import { SubmitButton } from '../ui/submit-button';
import { TextInput } from '../ui/text-input';

const monsterSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  attack: z.coerce.number().min(11, 'O ataque deve ser maior que 10 pontos'),
  defense: z.coerce.number().min(11, 'A defesa deve ser maior que 10 pontos'),
  hp: z.coerce.number().min(11, 'O HP deve ser maior que 10 ponto'),
  speed: z.coerce.number().min(2, 'A velocidade deve ser maior que 1 ponto'),
  imageUrl: z.string().url('Não consigo ver seu monstro, o link está correto?'),
});

type MonsterFormValues = z.infer<typeof monsterSchema>;

export const MonsterForm = () => {
  const { addMonster } = useMonsterStore();
  const methods = useForm<MonsterFormValues>({
    resolver: zodResolver(monsterSchema),
    defaultValues: {
      attack: 15,
      defense: 15,
      hp: 30,
      speed: 10,
    },
  });

  const onSubmit = (data: MonsterFormValues) => {
    addMonster(data);
    methods.reset();
  };

  return (
    <div className="bg-gray-900 p-4 shadow-lg w-full">
      <h2 className="text-yellow-300 font-extrabold tracking-widest text-lg uppercase drop-shadow-lg mb-4">Criar monstro</h2>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full">
          <TextInput name="name" label="Nome" placeholder="Nome do monstro" />
          <div className="flex items-center gap-5 mt-3">
            <Sword className="size-8 text-red-400" />
            <SliderInput name="attack" label="Ataque básico" min={10} max={30} />
          </div>
          <div className="flex items-center gap-5">
            <Shield className="size-8 text-blue-400" />
            <SliderInput name="defense" label="Defesa" min={10} max={30} />
          </div>
          <div className="flex items-center gap-5">
            <Heart className="size-8 text-green-400" />
            <SliderInput name="hp" label="HP (Vida Máxima)" min={10} max={50} />
          </div>
          <div className="flex items-center gap-5 mb-3">
            <Zap className="size-8 text-yellow-300" />
            <SliderInput name="speed" label="Velocidade" min={1} max={30} />
          </div>
          <TextInput name="imageUrl" label="Você já viu seu monstro? Me mostre!" placeholder="https://..." />
          <SubmitButton>Criar monstro</SubmitButton>
        </form>
      </FormProvider>
    </div>
  );
};
