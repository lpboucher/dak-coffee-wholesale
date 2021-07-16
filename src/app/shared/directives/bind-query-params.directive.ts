import { Directive, OnDestroy, OnInit } from "@angular/core";
import { ControlContainer } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";

import { simpleDeepEqual } from "@app/utils/helper";

@Directive({
    selector: "[bindQueryParams]"
})
export class BindQueryParamsDirective implements OnInit, OnDestroy {
    private subscriptions: Subscription = new Subscription();

    constructor(
        private controlContainer: ControlContainer,
        private activatedRoute: ActivatedRoute,
        private router: Router,
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

        this.subscriptions.add(
            this.controlContainer.valueChanges?.subscribe(
                (formValues: any) => {
                    const params = this.activatedRoute.snapshot.queryParams;
                    if (simpleDeepEqual(formValues, params)) { return; }

                    this.router.navigate(
                        [],
                        {
                            relativeTo: this.activatedRoute,
                            queryParams: formValues,
                            queryParamsHandling: "merge",
                        }
                    )
                }
            )
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
