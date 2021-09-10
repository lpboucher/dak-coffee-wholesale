import { CommunicationType } from "@shared/models/types/communication-type.type";

export class Message {
    destinationEmail!: string;
    messageType!: CommunicationType;

    constructor(newMessageShape?: Partial<Message>) {
        if (newMessageShape != null) {
            if (newMessageShape.destinationEmail != null) {
                this.destinationEmail = newMessageShape.destinationEmail;
            }

            if (newMessageShape.messageType != null) {
                this.messageType = newMessageShape.messageType;
            }
        }
    }
}