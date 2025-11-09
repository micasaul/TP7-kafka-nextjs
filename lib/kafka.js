import { Kafka } from 'kafkajs';
import { EventEmitter } from 'events';

let kafka;
export function getKafka() {
  if (!kafka) {
    const broker = process.env.KAFKA_BROKER || "localhost:9092";
    kafka = new Kafka({
      clientId: process.env.KAFKA_CLIENT_ID || "banking-system",
      brokers: [broker],
    });
  }
  return kafka;
}

let producer;
export async function getProducer() {
  if (!producer) {
    producer = getKafka().producer();
    await producer.connect();
  }
  return producer;
}

export async function getConsumer(groupId) {
  const consumer = getKafka().consumer({ groupId });
  await consumer.connect();
  return consumer;
}

// Bus simple para que WS reenvíe eventos sin archivos extra
export const bus = new EventEmitter();

export const TOPICS = {
  COMMANDS: 'txn.commands',
  EVENTS: 'txn.events',
  DLQ: 'txn.dlq',
};

export const TYPES = {
  TransactionInitiated: 'TransactionInitiated',
  FundsReserved: 'FundsReserved',
  FraudChecked: 'FraudChecked',
  Committed: 'Committed',
  Reversed: 'Reversed',
  Notified: 'Notified',
};
