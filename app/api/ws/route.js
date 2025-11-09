// Levanta un WebSocket server único y reenvía lo que llega por bus.
import { NextResponse } from 'next/server';
import { WebSocketServer } from 'ws';
import { bus } from '../../../lib/kafka.js';

let wss;

function ensureWSS() {
  if (!wss) {
    const port = Number(process.env.WS_PORT || 8080);
    wss = new WebSocketServer({ port });
    bus.on('event', (ev) => {
      const msg = JSON.stringify(ev);
      for (const client of wss.clients) {
        if (client.readyState === 1) client.send(msg);
      }
    });
  }
  return wss;
}

export async function GET() {
  const server = ensureWSS();
  return NextResponse.json({ ws: true, clients: server.clients.size });
}

ensureWSS();