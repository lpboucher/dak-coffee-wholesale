import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";

import { environment as config } from "@env";
import { DataApiService } from "@core/abstracts/data-api.service";

import { Message } from "@shared/models/classes/message.class";
import { CommunicationType } from "@shared/models/types/communication-type.type";

@Injectable({
    providedIn: "root"
})
export class CommunicationApiService extends DataApiService<Message> {
    private notificationForProduct$ = new BehaviorSubject("");

    get productNameForNotification(): string {
        return this.notificationForProduct$.value;
    }

    constructor(
        protected http: HttpClient,
    ) {
        super(config.backendURL + "customers/messages/", http, Message);
    }

    setProductNameForNotification(name: string): void {
        this.notificationForProduct$.next(name);
    }

    resetProductName(): void {
        this.setProductNameForNotification("");
    }

    sendMessage(destinationEmail: string, messageType: CommunicationType, data?: string): Observable<Message> {
        return this.create(new Message({ destinationEmail, messageType, content: data }));
    }
}
