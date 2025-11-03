"use client"

import React from "react";
import { useBattleStore } from "../state/battleStore";

export default function BattleUI() {
  const {
    player,
    enemy,
    turn,
    winner,
    startBattle,
    playCard,
    attackCard,
    endTurn,
    reset,
  } = useBattleStore();

  return (
    <div className="p-6 flex flex-col gap-6 items-center">
      <h1 className="text-2xl font-bold">Anime Card Battler</h1>

      {winner ? (
        <div className="text-center">
          <h2 className="text-xl">{winner} wins!</h2>
          <button
            onClick={reset}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Restart
          </button>
        </div>
      ) : (
        <>
          {/* Enemy Info */}
          <div className="w-full flex flex-col items-center">
            <h2 className="text-lg font-semibold">{enemy.name}</h2>
            <p>Health: {enemy.health}</p>
            <div className="flex gap-2 mt-2">
              {enemy.field.map((card) => (
                <div
                  key={card.id}
                  className="border border-gray-400 p-2 w-24 text-center bg-red-100"
                >
                  <p className="font-semibold">{card.name}</p>
                  <p>ATK: {card.attack}</p>
                  <p>HP: {card.health}</p>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-gray-300 w-full" />

          {/* Player Info */}
          <div className="w-full flex flex-col items-center">
            <h2 className="text-lg font-semibold">{player.name}</h2>
            <p>Health: {player.health}</p>

            {/* Player Field */}
            <div className="flex gap-2 mt-2">
              {player.field.map((card) => (
                <div
                  key={card.id}
                  className="border border-gray-400 p-2 w-24 text-center bg-green-100 cursor-pointer"
                  onClick={() => {
                    if (enemy.field.length > 0) {
                      attackCard(card.id, enemy.field[0].id);
                    }
                  }}
                >
                  <p className="font-semibold">{card.name}</p>
                  <p>ATK: {card.attack}</p>
                  <p>HP: {card.health}</p>
                </div>
              ))}
            </div>

            {/* Player Hand */}
            <div className="flex gap-2 mt-4">
              {player.hand.map((card) => (
                <div
                  key={card.id}
                  className="border border-gray-400 p-2 w-24 text-center bg-blue-100 cursor-pointer"
                  onClick={() => playCard(card.id)}
                >
                  <p className="font-semibold">{card.name}</p>
                  <p>ATK: {card.attack}</p>
                  <p>HP: {card.health}</p>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={startBattle}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Start Battle
              </button>
              <button
                onClick={endTurn}
                className="px-4 py-2 bg-yellow-500 text-white rounded"
              >
                End Turn
              </button>
              <button
                onClick={reset}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Reset
              </button>
            </div>

            <p className="mt-2">Current turn: {turn}</p>
          </div>
        </>
      )}
    </div>
  );
}
