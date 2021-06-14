import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "app-widget",
    templateUrl: "./widget.component.html",
    styleUrls: ["./widget.component.scss"]
})
export class WidgetComponent implements OnInit {
    @Input() content: string = "";
    @Output() widgetClickEvent: EventEmitter<void> = new EventEmitter<void>();

    constructor() { }

    ngOnInit(): void {
    }

    onClick(): void {
        this.widgetClickEvent.emit();
    }
}
