import { ErrorHandler, Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";

import { AlertService } from "@core/alerts/alert.service";

@Injectable({
  providedIn: "root"
})
export class ErrorHandlerService implements ErrorHandler {

    constructor(private alertService: AlertService) { }

    handleError(error: Error | HttpErrorResponse): void {
        if (error instanceof HttpErrorResponse) {
            // Server or connection error happened
            this.processError(
                error,
                `An error occurred when processing the request: ${error.status} ${error.statusText}: ${error.message}`
            );
        } else {
            // Angular error
            this.processError(
                error,
                `Unexpected error: ${error.message}`
            );
        }
    }

    processError(error: Error | HttpErrorResponse, str: string): void {
        if (error != null) {
            console.error(error, str);
        }

        this.alertService.error("Oops, something went wrong!");
        // TODO log whole error (and short message) on logging server

    }
}
