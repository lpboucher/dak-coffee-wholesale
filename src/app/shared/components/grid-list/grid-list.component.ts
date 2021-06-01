import { Component, Input, OnInit } from "@angular/core";
import { ClampPipe } from "@shared/pipes/clamp.pipe";

const MAX_COLUMN_COUNT = 12;
const MIN_COLUMN_COUNT = 1;

@Component({
    selector: "app-grid-list",
    templateUrl: "./grid-list.component.html",
    styleUrls: ["./grid-list.component.scss"]
})
export class GridListComponent implements OnInit {
    @Input() mobileColumnCount: number = 1;
    @Input() itemColumnSpan: number = 1;
    @Input() gridGap: number = 0;

    constructor(private clampPipe: ClampPipe) { }

    ngOnInit(): void {

        this.mobileColumnCount = this.clampPipe.transform(this.mobileColumnCount, MIN_COLUMN_COUNT, MAX_COLUMN_COUNT);
        this.itemColumnSpan = this.clampPipe.transform(this.itemColumnSpan, MIN_COLUMN_COUNT, MAX_COLUMN_COUNT);
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
}
