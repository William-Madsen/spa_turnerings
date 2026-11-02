"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function AddPlayerPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setError("");

    const response = await fetch("/api/players", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    });

    if (response.ok) {
      setMessage("");
      setMessage("Deltageren blev oprettet.");

      setName("");
    } else {
      const data = await response.json();
      setError("");
      setError(data.error || "Der opstod en fejl.");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <section className="w-full max-w-xl rounded-2xl bg-[#004080] p-6 shadow-2xl sm:p-8">
        <div className="mb-8 border-b border-[#a5b6c7]/40 pb-5">
          <h1 className="text-3xl font-bold text-white">Tilføj deltager</h1>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="mb-2 block font-semibold text-white"
            >
              Navn
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-[#a5b6c7] bg-[#495057] px-4 py-3 placeholder:text-[#d9e2ec]/70 "
              placeholder="Indtast navn"
              required
            />
          </div>
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/"
              className="rounded-lg bg-[#495057] px-5 py-3 text-center font-semibold text-white transition hover:bg-[#5c656d]"
            >
              Tilbage
            </Link>
            <button
              type="submit"
              className="rounded-lg bg-[#ff4d4d] px-5 py-3 font-bold text-white transition hover:bg-[#ff6666]"
            >
              Tilføj deltager
            </button>
          </div>
          {message && (
            <p className="text-[#ffffff] text-center font-semibold">
              {message}
            </p>
          )}

          {error && (
            <p className="text-[#ff4d4d] text-center font-semibold">{error}</p>
          )}
        </form>
      </section>
    </main>
  );
}
