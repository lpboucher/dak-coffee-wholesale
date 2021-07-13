import { Directive, OnDestroy, OnInit } from "@angular/core";
import { ControlContainer } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs";

@Directive({
    selector: "[bindQueryParams]"
})
export class BindQueryParamsDirective implements OnInit, OnDestroy {
    private subscriptions: Subscription = new Subscription();

    constructor(
        private controlContainer: ControlContainer,
        private activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.subscriptions.add(
            this.activatedRoute.queryParams.subscribe(
                (params: Params) => {
                    this.controlContainer.control?.patchValue(
                        params,
                        { emitEvent: false }
                    );
                }
            )
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
