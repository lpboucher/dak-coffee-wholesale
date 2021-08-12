import { NgModule, Optional, SkipSelf } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { ToastrModule } from "ngx-toastr";
import { CloudinaryModule } from "@cloudinary/angular";
import { AngularSvgIconModule } from "angular-svg-icon";

import { HttpTokenInterceptor } from "@core/interceptors/http.token.interceptor";
import { throwIfAlreadyLoaded } from "@core/guards/module-import.guard";

import { SharedModule } from "@shared/shared.module";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        CloudinaryModule,
        AngularSvgIconModule.forRoot(),
        SharedModule,
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
