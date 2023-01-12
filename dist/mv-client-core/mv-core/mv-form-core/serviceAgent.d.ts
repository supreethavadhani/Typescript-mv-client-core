import { HttpClient } from '@angular/common/http';
import { ClientConfig } from './clientConfig';
import { Vo, FilterRequest } from './types';
import { Observable } from 'rxjs';
import { ClientContext } from './clientContext';
import { Form } from './form';
import 'rxjs/add/operator/map';
import * as i0 from "@angular/core";
export declare class ServiceAgent {
    private http;
    private config;
    private ctx;
    constructor(http: HttpClient, config: ClientConfig, ctx: ClientContext);
    /**
     * serve this service. we use a strict service oriented architecture,
     * where in the only thing the client can ask the server is to serve a service.
     * There is no concept of resources or operations. Any such concepts are to be
     * implemented using the service paradigm.
     * @param serviceName  name of the service to be requested
     * @param data input data for the request
     * @param asQueryParams true if the data is just a set of name-string params, and the srver expects them in query string
     * @param headers any special headers to be communicated. Typically for additional authentication.
     * @param withAuth true if the request is to be sent with auth. If auth is not present, this wil trigger a login
     */
    serve(serviceName: string, options?: {
        data?: Vo | FilterRequest | null;
        asQueryParams?: boolean;
        headers?: {
            [key: string]: string;
        };
    }, withAuth?: boolean): (Observable<Vo>);
    /**
     * filter rows for a form and return raw-rows.
     * Note that the returned data is NOT set to any model before returning it the caller
     */
    filter(form: Form, filters: FilterRequest): Observable<Vo[]>;
    /**
     *
     * @param call parameters for serve that was interrupted.
     * We have to design a way to return an observable that works after a successful login.
     */
    private notLoggedIn;
    private toParams;
    /**
     * initiates a file-down load by the browser with supplied data as content
     * @param data  to be downloaded
     * @param fileName naem of the file to be downloaded as
     */
    download(data: any, fileName: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ServiceAgent, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ServiceAgent>;
}
//# sourceMappingURL=serviceAgent.d.ts.map