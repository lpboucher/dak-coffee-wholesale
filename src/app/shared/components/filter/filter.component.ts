import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

type FilterType = { [key: string]: string[] };

@Component({
    selector: "app-filter",
    templateUrl: "./filter.component.html",
    styleUrls: ["./filter.component.scss"]
})
export class FilterComponent implements OnInit {
    private filterOptions: FilterType = {};
    private activeFilters: FilterType = {};

    constructor(
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit(): void {
        const options = {
            "Origin": ["Colombia", "Rawanda", "Salvador"],
            "Name": ["The Alchemist", "La Terraza", "La Dalia"],
            "Price": ["$15.00", "$10.00"],
        };

        this.filterOptions = options;
        console.log(this.filterOptions);
    }

    addToFilter(key: string, value: string): void {
        if (this.activeFilters[key] == undefined) {
            this.activeFilters[key] = [];
        }

        this.activeFilters[key].push(value);
        this.updateQueryParams();
    }

    removeKeyFromFilter(key: string) {
        delete this.activeFilters[key];
        this.updateQueryParams();
    }

    removeOptionFromFilter(key: string, value: string): void {
        this.activeFilters[key] = this.activeFilters[key]
            .filter(f => f != value);

        if (this.activeFilters[key].length == 0) {
            this.removeKeyFromFilter(key);
        } else {
            this.updateQueryParams();
        }
    }

    updateQueryParams(): void {
        this.router.navigate([], { queryParams: this.activeFilters });
        console.log(this.activeFilters);
    }

    availableFilterKeys(): string[] {
        return Object.keys(this.filterOptions);
    }

    availableFilterKeyValues(key: string): string[] {
        return this.filterOptions[key];
    }
}
