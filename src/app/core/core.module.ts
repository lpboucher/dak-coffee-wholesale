import { NgModule, Optional, SkipSelf } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { ToastrModule } from "ngx-toastr";

import { HttpTokenInterceptor } from "@core/interceptors/http.token.interceptor";
import { throwIfAlreadyLoaded } from "@utils/module-import.guard";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
        ToastrModule.forRoot(),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpTokenInterceptor,
            multi: true,
        },
    ],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
      throwIfAlreadyLoaded(parentModule, "CoreModule");
    }
  }
