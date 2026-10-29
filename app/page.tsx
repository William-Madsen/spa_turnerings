"use client";

import { useState } from "react";

export default function Home() {
  const [activePanel, setActivePanel] = useState<
    "participant" | "match" | null
  >(null);

  return (
    <main>
      <h1 className="text-2xl font-bold text-white mt-4 px-4">Turneringer</h1>
      <div className="h-1 bg-gray-300 w-full my-4"></div>

      <div className="flex flex-row gap-4 mt-4">
        <div className="relative rounded-xl bg-[#004080] w-1/2 h-200 flex items-center justify-center">
          <h2 className="text-white text-xl absolute top-2 left-2">
            Ranklist Visning
          </h2>
          <div className="bg-white w-full h-full gap-2 rounded-lg"></div>
        </div>
        <div className="relative rounded-xl bg-[#004080] w-1/2 h-200 flex items-center justify-center">
          <h2 className="text-white text-xl absolute top-2 left-2">
            Seneste Kampe
          </h2>
          <div className="bg-white w-full h-full gap-2 rounded-lg"></div>
        </div>
      </div>
      <div className="flex flex-row gap-6 mt-2">
        <button
          type="button"
          onClick={() =>
            setActivePanel(activePanel === "participant" ? null : "participant")
          }
          className="rounded-xl bg-[#007bff] px-4 py-3 text-white hover:cursor-pointer"
        >
          Tilføj Deltager
        </button>

        <button
          type="button"
          onClick={() =>
            setActivePanel(activePanel === "match" ? null : "match")
          }
          className="rounded-xl bg-[#007bff] px-4 py-3 text-white hover:cursor-pointer"
        >
          Registrer Kamp
        </button>
      </div>
      <div>
        {activePanel === "participant" && (
          <div className="mt-4 w-1/1 rounded-xl bg-[#e9ecef] p-4 text-black">
            <div className="flex flex-wrap items-center gap-2 font-bold">
              <label htmlFor="participant-input">Tilføj Deltager</label>
              <input
                id="participant-input"
                type="text"
                placeholder="Indtast deltagerens navn"
                className="border border-[#ff4d4d] not-placeholder-shown:border-[#007bff] rounded px-2 py-1 ml-2"
              />
            </div>
            <button className="mt-3 rounded-xl bg-[#007bff] px-4 py-3 text-white hover:cursor-pointer">
              Registrer Kamp
            </button>
          </div>
        )}
      </div>

      <div>
        {activePanel === "match" && (
          <div className="mt-4 w-1/1 rounded-xl bg-[#e9ecef] p-4 text-black">
            <div className="flex flex-wrap items-center gap-2 font-bold">
              <label htmlFor="winner-name">Vinderne</label>
              <input
                id="winner-name"
                type="text"
                placeholder="Indtast Vinderne navn"
                className="border border-[#ff4d4d] not-placeholder-shown:border-[#007bff] rounded px-2 py-1 ml-2"
              />

              <label htmlFor="winner-score">Vindernes point</label>
              <input
                id="winner-score"
                type="text"
                placeholder="Indtast Vindernes point"
                className="border border-[#ff4d4d] not-placeholder-shown:border-[#007bff] rounded px-2 py-1 ml-2"
              />
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2 font-bold">
              <label htmlFor="loser-name">Taberns Navn</label>
              <input
                id="loser-name"
                type="text"
                placeholder="Indtast Taberns navn"
                className="border border-[#ff4d4d] not-placeholder-shown:border-[#007bff] rounded px-2 py-1 ml-2"
              />
              <label htmlFor="loser-score">Taberns point</label>
              <input
                id="loser-score"
                type="text"
                placeholder="Indtast Taberns point"
                className="border border-[#ff4d4d] not-placeholder-shown:border-[#007bff] rounded px-2 py-1 ml-2"
              />
            </div>
            <button className="mt-3 rounded-xl bg-[#007bff] px-4 py-3 text-white hover:cursor-pointer">
              Registrer Kamp
            </button>
          </div>
        )}
      </div>
      <br />
    </main>
  );
}
