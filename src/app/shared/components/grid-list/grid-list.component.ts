import { Component, Input, OnInit } from "@angular/core";
import { ClampPipe } from "@shared/pipes/clamp.pipe";

const MAX_COLUMN_COUNT = 12;
const MIN_COLUMN_COUNT = 1;
const MIN_GRID_GAP = 0;
const MAX_GRID_GAP = 10;

@Component({
    selector: "app-grid-list",
    templateUrl: "./grid-list.component.html",
    styleUrls: ["./grid-list.component.scss"]
})
export class GridListComponent implements OnInit {
    @Input() mobileColumnCount: number = 1;
    @Input() mdColumnCount?: number;
    @Input() itemColumnSpan: number = 1;
    @Input() gridGap: number = 0;

    constructor(private clampPipe: ClampPipe) { }

    ngOnInit(): void {
        this.mobileColumnCount = this.clampPipe.transform(this.mobileColumnCount, MIN_COLUMN_COUNT, MAX_COLUMN_COUNT);
        this.itemColumnSpan = this.clampPipe.transform(this.itemColumnSpan, MIN_COLUMN_COUNT, MAX_COLUMN_COUNT);
        this.gridGap = this.clampPipe.transform(this.gridGap, MIN_GRID_GAP, MAX_GRID_GAP);

        if (this.mdColumnCount != null) {
            this.mdColumnCount = this.clampPipe.transform(this.mdColumnCount, MIN_COLUMN_COUNT, MAX_COLUMN_COUNT);
        }
    }

    get columnClass(): string {
        return `mobile-columns-${ this.mobileColumnCount }`;
    }

    get mdColumnClass(): string {
        if (this.mdColumnCount == null) {
            return "";
        }

        return `md-columns-${ this.mdColumnCount }`;
    }

    get itemColumnSpanClass(): string {
        return `item-span-${ this.itemColumnSpan }`;
    }

    get gridGapClass(): string {
        return `grid-gap-${ this.gridGap }`;
    }
}
