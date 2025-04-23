import { useEffect, useRef } from "react";

export function useSocket(docId: string) {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:4000?docId=${docId}`);
    socketRef.current = ws;

    return () => ws.close();
  }, [docId]);

  const sendUpdate = (content: any) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({ type: "update", docId, content })
      );
    }
  };

  return { socket: socketRef.current, sendUpdate };
}
