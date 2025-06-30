# 🐲 Battle Monster

Um projeto de batalha de monstros feito com **React**, **TypeScript** e **Vite**.

## ✨ Visão Geral

O Battle Monster é um app onde você pode criar monstros personalizados, visualizar seus atrubutos e colocá-los para batalhar em uma arena. O projeto utiliza componentes organizados por contexto (monstros, batalha, formulários) e estilização com TailwindCSS.

## 🚀 Tecnologias Utilizadas

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/) (validação de formulários)
- [Lucide React](https://lucide.dev/) (ícones)

## 📁 Estrutura de Pastas

```
src/
  components/
    battle/         # Componentes da arena e lógica de batalha
    monster/        # Componentes de exibição e criação de monstros
    form/           # Componentes reutilizáveis de formulário
    info/           # Componentes informativos (ex: regras)
  store/            # Zustand stores para estado global
  types/            # Tipos TypeScript compartilhados
  assets/           # Imagens e ícones
```

## ⚔️ Funcionalidades

- **Criar Monstros:** Formulário para criar monstros com nome, ataque, defesa, HP, velocidade e imagem.
- **Listar Monstros:** Visualize todos os monstros criados.
- **Batalha:** Selecione dois monstros para batalhar, acompanhe os logs e veja o vencedor.
- **Regras:** Visualize as regras da batalha.

## 🛠️ Como rodar o projeto

1. Instale as dependências:
   ```bash
   pnpm install
   # ou
   npm install
   # ou
   yarn
   ```

2. Rode o projeto em modo desenvolvimento:
   ```bash
   pnpm dev
   # ou
   npm run dev
   # ou
   yarn dev
   ```

3. Acesse em [http://localhost:5173](http://localhost:5173)

## 📝 Customização

- Os componentes estão organizados por contexto para facilitar a manutenção.
- Para adicionar novos tipos de monstros ou regras, edite os componentes em `src/components/monster` e `src/components/info`.

## 💡 Possíveis Melhorias

- **Salvar monstros e batalhas no backend:** Persistir dados usando uma API ou banco de dados.
- **Autenticação de usuários:** Permitir que cada usuário crie e salve seus próprios monstros.
- **Ranking de monstros:** Exibir um ranking dos monstros mais vitoriosos.
- **Animações de batalha:** Adicionar animações visuais para ataques, defesas e vitórias.
- **Customização de monstros:** Permitir upload de imagens ou escolha de avatares.
- **Novos tipos de itens e poderes:** Expandir as possibilidades de estratégia nas batalhas.
- **Modo multiplayer:** Permitir batalhas entre usuários em tempo real.
- **Testes automatizados:** Adicionar testes unitários e de integração para maior robustez.
- **Acessibilidade:** Melhorar a experiência para usuários com necessidades especiais.
- **Componetização dos sitema:** Melhorar e criar componentes reutilizáveis dentro de um style guide.
- **Internacionalização:** Suporte a múltiplos idiomas.

## 📧 Contato
**Gabriel Duarte - Software Developer Backend** <br/>
jds.gabrielduarte@gmail.com - [LinkedIn](https://www.linkedin.com/in/jdsgabriel/) 

