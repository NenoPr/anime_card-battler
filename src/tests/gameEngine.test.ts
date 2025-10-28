import { useBattleStore } from "@/state/battleStore";

test("player attack reduces opponent health", () => {
  const { attack, opponent } = useBattleStore.getState();
  attack(10);
  expect(useBattleStore.getState().opponent.health).toBe(opponent.health - 10);
});