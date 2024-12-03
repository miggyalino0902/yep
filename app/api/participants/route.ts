import prisma from "@/prisma/db";
import { PrizeStatus } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async () => {
  const participants = await prisma.participants.findMany({
    include: {
      prize: true,
    }
  });
  return NextResponse.json(participants);
};

export const POST = async (req: Request) => {
  const json = await req.json();

  try {
    const newParticipant = await prisma.participants.create({
      data: {
        ...json,
      },
    });

    const prizes = await prisma.prize.findMany({
      where: {
        status: PrizeStatus.Available,
      },
    });

    console.log("AVAILABLE PRIZES", prizes);

    // Select a random prize
    const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
    console.log("RANDOM PRIZE", randomPrize);

    const participantWithPrize = await prisma.participants.update({
      where: {
        id: newParticipant.id,
      },
      data: {
        prize: {
          connect: {
            id: randomPrize.id,
          },
        },
        claimedPrizeAt: new Date(),
      },
    });

    console.log("PARTICIPANT WITH PRIZE", participantWithPrize);

    const updatedPrize = await prisma.prize.update({
      where: {
        id: randomPrize.id,
      },
      data: {
        status: PrizeStatus.Taken,
      },
    });

    console.log("PRIZE STATUS UPDATED", updatedPrize);
    
    return NextResponse.json(newParticipant);
  } catch {
    throw new Error("Email already registered");
  }
};
