import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment as config } from "@env";
import { DataApiService } from "@core/abstracts/data-api.service";

import { Message } from "@shared/models/classes/message.class";
import { CommunicationType } from "@shared/models/types/communication-type.type";

@Injectable({
    providedIn: "root"
})
export class CommunicationApiService extends DataApiService<Message> {

    constructor(
        protected http: HttpClient,
    ) {
        super(config.backendURL + "customers/messages/", http, Message);
    }

    sendMessage(destinationEmail: string, messageType: CommunicationType, data?: string): Observable<Message> {
        return this.create(new Message({ destinationEmail, messageType }));
    }
}
