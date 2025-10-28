import { create } from "zustand";

interface Player {
  health: number;
  mana: number;
}

interface BattleState {
  player: Player;
  opponent: Player;
  turn: "player" | "opponent";
  attack: (damage: number) => void;
  endTurn: () => void;
  reset: () => void;
}

export const useBattleStore = create<BattleState>((set) => ({
  player: { health: 100, mana: 3 },
  opponent: { health: 100, mana: 3 },
  turn: "player",
  attack: (damage) =>
    set((state) => {
      if (state.turn === "player")
        return {
          ...state,
          opponent: { ...state.opponent, health: state.opponent.health - damage },
          turn: "opponent",
        };
      else
        return {
          ...state,
          player: { ...state.player, health: state.player.health - damage },
          turn: "player",
        };
    }),
  endTurn: () => set((s) => ({ ...s, turn: s.turn === "player" ? "opponent" : "player" })),
  reset: () => set({ player: { health: 100, mana: 3 }, opponent: { health: 100, mana: 3 }, turn: "player" }),
}));
