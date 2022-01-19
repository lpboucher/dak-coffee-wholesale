import { CommunicationType } from "@shared/models/types/communication-type.type";

export class Message {
    destinationEmail!: string;
    messageType!: CommunicationType;
    content: string = "";
    isInternal: boolean = false;

    constructor(newMessageShape?: Partial<Message>) {
        if (newMessageShape != null) {
            if (newMessageShape.destinationEmail != null) {
                this.destinationEmail = newMessageShape.destinationEmail;
            }

            if (newMessageShape.messageType != null) {
                this.messageType = newMessageShape.messageType;

                if (this.messageType === "sample-request" || this.messageType === "product-notification") {
                    this.isInternal = true;
                }
            }

            if (newMessageShape.content != null) {
                this.content = newMessageShape.content;
            }
        }
    }
}
