import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "app", "data", "matches.json");

const playersFilePath = path.join(process.cwd(), "app", "data", "players.json");

export async function GET() {
  const data = fs.readFileSync(filePath, "utf-8");
  const matches = JSON.parse(data);

  return NextResponse.json(matches);
}

export async function POST(request: Request) {
  const result = await request.json();

  const winner = result.winner;
  const loser = result.loser;
  const winnerScore = result.winnerScore;
  const loserScore = result.loserScore;

  if (
    typeof winner !== "string" ||
    typeof loser !== "string" ||
    winner.trim().length === 0 ||
    loser.trim().length === 0 ||
    !Number.isInteger(winnerScore) ||
    !Number.isInteger(loserScore) ||
    winnerScore < 0 ||
    loserScore < 0
  ) {
    return NextResponse.json({ error: "Ugyldige kampdata" }, { status: 400 });
  }

  const data = fs.readFileSync(filePath, "utf-8");
  const matches = JSON.parse(data);

  const nextId = Math.max(0, ...matches.map((match: any) => match.id)) + 1;

  const readPlayers = fs.readFileSync(playersFilePath, "utf-8");
  const players = JSON.parse(readPlayers);

  const winnerPlayer = players.find(
    (player: any) => player.name === winner.trim(),
  );

  const loserPlayer = players.find(
    (player: any) => player.name === loser.trim(),
  );

  if (winnerPlayer.id === loserPlayer.id) {
    return NextResponse.json(
      { error: "En spiller kan ikke spille mod sig selv" },
      { status: 400 },
    );
  }

  if (winnerScore < loserScore) {
    return NextResponse.json(
      { error: "Vinderen skal have flere point end taberen" },
      { status: 400 },
    );
  }

  winnerPlayer.wins++;
  loserPlayer.losses++;

  winnerPlayer.points += winnerScore;
  loserPlayer.points += loserScore;

  fs.writeFileSync(playersFilePath, JSON.stringify(players, null, 2));

  const newMatch = {
    id: nextId,
    winner: winnerPlayer.name,
    loser: loserPlayer.name,
    winnerScore: winnerScore,
    loserScore: loserScore,
    date: new Date().toISOString(),
  };

  matches.push(newMatch);

  fs.writeFileSync(filePath, JSON.stringify(matches, null, 2));

  return NextResponse.json(newMatch, { status: 201 });
}
