import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "app-grid-list",
    templateUrl: "./grid-list.component.html",
    styleUrls: ["./grid-list.component.scss"]
})
export class GridListComponent implements OnInit {
    @Input() mobileColumnCount: number = 1;
    @Input() itemColumnSpan: number = 1;
    @Input() gridGap: number = 0;

    constructor() { }

    ngOnInit(): void {
        this.mobileColumnCount = this.clampColumnValue(this.mobileColumnCount);
        this.itemColumnSpan = this.clampColumnValue(this.itemColumnSpan);
    }

    get columnClass(): string {
        return `mobile-columns-${ this.mobileColumnCount }`;
    }

    get itemColumnSpanClass(): string {
        return `item-span-${ this.itemColumnSpan }`;
    }

    get gridGapClass(): string {
        const baseString = "grid-gap-";
        const validGapValues = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10,
            11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96];

        if (validGapValues.includes(this.gridGap)) {
            return baseString + this.gridGap.toString().replace(".", "-");
        }

        return baseString + "0";
    }

    private clampColumnValue(columnValue: number): number {
        const MAX_COLUMN_COUNT = 12;
        const MIN_COLUMN_COUNT = 1;

        columnValue = Math.min(MAX_COLUMN_COUNT, columnValue);
        columnValue = Math.max(MIN_COLUMN_COUNT, columnValue);

        return columnValue;
    }
}
