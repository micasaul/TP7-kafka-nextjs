'use client';

export default function TransactionTimeline({ items }) {
  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '10px',
      borderRadius: '8px',
      maxHeight: '80vh',
      overflowY: 'auto'
    }}>
      {items.map((ev, i) => (
        <div key={i} style={{
          borderBottom: '1px solid #eee',
          marginBottom: '8px',
          paddingBottom: '4px'
        }}>
          <b>{ev.type}</b>
          <div><small>{ev.transactionId}</small></div>
          <pre style={{
            whiteSpace: 'pre-wrap',
            margin: 0,
            fontSize: '13px'
          }}>
            {JSON.stringify(ev.data ?? ev, null, 2)}
          </pre>
        </div>
      ))}
    </div>
  );
}
