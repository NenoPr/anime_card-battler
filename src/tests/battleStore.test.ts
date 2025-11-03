import { describe, it, expect, beforeEach } from "vitest";
import { useBattleStore } from "../state/battleStore";

describe("Battle Store", () => {
  beforeEach(() => {
    useBattleStore.getState().reset();
  });

  it("starts a new battle", () => {
    useBattleStore.getState().startBattle();
    const state = useBattleStore.getState();
    expect(state.turn).toBe("player");
    expect(state.winner).toBe(null);
  });

  it("plays a card from hand to field", () => {
    const store = useBattleStore.getState();
    store.player.hand = [{ id: "1", name: "Test", attack: 2, health: 2, image: "" }];
    useBattleStore.getState().playCard("1");
    const { player } = useBattleStore.getState();
    expect(player.hand.length).toBe(0);
    expect(player.field.length).toBe(1);
  });
});
