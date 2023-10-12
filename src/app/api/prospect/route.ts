import { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { ObjectId } from 'bson';


const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  if (req.method === 'POST') {
    const data = await req.json();
    const newObjectId = new ObjectId().toHexString();

    console.log('data POST =>', data);

    const prospect = await prisma.prospect.create({
      data: {
        id: newObjectId,
        email: data.email,
        lastName: data.lastName,
        firstName: data.firstName,
        phone: data.phone,
        knownBy: data.knownBy,
        waterDrinking: data.waterDrinking,
        filtrationSystem: data.filtrationSystem,
        heardOfTapWaterDisadvantages: data.heardOfTapWaterDisadvantages,
        alcalineWaterKnown: data.alcalineWaterKnown,
        otherThingsToSay: data.otherThingsToSay,
      },
    });
    console.log('prospect =>', prospect);

    // const metrics = await prisma.metrix.create({
    //   data: {
    //     name: req.url,
    //     value: data.amount
    //   }
    // })


    return new Response('OK', { status: 200 });

  } else {
    return new Response('Method not allowed', { status: 405 });
  }
}
