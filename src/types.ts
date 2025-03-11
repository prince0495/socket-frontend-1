export interface ServerToClientEvents { // receiving
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    welcome: (arg: any) => void;
    personalMessage: (msg: string) => void; 
  }
  
export  interface ClientToServerEvents {  // sending
    hello: () => void;
    welcome: (arg: any) => void;
    message: (personId: string, roomId: string, msg: string) => void;
    joinRoom: (roomId:string) => void;
  }
  
export  interface InterServerEvents {
    ping: () => void;
  }
  
export  interface SocketData {
    name: string;
    age: number;
  }