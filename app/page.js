'use client';

import ConnectionStatus from '../components/connection-status.jsx';
import TransactionForm from '../components/transaction-form.jsx';
import TransactionTimeline from '../components/transaction-timeline.jsx';
import { useWebSocketFeed } from '../lib/use-websocket.js';
import { useEffect } from 'react';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080';

export default function Page() {
  const { messages: events, status } = useWebSocketFeed(WS_URL);

  useEffect(() => {
    fetch('/api/orchestrator').catch(() => {});
    fetch('/api/ws').catch(() => {});
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: '40px',
      padding: '40px'
    }}>
      <div style={{ flex: 1 }}>
        <h1>Simulador de Transacciones</h1>
        <ConnectionStatus status={status} />
        <TransactionForm />
      </div>
      <div style={{ flex: 1 }}>
        <h2>Eventos Recibidos</h2>
        <TransactionTimeline items={events} />
      </div>
    </div>
  );
}
