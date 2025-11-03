import { create } from "zustand";

type Card = {
  id: string;
  name: string;
  attack: number;
  health: number;
  image: string;
};

type PlayerState = {
  name: string;
  deck: Card[];
  hand: Card[];
  field: Card[];
  health: number;
};

type BattleState = {
  player: PlayerState;
  enemy: PlayerState;
  turn: "player" | "enemy";
  winner: string | null;
};

type BattleActions = {
  startBattle: () => void;
  playCard: (cardId: string) => void;
  attackCard: (attackerId: string, defenderId: string) => void;
  endTurn: () => void;
  reset: () => void;
};

export const useBattleStore = create<BattleState & BattleActions>((set, get) => ({
  player: {
    name: "You",
    deck: [],
    hand: [],
    field: [],
    health: 20,
  },
  enemy: {
    name: "AI",
    deck: [],
    hand: [],
    field: [],
    health: 20,
  },
  turn: "player",
  winner: null,

  startBattle: () => {
    set({
      player: { ...get().player, health: 20 },
      enemy: { ...get().enemy, health: 20 },
      turn: "player",
      winner: null,
    });
  },

  playCard: (cardId) => {
    const { player } = get();
    const card = player.hand.find((c) => c.id === cardId);
    if (!card) return;
    set({
      player: {
        ...player,
        hand: player.hand.filter((c) => c.id !== cardId),
        field: [...player.field, card],
      },
    });
  },

  attackCard: (attackerId, defenderId) => {
    const { player, enemy, turn } = get();
    if (turn !== "player") return;

    const attacker = player.field.find((c) => c.id === attackerId);
    const defender = enemy.field.find((c) => c.id === defenderId);

    if (!attacker || !defender) return;

    defender.health -= attacker.attack;
    attacker.health -= defender.attack;

    const newEnemyField = enemy.field.filter((c) => c.health > 0);
    const newPlayerField = player.field.filter((c) => c.health > 0);

    set({
      player: { ...player, field: newPlayerField },
      enemy: { ...enemy, field: newEnemyField },
    });
  },

  endTurn: () => {
    const { turn } = get();
    set({ turn: turn === "player" ? "enemy" : "player" });
  },

  reset: () => {
    set({
      player: { ...get().player, deck: [], hand: [], field: [], health: 20 },
      enemy: { ...get().enemy, deck: [], hand: [], field: [], health: 20 },
      turn: "player",
      winner: null,
    });
  },
}));
