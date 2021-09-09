import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";

import { FilterType } from "@shared/models/types/filter-type.type";

type Selection = Set<string>;

@Component({
    selector: "app-filter",
    templateUrl: "./filter.component.html",
    styleUrls: ["./filter.component.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: FilterComponent,
        },
    ]
})
export class FilterComponent implements OnInit, OnDestroy, ControlValueAccessor {
    @Input() propertyToFilter!: FilterType;
    private selection: Selection = new Set();
    private touched = false;
    private disabled = false;
    private subscriptions: Subscription = new Subscription();
    isOpen = false;
    private onChange = (_: Selection) => this.internalOnChange();
    private onTouched = () => {};

    get numberOfActiveFilters(): number {
        return this.selection.size;
    }

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private controlContainer: ControlContainer,
    ) {}

    ngOnInit(): void {
        this.subscriptions.add(
            this.activatedRoute.queryParams.subscribe(
                queryParams => this.updateFromQueryParams(queryParams)
            )
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    onFilterClicked(): void {
        this.toggleAccordion();
    }

    onFilterOptionClicked(id: string): void {
        this.markAsTouched();
        if (this.disabled) { return; }

        if (this.selection.has(id)) {
            this.selection.delete(id);
        } else {
            this.selection.add(id);
        }
        this.onChange(this.selection);
    }

    isSelected(id: string): boolean {
        return this.selection.has(id);
    }

    writeValue(selection: Selection): void {
        if (selection == null) { return; }

        this.selection = selection;
        this.onChange(this.selection);
    }

    registerOnChange(onChange: any): void {
        this.onChange = (selection) => {
            this.internalOnChange();
            onChange(selection);
        };
    }

    registerOnTouched(onTouched: any): void {
        this.onTouched = onTouched;
    }

    setDisabledState(disabled: boolean): void {
        this.disabled = disabled;
    }

    private updateFromQueryParams(queryParams: Params): void {
        const rawSelection = queryParams[this.propertyToFilter.key];
        if (rawSelection == null) { return; }

        try {
            const selection = JSON.parse(rawSelection) as string[];
            this.controlContainer
                .control
                ?.get(this.propertyToFilter.key)
                ?.patchValue(new Set(selection));
        } catch (_) { return; }
    }

    private internalOnChange(): void {
        const selectionParams = JSON.stringify([...this.selection]);
        const queryParams = { [this.propertyToFilter.key]: selectionParams };

        this.router.navigate(
            [],
            {
                relativeTo: this.activatedRoute,
                queryParams,
                queryParamsHandling: "merge",
            }
        );
    }

    private markAsTouched(): void {
        if (this.touched) { return; }

        this.onTouched();
        this.touched = true;
    }

    private toggleAccordion(): void {
        this.isOpen = !this.isOpen;
    }
}
