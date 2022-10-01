import { io, Socket } from 'socket.io-client'

const server_url = process.env.NEXT_PUBLIC_SOCKET_URL as string
export const socket: Socket = io(server_url)
