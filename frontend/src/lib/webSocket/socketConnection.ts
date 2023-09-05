import io from 'socket.io-client';

export const socketConnection = io('http://localhost:5000');
