import { Input, Component, OnInit } from "@angular/core";

@Component({
    selector: "app-modal",
    templateUrl: "./modal.component.html",
    styleUrls: ["./modal.component.scss"]
})
export class ModalComponent implements OnInit {
    @Input() showSelf: boolean = false;

    constructor() { }

    ngOnInit(): void {
    }

    show(): void {
        this.showSelf = true;
    }

    onCancel(): void {
        console.log("Modal cancelled.");
        this.showSelf = false;
    }

    onConfirm(): void {
        console.log("Modal confirmed.");
        this.showSelf = false;
    }
}
