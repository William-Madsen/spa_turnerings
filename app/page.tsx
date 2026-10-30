"use client";

import { useState } from "react";

type Participant = {
  id: string;
  name: string;
  createdAt: string;
};

export default function Home() {
  const [activePanel, setActivePanel] = useState<
    "participant" | "match" | null
  >(null);
  const [participantName, setParticipantName] = useState("");
  const [participantError, setParticipantError] = useState("");
  const [participantSaved, setParticipantSaved] = useState(false);
  const [isSavingParticipant, setIsSavingParticipant] = useState(false);

  async function addParticipant() {
    const name = participantName.trim();

    setParticipantSaved(false);
    setParticipantError("");

    if (!name) {
      setParticipantError("Indtast deltagerens navn.");
      return;
    }

    setIsSavingParticipant(true);

    try {
      const response = await fetch("/api/participants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const result = (await response.json()) as
        | { participant: Participant }
        | { error: string };

      if (!response.ok || !("participant" in result)) {
        throw new Error(
          "error" in result ? result.error : "Deltageren kunne ikke gemmes.",
        );
      }

      setParticipantName("");
      setParticipantSaved(true);
    } catch (error) {
      setParticipantError(
        error instanceof Error
          ? error.message
          : "Deltageren kunne ikke gemmes.",
      );
    } finally {
      setIsSavingParticipant(false);
    }
  }

  return (
    <main>
      <div className="flex flex-row gap-6 mt-2 relative">
        <h1 className="text-2xl font-bold text-white mt-4 px-4">Turneringer</h1>
        <div className="flex flex-row gap-4  mt-4 px-4 absolute bottom-0 right-0">
          <button
            type="button"
            onClick={() =>
              setActivePanel(
                activePanel === "participant" ? null : "participant",
              )
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
              <tr className="bg-[#495057] text-center">
                <td className="border border-black p-2">1</td>
                <td className="border border-black p-2 ">Spiller 1</td>
                <td className="border border-black p-2 ">15</td>
                <td className="border border-black p-2 ">50%</td>
              </tr>
            </tbody>
            <tbody>
              <tr className="bg-[#495057] text-center">
                <td className="border border-black p-2">2</td>
                <td className="border border-black p-2 ">Spiller 2</td>
                <td className="border border-black p-2 ">15</td>
                <td className="border border-black p-2 ">50%</td>
              </tr>
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
              <tr className="bg-[#495057] text-center">
                <td className="border border-black p-2">12:00</td>
                <td className="border border-black p-2 ">Spiller 1</td>
                <td className="border border-black p-2 ">10</td>
                <td className="border border-black p-2 ">VS</td>
                <td className="border border-black p-2 ">5</td>
                <td className="border border-black p-2 ">Spiller 2</td>
              </tr>
            </tbody>
            <tbody>
              <tr className="bg-[#495057] text-center">
                <td className="border border-black p-2">12:05</td>
                <td className="border border-black p-2 ">Spiller 2</td>
                <td className="border border-black p-2 ">10</td>
                <td className="border border-black p-2 ">VS</td>
                <td className="border border-black p-2 ">5</td>
                <td className="border border-black p-2 ">Spiller 1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        {(activePanel === "participant" || activePanel === "match") && (
          <div className="fixed inset-0 z-99 flex items-center justify-center bg-black/20">
            {activePanel === "participant" && (
              <div className="relative w-[90%] max-w-lg rounded-xl bg-[#e9ecef] p-6  text-black shadow-2xl">
                <h2 className="mb-4 text-xl font-bold">Tilføj Deltager</h2>

                <input
                  id="participant-input"
                  type="text"
                  placeholder="Indtast deltagerens navn"
                  className="w-full rounded border border-gray-400 px-3 py-2"
                  value={participantName}
                  onChange={(event) => {
                    setParticipantName(event.target.value);
                    setParticipantError("");
                    setParticipantSaved(false);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      void addParticipant();
                    }
                  }}
                />

                <button
                  type="button"
                  onClick={() => void addParticipant()}
                  disabled={isSavingParticipant}
                  className="mt-3 rounded-xl bg-[#007bff] px-4 py-3 text-white hover:cursor-pointer"
                >
                  {isSavingParticipant ? "Gemmer..." : "Tilføj Deltager"}
                </button>
                {participantError && (
                  <p className="mt-2 text-[#ff4d4d]" role="alert">
                    {participantError}
                  </p>
                )}
                {participantSaved && (
                  <p className="mt-2 text-green-700" role="status">
                    Deltageren er gemt.
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setActivePanel(null)}
                  className="absolute right-4 top-4 rounded-lg bg-[#007bff] px-3 py-2 text-white hover:cursor-pointer"
                >
                  Luk ✕
                </button>
              </div>
            )}

            {activePanel === "match" && (
              <div className="fixed inset-0 z-99 flex items-center justify-center bg-black/20 p-4">
                <div className="relative w-full max-w-md rounded-2xl bg-white p-6 text-gray-900 shadow-2xl">
                  <button
                    onClick={() => setActivePanel(null)}
                    className="absolute right-4 top-4 rounded-lg bg-[#007bff] px-3 py-2 text-white hover:cursor-pointer"
                  >
                    Luk ✕
                  </button>

                  <h2 className="mb-6 text-2xl font-bold">Registrer kamp</h2>

                  <div className="mb-5 rounded-xl ">
                    <h3 className="mb-3 font-bold"> Vindere</h3>

                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="winner-name"
                        className="text-sm font-semibold"
                      >
                        Navn
                      </label>
                      <input
                        id="winner-name"
                        type="text"
                        placeholder="Indtast vinderens navn"
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none transition focus:border-[#007bff]"
                      />

                      <label
                        htmlFor="winner-score"
                        className="text-sm font-semibold"
                      >
                        Point
                      </label>
                      <input
                        id="winner-score"
                        type="number"
                        placeholder="Indtast point"
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none transition focus:border-[#007bff]"
                      />
                    </div>
                  </div>
                  <div className="h-1 bg-black w-full my-2" />

                  <div className="mb-6 rounded-xl">
                    <h3 className="mb-3 font-bold">Tabere</h3>

                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="loser-name"
                        className="text-sm font-semibold"
                      >
                        Navn
                      </label>
                      <input
                        id="loser-name"
                        type="text"
                        placeholder="Indtast taberens navn"
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none transition focus:border-[#007bff]"
                      />

                      <label
                        htmlFor="loser-score"
                        className="text-sm font-semibold"
                      >
                        Point
                      </label>
                      <input
                        id="loser-score"
                        type="number"
                        placeholder="Indtast point"
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none transition focus:border-[#007bff]"
                      />
                    </div>
                  </div>

                  <button className="w-full rounded-xl bg-[#007bff] px-4 py-3 font-bold text-white shadow-md transition hover:cursor-pointer">
                    Registrer Kamp
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <br />
    </main>
  );
}
