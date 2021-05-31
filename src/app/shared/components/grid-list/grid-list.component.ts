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
        return `grid-gap-${ this.gridGap }`;
    }

    private clampColumnValue(columnValue: number): number {
        const MAX_COLUMN_COUNT = 12;
        const MIN_COLUMN_COUNT = 1;

        columnValue = Math.min(MAX_COLUMN_COUNT, columnValue);
        columnValue = Math.max(MIN_COLUMN_COUNT, columnValue);

        return columnValue;
    }
}
