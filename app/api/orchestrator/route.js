import { NextResponse } from 'next/server';
import { getConsumer, getProducer, TOPICS, TYPES, bus } from '../../../lib/kafka.js';

let booted = false;

async function boot() {
  if (booted) return;
  booted = true;

  const consumer = await getConsumer('orchestrator-group');
  const producer = await getProducer();

  await consumer.subscribe({ topic: TOPICS.COMMANDS, fromBeginning: false });

  const sendEvent = async (key, type, data) => {
    const ev = { type, transactionId: key, at: new Date().toISOString(), data };
    await producer.send({
      topic: TOPICS.EVENTS,
      messages: [{ key, value: JSON.stringify(ev) }],
    });
    bus.emit('event', ev); // para WS
  };

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const key = message.key?.toString();
        const val = JSON.parse(message.value.toString());
        if (val.type !== TYPES.TransactionInitiated) return;

        await sendEvent(key, TYPES.FundsReserved, { ok: true, holdId: `HOLD-${key?.slice(0,8)}` });
        await sendEvent(key, TYPES.Committed, { ledgerTxId: `LED-${key?.slice(0,8)}` });
        await sendEvent(key, TYPES.Notified, { channels: ['websocket'] });
      } catch (e) {
        await producer.send({
          topic: TOPICS.DLQ,
          messages: [{ key: message.key?.toString(), value: message.value.toString() }],
        });
      }
    },
  });
}

// GET para inicializar en dev o healthcheck
export async function GET() {
  await boot();
  return NextResponse.json({ ok: true });
}

// autoinit
await boot().catch(() => {});
