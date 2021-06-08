import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector } from "@angular/core";

import { ModalComponent } from "@modules/modal/components/modal/modal.component";

@Injectable({
    providedIn: "root"
})
export class ModalService {
    private currentModelRef: ComponentRef<ModalComponent> | undefined;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private applicationRef: ApplicationRef,
        private injector: Injector,
    ) { }

    async open(): Promise<void> {
        if (this.currentModelRef) { return; }

        this.currentModelRef = this.componentFactoryResolver
            .resolveComponentFactory(ModalComponent)
            .create(this.injector);

        this.applicationRef.attachView(this.currentModelRef.hostView);

        const domElem = (this.currentModelRef.hostView as EmbeddedViewRef<any>)
            .rootNodes[0] as HTMLElement;

        document.body.appendChild(domElem);
    }

    async close(): Promise<void> {
        if (!this.currentModelRef) { return; }

        this.applicationRef.detachView(this.currentModelRef.hostView);
        this.currentModelRef.destroy();
        this.currentModelRef = undefined;
    }
}
