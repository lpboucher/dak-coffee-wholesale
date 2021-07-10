import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { IDropdownSettings } from "ng-multiselect-dropdown";

import { FilterType } from "@shared/models/types/filter-type.interface";


type DropdownSubItem = { id: number, text: string }
type DropdownItem = { displayName: string, key: string, options: DropdownSubItem[], selectedItems: DropdownSubItem[] };


@Component({
    selector: "app-filter",
    templateUrl: "./filter.component.html",
    styleUrls: ["./filter.component.scss"]
})
export class FilterComponent implements OnInit {
    @Input() filterOptions: FilterType = {};
    dropdownList: DropdownItem[] = [];
    dropdownSettings: IDropdownSettings = {};
    private nameToId: { [key: string]: number } = {};
    private nextId = new class {
        private nextId = 0;
        generate = () => this.nextId++;
    };

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.dropdownList = this.generateDropdownList();
        this.dropdownSettings = {
            singleSelection: false,
            idField: "id",
            textField: "text",
            enableCheckAll: false,
            allowSearchFilter: true,
        };
    }

    updateFilter(): void {
        const filter = this.dropdownList
            .filter(item => item.selectedItems.length > 0)
            .reduce((previous, current) => {
                return {
                    ...previous,
                    [current.key]: current.selectedItems.map(selected => selected.text),
                };
            }, {});

        this.router.navigate([], { queryParams: filter });
    }

    private generateDropdownList(): DropdownItem[] {
        return Object.values(this.filterOptions)
            .map(option => {
                return {
                    displayName: option.displayName,
                    key: option.key,
                    options: option.subOptions.map(o => this.makeDropdownSubItem(o)),
                    selectedItems: this.setupInitialFilter(option.key),
                }
            });
    }

    private makeDropdownSubItem(name: string): DropdownSubItem {
        let id = this.nameToId[name];
        if (id == null) {
            id = this.nextId.generate();
        }

        return { id: id, text: name };
    }

    private setupInitialFilter(key: string): DropdownSubItem[] {
        let params = this.activatedRoute.snapshot.queryParams[key];
        if (params == null) { return []; }

        if (!Array.isArray(params)) {
            params = [params];
        }

        return params.map((p: any) => this.makeDropdownSubItem(String(p)));
    }
}
