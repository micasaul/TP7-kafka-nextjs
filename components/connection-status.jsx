'use client';

export default function ConnectionStatus({ status }) {
  const color =
    status === 'open' ? 'green' :
    status === 'connecting' ? 'orange' : 'red';

  return (
    <p>
      Estado WebSocket: <b style={{ color }}>{status}</b>
    </p>
  );
}
