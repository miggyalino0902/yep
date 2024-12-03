import prisma from "@/prisma/db";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const id = params.id;
  const participant = await prisma.participants.findUnique({
    where: {
      email: id,
    },
    include: {
      prize: true,
    },
  });

  if (!participant) {
    throw new Error("Participant not found");
  }

  return NextResponse.json(participant);
};

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const json = await req.json();

  const updatedParticipant = await prisma.participants.update({
    where: {
      id: params.id,
    },
    data: {
      ...json,
    },
  });

  return NextResponse.json(updatedParticipant);
};
