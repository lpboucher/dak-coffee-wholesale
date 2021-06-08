import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector, Type } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class ModalService<T> {
    private currentModelRef: ComponentRef<T> | undefined;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private applicationRef: ApplicationRef,
        private injector: Injector,
    ) { }

    async open(component: Type<T>): Promise<void> {
        if (this.currentModelRef) { return; }

        this.currentModelRef = this.componentFactoryResolver
            .resolveComponentFactory(component)
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
