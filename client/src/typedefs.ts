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
  previewMessage: Message;
  participants: Participant[];
}
