import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "attributesToSnipcartList"
})
export class AttributesToSnipcartListPipe implements PipeTransform {
    transform(value: unknown, ...args: unknown[]): unknown {
        return null;
    }
}
