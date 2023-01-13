import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Conventions } from './conventions';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./clientConfig";
import * as i3 from "./clientContext";
/**
 * A wrapper on HttpClient to take care of our protocols
 * Draws heavily on Observables. If you are tounderstand/maintain this code,  you MUST be thorough with the Observables
 */
export class ServiceAgent {
    constructor(http, config, ctx) {
        this.http = http;
        this.config = config;
        this.ctx = ctx;
    }
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
    serve(serviceName, options = {}, withAuth = false) {
        console.log("entering here");
        const token = this.ctx.getToken();
        if (withAuth && !token) {
            console.log('not logged in');
            //not logged-in.To be re-tried after  a successful login
            return this.notLoggedIn({
                serviceName: serviceName,
                options: options,
                withAuth: withAuth
            });
        }
        const headers = options.headers || {};
        headers[Conventions.HEADER_SERVICE] = serviceName;
        if (withAuth) {
            headers[Conventions.HEADER_AUTH] = token;
        }
        let data = options.data || null;
        let params;
        if (data && options.asQueryParams) {
            params = this.toParams(data);
        }
        const obs = this.http.post(this.config.url, data, {
            observe: "response",
            headers: headers,
            params: params
        });
        console.log("entering obs");
        return obs.pipe(map((resp) => {
            console.log("entering map");
            if (!resp.ok) {
                const msg = 'Server Error. http-status :' + resp.status + '=' + resp.statusText + (resp.body ? 'Response: ' + JSON.stringify(resp.body) : '');
                console.error(msg);
                throw {
                    type: 'error',
                    id: 'serverError',
                    text: msg
                };
            }
            //no-news is good-news!!
            if (!resp.body) {
                return {};
            }
            const { messages, allOk, data, token } = resp.body;
            if (allOk) {
                if (token) {
                    this.ctx.setToken(token);
                }
                if (messages) {
                    if (messages[0].type == 'info') {
                        throw messages;
                    }
                }
                return data;
            }
            if (messages) {
                console.error('Server returned with errors :', messages);
                throw messages;
            }
            const msg = 'Server Error. server reported a failure, but did not return any error message';
            console.error(msg);
            throw [{
                    type: 'error',
                    id: 'serverError',
                    text: msg
                }];
        }));
    }
    /**
     * filter rows for a form and return raw-rows.
     * Note that the returned data is NOT set to any model before returning it the caller
     */
    filter(form, filters) {
        const serviceName = form.getServiceName(Conventions.OP_FILTER);
        if (!serviceName) {
            return throwError(() => new Error(Conventions.OP_FILTER + ' operation is not allowed.'));
        }
        const obs = this.serve(serviceName, { data: filters });
        return obs.pipe(map(vo => {
            return vo['list'];
        }), catchError(msgs => {
            console.error('catching in sa');
            throw msgs;
        }));
    }
    /**
     *
     * @param call parameters for serve that was interrupted.
     * We have to design a way to return an observable that works after a successful login.
     */
    notLoggedIn(params) {
        /**
         * what we want to do is:
         * 1. show a modal panel and accept credentials.
         * 2. call login service with these credentials.
         * 3. on successful login, make this service request again.
         * Logic would be quite tricky becaue we have t0 return an observable right now that triggers all these..
         ^ for te time being, we just throw-up our hands!!!
         */
        const msg = 'Sorry you are not logged in. Please try again after logging in';
        return new Observable((observer) => {
            const { error } = observer;
            error('msg');
        });
    }
    toParams(data) {
        let params = new HttpParams();
        for (const a in data) {
            if (data.hasOwnProperty(a)) {
                const val = data[a] || "";
                params.set(a, val.toString());
            }
        }
        return params;
    }
    /**
     * initiates a file-down load by the browser with supplied data as content
     * @param data  to be downloaded
     * @param fileName naem of the file to be downloaded as
     */
    download(data, fileName) {
        const json = JSON.stringify(data);
        const blob = new Blob([json], {
            type: 'octet/stream'
        });
        const url = window.URL.createObjectURL(blob);
        const a = window.document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.target = '_blank';
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}
ServiceAgent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: ServiceAgent, deps: [{ token: i1.HttpClient }, { token: i2.ClientConfig }, { token: i3.ClientContext }], target: i0.ɵɵFactoryTarget.Injectable });
ServiceAgent.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: ServiceAgent, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: ServiceAgent, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.ClientConfig }, { type: i3.ClientContext }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZUFnZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbXYtY2xpZW50LWNvcmUvc3JjL212LWNvcmUvbXYtZm9ybS1jb3JlL3NlcnZpY2VBZ2VudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRU4sVUFBVSxFQUVWLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUNOLFVBQVUsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUl2QixPQUFPLEVBQ04sV0FBVyxFQUNYLE1BQU0sZUFBZSxDQUFDO0FBTXZCLE9BQU8sRUFDTCxVQUFVLEVBQ1YsVUFBVSxFQUNYLE1BQU0sTUFBTSxDQUFDO0FBT2QsT0FBTyxFQUNOLFVBQVUsRUFDVixHQUFHLEVBQ0gsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLHVCQUF1QixDQUFDOzs7OztBQUsvQjs7O0dBR0c7QUFDSCxNQUFNLE9BQU8sWUFBWTtJQUN4QixZQUFvQixJQUFnQixFQUFVLE1BQW9CLEVBQVUsR0FBa0I7UUFBMUUsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQWM7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFlO0lBQUcsQ0FBQztJQUVsRzs7Ozs7Ozs7OztPQVVHO0lBQ0ksS0FBSyxDQUFDLFdBQW1CLEVBQy9CLFVBTUksRUFBRSxFQUNOLFdBQW9CLEtBQUs7UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUM1QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2xDLElBQUksUUFBUSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUE7WUFDNUIsd0RBQXdEO1lBQ3hELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztnQkFDdkIsV0FBVyxFQUFFLFdBQVc7Z0JBQ3hCLE9BQU8sRUFBRSxPQUFPO2dCQUNoQixRQUFRLEVBQUUsUUFBUTthQUNsQixDQUFDLENBQUM7U0FDSDtRQUNELE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLEdBQUcsV0FBVyxDQUFDO1FBQ2xELElBQUksUUFBUSxFQUFFO1lBQ2IsT0FBTyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDekM7UUFDRCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztRQUNoQyxJQUFJLE1BQU0sQ0FBQztRQUNYLElBQUksSUFBSSxJQUFJLE9BQU8sQ0FBQyxhQUFhLEVBQUU7WUFDbEMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDN0I7UUFDRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBa0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFO1lBQ2xFLE9BQU8sRUFBRSxVQUFVO1lBQ25CLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLE1BQU0sRUFBRSxNQUFNO1NBQ2QsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUMzQixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBUSxFQUFFLEVBQUU7WUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQTtZQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRTtnQkFDYixNQUFNLEdBQUcsR0FBRyw2QkFBNkIsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDOUksT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbkIsTUFBTTtvQkFDTCxJQUFJLEVBQUUsT0FBTztvQkFDYixFQUFFLEVBQUUsYUFBYTtvQkFDakIsSUFBSSxFQUFFLEdBQUc7aUJBQ1QsQ0FBQzthQUNGO1lBQ0Qsd0JBQXdCO1lBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNmLE9BQU8sRUFBRSxDQUFDO2FBQ1Y7WUFFRCxNQUFNLEVBQ0wsUUFBUSxFQUNSLEtBQUssRUFDTCxJQUFJLEVBQ0osS0FBSyxFQUNMLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNkLElBQUksS0FBSyxFQUFFO2dCQUNWLElBQUksS0FBSyxFQUFFO29CQUNWLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUN6QjtnQkFDRCxJQUFJLFFBQVEsRUFBRTtvQkFDYixJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksTUFBTSxFQUFFO3dCQUMvQixNQUFNLFFBQVEsQ0FBQztxQkFDZjtpQkFDRDtnQkFDRCxPQUFPLElBQVUsQ0FBQzthQUNsQjtZQUVELElBQUksUUFBUSxFQUFFO2dCQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsK0JBQStCLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ3pELE1BQU0sUUFBUSxDQUFDO2FBQ2Y7WUFDRCxNQUFNLEdBQUcsR0FBRywrRUFBK0UsQ0FBQztZQUM1RixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLE1BQU0sQ0FBQztvQkFDTixJQUFJLEVBQUUsT0FBTztvQkFDYixFQUFFLEVBQUUsYUFBYTtvQkFDakIsSUFBSSxFQUFFLEdBQUc7aUJBQ1QsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRDs7O09BR0c7SUFDTyxNQUFNLENBQUMsSUFBUyxFQUFFLE9BQXNCO1FBQzNDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDZCxPQUFPLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLEtBQUssQ0FBRSxXQUFXLENBQUMsU0FBUyxHQUFHLDRCQUE0QixDQUFDLENBQUMsQ0FBQztTQUM3RjtRQUVELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDdkQsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUNYLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUNMLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBUyxDQUFDO1FBQzlCLENBQUMsQ0FBQyxFQUNGLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMxQixPQUFPLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUE7WUFDbkIsTUFBTSxJQUFJLENBQUM7UUFDZixDQUFDLENBQUMsQ0FDTCxDQUFDO0lBQ04sQ0FBQztJQUVKOzs7O09BSUc7SUFDSyxXQUFXLENBQUMsTUFBVztRQUM5Qjs7Ozs7OztXQU9HO1FBQ0gsTUFBTSxHQUFHLEdBQUcsZ0VBQWdFLENBQUM7UUFDN0UsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFDLFFBQVksRUFBRSxFQUFFO1lBQ3RDLE1BQU0sRUFDTCxLQUFLLEVBQ0wsR0FBRyxRQUFRLENBQUM7WUFDYixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFTyxRQUFRLENBQUMsSUFBUztRQUN6QixJQUFJLE1BQU0sR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBQzlCLEtBQUssTUFBTSxDQUFDLElBQUksSUFBSSxFQUFFO1lBQ3JCLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDM0IsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDMUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7YUFDOUI7U0FDRDtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2YsQ0FBQztJQUNEOzs7O09BSUc7SUFDSSxRQUFRLENBQUMsSUFBUyxFQUFFLFFBQWdCO1FBQzFDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM3QixJQUFJLEVBQUUsY0FBYztTQUNwQixDQUFDLENBQUM7UUFDSCxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDekIsQ0FBQyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7UUFDYixDQUFDLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztRQUNwQixDQUFDLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN0QixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDVixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5QixDQUFDOzt5R0EzS1csWUFBWTs2R0FBWixZQUFZLGNBTlosTUFBTTsyRkFNTixZQUFZO2tCQVB4QixVQUFVO21CQUFDO29CQUNYLFVBQVUsRUFBRSxNQUFNO2lCQUNsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG5cdEh0dHBDbGllbnQsXG5cdEh0dHBQYXJhbXMsXG5cdEh0dHBSZXNwb25zZVxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge1xuXHRJbmplY3RhYmxlXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcblx0Q2xpZW50Q29uZmlnXG59IGZyb20gJy4vY2xpZW50Q29uZmlnJztcbmltcG9ydCB7XG5cdENvbnZlbnRpb25zXG59IGZyb20gJy4vY29udmVudGlvbnMnO1xuaW1wb3J0IHtcblx0Vm8sXG5cdFNlcnZlclJlc3BvbnNlLFxuXHRGaWx0ZXJSZXF1ZXN0XG59IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHtcbiAgdGhyb3dFcnJvcixcbiAgT2JzZXJ2YWJsZVxufSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG5DbGllbnRDb250ZXh0XG59IGZyb20gJy4vY2xpZW50Q29udGV4dCc7XG5pbXBvcnQge1xuXHRGb3JtXG59IGZyb20gJy4vZm9ybSc7XG5pbXBvcnQge1xuXHRjYXRjaEVycm9yLFxuXHRtYXBcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xuXG5ASW5qZWN0YWJsZSh7XG5cdHByb3ZpZGVkSW46ICdyb290J1xufSlcbi8qKlxuICogQSB3cmFwcGVyIG9uIEh0dHBDbGllbnQgdG8gdGFrZSBjYXJlIG9mIG91ciBwcm90b2NvbHNcbiAqIERyYXdzIGhlYXZpbHkgb24gT2JzZXJ2YWJsZXMuIElmIHlvdSBhcmUgdG91bmRlcnN0YW5kL21haW50YWluIHRoaXMgY29kZSwgIHlvdSBNVVNUIGJlIHRob3JvdWdoIHdpdGggdGhlIE9ic2VydmFibGVzXG4gKi9cbmV4cG9ydCBjbGFzcyBTZXJ2aWNlQWdlbnQge1xuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsIHByaXZhdGUgY29uZmlnOiBDbGllbnRDb25maWcsIHByaXZhdGUgY3R4OiBDbGllbnRDb250ZXh0KSB7fVxuXG5cdC8qKlxuXHQgKiBzZXJ2ZSB0aGlzIHNlcnZpY2UuIHdlIHVzZSBhIHN0cmljdCBzZXJ2aWNlIG9yaWVudGVkIGFyY2hpdGVjdHVyZSwgXG5cdCAqIHdoZXJlIGluIHRoZSBvbmx5IHRoaW5nIHRoZSBjbGllbnQgY2FuIGFzayB0aGUgc2VydmVyIGlzIHRvIHNlcnZlIGEgc2VydmljZS5cblx0ICogVGhlcmUgaXMgbm8gY29uY2VwdCBvZiByZXNvdXJjZXMgb3Igb3BlcmF0aW9ucy4gQW55IHN1Y2ggY29uY2VwdHMgYXJlIHRvIGJlIFxuXHQgKiBpbXBsZW1lbnRlZCB1c2luZyB0aGUgc2VydmljZSBwYXJhZGlnbS4gXG5cdCAqIEBwYXJhbSBzZXJ2aWNlTmFtZSAgbmFtZSBvZiB0aGUgc2VydmljZSB0byBiZSByZXF1ZXN0ZWRcblx0ICogQHBhcmFtIGRhdGEgaW5wdXQgZGF0YSBmb3IgdGhlIHJlcXVlc3Rcblx0ICogQHBhcmFtIGFzUXVlcnlQYXJhbXMgdHJ1ZSBpZiB0aGUgZGF0YSBpcyBqdXN0IGEgc2V0IG9mIG5hbWUtc3RyaW5nIHBhcmFtcywgYW5kIHRoZSBzcnZlciBleHBlY3RzIHRoZW0gaW4gcXVlcnkgc3RyaW5nXG5cdCAqIEBwYXJhbSBoZWFkZXJzIGFueSBzcGVjaWFsIGhlYWRlcnMgdG8gYmUgY29tbXVuaWNhdGVkLiBUeXBpY2FsbHkgZm9yIGFkZGl0aW9uYWwgYXV0aGVudGljYXRpb24uXG5cdCAqIEBwYXJhbSB3aXRoQXV0aCB0cnVlIGlmIHRoZSByZXF1ZXN0IGlzIHRvIGJlIHNlbnQgd2l0aCBhdXRoLiBJZiBhdXRoIGlzIG5vdCBwcmVzZW50LCB0aGlzIHdpbCB0cmlnZ2VyIGEgbG9naW5cblx0ICovXG5cdHB1YmxpYyBzZXJ2ZShzZXJ2aWNlTmFtZTogc3RyaW5nLFxuXHRcdG9wdGlvbnM6IHtcblx0XHRcdGRhdGEgPyA6IFZvIHwgRmlsdGVyUmVxdWVzdCB8IG51bGwgLFxuXHRcdFx0YXNRdWVyeVBhcmFtcyA/IDogYm9vbGVhbixcblx0XHRcdGhlYWRlcnMgPyA6IHtcblx0XHRcdFx0W2tleTogc3RyaW5nXTogc3RyaW5nXG5cdFx0XHR9XG5cdFx0fSA9IHt9LFxuXHRcdHdpdGhBdXRoOiBib29sZWFuID0gZmFsc2UpOihPYnNlcnZhYmxlIDwgVm8gPikge1xuXHRcdGNvbnNvbGUubG9nKFwiZW50ZXJpbmcgaGVyZVwiKVxuXHRcdGNvbnN0IHRva2VuID0gdGhpcy5jdHguZ2V0VG9rZW4oKTtcblx0XHRpZiAod2l0aEF1dGggJiYgIXRva2VuKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnbm90IGxvZ2dlZCBpbicpXG5cdFx0XHQvL25vdCBsb2dnZWQtaW4uVG8gYmUgcmUtdHJpZWQgYWZ0ZXIgIGEgc3VjY2Vzc2Z1bCBsb2dpblxuXHRcdFx0cmV0dXJuIHRoaXMubm90TG9nZ2VkSW4oe1xuXHRcdFx0XHRzZXJ2aWNlTmFtZTogc2VydmljZU5hbWUsXG5cdFx0XHRcdG9wdGlvbnM6IG9wdGlvbnMsXG5cdFx0XHRcdHdpdGhBdXRoOiB3aXRoQXV0aFxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGNvbnN0IGhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnMgfHwge307XG5cdFx0aGVhZGVyc1tDb252ZW50aW9ucy5IRUFERVJfU0VSVklDRV0gPSBzZXJ2aWNlTmFtZTtcblx0XHRpZiAod2l0aEF1dGgpIHtcblx0XHRcdGhlYWRlcnNbQ29udmVudGlvbnMuSEVBREVSX0FVVEhdID0gdG9rZW47XG5cdFx0fVxuXHRcdGxldCBkYXRhID0gb3B0aW9ucy5kYXRhIHx8IG51bGw7XG5cdFx0bGV0IHBhcmFtcztcblx0XHRpZiAoZGF0YSAmJiBvcHRpb25zLmFzUXVlcnlQYXJhbXMpIHtcblx0XHRcdHBhcmFtcyA9IHRoaXMudG9QYXJhbXMoZGF0YSk7XG5cdFx0fVxuXHRcdGNvbnN0IG9icyA9IHRoaXMuaHR0cC5wb3N0IDxTZXJ2ZXJSZXNwb25zZT4odGhpcy5jb25maWcudXJsLCBkYXRhLCB7XG5cdFx0XHRvYnNlcnZlOiBcInJlc3BvbnNlXCIsXG5cdFx0XHRoZWFkZXJzOiBoZWFkZXJzLFxuXHRcdFx0cGFyYW1zOiBwYXJhbXNcblx0XHR9KTtcblx0XHRjb25zb2xlLmxvZyhcImVudGVyaW5nIG9ic1wiKVxuXHRcdHJldHVybiBvYnMucGlwZShtYXAoKHJlc3A6YW55KSA9PiB7XG5cdFx0XHRjb25zb2xlLmxvZyhcImVudGVyaW5nIG1hcFwiKVxuXHRcdFx0aWYgKCFyZXNwLm9rKSB7XG5cdFx0XHRcdGNvbnN0IG1zZyA9ICdTZXJ2ZXIgRXJyb3IuIGh0dHAtc3RhdHVzIDonICsgcmVzcC5zdGF0dXMgKyAnPScgKyByZXNwLnN0YXR1c1RleHQgKyAocmVzcC5ib2R5ID8gJ1Jlc3BvbnNlOiAnICsgSlNPTi5zdHJpbmdpZnkocmVzcC5ib2R5KSA6ICcnKTtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihtc2cpO1xuXHRcdFx0XHR0aHJvdyB7XG5cdFx0XHRcdFx0dHlwZTogJ2Vycm9yJyxcblx0XHRcdFx0XHRpZDogJ3NlcnZlckVycm9yJyxcblx0XHRcdFx0XHR0ZXh0OiBtc2dcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHRcdC8vbm8tbmV3cyBpcyBnb29kLW5ld3MhIVxuXHRcdFx0aWYgKCFyZXNwLmJvZHkpIHtcblx0XHRcdFx0cmV0dXJuIHt9O1xuXHRcdFx0fVxuXHRcdFxuXHRcdFx0Y29uc3Qge1xuXHRcdFx0XHRtZXNzYWdlcyxcblx0XHRcdFx0YWxsT2ssXG5cdFx0XHRcdGRhdGEsXG5cdFx0XHRcdHRva2VuXG5cdFx0XHR9ID0gcmVzcC5ib2R5O1xuXHRcdFx0aWYgKGFsbE9rKSB7XG5cdFx0XHRcdGlmICh0b2tlbikge1xuXHRcdFx0XHRcdHRoaXMuY3R4LnNldFRva2VuKHRva2VuKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAobWVzc2FnZXMpIHtcblx0XHRcdFx0XHRpZiAobWVzc2FnZXNbMF0udHlwZSA9PSAnaW5mbycpIHtcblx0XHRcdFx0XHRcdHRocm93IG1lc3NhZ2VzO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gZGF0YSBhcyBWbztcblx0XHRcdH1cblxuXHRcdFx0aWYgKG1lc3NhZ2VzKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ1NlcnZlciByZXR1cm5lZCB3aXRoIGVycm9ycyA6JywgbWVzc2FnZXMpO1xuXHRcdFx0XHR0aHJvdyBtZXNzYWdlcztcblx0XHRcdH1cblx0XHRcdGNvbnN0IG1zZyA9ICdTZXJ2ZXIgRXJyb3IuIHNlcnZlciByZXBvcnRlZCBhIGZhaWx1cmUsIGJ1dCBkaWQgbm90IHJldHVybiBhbnkgZXJyb3IgbWVzc2FnZSc7XG5cdFx0XHRjb25zb2xlLmVycm9yKG1zZyk7XG5cdFx0XHR0aHJvdyBbe1xuXHRcdFx0XHR0eXBlOiAnZXJyb3InLFxuXHRcdFx0XHRpZDogJ3NlcnZlckVycm9yJyxcblx0XHRcdFx0dGV4dDogbXNnXG5cdFx0XHR9XTtcblx0XHR9KSk7XG5cdH1cblx0LyoqXG5cdCAqIGZpbHRlciByb3dzIGZvciBhIGZvcm0gYW5kIHJldHVybiByYXctcm93cy4gXG5cdCAqIE5vdGUgdGhhdCB0aGUgcmV0dXJuZWQgZGF0YSBpcyBOT1Qgc2V0IHRvIGFueSBtb2RlbCBiZWZvcmUgcmV0dXJuaW5nIGl0IHRoZSBjYWxsZXJcblx0ICovXG4gICAgcHVibGljIGZpbHRlcihmb3JtOkZvcm0sIGZpbHRlcnM6IEZpbHRlclJlcXVlc3QpOiBPYnNlcnZhYmxlPFZvW10+IHtcbiAgICAgICAgY29uc3Qgc2VydmljZU5hbWUgPSBmb3JtLmdldFNlcnZpY2VOYW1lKENvbnZlbnRpb25zLk9QX0ZJTFRFUik7XG4gICAgICAgIGlmICghc2VydmljZU5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKCgpID0+IG5ldyBFcnJvciAoQ29udmVudGlvbnMuT1BfRklMVEVSICsgJyBvcGVyYXRpb24gaXMgbm90IGFsbG93ZWQuJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb2JzID0gdGhpcy5zZXJ2ZShzZXJ2aWNlTmFtZSwgeyBkYXRhOiBmaWx0ZXJzIH0pO1xuICAgICAgICByZXR1cm4gb2JzLnBpcGUoXG4gICAgICAgICAgICBtYXAodm8gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB2b1snbGlzdCddIGFzIFZvW107XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IobXNncyA9PiB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ2NhdGNoaW5nIGluIHNhJylcbiAgICAgICAgICAgICAgICB0aHJvdyBtc2dzO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cblx0LyoqXG5cdCAqIFxuXHQgKiBAcGFyYW0gY2FsbCBwYXJhbWV0ZXJzIGZvciBzZXJ2ZSB0aGF0IHdhcyBpbnRlcnJ1cHRlZC5cblx0ICogV2UgaGF2ZSB0byBkZXNpZ24gYSB3YXkgdG8gcmV0dXJuIGFuIG9ic2VydmFibGUgdGhhdCB3b3JrcyBhZnRlciBhIHN1Y2Nlc3NmdWwgbG9naW4uXG5cdCAqL1xuXHRwcml2YXRlIG5vdExvZ2dlZEluKHBhcmFtczogYW55KTogT2JzZXJ2YWJsZSA8IFZvID4ge1xuXHRcdC8qKlxuXHRcdCAqIHdoYXQgd2Ugd2FudCB0byBkbyBpczpcblx0XHQgKiAxLiBzaG93IGEgbW9kYWwgcGFuZWwgYW5kIGFjY2VwdCBjcmVkZW50aWFscy5cblx0XHQgKiAyLiBjYWxsIGxvZ2luIHNlcnZpY2Ugd2l0aCB0aGVzZSBjcmVkZW50aWFscy5cblx0XHQgKiAzLiBvbiBzdWNjZXNzZnVsIGxvZ2luLCBtYWtlIHRoaXMgc2VydmljZSByZXF1ZXN0IGFnYWluLlxuXHRcdCAqIExvZ2ljIHdvdWxkIGJlIHF1aXRlIHRyaWNreSBiZWNhdWUgd2UgaGF2ZSB0MCByZXR1cm4gYW4gb2JzZXJ2YWJsZSByaWdodCBub3cgdGhhdCB0cmlnZ2VycyBhbGwgdGhlc2UuLlxuXHRcdCBeIGZvciB0ZSB0aW1lIGJlaW5nLCB3ZSBqdXN0IHRocm93LXVwIG91ciBoYW5kcyEhIVxuXHRcdCAqL1xuXHRcdGNvbnN0IG1zZyA9ICdTb3JyeSB5b3UgYXJlIG5vdCBsb2dnZWQgaW4uIFBsZWFzZSB0cnkgYWdhaW4gYWZ0ZXIgbG9nZ2luZyBpbic7XG5cdFx0cmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjphbnkpID0+IHtcblx0XHRcdGNvbnN0IHtcblx0XHRcdFx0ZXJyb3Jcblx0XHRcdH0gPSBvYnNlcnZlcjtcblx0XHRcdGVycm9yKCdtc2cnKTtcblx0XHR9KTtcblx0fVxuXG5cdHByaXZhdGUgdG9QYXJhbXMoZGF0YTogYW55KTogSHR0cFBhcmFtcyB7XG5cdFx0bGV0IHBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCk7XG5cdFx0Zm9yIChjb25zdCBhIGluIGRhdGEpIHtcblx0XHRcdGlmIChkYXRhLmhhc093blByb3BlcnR5KGEpKSB7XG5cdFx0XHRcdGNvbnN0IHZhbCA9IGRhdGFbYV0gfHwgXCJcIjtcblx0XHRcdFx0cGFyYW1zLnNldChhLCB2YWwudG9TdHJpbmcoKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBwYXJhbXM7XG5cdH1cblx0LyoqXG5cdCAqIGluaXRpYXRlcyBhIGZpbGUtZG93biBsb2FkIGJ5IHRoZSBicm93c2VyIHdpdGggc3VwcGxpZWQgZGF0YSBhcyBjb250ZW50XG5cdCAqIEBwYXJhbSBkYXRhICB0byBiZSBkb3dubG9hZGVkXG5cdCAqIEBwYXJhbSBmaWxlTmFtZSBuYWVtIG9mIHRoZSBmaWxlIHRvIGJlIGRvd25sb2FkZWQgYXMgXG5cdCAqL1xuXHRwdWJsaWMgZG93bmxvYWQoZGF0YTogYW55LCBmaWxlTmFtZTogc3RyaW5nKSB7XG5cdFx0Y29uc3QganNvbiA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuXHRcdGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbanNvbl0sIHtcblx0XHRcdHR5cGU6ICdvY3RldC9zdHJlYW0nXG5cdFx0fSk7XG5cdFx0Y29uc3QgdXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cdFx0Y29uc3QgYSA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cdFx0YS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdGEuaHJlZiA9IHVybDtcblx0XHRhLnRhcmdldCA9ICdfYmxhbmsnO1xuXHRcdGEuZG93bmxvYWQgPSBmaWxlTmFtZTtcblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGEpO1xuXHRcdGEuY2xpY2soKTtcblx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGEpO1xuXHR9XG59Il19