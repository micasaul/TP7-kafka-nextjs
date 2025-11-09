'use client';
import React from 'react';

export default function TransactionForm() {
  const [form, setForm] = React.useState({
    fromAccount: 'CA-1001',
    toAccount: 'CA-2002',
    amount: 1000,
    currency: 'ARS',
    userId: 'demo-user'
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
      <input placeholder="fromAccount" value={form.fromAccount}
        onChange={(e) => setForm({ ...form, fromAccount: e.target.value })} />
      <input placeholder="toAccount" value={form.toAccount}
        onChange={(e) => setForm({ ...form, toAccount: e.target.value })} />
      <input type="number" placeholder="amount" value={form.amount}
        onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })} />
      <input placeholder="currency" value={form.currency}
        onChange={(e) => setForm({ ...form, currency: e.target.value })} />
      <input placeholder="userId" value={form.userId}
        onChange={(e) => setForm({ ...form, userId: e.target.value })} />
      <button type="submit">Iniciar Transacción</button>
    </form>
  );
}
