import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';

import { StreamStatus } from "../models/types/stream-status.type";

@Pipe({
  name: 'withLoader',
})
export class WithLoaderPipe implements PipeTransform {
    transform<T = any>(val: Observable<T>): Observable<StreamStatus<T>> {
        return val.pipe(
            map((value: any) => ({ loading: false, value })),
            startWith({ loading: true }),
            catchError(error => of({ loading: false, error }))
        );
    }
}
