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
    serve(serviceName, options = {}, withAuth = true) {
        const token = this.ctx.getToken();
        if (withAuth && !token) {
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
        return obs.pipe(map((resp) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZUFnZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbXYtY2xpZW50LWNvcmUvc3JjL212LWNvcmUvbXYtZm9ybS1jb3JlL3NlcnZpY2VBZ2VudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRU4sVUFBVSxFQUVWLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUNOLFVBQVUsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUl2QixPQUFPLEVBQ04sV0FBVyxFQUNYLE1BQU0sZUFBZSxDQUFDO0FBTXZCLE9BQU8sRUFDTCxVQUFVLEVBQ1YsVUFBVSxFQUNYLE1BQU0sTUFBTSxDQUFDO0FBT2QsT0FBTyxFQUNOLFVBQVUsRUFDVixHQUFHLEVBQ0gsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLHVCQUF1QixDQUFDOzs7OztBQUsvQjs7O0dBR0c7QUFDSCxNQUFNLE9BQU8sWUFBWTtJQUN4QixZQUFvQixJQUFnQixFQUFVLE1BQW9CLEVBQVUsR0FBa0I7UUFBMUUsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQWM7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFlO0lBQUcsQ0FBQztJQUVsRzs7Ozs7Ozs7OztPQVVHO0lBQ0ksS0FBSyxDQUFDLFdBQW1CLEVBQy9CLFVBTUksRUFBRSxFQUNOLFdBQW9CLElBQUk7UUFFeEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNsQyxJQUFJLFFBQVEsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUN2Qix3REFBd0Q7WUFDeEQsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO2dCQUN2QixXQUFXLEVBQUUsV0FBVztnQkFDeEIsT0FBTyxFQUFFLE9BQU87Z0JBQ2hCLFFBQVEsRUFBRSxRQUFRO2FBQ2xCLENBQUMsQ0FBQztTQUNIO1FBQ0QsTUFBTSxPQUFPLEdBQUcs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QUNmLENBQUM7SUFDRDs7OztPQUlHO0lBQ0ksUUFBUSxDQUFDLElBQVMsRUFBRSxRQUFnQjtRQUMxQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDN0IsSUFBSSxFQUFFLGNBQWM7U0FDcEIsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2IsQ0FBQyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7UUFDcEIsQ0FBQyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDdEIsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ1YsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7eUdBeEtXLFlBQVk7NkdBQVosWUFBWSxjQU5aLE1BQU07MkZBTU4sWUFBWTtrQkFQeEIsVUFBVTttQkFBQztvQkFDWCxVQUFVLEVBQUUsTUFBTTtpQkFDbEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuXHRIdHRwQ2xpZW50LFxuXHRIdHRwUGFyYW1zLFxuXHRIdHRwUmVzcG9uc2Vcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtcblx0SW5qZWN0YWJsZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG5cdENsaWVudENvbmZpZ1xufSBmcm9tICcuL2NsaWVudENvbmZpZyc7XG5pbXBvcnQge1xuXHRDb252ZW50aW9uc1xufSBmcm9tICcuL2NvbnZlbnRpb25zJztcbmltcG9ydCB7XG5cdFZvLFxuXHRTZXJ2ZXJSZXNwb25zZSxcblx0RmlsdGVyUmVxdWVzdFxufSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7XG4gIHRocm93RXJyb3IsXG4gIE9ic2VydmFibGVcbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuQ2xpZW50Q29udGV4dFxufSBmcm9tICcuL2NsaWVudENvbnRleHQnO1xuaW1wb3J0IHtcblx0Rm9ybVxufSBmcm9tICcuL2Zvcm0nO1xuaW1wb3J0IHtcblx0Y2F0Y2hFcnJvcixcblx0bWFwXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcblxuQEluamVjdGFibGUoe1xuXHRwcm92aWRlZEluOiAncm9vdCdcbn0pXG4vKipcbiAqIEEgd3JhcHBlciBvbiBIdHRwQ2xpZW50IHRvIHRha2UgY2FyZSBvZiBvdXIgcHJvdG9jb2xzXG4gKiBEcmF3cyBoZWF2aWx5IG9uIE9ic2VydmFibGVzLiBJZiB5b3UgYXJlIHRvdW5kZXJzdGFuZC9tYWludGFpbiB0aGlzIGNvZGUsICB5b3UgTVVTVCBiZSB0aG9yb3VnaCB3aXRoIHRoZSBPYnNlcnZhYmxlc1xuICovXG5leHBvcnQgY2xhc3MgU2VydmljZUFnZW50IHtcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIGNvbmZpZzogQ2xpZW50Q29uZmlnLCBwcml2YXRlIGN0eDogQ2xpZW50Q29udGV4dCkge31cblxuXHQvKipcblx0ICogc2VydmUgdGhpcyBzZXJ2aWNlLiB3ZSB1c2UgYSBzdHJpY3Qgc2VydmljZSBvcmllbnRlZCBhcmNoaXRlY3R1cmUsIFxuXHQgKiB3aGVyZSBpbiB0aGUgb25seSB0aGluZyB0aGUgY2xpZW50IGNhbiBhc2sgdGhlIHNlcnZlciBpcyB0byBzZXJ2ZSBhIHNlcnZpY2UuXG5cdCAqIFRoZXJlIGlzIG5vIGNvbmNlcHQgb2YgcmVzb3VyY2VzIG9yIG9wZXJhdGlvbnMuIEFueSBzdWNoIGNvbmNlcHRzIGFyZSB0byBiZSBcblx0ICogaW1wbGVtZW50ZWQgdXNpbmcgdGhlIHNlcnZpY2UgcGFyYWRpZ20uIFxuXHQgKiBAcGFyYW0gc2VydmljZU5hbWUgIG5hbWUgb2YgdGhlIHNlcnZpY2UgdG8gYmUgcmVxdWVzdGVkXG5cdCAqIEBwYXJhbSBkYXRhIGlucHV0IGRhdGEgZm9yIHRoZSByZXF1ZXN0XG5cdCAqIEBwYXJhbSBhc1F1ZXJ5UGFyYW1zIHRydWUgaWYgdGhlIGRhdGEgaXMganVzdCBhIHNldCBvZiBuYW1lLXN0cmluZyBwYXJhbXMsIGFuZCB0aGUgc3J2ZXIgZXhwZWN0cyB0aGVtIGluIHF1ZXJ5IHN0cmluZ1xuXHQgKiBAcGFyYW0gaGVhZGVycyBhbnkgc3BlY2lhbCBoZWFkZXJzIHRvIGJlIGNvbW11bmljYXRlZC4gVHlwaWNhbGx5IGZvciBhZGRpdGlvbmFsIGF1dGhlbnRpY2F0aW9uLlxuXHQgKiBAcGFyYW0gd2l0aEF1dGggdHJ1ZSBpZiB0aGUgcmVxdWVzdCBpcyB0byBiZSBzZW50IHdpdGggYXV0aC4gSWYgYXV0aCBpcyBub3QgcHJlc2VudCwgdGhpcyB3aWwgdHJpZ2dlciBhIGxvZ2luXG5cdCAqL1xuXHRwdWJsaWMgc2VydmUoc2VydmljZU5hbWU6IHN0cmluZyxcblx0XHRvcHRpb25zOiB7XG5cdFx0XHRkYXRhID8gOiBWbyB8IEZpbHRlclJlcXVlc3QgfCBudWxsICxcblx0XHRcdGFzUXVlcnlQYXJhbXMgPyA6IGJvb2xlYW4sXG5cdFx0XHRoZWFkZXJzID8gOiB7XG5cdFx0XHRcdFtrZXk6IHN0cmluZ106IHN0cmluZ1xuXHRcdFx0fVxuXHRcdH0gPSB7fSxcblx0XHR3aXRoQXV0aDogYm9vbGVhbiA9IHRydWUpOihPYnNlcnZhYmxlIDwgVm8gPikge1xuXG5cdFx0Y29uc3QgdG9rZW4gPSB0aGlzLmN0eC5nZXRUb2tlbigpO1xuXHRcdGlmICh3aXRoQXV0aCAmJiAhdG9rZW4pIHtcblx0XHRcdC8vbm90IGxvZ2dlZC1pbi5UbyBiZSByZS10cmllZCBhZnRlciAgYSBzdWNjZXNzZnVsIGxvZ2luXG5cdFx0XHRyZXR1cm4gdGhpcy5ub3RMb2dnZWRJbih7XG5cdFx0XHRcdHNlcnZpY2VOYW1lOiBzZXJ2aWNlTmFtZSxcblx0XHRcdFx0b3B0aW9uczogb3B0aW9ucyxcblx0XHRcdFx0d2l0aEF1dGg6IHdpdGhBdXRoXG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0Y29uc3QgaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycyB8fCB7fTtcblx0XHRoZWFkZXJzW0NvbnZlbnRpb25zLkhFQURFUl9TRVJWSUNFXSA9IHNlcnZpY2VOYW1lO1xuXHRcdGlmICh3aXRoQXV0aCkge1xuXHRcdFx0aGVhZGVyc1tDb252ZW50aW9ucy5IRUFERVJfQVVUSF0gPSB0b2tlbjtcblx0XHR9XG5cdFx0bGV0IGRhdGEgPSBvcHRpb25zLmRhdGEgfHwgbnVsbDtcblx0XHRsZXQgcGFyYW1zO1xuXHRcdGlmIChkYXRhICYmIG9wdGlvbnMuYXNRdWVyeVBhcmFtcykge1xuXHRcdFx0cGFyYW1zID0gdGhpcy50b1BhcmFtcyhkYXRhKTtcblx0XHR9XG5cdFx0Y29uc3Qgb2JzID0gdGhpcy5odHRwLnBvc3QgPFNlcnZlclJlc3BvbnNlPih0aGlzLmNvbmZpZy51cmwsIGRhdGEsIHtcblx0XHRcdG9ic2VydmU6IFwicmVzcG9uc2VcIixcblx0XHRcdGhlYWRlcnM6IGhlYWRlcnMsXG5cdFx0XHRwYXJhbXM6IHBhcmFtc1xuXHRcdH0pO1xuXHRcdHJldHVybiBvYnMucGlwZShtYXAoKHJlc3A6YW55KSA9PiB7XG5cdFx0XHRpZiAoIXJlc3Aub2spIHtcblx0XHRcdFx0Y29uc3QgbXNnID0gJ1NlcnZlciBFcnJvci4gaHR0cC1zdGF0dXMgOicgKyByZXNwLnN0YXR1cyArICc9JyArIHJlc3Auc3RhdHVzVGV4dCArIChyZXNwLmJvZHkgPyAnUmVzcG9uc2U6ICcgKyBKU09OLnN0cmluZ2lmeShyZXNwLmJvZHkpIDogJycpO1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKG1zZyk7XG5cdFx0XHRcdHRocm93IHtcblx0XHRcdFx0XHR0eXBlOiAnZXJyb3InLFxuXHRcdFx0XHRcdGlkOiAnc2VydmVyRXJyb3InLFxuXHRcdFx0XHRcdHRleHQ6IG1zZ1xuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdFx0Ly9uby1uZXdzIGlzIGdvb2QtbmV3cyEhXG5cdFx0XHRpZiAoIXJlc3AuYm9keSkge1xuXHRcdFx0XHRyZXR1cm4ge307XG5cdFx0XHR9XG5cdFx0XG5cdFx0XHRjb25zdCB7XG5cdFx0XHRcdG1lc3NhZ2VzLFxuXHRcdFx0XHRhbGxPayxcblx0XHRcdFx0ZGF0YSxcblx0XHRcdFx0dG9rZW5cblx0XHRcdH0gPSByZXNwLmJvZHk7XG5cdFx0XHRpZiAoYWxsT2spIHtcblx0XHRcdFx0aWYgKHRva2VuKSB7XG5cdFx0XHRcdFx0dGhpcy5jdHguc2V0VG9rZW4odG9rZW4pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChtZXNzYWdlcykge1xuXHRcdFx0XHRcdGlmIChtZXNzYWdlc1swXS50eXBlID09ICdpbmZvJykge1xuXHRcdFx0XHRcdFx0dGhyb3cgbWVzc2FnZXM7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBkYXRhIGFzIFZvO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAobWVzc2FnZXMpIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcignU2VydmVyIHJldHVybmVkIHdpdGggZXJyb3JzIDonLCBtZXNzYWdlcyk7XG5cdFx0XHRcdHRocm93IG1lc3NhZ2VzO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgbXNnID0gJ1NlcnZlciBFcnJvci4gc2VydmVyIHJlcG9ydGVkIGEgZmFpbHVyZSwgYnV0IGRpZCBub3QgcmV0dXJuIGFueSBlcnJvciBtZXNzYWdlJztcblx0XHRcdGNvbnNvbGUuZXJyb3IobXNnKTtcblx0XHRcdHRocm93IFt7XG5cdFx0XHRcdHR5cGU6ICdlcnJvcicsXG5cdFx0XHRcdGlkOiAnc2VydmVyRXJyb3InLFxuXHRcdFx0XHR0ZXh0OiBtc2dcblx0XHRcdH1dO1xuXHRcdH0pKTtcblx0fVxuXHQvKipcblx0ICogZmlsdGVyIHJvd3MgZm9yIGEgZm9ybSBhbmQgcmV0dXJuIHJhdy1yb3dzLiBcblx0ICogTm90ZSB0aGF0IHRoZSByZXR1cm5lZCBkYXRhIGlzIE5PVCBzZXQgdG8gYW55IG1vZGVsIGJlZm9yZSByZXR1cm5pbmcgaXQgdGhlIGNhbGxlclxuXHQgKi9cbiAgICBwdWJsaWMgZmlsdGVyKGZvcm06Rm9ybSwgZmlsdGVyczogRmlsdGVyUmVxdWVzdCk6IE9ic2VydmFibGU8Vm9bXT4ge1xuICAgICAgICBjb25zdCBzZXJ2aWNlTmFtZSA9IGZvcm0uZ2V0U2VydmljZU5hbWUoQ29udmVudGlvbnMuT1BfRklMVEVSKTtcbiAgICAgICAgaWYgKCFzZXJ2aWNlTmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoKCkgPT4gbmV3IEVycm9yIChDb252ZW50aW9ucy5PUF9GSUxURVIgKyAnIG9wZXJhdGlvbiBpcyBub3QgYWxsb3dlZC4nKSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvYnMgPSB0aGlzLnNlcnZlKHNlcnZpY2VOYW1lLCB7IGRhdGE6IGZpbHRlcnMgfSk7XG4gICAgICAgIHJldHVybiBvYnMucGlwZShcbiAgICAgICAgICAgIG1hcCh2byA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZvWydsaXN0J10gYXMgVm9bXTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcihtc2dzID0+IHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcignY2F0Y2hpbmcgaW4gc2EnKVxuICAgICAgICAgICAgICAgIHRocm93IG1zZ3M7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuXHQvKipcblx0ICogXG5cdCAqIEBwYXJhbSBjYWxsIHBhcmFtZXRlcnMgZm9yIHNlcnZlIHRoYXQgd2FzIGludGVycnVwdGVkLlxuXHQgKiBXZSBoYXZlIHRvIGRlc2lnbiBhIHdheSB0byByZXR1cm4gYW4gb2JzZXJ2YWJsZSB0aGF0IHdvcmtzIGFmdGVyIGEgc3VjY2Vzc2Z1bCBsb2dpbi5cblx0ICovXG5cdHByaXZhdGUgbm90TG9nZ2VkSW4ocGFyYW1zOiBhbnkpOiBPYnNlcnZhYmxlIDwgVm8gPiB7XG5cdFx0LyoqXG5cdFx0ICogd2hhdCB3ZSB3YW50IHRvIGRvIGlzOlxuXHRcdCAqIDEuIHNob3cgYSBtb2RhbCBwYW5lbCBhbmQgYWNjZXB0IGNyZWRlbnRpYWxzLlxuXHRcdCAqIDIuIGNhbGwgbG9naW4gc2VydmljZSB3aXRoIHRoZXNlIGNyZWRlbnRpYWxzLlxuXHRcdCAqIDMuIG9uIHN1Y2Nlc3NmdWwgbG9naW4sIG1ha2UgdGhpcyBzZXJ2aWNlIHJlcXVlc3QgYWdhaW4uXG5cdFx0ICogTG9naWMgd291bGQgYmUgcXVpdGUgdHJpY2t5IGJlY2F1ZSB3ZSBoYXZlIHQwIHJldHVybiBhbiBvYnNlcnZhYmxlIHJpZ2h0IG5vdyB0aGF0IHRyaWdnZXJzIGFsbCB0aGVzZS4uXG5cdFx0IF4gZm9yIHRlIHRpbWUgYmVpbmcsIHdlIGp1c3QgdGhyb3ctdXAgb3VyIGhhbmRzISEhXG5cdFx0ICovXG5cdFx0Y29uc3QgbXNnID0gJ1NvcnJ5IHlvdSBhcmUgbm90IGxvZ2dlZCBpbi4gUGxlYXNlIHRyeSBhZ2FpbiBhZnRlciBsb2dnaW5nIGluJztcblx0XHRyZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOmFueSkgPT4ge1xuXHRcdFx0Y29uc3Qge1xuXHRcdFx0XHRlcnJvclxuXHRcdFx0fSA9IG9ic2VydmVyO1xuXHRcdFx0ZXJyb3IoJ21zZycpO1xuXHRcdH0pO1xuXHR9XG5cblx0cHJpdmF0ZSB0b1BhcmFtcyhkYXRhOiBhbnkpOiBIdHRwUGFyYW1zIHtcblx0XHRsZXQgcGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcblx0XHRmb3IgKGNvbnN0IGEgaW4gZGF0YSkge1xuXHRcdFx0aWYgKGRhdGEuaGFzT3duUHJvcGVydHkoYSkpIHtcblx0XHRcdFx0Y29uc3QgdmFsID0gZGF0YVthXSB8fCBcIlwiO1xuXHRcdFx0XHRwYXJhbXMuc2V0KGEsIHZhbC50b1N0cmluZygpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHBhcmFtcztcblx0fVxuXHQvKipcblx0ICogaW5pdGlhdGVzIGEgZmlsZS1kb3duIGxvYWQgYnkgdGhlIGJyb3dzZXIgd2l0aCBzdXBwbGllZCBkYXRhIGFzIGNvbnRlbnRcblx0ICogQHBhcmFtIGRhdGEgIHRvIGJlIGRvd25sb2FkZWRcblx0ICogQHBhcmFtIGZpbGVOYW1lIG5hZW0gb2YgdGhlIGZpbGUgdG8gYmUgZG93bmxvYWRlZCBhcyBcblx0ICovXG5cdHB1YmxpYyBkb3dubG9hZChkYXRhOiBhbnksIGZpbGVOYW1lOiBzdHJpbmcpIHtcblx0XHRjb25zdCBqc29uID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG5cdFx0Y29uc3QgYmxvYiA9IG5ldyBCbG9iKFtqc29uXSwge1xuXHRcdFx0dHlwZTogJ29jdGV0L3N0cmVhbSdcblx0XHR9KTtcblx0XHRjb25zdCB1cmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblx0XHRjb25zdCBhID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblx0XHRhLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0YS5ocmVmID0gdXJsO1xuXHRcdGEudGFyZ2V0ID0gJ19ibGFuayc7XG5cdFx0YS5kb3dubG9hZCA9IGZpbGVOYW1lO1xuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYSk7XG5cdFx0YS5jbGljaygpO1xuXHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYSk7XG5cdH1cbn0iXX0=