import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

type Participant = {
  id: string;
  name: string;
  createdAt: string;
};

const dataDirectory = path.join(process.cwd(), "app", "data");
const participantsFile = path.join(dataDirectory, "participants.json");

async function readParticipants(): Promise<Participant[]> {
  try {
    const file = await readFile(participantsFile, "utf8");
    const participants: unknown = JSON.parse(file);

    if (!Array.isArray(participants)) {
      throw new Error("Deltagerfilen har et ugyldigt format.");
    }

    return participants as Participant[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Ugyldig forespørgsel." }, { status: 400 });
  }

  const name =
    typeof body === "object" &&
    body !== null &&
    "name" in body &&
    typeof body.name === "string"
      ? body.name.trim()
      : "";

  if (!name) {
    return Response.json(
      { error: "Deltagerens navn er påkrævet." },
      { status: 400 },
    );
  }

  try {
    const participants = await readParticipants();
    const participant: Participant = {
      id: crypto.randomUUID(),
      name,
      createdAt: new Date().toISOString(),
    };

    await mkdir(dataDirectory, { recursive: true });
    await writeFile(
      participantsFile,
      `${JSON.stringify([...participants, participant], null, 2)}\n`,
      "utf8",
    );

    return Response.json({ participant }, { status: 201 });
  } catch (error) {
    console.error("Kunne ikke gemme deltageren:", error);
    return Response.json(
      { error: "Deltageren kunne ikke gemmes." },
      { status: 500 },
    );
  }
}
