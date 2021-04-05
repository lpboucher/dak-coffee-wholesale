import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

export abstract class DataApiService<T> {

    constructor(protected url: string, protected http: HttpClient, private type: new (Object: any) => T) { }

    protected requestOptions = {
        headers: new HttpHeaders().append("Content-Type", "application/json"),
        withCredentials: true
    };

    /**
     * This method calls the backend to return all resources.
     * @param urlExtension
     * @returns {Observable<Array<T>>}
     */
    protected getAll(urlExtension = ""): Observable<Array<T>> {
        return this.http.get<T[]>(this.url + urlExtension, this.requestOptions)
            .pipe(map(res => {
                const array: T[] = [];

                for (const resourceObject of res) {
                    array.push(new this.type(resourceObject));
                }

                return array;
            }));
        // return of();
    }

    /**
     * This method calls the backend to create the resource.
     * @param {Object} resource
     * @returns {Observable<Object>}
     */
    protected create(resource: T, urlExtension = ""): Observable<T> {
        return this.http.post<T>(this.url + urlExtension, resource, this.requestOptions)
            .pipe(map((res) => {
                return new this.type(res);
            }));
        // return of();
    }

    /**
     * This method calls the backend to receive a resource with the given id.
     * @param {number} resourceId
     * @returns {Observable<T>}
     */
    protected getOne(resourceId: string, urlExtension = ""): Observable<T> {
        return this.http.get<T>(this.url + urlExtension + resourceId, this.requestOptions)
            .pipe(map((res) => {
                return new this.type(res);
            }));
        // return of();
    }

    /**
     * This method calls the backend to put a resource with the given id.
     * @param {T} resource
     * @param {number} resourceId
     * @returns {Observable<T>}
     */
    protected put(resourceId: string, resource: T): Observable<T> {
        return this.http.put<T>(this.url + resourceId, resource, this.requestOptions)
            .pipe(map((res) => {
                return new this.type(res);
            }));
        // return of();
    }

    /**
     * This method calls the backend to patch a resource with the given id.
     * @param {Object} resource
     * @param {number} resourceId
     * @returns {Observable<T>}
     */
    protected patch(resourceId: number, resource: T): Observable<T> {
        return this.http.patch<T>(this.url + resourceId, resource, this.requestOptions)
            .pipe(map((res) => {
                return new this.type(res);
            }));
    }

    /**
     * This method calls the backend to delete a resource with the given id.
     * @param {number} resourceId
     * @returns {Observable<void>}
     */
    protected deleteOne(resourceId: string): Observable<null> {
        return this.http.delete<null>(this.url + resourceId, this.requestOptions);
        // return of();
    }
}
