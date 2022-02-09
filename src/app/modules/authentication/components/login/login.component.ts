import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, AbstractControl } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "@core/authentication/authentication.service";
import { CartService } from "@app/core/cart/cart.service";
import { PricingTierService } from "@app/core/pricing/pricing-tier.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
    readonly minPasswordCharacters = 8;
    isSubmitting = false;
    submissionAttempted = false;
    asyncErrorMessage = "";
    loginForm = this.fb.group({
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(this.minPasswordCharacters)]],
    });

    get isSubmissionDisabled(): boolean {
        return this.loginForm.invalid || this.loginForm.pristine;
    }

    get emailControl(): AbstractControl {
        return this.control("email")!;
    }

    get passwordControl(): AbstractControl {
        return this.control("password")!;
    }

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private pricingTierService: PricingTierService,
        private cartService: CartService,
    ) { }

    ngOnInit(): void {
    }

    onSubmitLogin(): void {
        this.isSubmitting = true;

        if (this.loginForm.invalid) {
            this.isSubmitting = false;
            this.submissionAttempted = true;
            return;
        }

        this.authService.login(this.emailControl.value, this.passwordControl.value)
            .subscribe(
                ({loggedIn, walletValue, walletDiscountCode}) => {
                    if (loggedIn) {
                        const isFirstOrder = walletValue === 0;
                        // const routeExtension = isFirstOrder ? { queryParams: { checkPricing: true } } : {};
                        const routeExtension = {};
                        // this.pricingTierService.toggleDiscount(!isFirstOrder);
                        this.pricingTierService.updateWalletAmount(walletValue);
                        this.cartService.applyDiscount(walletDiscountCode!);
                        this.router.navigate(["/"], routeExtension);
                    }
                },
                (err) => {
                    console.log(err);
                    this.isSubmitting = false;
                    this.submissionAttempted = true;
                    const errDict: {[code: number]: string} = {
                        401: "Incorrect combination of email/password.",
                        403: "Account is still locked, please wait for confirmation.",
                        404: "Email does not exist, are you registered?.",
                    };
                    this.asyncErrorMessage = errDict[err.status] || "It looks like we were not able to log you in, please try again.";
                },
            );
    }

    hasErrors(controlName: string): boolean {
        return (this.control(controlName)?.invalid
            && (this.control(controlName)?.dirty || this.control(controlName)?.touched))
            ?? false;
    }

    private control(name: string): AbstractControl | null {
        return this.loginForm.get(name);
    }
}

