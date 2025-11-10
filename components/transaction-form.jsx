'use client';
import React from 'react';

export default function TransactionForm() {
  const [form, setForm] = React.useState({
    fromAccount: '',
    toAccount: '',
    amount: '',
    currency: '',
    userId: ''
  });

  async function submit(e) {
    e.preventDefault();
    const res = await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    alert(`TransactionId: ${data.transactionId || 'error'}`);
  }

  return (
    <form onSubmit={submit} style={{
      display: 'grid',
      gap: '8px',
      maxWidth: '400px'
    }}>
      <input placeholder="Cuenta origen (fromAccount)" value={form.fromAccount}
        onChange={(e) => setForm({ ...form, fromAccount: e.target.value })} />
      <input placeholder="Cuenta destino (toAccount)" value={form.toAccount}
        onChange={(e) => setForm({ ...form, toAccount: e.target.value })} />
      <input type="number" placeholder="Monto (amount)" value={form.amount}
        onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })} />
      <input placeholder="Moneda (currency)" value={form.currency}
        onChange={(e) => setForm({ ...form, currency: e.target.value })} />
      <input placeholder="Usuario (userId)" value={form.userId}
        onChange={(e) => setForm({ ...form, userId: e.target.value })} />
      <button type="submit">Iniciar Transacción</button>
    </form>
  );
}
