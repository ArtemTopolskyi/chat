export interface Message {
  id: number;
  senderId: number;
  text: string;
  createdAt: Date;
}

export interface Participant {
  id: number;
  username: string;
  userId: number;
  chatId: number;
}

export interface Chat {
  id: number;
  name: string;
  previewMessage: Message;
  participants: Participant[];
}

export interface User {
  id: number;
  username: string;
}
