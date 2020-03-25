import { ConversationModel } from './conversation.model';

export class MessageModel {
    id?: number = 0;
    content: string = '';
    conversationId: number;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();


    constructor(message: string) {
        this.content = message;
    }

    setContent(content:string) {
        this.content = content ;
    }

    setConversation(conversation : ConversationModel) {
        this.conversationId = conversation.id ;
    }
}