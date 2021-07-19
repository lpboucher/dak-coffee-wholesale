import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

import { IDropdownSettings } from "ng-multiselect-dropdown";

import { FilterType } from "@shared/models/types/filter-type.type";
import { ActiveFilters } from "@shared/models/types/active-filters.type";
import { Subscription } from "rxjs";


type DropdownSubItem = { id: number, text: string }
type DropdownItem = { displayName: string, key: string, options: DropdownSubItem[], selectedItems: DropdownSubItem[] };


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
    @Input() filterOptions: FilterType = {};
    @Output() selectedOptions: EventEmitter<ActiveFilters> = new EventEmitter();
    dropdownList: DropdownItem[] = [];
    dropdownSettings: IDropdownSettings = {};
    private subscriptions: Subscription = new Subscription();
    private onChange = (_: {}) => {};
    private onTouched = () => {};
    private touched = false;
    private disabled = false;
    private nextId = new class {
        private nameToId: { [key: string]: number } = {};
        private nextId = 0;
        generate = (name: string) => {
            if (this.nameToId[name] == null) {
                this.nameToId[name] = this.nextId;
                this.nextId += 1;
            }

            return this.nameToId[name];
        }
    };

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {}

    writeValue(selectedItems: { [key: string]: string[] }): void {
        this.dropdownList = this.dropdownList
            .map(item => {
                return {
                    ...item,
                    selectedItems: selectedItems[item.key].map(i => this.makeDropdownItem(i))
                }
            });

        this.updateFilter();
    }

    registerOnChange(onChange: any): void {
        this.onChange = onChange;
    }

    registerOnTouched(onTouched: any): void {
        this.onTouched = onTouched;
    }

    setDisabledState(disabled: boolean): void {
        this.disabled = disabled;
    }

    ngOnInit(): void {
        this.dropdownList = this.generateDropdownList();
        this.dropdownSettings = {
            singleSelection: false,
            idField: "id",
            textField: "text",
            enableCheckAll: false,
            allowSearchFilter: true,
        };

        this.subscriptions.add(
            this.activatedRoute.queryParams.subscribe(
                _ => {
                    this.dropdownList = this.generateDropdownList();
                    this.updateFilter();
                }
            )
        )
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    updateFilter(): void {
        this.markAsTouched();
        if (this.disabled) return;

        const filter = this.dropdownList
            .filter(item => item.selectedItems.length > 0)
            .reduce((previous, current) => {
                return {
                    ...previous,
                    [current.key]: current.selectedItems.map(selected => selected.text),
                };
            }, {});

        this.onChange(filter);
        this.selectedOptions.emit(filter);
        this.router.navigate(
            [],
            {
                relativeTo: this.activatedRoute,
                queryParams: filter,
            }
        );
    }

    private generateDropdownList(): DropdownItem[] {
        return Object.values(this.filterOptions)
            .map(category => {
                return {
                    displayName: category.displayName,
                    key: category.key,
                    options: category.options.map(o => this.makeDropdownItem(o)),
                    selectedItems: this.setupInitialFilter(category.key),
                }
            });
    }

    private makeDropdownItem(name: string): DropdownSubItem {
        return { id: this.nextId.generate(name), text: name };
    }

    private setupInitialFilter(key: string): DropdownSubItem[] {
        let params = this.activatedRoute.snapshot.queryParams[key];
        if (params == null) { return []; }

        if (!Array.isArray(params)) {
            params = [params];
        }

        return params.map((p: any) => this.makeDropdownItem(String(p)));
    }

    private markAsTouched() {
        if (this.touched) return;
        this.onTouched();
        this.touched = true;
    }
}
