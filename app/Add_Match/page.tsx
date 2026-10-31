"use client";

import { useState } from "react";
import Link from "next/link";

export default function AddMatchPage() {
  const [winner, setWinner] = useState("");
  const [loser, setLoser] = useState("");
  const [winnerScore, setWinnerScore] = useState("");
  const [loserScore, setLoserScore] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/matches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        winner: winner,
        loser: loser,
        winnerScore: Number(winnerScore),
        loserScore: Number(loserScore),
      }),
    });
    const data = await response.json();

    if (response.ok) {
      setMessage("Kampen er blevet registreret!");

      setWinner("");
      setLoser("");
      setWinnerScore("");
      setLoserScore("");
    } else {
      setMessage(data.error || "Der opstod en fejl.");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <section className="w-full max-w-2xl rounded-2xl bg-[#004080] p-6 shadow-2xl sm:p-8">
        <div className="mb-8 border-b border-[#a5b6c7]/40 pb-5">
          <h1 className="text-3xl font-bold text-white">Registrer kamp</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="winner"
                className="mb-2 block font-semibold text-white"
              >
                Vinder
              </label>
              <input
                id="winner"
                name="winner"
                value={winner}
                onChange={(e) => setWinner(e.target.value)}
                className="w-full rounded-lg border border-[#a5b6c7] bg-[#495057] px-4 py-3 text-white  placeholder:text-[#d9e2ec]  focus:ring-[#ff4d4d] "
                placeholder="Vælg spiller"
                required
              />
            </div>
            <div>
              <label
                htmlFor="loser"
                className="mb-2 block font-semibold text-white"
              >
                Taber
              </label>
              <input
                id="loser"
                name="loser"
                value={loser}
                onChange={(e) => setLoser(e.target.value)}
                className="w-full rounded-lg border border-[#a5b6c7] bg-[#495057] px-4 py-3 text-white  placeholder:text-[#d9e2ec]  focus:ring-[#ff4d4d]"
                placeholder="Vælg spiller"
                required
              />
            </div>
            <div>
              <label
                htmlFor="winnerScore"
                className="mb-2 block font-semibold text-white"
              >
                Vinderens point
              </label>
              <input
                id="winnerScore"
                name="winnerScore"
                type="number"
                min="0"
                value={winnerScore}
                onChange={(e) => setWinnerScore(e.target.value)}
                className="w-full rounded-lg border border-[#a5b6c7] bg-[#495057] px-4 py-3 text-white  focus:ring-[#ff4d4d]"
                required
              />
            </div>
            <div>
              <label
                htmlFor="loserScore"
                className="mb-2 block font-semibold text-white"
              >
                Taberens point
              </label>
              <input
                id="loserScore"
                name="loserScore"
                type="number"
                min="0"
                value={loserScore}
                onChange={(e) => setLoserScore(e.target.value)}
                className="w-full rounded-lg border border-[#a5b6c7] bg-[#495057] px-4 py-3 text-white focus:ring-[#ff4d4d]"
                required
              />
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/"
              className="rounded-lg bg-[#495057] px-5 py-3 text-center font-semibold text-whit"
            >
              Tilbage
            </Link>
            <button
              type="submit"
              className="rounded-lg bg-[#ff4d4d] px-5 py-3 font-bold text-white hover:cursor-pointer"
            >
              Registrer kamp
            </button>
          </div>
          {message && (
            <p className="text-center font-semibold text-[#ff4d4d]">
              {message}
            </p>
          )}
        </form>
      </section>
    </main>
  );
}
