'use client';
import { useEffect, useRef, useState } from 'react';

export function useWebSocketFeed(url) {
  const [status, setStatus] = useState('connecting');
  const [messages, setMessages] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    ref.current = ws;

    ws.onopen = () => setStatus('open');
    ws.onclose = () => setStatus('closed');
    ws.onerror = () => setStatus('error');
    ws.onmessage = (evt) => {
      try {
        const m = JSON.parse(evt.data);
        setMessages((prev) => [m, ...prev]);
      } catch {}
    };

    return () => ws.close();
  }, [url]);

  return { status, messages };
}
