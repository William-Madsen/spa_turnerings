"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Participant = {
  id: number;
  name: string;
  points: number;
  wins: number;
  losses: number;
  draws: number;
};

type Match = {
  id: number;
  winner: string;
  loser: string;
  winnerScore: number;
  loserScore: number;
  date: string;
};

export default function Home() {
  const [players, setPlayers] = useState<Participant[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);

  const fetchPlayers = async () => {
    const response = await fetch("/api/players");
    const data = await response.json();

    setPlayers(data);
  };

  const fetchMatches = async () => {
    const response = await fetch("/api/matches");
    const data = await response.json();

    setMatches(data);
  };

  useEffect(() => {
    fetchPlayers();
    fetchMatches();
  }, []);

  return (
    <main>
      <div className="flex flex-row gap-6 mt-2 relative">
        <h1 className="text-2xl font-bold text-white mt-4 px-4">
          {" "}
          Bordtenis turnering
        </h1>
        <div className="flex flex-row gap-4  mt-4 px-4 absolute bottom-0 right-0">
          <button
            onClick={async () => {
              fetchPlayers();
              fetchMatches();
            }}
            className="rounded-xl bg-[#0059ff] px-4 py-3 text-white hover:cursor-pointer "
          >
            Opdater Tabeller
          </button>

          <Link
            href="/Add_Player"
            className="rounded-xl bg-[#ff4d4d] px-4 py-3 text-white hover:cursor-pointer"
          >
            Tilføj Deltager
          </Link>

          <Link
            href="/Add_Match"
            className="rounded-xl bg-[#ff4d4d] px-4 py-3 text-white hover:cursor-pointer"
          >
            Registrer Kamp
          </Link>
        </div>
      </div>
      <div className="h-1 bg-gray-300 w-full my-4"></div>

      <div className="flex flex-row gap-3 mt-4">
        <div className="relative rounded-xl bg-[#004080] w-1/2 overflow-y-auto scrollbar-none h-200 flex items-center justify-center">
          <h2 className="text-white text-xl absolute top-2 left-2">
            Ranklist Visning
          </h2>
          <div className="h-1 bg-gray-300 w-full my-4 absolute top-8"></div>

          <table className="w-full portrait:w-full absolute top-17">
            <thead>
              <tr>
                <th className="border-2 border-black  bg-[#ff4d4d] p-2">
                  Placering
                </th>
                <th className="border-2 border-black bg-[#ff4d4d] p-2">Navn</th>
                <th className="border-2 border-black bg-[#ff4d4d] p-2">
                  Point
                </th>
                <th className="border-2 border-black bg-[#ff4d4d] p-2">
                  Win ratio
                </th>
              </tr>
            </thead>
            <tbody>
              {[...players]
                .sort((a, b) => b.points - a.points)
                .map((player, index) => (
                  <tr key={player.id} className="bg-[#495057] text-center">
                    <td className="border border-black p-2">{index + 1}</td>
                    <td className="border border-black p-2">{player.name}</td>
                    <td className="border border-black p-2">{player.points}</td>
                    <td className="border border-black p-2">
                      {player.wins + player.losses === 0
                        ? "0%"
                        : `${Math.round((player.wins / (player.wins + player.losses)) * 100)}%`}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="relative w-1/2 rounded-xl bg-[#004080]  overflow-y-auto scrollbar-none h-200 flex items-center justify-center">
          <h2 className="text-white text-xl absolute top-2 left-2">
            Seneste Kampe
          </h2>
          <div className="h-1 bg-gray-300 w-full my-4 absolute top-8"></div>
          <table className="w-full absolute top-17 ">
            <thead>
              <tr>
                <th className="border-2 border-black bg-[#ff4d4d] p-2">
                  Tidspunkt
                </th>
                <th className="border-2 border-black bg-[#ff4d4d] p-2">
                  Vindenden
                </th>
                <th className="border-2 border-black bg-[#ff4d4d] p-2">
                  Point
                </th>
                <th className=" border-2 border-black bg-[#a5b6c7] p-2">VS</th>
                <th className="border-2 border-black bg-[#ff4d4d] p-2">
                  Point
                </th>
                <th className="border-2 border-black bg-[#ff4d4d] p-2">
                  Taberden
                </th>
              </tr>
            </thead>
            <tbody>
              {[...matches]
                .sort(
                  (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime(),
                )
                .slice(0, 10)
                .map((match) => (
                  <tr key={match.id} className="bg-[#495057] text-center">
                    <td className="border border-black p-2">
                      {new Date(match.date).toLocaleString("da-DK")}
                    </td>
                    <td className="border border-black p-2">{match.winner}</td>
                    <td className="border border-black p-2">
                      {match.winnerScore}
                    </td>
                    <td className="border border-black p-2 font-bold">VS</td>
                    <td className="border border-black p-2">
                      {match.loserScore}
                    </td>
                    <td className="border border-black p-2">{match.loser}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
