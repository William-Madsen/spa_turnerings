import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "app", "data", "players.json");

export async function GET() {
  const data = fs.readFileSync(filePath, "utf-8");

  const players = JSON.parse(data);

  return NextResponse.json(players);
}

export async function POST(request: Request) {
  const body = await request.json();
  const name = body?.name;

  if (typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const data = fs.readFileSync(filePath, "utf-8");
  const players = JSON.parse(data);

  const nextId = Math.max(0, ...players.map((player: any) => player.id)) + 1;

  const newPlayer = {
    id: nextId,
    name: name.trim(),
    points: 0,
    wins: 0,
    losses: 0,
  };

  players.push(newPlayer);

  fs.writeFileSync(filePath, JSON.stringify(players, null, 2));

  return NextResponse.json(newPlayer, { status: 201 });
}
