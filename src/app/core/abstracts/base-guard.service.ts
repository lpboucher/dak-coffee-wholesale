import { Router } from "@angular/router";

export abstract class BaseGuardService {

    constructor(protected router: Router) { }

    /**
     * This function navigates the user back to the login and sets a return url
     * @param returnUrl
     */
    protected navigateToLogin(returnUrl: string): void {
        this.navigateTo("/session/login", returnUrl);
    }

    /**
     * This function handles the navigation with a return Url
     * @param url the url where to navigate
     * @param returnUrl the return url
     */
    private navigateTo(url: string, returnUrl?: string): void {
        this.router.navigate([url], { queryParams: { returnUrl: returnUrl } })
            .catch((navigateErr) => console.error(navigateErr));
    }
}
