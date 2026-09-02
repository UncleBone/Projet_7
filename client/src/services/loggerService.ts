const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const logToServer = async (level: 'info' | 'warn' | 'error', message: string, metadata?: any) => {
  try {
    await fetch(`${API_URL}/logs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        level,
        message,
        metadata: {
          ...metadata,
          url: window.location.href,
        }
      }),
    });
  } catch (err) {
    // On ne loggue pas l'erreur ici pour éviter une boucle infinie si le serveur est down
    console.error('Failed to send log to server', err);
  }
};