import { Injectable } from "@angular/core";

import { ToastrService } from "ngx-toastr";

@Injectable({ providedIn: "root" })
export class AlertService {
    constructor(private toastr: ToastrService) { }

    success(message: string): void {
        this.toastr.success(message);
    }

    error(message: string): void {
        this.toastr.error(message);
    }

    info(message: string): void {
        this.toastr.info(message);
    }

    warn(message: string): void {
        this.toastr.warning(message);
    }

    clear(): void {
        this.toastr.clear();
    }
}
