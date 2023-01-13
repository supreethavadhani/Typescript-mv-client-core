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
        console.log("entering here");
        const token = this.ctx.getToken();
        console.log(withAuth);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZUFnZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbXYtY2xpZW50LWNvcmUvc3JjL212LWNvcmUvbXYtZm9ybS1jb3JlL3NlcnZpY2VBZ2VudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRU4sVUFBVSxFQUVWLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUNOLFVBQVUsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUl2QixPQUFPLEVBQ04sV0FBVyxFQUNYLE1BQU0sZUFBZSxDQUFDO0FBTXZCLE9BQU8sRUFDTCxVQUFVLEVBQ1YsVUFBVSxFQUNYLE1BQU0sTUFBTSxDQUFDO0FBT2QsT0FBTyxFQUNOLFVBQVUsRUFDVixHQUFHLEVBQ0gsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLHVCQUF1QixDQUFDOzs7OztBQUsvQjs7O0dBR0c7QUFDSCxNQUFNLE9BQU8sWUFBWTtJQUN4QixZQUFvQixJQUFnQixFQUFVLE1BQW9CLEVBQVUsR0FBa0I7UUFBMUUsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQWM7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFlO0lBQUcsQ0FBQztJQUVsRzs7Ozs7Ozs7OztPQVVHO0lBQ0ksS0FBSyxDQUFDLFdBQW1CLEVBQy9CLFVBTUksRUFBRSxFQUNOLFdBQW9CLElBQUk7UUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUM1QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDckIsSUFBSSxRQUFRLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQTtZQUM1Qix3REFBd0Q7WUFDeEQsT0FBTyxJQUFJ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Q1gsVUFBVSxFQUFFLE1BQU07aUJBQ2xCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcblx0SHR0cENsaWVudCxcblx0SHR0cFBhcmFtcyxcblx0SHR0cFJlc3BvbnNlXG59IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7XG5cdEluamVjdGFibGVcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuXHRDbGllbnRDb25maWdcbn0gZnJvbSAnLi9jbGllbnRDb25maWcnO1xuaW1wb3J0IHtcblx0Q29udmVudGlvbnNcbn0gZnJvbSAnLi9jb252ZW50aW9ucyc7XG5pbXBvcnQge1xuXHRWbyxcblx0U2VydmVyUmVzcG9uc2UsXG5cdEZpbHRlclJlcXVlc3Rcbn0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQge1xuICB0aHJvd0Vycm9yLFxuICBPYnNlcnZhYmxlXG59IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbkNsaWVudENvbnRleHRcbn0gZnJvbSAnLi9jbGllbnRDb250ZXh0JztcbmltcG9ydCB7XG5cdEZvcm1cbn0gZnJvbSAnLi9mb3JtJztcbmltcG9ydCB7XG5cdGNhdGNoRXJyb3IsXG5cdG1hcFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XG5cbkBJbmplY3RhYmxlKHtcblx0cHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuLyoqXG4gKiBBIHdyYXBwZXIgb24gSHR0cENsaWVudCB0byB0YWtlIGNhcmUgb2Ygb3VyIHByb3RvY29sc1xuICogRHJhd3MgaGVhdmlseSBvbiBPYnNlcnZhYmxlcy4gSWYgeW91IGFyZSB0b3VuZGVyc3RhbmQvbWFpbnRhaW4gdGhpcyBjb2RlLCAgeW91IE1VU1QgYmUgdGhvcm91Z2ggd2l0aCB0aGUgT2JzZXJ2YWJsZXNcbiAqL1xuZXhwb3J0IGNsYXNzIFNlcnZpY2VBZ2VudCB7XG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgcHJpdmF0ZSBjb25maWc6IENsaWVudENvbmZpZywgcHJpdmF0ZSBjdHg6IENsaWVudENvbnRleHQpIHt9XG5cblx0LyoqXG5cdCAqIHNlcnZlIHRoaXMgc2VydmljZS4gd2UgdXNlIGEgc3RyaWN0IHNlcnZpY2Ugb3JpZW50ZWQgYXJjaGl0ZWN0dXJlLCBcblx0ICogd2hlcmUgaW4gdGhlIG9ubHkgdGhpbmcgdGhlIGNsaWVudCBjYW4gYXNrIHRoZSBzZXJ2ZXIgaXMgdG8gc2VydmUgYSBzZXJ2aWNlLlxuXHQgKiBUaGVyZSBpcyBubyBjb25jZXB0IG9mIHJlc291cmNlcyBvciBvcGVyYXRpb25zLiBBbnkgc3VjaCBjb25jZXB0cyBhcmUgdG8gYmUgXG5cdCAqIGltcGxlbWVudGVkIHVzaW5nIHRoZSBzZXJ2aWNlIHBhcmFkaWdtLiBcblx0ICogQHBhcmFtIHNlcnZpY2VOYW1lICBuYW1lIG9mIHRoZSBzZXJ2aWNlIHRvIGJlIHJlcXVlc3RlZFxuXHQgKiBAcGFyYW0gZGF0YSBpbnB1dCBkYXRhIGZvciB0aGUgcmVxdWVzdFxuXHQgKiBAcGFyYW0gYXNRdWVyeVBhcmFtcyB0cnVlIGlmIHRoZSBkYXRhIGlzIGp1c3QgYSBzZXQgb2YgbmFtZS1zdHJpbmcgcGFyYW1zLCBhbmQgdGhlIHNydmVyIGV4cGVjdHMgdGhlbSBpbiBxdWVyeSBzdHJpbmdcblx0ICogQHBhcmFtIGhlYWRlcnMgYW55IHNwZWNpYWwgaGVhZGVycyB0byBiZSBjb21tdW5pY2F0ZWQuIFR5cGljYWxseSBmb3IgYWRkaXRpb25hbCBhdXRoZW50aWNhdGlvbi5cblx0ICogQHBhcmFtIHdpdGhBdXRoIHRydWUgaWYgdGhlIHJlcXVlc3QgaXMgdG8gYmUgc2VudCB3aXRoIGF1dGguIElmIGF1dGggaXMgbm90IHByZXNlbnQsIHRoaXMgd2lsIHRyaWdnZXIgYSBsb2dpblxuXHQgKi9cblx0cHVibGljIHNlcnZlKHNlcnZpY2VOYW1lOiBzdHJpbmcsXG5cdFx0b3B0aW9uczoge1xuXHRcdFx0ZGF0YSA/IDogVm8gfCBGaWx0ZXJSZXF1ZXN0IHwgbnVsbCAsXG5cdFx0XHRhc1F1ZXJ5UGFyYW1zID8gOiBib29sZWFuLFxuXHRcdFx0aGVhZGVycyA/IDoge1xuXHRcdFx0XHRba2V5OiBzdHJpbmddOiBzdHJpbmdcblx0XHRcdH1cblx0XHR9ID0ge30sXG5cdFx0d2l0aEF1dGg6IGJvb2xlYW4gPSB0cnVlKTooT2JzZXJ2YWJsZSA8IFZvID4pIHtcblx0XHRjb25zb2xlLmxvZyhcImVudGVyaW5nIGhlcmVcIilcblx0XHRjb25zdCB0b2tlbiA9IHRoaXMuY3R4LmdldFRva2VuKCk7XG5cdFx0Y29uc29sZS5sb2cod2l0aEF1dGgpXG5cdFx0aWYgKHdpdGhBdXRoICYmICF0b2tlbikge1xuXHRcdFx0Y29uc29sZS5sb2coJ25vdCBsb2dnZWQgaW4nKVxuXHRcdFx0Ly9ub3QgbG9nZ2VkLWluLlRvIGJlIHJlLXRyaWVkIGFmdGVyICBhIHN1Y2Nlc3NmdWwgbG9naW5cblx0XHRcdHJldHVybiB0aGlzLm5vdExvZ2dlZEluKHtcblx0XHRcdFx0c2VydmljZU5hbWU6IHNlcnZpY2VOYW1lLFxuXHRcdFx0XHRvcHRpb25zOiBvcHRpb25zLFxuXHRcdFx0XHR3aXRoQXV0aDogd2l0aEF1dGhcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRjb25zdCBoZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzIHx8IHt9O1xuXHRcdGhlYWRlcnNbQ29udmVudGlvbnMuSEVBREVSX1NFUlZJQ0VdID0gc2VydmljZU5hbWU7XG5cdFx0aWYgKHdpdGhBdXRoKSB7XG5cdFx0XHRoZWFkZXJzW0NvbnZlbnRpb25zLkhFQURFUl9BVVRIXSA9IHRva2VuO1xuXHRcdH1cblx0XHRsZXQgZGF0YSA9IG9wdGlvbnMuZGF0YSB8fCBudWxsO1xuXHRcdGxldCBwYXJhbXM7XG5cdFx0aWYgKGRhdGEgJiYgb3B0aW9ucy5hc1F1ZXJ5UGFyYW1zKSB7XG5cdFx0XHRwYXJhbXMgPSB0aGlzLnRvUGFyYW1zKGRhdGEpO1xuXHRcdH1cblx0XHRjb25zdCBvYnMgPSB0aGlzLmh0dHAucG9zdCA8U2VydmVyUmVzcG9uc2U+KHRoaXMuY29uZmlnLnVybCwgZGF0YSwge1xuXHRcdFx0b2JzZXJ2ZTogXCJyZXNwb25zZVwiLFxuXHRcdFx0aGVhZGVyczogaGVhZGVycyxcblx0XHRcdHBhcmFtczogcGFyYW1zXG5cdFx0fSk7XG5cdFx0Y29uc29sZS5sb2coXCJlbnRlcmluZyBvYnNcIilcblx0XHRyZXR1cm4gb2JzLnBpcGUobWFwKChyZXNwOmFueSkgPT4ge1xuXHRcdFx0Y29uc29sZS5sb2coXCJlbnRlcmluZyBtYXBcIilcblx0XHRcdGlmICghcmVzcC5vaykge1xuXHRcdFx0XHRjb25zdCBtc2cgPSAnU2VydmVyIEVycm9yLiBodHRwLXN0YXR1cyA6JyArIHJlc3Auc3RhdHVzICsgJz0nICsgcmVzcC5zdGF0dXNUZXh0ICsgKHJlc3AuYm9keSA/ICdSZXNwb25zZTogJyArIEpTT04uc3RyaW5naWZ5KHJlc3AuYm9keSkgOiAnJyk7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IobXNnKTtcblx0XHRcdFx0dGhyb3cge1xuXHRcdFx0XHRcdHR5cGU6ICdlcnJvcicsXG5cdFx0XHRcdFx0aWQ6ICdzZXJ2ZXJFcnJvcicsXG5cdFx0XHRcdFx0dGV4dDogbXNnXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0XHQvL25vLW5ld3MgaXMgZ29vZC1uZXdzISFcblx0XHRcdGlmICghcmVzcC5ib2R5KSB7XG5cdFx0XHRcdHJldHVybiB7fTtcblx0XHRcdH1cblx0XHRcblx0XHRcdGNvbnN0IHtcblx0XHRcdFx0bWVzc2FnZXMsXG5cdFx0XHRcdGFsbE9rLFxuXHRcdFx0XHRkYXRhLFxuXHRcdFx0XHR0b2tlblxuXHRcdFx0fSA9IHJlc3AuYm9keTtcblx0XHRcdGlmIChhbGxPaykge1xuXHRcdFx0XHRpZiAodG9rZW4pIHtcblx0XHRcdFx0XHR0aGlzLmN0eC5zZXRUb2tlbih0b2tlbik7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKG1lc3NhZ2VzKSB7XG5cdFx0XHRcdFx0aWYgKG1lc3NhZ2VzWzBdLnR5cGUgPT0gJ2luZm8nKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyBtZXNzYWdlcztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGRhdGEgYXMgVm87XG5cdFx0XHR9XG5cblx0XHRcdGlmIChtZXNzYWdlcykge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdTZXJ2ZXIgcmV0dXJuZWQgd2l0aCBlcnJvcnMgOicsIG1lc3NhZ2VzKTtcblx0XHRcdFx0dGhyb3cgbWVzc2FnZXM7XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBtc2cgPSAnU2VydmVyIEVycm9yLiBzZXJ2ZXIgcmVwb3J0ZWQgYSBmYWlsdXJlLCBidXQgZGlkIG5vdCByZXR1cm4gYW55IGVycm9yIG1lc3NhZ2UnO1xuXHRcdFx0Y29uc29sZS5lcnJvcihtc2cpO1xuXHRcdFx0dGhyb3cgW3tcblx0XHRcdFx0dHlwZTogJ2Vycm9yJyxcblx0XHRcdFx0aWQ6ICdzZXJ2ZXJFcnJvcicsXG5cdFx0XHRcdHRleHQ6IG1zZ1xuXHRcdFx0fV07XG5cdFx0fSkpO1xuXHR9XG5cdC8qKlxuXHQgKiBmaWx0ZXIgcm93cyBmb3IgYSBmb3JtIGFuZCByZXR1cm4gcmF3LXJvd3MuIFxuXHQgKiBOb3RlIHRoYXQgdGhlIHJldHVybmVkIGRhdGEgaXMgTk9UIHNldCB0byBhbnkgbW9kZWwgYmVmb3JlIHJldHVybmluZyBpdCB0aGUgY2FsbGVyXG5cdCAqL1xuICAgIHB1YmxpYyBmaWx0ZXIoZm9ybTpGb3JtLCBmaWx0ZXJzOiBGaWx0ZXJSZXF1ZXN0KTogT2JzZXJ2YWJsZTxWb1tdPiB7XG4gICAgICAgIGNvbnN0IHNlcnZpY2VOYW1lID0gZm9ybS5nZXRTZXJ2aWNlTmFtZShDb252ZW50aW9ucy5PUF9GSUxURVIpO1xuICAgICAgICBpZiAoIXNlcnZpY2VOYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcigoKSA9PiBuZXcgRXJyb3IgKENvbnZlbnRpb25zLk9QX0ZJTFRFUiArICcgb3BlcmF0aW9uIGlzIG5vdCBhbGxvd2VkLicpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG9icyA9IHRoaXMuc2VydmUoc2VydmljZU5hbWUsIHsgZGF0YTogZmlsdGVycyB9KTtcbiAgICAgICAgcmV0dXJuIG9icy5waXBlKFxuICAgICAgICAgICAgbWFwKHZvID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdm9bJ2xpc3QnXSBhcyBWb1tdO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBjYXRjaEVycm9yKG1zZ3MgPT4ge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdjYXRjaGluZyBpbiBzYScpXG4gICAgICAgICAgICAgICAgdGhyb3cgbXNncztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG5cdC8qKlxuXHQgKiBcblx0ICogQHBhcmFtIGNhbGwgcGFyYW1ldGVycyBmb3Igc2VydmUgdGhhdCB3YXMgaW50ZXJydXB0ZWQuXG5cdCAqIFdlIGhhdmUgdG8gZGVzaWduIGEgd2F5IHRvIHJldHVybiBhbiBvYnNlcnZhYmxlIHRoYXQgd29ya3MgYWZ0ZXIgYSBzdWNjZXNzZnVsIGxvZ2luLlxuXHQgKi9cblx0cHJpdmF0ZSBub3RMb2dnZWRJbihwYXJhbXM6IGFueSk6IE9ic2VydmFibGUgPCBWbyA+IHtcblx0XHQvKipcblx0XHQgKiB3aGF0IHdlIHdhbnQgdG8gZG8gaXM6XG5cdFx0ICogMS4gc2hvdyBhIG1vZGFsIHBhbmVsIGFuZCBhY2NlcHQgY3JlZGVudGlhbHMuXG5cdFx0ICogMi4gY2FsbCBsb2dpbiBzZXJ2aWNlIHdpdGggdGhlc2UgY3JlZGVudGlhbHMuXG5cdFx0ICogMy4gb24gc3VjY2Vzc2Z1bCBsb2dpbiwgbWFrZSB0aGlzIHNlcnZpY2UgcmVxdWVzdCBhZ2Fpbi5cblx0XHQgKiBMb2dpYyB3b3VsZCBiZSBxdWl0ZSB0cmlja3kgYmVjYXVlIHdlIGhhdmUgdDAgcmV0dXJuIGFuIG9ic2VydmFibGUgcmlnaHQgbm93IHRoYXQgdHJpZ2dlcnMgYWxsIHRoZXNlLi5cblx0XHQgXiBmb3IgdGUgdGltZSBiZWluZywgd2UganVzdCB0aHJvdy11cCBvdXIgaGFuZHMhISFcblx0XHQgKi9cblx0XHRjb25zdCBtc2cgPSAnU29ycnkgeW91IGFyZSBub3QgbG9nZ2VkIGluLiBQbGVhc2UgdHJ5IGFnYWluIGFmdGVyIGxvZ2dpbmcgaW4nO1xuXHRcdHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6YW55KSA9PiB7XG5cdFx0XHRjb25zdCB7XG5cdFx0XHRcdGVycm9yXG5cdFx0XHR9ID0gb2JzZXJ2ZXI7XG5cdFx0XHRlcnJvcignbXNnJyk7XG5cdFx0fSk7XG5cdH1cblxuXHRwcml2YXRlIHRvUGFyYW1zKGRhdGE6IGFueSk6IEh0dHBQYXJhbXMge1xuXHRcdGxldCBwYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xuXHRcdGZvciAoY29uc3QgYSBpbiBkYXRhKSB7XG5cdFx0XHRpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShhKSkge1xuXHRcdFx0XHRjb25zdCB2YWwgPSBkYXRhW2FdIHx8IFwiXCI7XG5cdFx0XHRcdHBhcmFtcy5zZXQoYSwgdmFsLnRvU3RyaW5nKCkpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcGFyYW1zO1xuXHR9XG5cdC8qKlxuXHQgKiBpbml0aWF0ZXMgYSBmaWxlLWRvd24gbG9hZCBieSB0aGUgYnJvd3NlciB3aXRoIHN1cHBsaWVkIGRhdGEgYXMgY29udGVudFxuXHQgKiBAcGFyYW0gZGF0YSAgdG8gYmUgZG93bmxvYWRlZFxuXHQgKiBAcGFyYW0gZmlsZU5hbWUgbmFlbSBvZiB0aGUgZmlsZSB0byBiZSBkb3dubG9hZGVkIGFzIFxuXHQgKi9cblx0cHVibGljIGRvd25sb2FkKGRhdGE6IGFueSwgZmlsZU5hbWU6IHN0cmluZykge1xuXHRcdGNvbnN0IGpzb24gPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcblx0XHRjb25zdCBibG9iID0gbmV3IEJsb2IoW2pzb25dLCB7XG5cdFx0XHR0eXBlOiAnb2N0ZXQvc3RyZWFtJ1xuXHRcdH0pO1xuXHRcdGNvbnN0IHVybCA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXHRcdGNvbnN0IGEgPSB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuXHRcdGEuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRhLmhyZWYgPSB1cmw7XG5cdFx0YS50YXJnZXQgPSAnX2JsYW5rJztcblx0XHRhLmRvd25sb2FkID0gZmlsZU5hbWU7XG5cdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhKTtcblx0XHRhLmNsaWNrKCk7XG5cdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChhKTtcblx0fVxufSJdfQ==