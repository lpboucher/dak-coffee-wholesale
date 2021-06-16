import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";

import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "@core/core.module";

import { AppComponent } from "./app.component";


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        CoreModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        NgxSkeletonLoaderModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
