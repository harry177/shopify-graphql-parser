import { io } from 'socket.io-client';

export const socket = io('http://localhost:3001',{ withCredentials: true, reconnectionAttempts: 10000, timeout: 2000 });
