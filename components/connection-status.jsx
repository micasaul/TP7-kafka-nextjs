'use client';

export default function ConnectionStatus({ status }) {
  const color =
    status === 'open' ? 'green' :
    status === 'connecting' ? 'orange' : 'red';

  return (
    <p style={{ fontWeight: 300}}>
      Estado WebSocket: <b style={{ color, fontWeight: 300 }}>{status}</b>
    </p>
  );
}
