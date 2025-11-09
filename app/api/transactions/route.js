import { NextResponse } from 'next/server';
import { getProducer, TOPICS, TYPES } from '../../../lib/kafka.js';

export async function POST(req) {
  try {
    const body = await req.json();
    const transactionId = crypto.randomUUID();

    const msg = {
      type: TYPES.TransactionInitiated,
      transactionId,
      at: new Date().toISOString(),
      data: {
        fromAccount: body.fromAccount,
        toAccount: body.toAccount,
        amount: body.amount,
        currency: body.currency || 'ARS',
        userId: body.userId || 'demo-user',
      },
    };

    const producer = await getProducer();
    await producer.send({
      topic: TOPICS.COMMANDS,
      messages: [{ key: transactionId, value: JSON.stringify(msg) }],
    });

    return NextResponse.json({ transactionId }, { status: 202 });
  } catch (e) {
    return NextResponse.json({ error: 'publish_failed' }, { status: 500 });
  }
}
