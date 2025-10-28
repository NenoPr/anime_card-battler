"use client";
import { motion } from "framer-motion";
import { useBattleStore } from "@/state/battleStore";

export function BattleUI() {
  const { player, opponent, attack, turn, reset } = useBattleStore();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold text-pink-500">Anime Card Battler</h1>
      <div className="flex justify-between w-2/3">
        <div>
          <h2>👤 You</h2>
          <p>Health: {player.health}</p>
        </div>
        <div>
          <h2>🤖 Opponent</h2>
          <p>Health: {opponent.health}</p>
        </div>
      </div>
      <motion.button
        whileTap={{ scale: 0.9 }}
        disabled={turn !== "player"}
        onClick={() => {attack(10); attack(5)}}
        className="px-4 py-2 bg-pink-600 text-white rounded-xl disabled:opacity-50"
      >
        Attack
      </motion.button>
      <button onClick={reset} className="text-gray-500 underline">
        Reset
      </button>
    </div>
  );
}
