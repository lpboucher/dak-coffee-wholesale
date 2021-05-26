import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "app-grid-list",
    templateUrl: "./grid-list.component.html",
    styleUrls: ["./grid-list.component.scss"]
})
export class GridListComponent implements OnInit {
    @Input() mobileColumnCount: number = 1;

    constructor() { }

    ngOnInit(): void {
        this.clampColumnCount();
    }

    getColumnClass(): string {
        return `mobile-columns-${ this.mobileColumnCount }`;
    }

    private clampColumnCount(): void {
        const MAX_COLUMN_COUNT = 12;
        const MIN_COLUMN_COUNT = 1;

        if (this.mobileColumnCount > MAX_COLUMN_COUNT) {
            this.mobileColumnCount = MAX_COLUMN_COUNT;
        }

        if (this.mobileColumnCount < MIN_COLUMN_COUNT) {
            this.mobileColumnCount = MIN_COLUMN_COUNT;
        }
    }
}
