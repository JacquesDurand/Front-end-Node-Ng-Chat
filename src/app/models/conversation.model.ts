export class ConversationModel {
    id?: number = 0;
    user1Id: number;
    user2Id:number;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();

    constructor(user1Id, user2Id) {
        this.user1Id = user1Id;
        this.user2Id = user2Id;
    }

}