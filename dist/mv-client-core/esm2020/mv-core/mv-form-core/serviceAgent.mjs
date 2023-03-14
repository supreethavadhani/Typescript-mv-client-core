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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZUFnZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbXYtY2xpZW50LWNvcmUvc3JjL212LWNvcmUvbXYtZm9ybS1jb3JlL3NlcnZpY2VBZ2VudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRU4sVUFBVSxFQUVWLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUNOLFVBQVUsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUl2QixPQUFPLEVBQ04sV0FBVyxFQUNYLE1BQU0sZUFBZSxDQUFDO0FBTXZCLE9BQU8sRUFDTCxVQUFVLEVBQ1YsVUFBVSxFQUNYLE1BQU0sTUFBTSxDQUFDO0FBT2QsT0FBTyxFQUNOLFVBQVUsRUFDVixHQUFHLEVBQ0gsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLHVCQUF1QixDQUFDOzs7OztBQUsvQjs7O0dBR0c7QUFDSCxNQUFNLE9BQU8sWUFBWTtJQUN4QixZQUFvQixJQUFnQixFQUFVLE1BQW9CLEVBQVUsR0FBa0I7UUFBMUUsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQWM7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFlO0lBQUcsQ0FBQztJQUVsRzs7Ozs7Ozs7OztPQVVHO0lBQ0ksS0FBSyxDQUFDLFdBQW1CLEVBQy9CLFVBTUksRUFBRSxFQUNOLFdBQW9CLEtBQUs7UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUM1QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2xDLElBQUksUUFBUSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUE7WUFDNUIsd0RBQXdEO1lBQ3hELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztnQkFDdkIsV0FBVyxFQUFFLFdBQVc7Z0JB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OlsiaW1wb3J0IHtcblx0SHR0cENsaWVudCxcblx0SHR0cFBhcmFtcyxcblx0SHR0cFJlc3BvbnNlXG59IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7XG5cdEluamVjdGFibGVcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuXHRDbGllbnRDb25maWdcbn0gZnJvbSAnLi9jbGllbnRDb25maWcnO1xuaW1wb3J0IHtcblx0Q29udmVudGlvbnNcbn0gZnJvbSAnLi9jb252ZW50aW9ucyc7XG5pbXBvcnQge1xuXHRWbyxcblx0U2VydmVyUmVzcG9uc2UsXG5cdEZpbHRlclJlcXVlc3Rcbn0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQge1xuICB0aHJvd0Vycm9yLFxuICBPYnNlcnZhYmxlXG59IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbkNsaWVudENvbnRleHRcbn0gZnJvbSAnLi9jbGllbnRDb250ZXh0JztcbmltcG9ydCB7XG5cdEZvcm1cbn0gZnJvbSAnLi9mb3JtJztcbmltcG9ydCB7XG5cdGNhdGNoRXJyb3IsXG5cdG1hcFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XG5cbkBJbmplY3RhYmxlKHtcblx0cHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuLyoqXG4gKiBBIHdyYXBwZXIgb24gSHR0cENsaWVudCB0byB0YWtlIGNhcmUgb2Ygb3VyIHByb3RvY29sc1xuICogRHJhd3MgaGVhdmlseSBvbiBPYnNlcnZhYmxlcy4gSWYgeW91IGFyZSB0b3VuZGVyc3RhbmQvbWFpbnRhaW4gdGhpcyBjb2RlLCAgeW91IE1VU1QgYmUgdGhvcm91Z2ggd2l0aCB0aGUgT2JzZXJ2YWJsZXNcbiAqL1xuZXhwb3J0IGNsYXNzIFNlcnZpY2VBZ2VudCB7XG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgcHJpdmF0ZSBjb25maWc6IENsaWVudENvbmZpZywgcHJpdmF0ZSBjdHg6IENsaWVudENvbnRleHQpIHt9XG5cblx0LyoqXG5cdCAqIHNlcnZlIHRoaXMgc2VydmljZS4gd2UgdXNlIGEgc3RyaWN0IHNlcnZpY2Ugb3JpZW50ZWQgYXJjaGl0ZWN0dXJlLCBcblx0ICogd2hlcmUgaW4gdGhlIG9ubHkgdGhpbmcgdGhlIGNsaWVudCBjYW4gYXNrIHRoZSBzZXJ2ZXIgaXMgdG8gc2VydmUgYSBzZXJ2aWNlLlxuXHQgKiBUaGVyZSBpcyBubyBjb25jZXB0IG9mIHJlc291cmNlcyBvciBvcGVyYXRpb25zLiBBbnkgc3VjaCBjb25jZXB0cyBhcmUgdG8gYmUgXG5cdCAqIGltcGxlbWVudGVkIHVzaW5nIHRoZSBzZXJ2aWNlIHBhcmFkaWdtLiBcblx0ICogQHBhcmFtIHNlcnZpY2VOYW1lICBuYW1lIG9mIHRoZSBzZXJ2aWNlIHRvIGJlIHJlcXVlc3RlZFxuXHQgKiBAcGFyYW0gZGF0YSBpbnB1dCBkYXRhIGZvciB0aGUgcmVxdWVzdFxuXHQgKiBAcGFyYW0gYXNRdWVyeVBhcmFtcyB0cnVlIGlmIHRoZSBkYXRhIGlzIGp1c3QgYSBzZXQgb2YgbmFtZS1zdHJpbmcgcGFyYW1zLCBhbmQgdGhlIHNydmVyIGV4cGVjdHMgdGhlbSBpbiBxdWVyeSBzdHJpbmdcblx0ICogQHBhcmFtIGhlYWRlcnMgYW55IHNwZWNpYWwgaGVhZGVycyB0byBiZSBjb21tdW5pY2F0ZWQuIFR5cGljYWxseSBmb3IgYWRkaXRpb25hbCBhdXRoZW50aWNhdGlvbi5cblx0ICogQHBhcmFtIHdpdGhBdXRoIHRydWUgaWYgdGhlIHJlcXVlc3QgaXMgdG8gYmUgc2VudCB3aXRoIGF1dGguIElmIGF1dGggaXMgbm90IHByZXNlbnQsIHRoaXMgd2lsIHRyaWdnZXIgYSBsb2dpblxuXHQgKi9cblx0cHVibGljIHNlcnZlKHNlcnZpY2VOYW1lOiBzdHJpbmcsXG5cdFx0b3B0aW9uczoge1xuXHRcdFx0ZGF0YSA/IDogVm8gfCBGaWx0ZXJSZXF1ZXN0IHwgbnVsbCAsXG5cdFx0XHRhc1F1ZXJ5UGFyYW1zID8gOiBib29sZWFuLFxuXHRcdFx0aGVhZGVycyA/IDoge1xuXHRcdFx0XHRba2V5OiBzdHJpbmddOiBzdHJpbmdcblx0XHRcdH1cblx0XHR9ID0ge30sXG5cdFx0d2l0aEF1dGg6IGJvb2xlYW4gPSBmYWxzZSk6KE9ic2VydmFibGUgPCBWbyA+KSB7XG5cdFx0Y29uc29sZS5sb2coXCJlbnRlcmluZyBoZXJlXCIpXG5cdFx0Y29uc3QgdG9rZW4gPSB0aGlzLmN0eC5nZXRUb2tlbigpO1xuXHRcdGlmICh3aXRoQXV0aCAmJiAhdG9rZW4pIHtcblx0XHRcdGNvbnNvbGUubG9nKCdub3QgbG9nZ2VkIGluJylcblx0XHRcdC8vbm90IGxvZ2dlZC1pbi5UbyBiZSByZS10cmllZCBhZnRlciAgYSBzdWNjZXNzZnVsIGxvZ2luXG5cdFx0XHRyZXR1cm4gdGhpcy5ub3RMb2dnZWRJbih7XG5cdFx0XHRcdHNlcnZpY2VOYW1lOiBzZXJ2aWNlTmFtZSxcblx0XHRcdFx0b3B0aW9uczogb3B0aW9ucyxcblx0XHRcdFx0d2l0aEF1dGg6IHdpdGhBdXRoXG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0Y29uc3QgaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycyB8fCB7fTtcblx0XHRoZWFkZXJzW0NvbnZlbnRpb25zLkhFQURFUl9TRVJWSUNFXSA9IHNlcnZpY2VOYW1lO1xuXHRcdGlmICh3aXRoQXV0aCkge1xuXHRcdFx0aGVhZGVyc1tDb252ZW50aW9ucy5IRUFERVJfQVVUSF0gPSB0b2tlbjtcblx0XHR9XG5cdFx0bGV0IGRhdGEgPSBvcHRpb25zLmRhdGEgfHwgbnVsbDtcblx0XHRsZXQgcGFyYW1zO1xuXHRcdGlmIChkYXRhICYmIG9wdGlvbnMuYXNRdWVyeVBhcmFtcykge1xuXHRcdFx0cGFyYW1zID0gdGhpcy50b1BhcmFtcyhkYXRhKTtcblx0XHR9XG5cdFx0Y29uc3Qgb2JzID0gdGhpcy5odHRwLnBvc3QgPFNlcnZlclJlc3BvbnNlPih0aGlzLmNvbmZpZy51cmwsIGRhdGEsIHtcblx0XHRcdG9ic2VydmU6IFwicmVzcG9uc2VcIixcblx0XHRcdGhlYWRlcnM6IGhlYWRlcnMsXG5cdFx0XHRwYXJhbXM6IHBhcmFtc1xuXHRcdH0pO1xuXHRcdGNvbnNvbGUubG9nKFwiZW50ZXJpbmcgb2JzXCIpXG5cdFx0cmV0dXJuIG9icy5waXBlKG1hcCgocmVzcDphbnkpID0+IHtcblx0XHRcdGNvbnNvbGUubG9nKFwiZW50ZXJpbmcgbWFwXCIpXG5cdFx0XHRpZiAoIXJlc3Aub2spIHtcblx0XHRcdFx0Y29uc3QgbXNnID0gJ1NlcnZlciBFcnJvci4gaHR0cC1zdGF0dXMgOicgKyByZXNwLnN0YXR1cyArICc9JyArIHJlc3Auc3RhdHVzVGV4dCArIChyZXNwLmJvZHkgPyAnUmVzcG9uc2U6ICcgKyBKU09OLnN0cmluZ2lmeShyZXNwLmJvZHkpIDogJycpO1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKG1zZyk7XG5cdFx0XHRcdHRocm93IHtcblx0XHRcdFx0XHR0eXBlOiAnZXJyb3InLFxuXHRcdFx0XHRcdGlkOiAnc2VydmVyRXJyb3InLFxuXHRcdFx0XHRcdHRleHQ6IG1zZ1xuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdFx0Ly9uby1uZXdzIGlzIGdvb2QtbmV3cyEhXG5cdFx0XHRpZiAoIXJlc3AuYm9keSkge1xuXHRcdFx0XHRyZXR1cm4ge307XG5cdFx0XHR9XG5cdFx0XG5cdFx0XHRjb25zdCB7XG5cdFx0XHRcdG1lc3NhZ2VzLFxuXHRcdFx0XHRhbGxPayxcblx0XHRcdFx0ZGF0YSxcblx0XHRcdFx0dG9rZW5cblx0XHRcdH0gPSByZXNwLmJvZHk7XG5cdFx0XHRpZiAoYWxsT2spIHtcblx0XHRcdFx0aWYgKHRva2VuKSB7XG5cdFx0XHRcdFx0dGhpcy5jdHguc2V0VG9rZW4odG9rZW4pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChtZXNzYWdlcykge1xuXHRcdFx0XHRcdGlmIChtZXNzYWdlc1swXS50eXBlID09ICdpbmZvJykge1xuXHRcdFx0XHRcdFx0dGhyb3cgbWVzc2FnZXM7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBkYXRhO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAobWVzc2FnZXMpIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcignU2VydmVyIHJldHVybmVkIHdpdGggZXJyb3JzIDonLCBtZXNzYWdlcyk7XG5cdFx0XHRcdHRocm93IG1lc3NhZ2VzO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgbXNnID0gJ1NlcnZlciBFcnJvci4gc2VydmVyIHJlcG9ydGVkIGEgZmFpbHVyZSwgYnV0IGRpZCBub3QgcmV0dXJuIGFueSBlcnJvciBtZXNzYWdlJztcblx0XHRcdGNvbnNvbGUuZXJyb3IobXNnKTtcblx0XHRcdHRocm93IFt7XG5cdFx0XHRcdHR5cGU6ICdlcnJvcicsXG5cdFx0XHRcdGlkOiAnc2VydmVyRXJyb3InLFxuXHRcdFx0XHR0ZXh0OiBtc2dcblx0XHRcdH1dO1xuXHRcdH0pKTtcblx0fVxuXHQvKipcblx0ICogZmlsdGVyIHJvd3MgZm9yIGEgZm9ybSBhbmQgcmV0dXJuIHJhdy1yb3dzLiBcblx0ICogTm90ZSB0aGF0IHRoZSByZXR1cm5lZCBkYXRhIGlzIE5PVCBzZXQgdG8gYW55IG1vZGVsIGJlZm9yZSByZXR1cm5pbmcgaXQgdGhlIGNhbGxlclxuXHQgKi9cbiAgICBwdWJsaWMgZmlsdGVyKGZvcm06Rm9ybSwgZmlsdGVyczogRmlsdGVyUmVxdWVzdCk6IE9ic2VydmFibGU8Vm9bXT4ge1xuICAgICAgICBjb25zdCBzZXJ2aWNlTmFtZSA9IGZvcm0uZ2V0U2VydmljZU5hbWUoQ29udmVudGlvbnMuT1BfRklMVEVSKTtcbiAgICAgICAgaWYgKCFzZXJ2aWNlTmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoKCkgPT4gbmV3IEVycm9yIChDb252ZW50aW9ucy5PUF9GSUxURVIgKyAnIG9wZXJhdGlvbiBpcyBub3QgYWxsb3dlZC4nKSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvYnMgPSB0aGlzLnNlcnZlKHNlcnZpY2VOYW1lLCB7IGRhdGE6IGZpbHRlcnMgfSk7XG4gICAgICAgIHJldHVybiBvYnMucGlwZShcbiAgICAgICAgICAgIG1hcCh2byA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZvWydsaXN0J10gYXMgVm9bXTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcihtc2dzID0+IHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcignY2F0Y2hpbmcgaW4gc2EnKVxuICAgICAgICAgICAgICAgIHRocm93IG1zZ3M7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuXHQvKipcblx0ICogXG5cdCAqIEBwYXJhbSBjYWxsIHBhcmFtZXRlcnMgZm9yIHNlcnZlIHRoYXQgd2FzIGludGVycnVwdGVkLlxuXHQgKiBXZSBoYXZlIHRvIGRlc2lnbiBhIHdheSB0byByZXR1cm4gYW4gb2JzZXJ2YWJsZSB0aGF0IHdvcmtzIGFmdGVyIGEgc3VjY2Vzc2Z1bCBsb2dpbi5cblx0ICovXG5cdHByaXZhdGUgbm90TG9nZ2VkSW4ocGFyYW1zOiBhbnkpOiBPYnNlcnZhYmxlIDwgVm8gPiB7XG5cdFx0LyoqXG5cdFx0ICogd2hhdCB3ZSB3YW50IHRvIGRvIGlzOlxuXHRcdCAqIDEuIHNob3cgYSBtb2RhbCBwYW5lbCBhbmQgYWNjZXB0IGNyZWRlbnRpYWxzLlxuXHRcdCAqIDIuIGNhbGwgbG9naW4gc2VydmljZSB3aXRoIHRoZXNlIGNyZWRlbnRpYWxzLlxuXHRcdCAqIDMuIG9uIHN1Y2Nlc3NmdWwgbG9naW4sIG1ha2UgdGhpcyBzZXJ2aWNlIHJlcXVlc3QgYWdhaW4uXG5cdFx0ICogTG9naWMgd291bGQgYmUgcXVpdGUgdHJpY2t5IGJlY2F1ZSB3ZSBoYXZlIHQwIHJldHVybiBhbiBvYnNlcnZhYmxlIHJpZ2h0IG5vdyB0aGF0IHRyaWdnZXJzIGFsbCB0aGVzZS4uXG5cdFx0IF4gZm9yIHRlIHRpbWUgYmVpbmcsIHdlIGp1c3QgdGhyb3ctdXAgb3VyIGhhbmRzISEhXG5cdFx0ICovXG5cdFx0Y29uc3QgbXNnID0gJ1NvcnJ5IHlvdSBhcmUgbm90IGxvZ2dlZCBpbi4gUGxlYXNlIHRyeSBhZ2FpbiBhZnRlciBsb2dnaW5nIGluJztcblx0XHRyZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOmFueSkgPT4ge1xuXHRcdFx0Y29uc3Qge1xuXHRcdFx0XHRlcnJvclxuXHRcdFx0fSA9IG9ic2VydmVyO1xuXHRcdFx0ZXJyb3IoJ21zZycpO1xuXHRcdH0pO1xuXHR9XG5cblx0cHJpdmF0ZSB0b1BhcmFtcyhkYXRhOiBhbnkpOiBIdHRwUGFyYW1zIHtcblx0XHRsZXQgcGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcblx0XHRmb3IgKGNvbnN0IGEgaW4gZGF0YSkge1xuXHRcdFx0aWYgKGRhdGEuaGFzT3duUHJvcGVydHkoYSkpIHtcblx0XHRcdFx0Y29uc3QgdmFsID0gZGF0YVthXSB8fCBcIlwiO1xuXHRcdFx0XHRwYXJhbXMuc2V0KGEsIHZhbC50b1N0cmluZygpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHBhcmFtcztcblx0fVxuXHQvKipcblx0ICogaW5pdGlhdGVzIGEgZmlsZS1kb3duIGxvYWQgYnkgdGhlIGJyb3dzZXIgd2l0aCBzdXBwbGllZCBkYXRhIGFzIGNvbnRlbnRcblx0ICogQHBhcmFtIGRhdGEgIHRvIGJlIGRvd25sb2FkZWRcblx0ICogQHBhcmFtIGZpbGVOYW1lIG5hZW0gb2YgdGhlIGZpbGUgdG8gYmUgZG93bmxvYWRlZCBhcyBcblx0ICovXG5cdHB1YmxpYyBkb3dubG9hZChkYXRhOiBhbnksIGZpbGVOYW1lOiBzdHJpbmcpIHtcblx0XHRjb25zdCBqc29uID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG5cdFx0Y29uc3QgYmxvYiA9IG5ldyBCbG9iKFtqc29uXSwge1xuXHRcdFx0dHlwZTogJ29jdGV0L3N0cmVhbSdcblx0XHR9KTtcblx0XHRjb25zdCB1cmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblx0XHRjb25zdCBhID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblx0XHRhLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0YS5ocmVmID0gdXJsO1xuXHRcdGEudGFyZ2V0ID0gJ19ibGFuayc7XG5cdFx0YS5kb3dubG9hZCA9IGZpbGVOYW1lO1xuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYSk7XG5cdFx0YS5jbGljaygpO1xuXHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYSk7XG5cdH1cbn0iXX0=