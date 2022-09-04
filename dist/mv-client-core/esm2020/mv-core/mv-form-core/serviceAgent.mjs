import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Conventions } from './conventions';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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
            return throwError(Conventions.OP_FILTER + ' operation is not allowed.');
        }
        const obs = this.serve(serviceName, {
            data: filters
        });
        return obs.pipe(map((vo) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZUFnZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbXYtY2xpZW50LWNvcmUvc3JjL212LWNvcmUvbXYtZm9ybS1jb3JlL3NlcnZpY2VBZ2VudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRU4sVUFBVSxFQUVWLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUNOLFVBQVUsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUl2QixPQUFPLEVBQ04sV0FBVyxFQUNYLE1BQU0sZUFBZSxDQUFDO0FBTXZCLE9BQU8sRUFDTCxVQUFVLEVBQ1YsVUFBVSxFQUNYLE1BQU0sTUFBTSxDQUFDO0FBT2QsT0FBTyxFQUNOLFVBQVUsRUFDVixHQUFHLEVBQ0gsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7QUFLeEI7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLFlBQVk7SUFDeEIsWUFBb0IsSUFBZ0IsRUFBVSxNQUFvQixFQUFVLEdBQWtCO1FBQTFFLFNBQUksR0FBSixJQUFJLENBQVk7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFjO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBZTtJQUFHLENBQUM7SUFFbEc7Ozs7Ozs7Ozs7T0FVRztJQUNJLEtBQUssQ0FBQyxXQUFtQixFQUMvQixVQU1JLEVBQUUsRUFDTixXQUFvQixJQUFJO1FBRXhCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbEMsSUFBSSxRQUFRLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDdkIsd0RBQXdEO1lBQ3hELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztnQkFDdkIsV0FBVyxFQUFFLFdBQVc7Z0JBQ3hCLE9BQU8sRUFBRSxPQUFPO2dCQUNoQixRQUFRLEVBQUUsUUFBUTthQUNsQixDQUFDLENBQUM7U0FDSDtRQUNELE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFB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QjtRQUMxQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDN0IsSUFBSSxFQUFFLGNBQWM7U0FDcEIsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2IsQ0FBQyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7UUFDcEIsQ0FBQyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDdEIsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ1YsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7eUdBektXLFlBQVk7NkdBQVosWUFBWSxjQU5aLE1BQU07MkZBTU4sWUFBWTtrQkFQeEIsVUFBVTttQkFBQztvQkFDWCxVQUFVLEVBQUUsTUFBTTtpQkFDbEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuXHRIdHRwQ2xpZW50LFxuXHRIdHRwUGFyYW1zLFxuXHRIdHRwUmVzcG9uc2Vcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtcblx0SW5qZWN0YWJsZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG5cdENsaWVudENvbmZpZ1xufSBmcm9tICcuL2NsaWVudENvbmZpZyc7XG5pbXBvcnQge1xuXHRDb252ZW50aW9uc1xufSBmcm9tICcuL2NvbnZlbnRpb25zJztcbmltcG9ydCB7XG5cdFZvLFxuXHRTZXJ2ZXJSZXNwb25zZSxcblx0RmlsdGVyUmVxdWVzdFxufSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7XG4gIHRocm93RXJyb3IsXG4gIE9ic2VydmFibGVcbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuQ2xpZW50Q29udGV4dFxufSBmcm9tICcuL2NsaWVudENvbnRleHQnO1xuaW1wb3J0IHtcblx0Rm9ybVxufSBmcm9tICcuL2Zvcm0nO1xuaW1wb3J0IHtcblx0Y2F0Y2hFcnJvcixcblx0bWFwXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoe1xuXHRwcm92aWRlZEluOiAncm9vdCdcbn0pXG4vKipcbiAqIEEgd3JhcHBlciBvbiBIdHRwQ2xpZW50IHRvIHRha2UgY2FyZSBvZiBvdXIgcHJvdG9jb2xzXG4gKiBEcmF3cyBoZWF2aWx5IG9uIE9ic2VydmFibGVzLiBJZiB5b3UgYXJlIHRvdW5kZXJzdGFuZC9tYWludGFpbiB0aGlzIGNvZGUsICB5b3UgTVVTVCBiZSB0aG9yb3VnaCB3aXRoIHRoZSBPYnNlcnZhYmxlc1xuICovXG5leHBvcnQgY2xhc3MgU2VydmljZUFnZW50IHtcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIGNvbmZpZzogQ2xpZW50Q29uZmlnLCBwcml2YXRlIGN0eDogQ2xpZW50Q29udGV4dCkge31cblxuXHQvKipcblx0ICogc2VydmUgdGhpcyBzZXJ2aWNlLiB3ZSB1c2UgYSBzdHJpY3Qgc2VydmljZSBvcmllbnRlZCBhcmNoaXRlY3R1cmUsIFxuXHQgKiB3aGVyZSBpbiB0aGUgb25seSB0aGluZyB0aGUgY2xpZW50IGNhbiBhc2sgdGhlIHNlcnZlciBpcyB0byBzZXJ2ZSBhIHNlcnZpY2UuXG5cdCAqIFRoZXJlIGlzIG5vIGNvbmNlcHQgb2YgcmVzb3VyY2VzIG9yIG9wZXJhdGlvbnMuIEFueSBzdWNoIGNvbmNlcHRzIGFyZSB0byBiZSBcblx0ICogaW1wbGVtZW50ZWQgdXNpbmcgdGhlIHNlcnZpY2UgcGFyYWRpZ20uIFxuXHQgKiBAcGFyYW0gc2VydmljZU5hbWUgIG5hbWUgb2YgdGhlIHNlcnZpY2UgdG8gYmUgcmVxdWVzdGVkXG5cdCAqIEBwYXJhbSBkYXRhIGlucHV0IGRhdGEgZm9yIHRoZSByZXF1ZXN0XG5cdCAqIEBwYXJhbSBhc1F1ZXJ5UGFyYW1zIHRydWUgaWYgdGhlIGRhdGEgaXMganVzdCBhIHNldCBvZiBuYW1lLXN0cmluZyBwYXJhbXMsIGFuZCB0aGUgc3J2ZXIgZXhwZWN0cyB0aGVtIGluIHF1ZXJ5IHN0cmluZ1xuXHQgKiBAcGFyYW0gaGVhZGVycyBhbnkgc3BlY2lhbCBoZWFkZXJzIHRvIGJlIGNvbW11bmljYXRlZC4gVHlwaWNhbGx5IGZvciBhZGRpdGlvbmFsIGF1dGhlbnRpY2F0aW9uLlxuXHQgKiBAcGFyYW0gd2l0aEF1dGggdHJ1ZSBpZiB0aGUgcmVxdWVzdCBpcyB0byBiZSBzZW50IHdpdGggYXV0aC4gSWYgYXV0aCBpcyBub3QgcHJlc2VudCwgdGhpcyB3aWwgdHJpZ2dlciBhIGxvZ2luXG5cdCAqL1xuXHRwdWJsaWMgc2VydmUoc2VydmljZU5hbWU6IHN0cmluZyxcblx0XHRvcHRpb25zOiB7XG5cdFx0XHRkYXRhID8gOiBWbyB8IEZpbHRlclJlcXVlc3QgfCBudWxsICxcblx0XHRcdGFzUXVlcnlQYXJhbXMgPyA6IGJvb2xlYW4sXG5cdFx0XHRoZWFkZXJzID8gOiB7XG5cdFx0XHRcdFtrZXk6IHN0cmluZ106IHN0cmluZ1xuXHRcdFx0fVxuXHRcdH0gPSB7fSxcblx0XHR3aXRoQXV0aDogYm9vbGVhbiA9IHRydWUpOihPYnNlcnZhYmxlIDwgVm8gPikge1xuXG5cdFx0Y29uc3QgdG9rZW4gPSB0aGlzLmN0eC5nZXRUb2tlbigpO1xuXHRcdGlmICh3aXRoQXV0aCAmJiAhdG9rZW4pIHtcblx0XHRcdC8vbm90IGxvZ2dlZC1pbi5UbyBiZSByZS10cmllZCBhZnRlciAgYSBzdWNjZXNzZnVsIGxvZ2luXG5cdFx0XHRyZXR1cm4gdGhpcy5ub3RMb2dnZWRJbih7XG5cdFx0XHRcdHNlcnZpY2VOYW1lOiBzZXJ2aWNlTmFtZSxcblx0XHRcdFx0b3B0aW9uczogb3B0aW9ucyxcblx0XHRcdFx0d2l0aEF1dGg6IHdpdGhBdXRoXG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0Y29uc3QgaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycyB8fCB7fTtcblx0XHRoZWFkZXJzW0NvbnZlbnRpb25zLkhFQURFUl9TRVJWSUNFXSA9IHNlcnZpY2VOYW1lO1xuXHRcdGlmICh3aXRoQXV0aCkge1xuXHRcdFx0aGVhZGVyc1tDb252ZW50aW9ucy5IRUFERVJfQVVUSF0gPSB0b2tlbjtcblx0XHR9XG5cdFx0bGV0IGRhdGEgPSBvcHRpb25zLmRhdGEgfHwgbnVsbDtcblx0XHRsZXQgcGFyYW1zO1xuXHRcdGlmIChkYXRhICYmIG9wdGlvbnMuYXNRdWVyeVBhcmFtcykge1xuXHRcdFx0cGFyYW1zID0gdGhpcy50b1BhcmFtcyhkYXRhKTtcblx0XHR9XG5cdFx0Y29uc3Qgb2JzID0gdGhpcy5odHRwLnBvc3QgPFNlcnZlclJlc3BvbnNlPih0aGlzLmNvbmZpZy51cmwsIGRhdGEsIHtcblx0XHRcdG9ic2VydmU6IFwicmVzcG9uc2VcIixcblx0XHRcdGhlYWRlcnM6IGhlYWRlcnMsXG5cdFx0XHRwYXJhbXM6IHBhcmFtc1xuXHRcdH0pO1xuXHRcdHJldHVybiBvYnMucGlwZShtYXAoKHJlc3A6SHR0cFJlc3BvbnNlPFNlcnZlclJlc3BvbnNlPikgPT4ge1xuXHRcdFx0aWYgKCFyZXNwLm9rKSB7XG5cdFx0XHRcdGNvbnN0IG1zZyA9ICdTZXJ2ZXIgRXJyb3IuIGh0dHAtc3RhdHVzIDonICsgcmVzcC5zdGF0dXMgKyAnPScgKyByZXNwLnN0YXR1c1RleHQgKyAocmVzcC5ib2R5ID8gJ1Jlc3BvbnNlOiAnICsgSlNPTi5zdHJpbmdpZnkocmVzcC5ib2R5KSA6ICcnKTtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihtc2cpO1xuXHRcdFx0XHR0aHJvdyB7XG5cdFx0XHRcdFx0dHlwZTogJ2Vycm9yJyxcblx0XHRcdFx0XHRpZDogJ3NlcnZlckVycm9yJyxcblx0XHRcdFx0XHR0ZXh0OiBtc2dcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHRcdC8vbm8tbmV3cyBpcyBnb29kLW5ld3MhIVxuXHRcdFx0aWYgKCFyZXNwLmJvZHkpIHtcblx0XHRcdFx0cmV0dXJuIHt9O1xuXHRcdFx0fVxuXHRcdFxuXHRcdFx0Y29uc3Qge1xuXHRcdFx0XHRtZXNzYWdlcyxcblx0XHRcdFx0YWxsT2ssXG5cdFx0XHRcdGRhdGEsXG5cdFx0XHRcdHRva2VuXG5cdFx0XHR9ID0gcmVzcC5ib2R5O1xuXHRcdFx0aWYgKGFsbE9rKSB7XG5cdFx0XHRcdGlmICh0b2tlbikge1xuXHRcdFx0XHRcdHRoaXMuY3R4LnNldFRva2VuKHRva2VuKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAobWVzc2FnZXMpIHtcblx0XHRcdFx0XHRpZiAobWVzc2FnZXNbMF0udHlwZSA9PSAnaW5mbycpIHtcblx0XHRcdFx0XHRcdHRocm93IG1lc3NhZ2VzO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gZGF0YSBhcyBWbztcblx0XHRcdH1cblxuXHRcdFx0aWYgKG1lc3NhZ2VzKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ1NlcnZlciByZXR1cm5lZCB3aXRoIGVycm9ycyA6JywgbWVzc2FnZXMpO1xuXHRcdFx0XHR0aHJvdyBtZXNzYWdlcztcblx0XHRcdH1cblx0XHRcdGNvbnN0IG1zZyA9ICdTZXJ2ZXIgRXJyb3IuIHNlcnZlciByZXBvcnRlZCBhIGZhaWx1cmUsIGJ1dCBkaWQgbm90IHJldHVybiBhbnkgZXJyb3IgbWVzc2FnZSc7XG5cdFx0XHRjb25zb2xlLmVycm9yKG1zZyk7XG5cdFx0XHR0aHJvdyBbe1xuXHRcdFx0XHR0eXBlOiAnZXJyb3InLFxuXHRcdFx0XHRpZDogJ3NlcnZlckVycm9yJyxcblx0XHRcdFx0dGV4dDogbXNnXG5cdFx0XHR9XTtcblx0XHR9KSk7XG5cdH1cblx0LyoqXG5cdCAqIGZpbHRlciByb3dzIGZvciBhIGZvcm0gYW5kIHJldHVybiByYXctcm93cy4gXG5cdCAqIE5vdGUgdGhhdCB0aGUgcmV0dXJuZWQgZGF0YSBpcyBOT1Qgc2V0IHRvIGFueSBtb2RlbCBiZWZvcmUgcmV0dXJuaW5nIGl0IHRoZSBjYWxsZXJcblx0ICovXG5cdHB1YmxpYyBmaWx0ZXIoZm9ybTogRm9ybSwgZmlsdGVyczogRmlsdGVyUmVxdWVzdCk6IE9ic2VydmFibGUgPCBWb1tdID4ge1xuXHRcdGNvbnN0IHNlcnZpY2VOYW1lID0gZm9ybS5nZXRTZXJ2aWNlTmFtZShDb252ZW50aW9ucy5PUF9GSUxURVIpO1xuXHRcdGlmICghc2VydmljZU5hbWUpIHtcblx0XHRcdHJldHVybiB0aHJvd0Vycm9yKENvbnZlbnRpb25zLk9QX0ZJTFRFUiArICcgb3BlcmF0aW9uIGlzIG5vdCBhbGxvd2VkLicpO1xuXHRcdH1cblxuXHRcdGNvbnN0IG9icyA9IHRoaXMuc2VydmUoc2VydmljZU5hbWUsIHtcblx0XHRcdGRhdGE6IGZpbHRlcnNcblx0XHR9KTtcblx0XHRyZXR1cm4gb2JzLnBpcGUoXG5cdFx0XHRtYXAoKHZvOmFueSkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gdm9bJ2xpc3QnXSBhcyBWb1tdO1xuXHRcdFx0fSksXG5cdFx0XHRjYXRjaEVycm9yKG1zZ3MgPT4ge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdjYXRjaGluZyBpbiBzYScpXG5cdFx0XHRcdHRocm93IG1zZ3M7XG5cdFx0XHR9KVxuXHRcdCk7XG5cdH1cblx0LyoqXG5cdCAqIFxuXHQgKiBAcGFyYW0gY2FsbCBwYXJhbWV0ZXJzIGZvciBzZXJ2ZSB0aGF0IHdhcyBpbnRlcnJ1cHRlZC5cblx0ICogV2UgaGF2ZSB0byBkZXNpZ24gYSB3YXkgdG8gcmV0dXJuIGFuIG9ic2VydmFibGUgdGhhdCB3b3JrcyBhZnRlciBhIHN1Y2Nlc3NmdWwgbG9naW4uXG5cdCAqL1xuXHRwcml2YXRlIG5vdExvZ2dlZEluKHBhcmFtczogYW55KTogT2JzZXJ2YWJsZSA8IFZvID4ge1xuXHRcdC8qKlxuXHRcdCAqIHdoYXQgd2Ugd2FudCB0byBkbyBpczpcblx0XHQgKiAxLiBzaG93IGEgbW9kYWwgcGFuZWwgYW5kIGFjY2VwdCBjcmVkZW50aWFscy5cblx0XHQgKiAyLiBjYWxsIGxvZ2luIHNlcnZpY2Ugd2l0aCB0aGVzZSBjcmVkZW50aWFscy5cblx0XHQgKiAzLiBvbiBzdWNjZXNzZnVsIGxvZ2luLCBtYWtlIHRoaXMgc2VydmljZSByZXF1ZXN0IGFnYWluLlxuXHRcdCAqIExvZ2ljIHdvdWxkIGJlIHF1aXRlIHRyaWNreSBiZWNhdWUgd2UgaGF2ZSB0MCByZXR1cm4gYW4gb2JzZXJ2YWJsZSByaWdodCBub3cgdGhhdCB0cmlnZ2VycyBhbGwgdGhlc2UuLlxuXHRcdCBeIGZvciB0ZSB0aW1lIGJlaW5nLCB3ZSBqdXN0IHRocm93LXVwIG91ciBoYW5kcyEhIVxuXHRcdCAqL1xuXHRcdGNvbnN0IG1zZyA9ICdTb3JyeSB5b3UgYXJlIG5vdCBsb2dnZWQgaW4uIFBsZWFzZSB0cnkgYWdhaW4gYWZ0ZXIgbG9nZ2luZyBpbic7XG5cdFx0cmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjphbnkpID0+IHtcblx0XHRcdGNvbnN0IHtcblx0XHRcdFx0ZXJyb3Jcblx0XHRcdH0gPSBvYnNlcnZlcjtcblx0XHRcdGVycm9yKCdtc2cnKTtcblx0XHR9KTtcblx0fVxuXG5cdHByaXZhdGUgdG9QYXJhbXMoZGF0YTogYW55KTogSHR0cFBhcmFtcyB7XG5cdFx0bGV0IHBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCk7XG5cdFx0Zm9yIChjb25zdCBhIGluIGRhdGEpIHtcblx0XHRcdGlmIChkYXRhLmhhc093blByb3BlcnR5KGEpKSB7XG5cdFx0XHRcdGNvbnN0IHZhbCA9IGRhdGFbYV0gfHwgXCJcIjtcblx0XHRcdFx0cGFyYW1zLnNldChhLCB2YWwudG9TdHJpbmcoKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBwYXJhbXM7XG5cdH1cblx0LyoqXG5cdCAqIGluaXRpYXRlcyBhIGZpbGUtZG93biBsb2FkIGJ5IHRoZSBicm93c2VyIHdpdGggc3VwcGxpZWQgZGF0YSBhcyBjb250ZW50XG5cdCAqIEBwYXJhbSBkYXRhICB0byBiZSBkb3dubG9hZGVkXG5cdCAqIEBwYXJhbSBmaWxlTmFtZSBuYWVtIG9mIHRoZSBmaWxlIHRvIGJlIGRvd25sb2FkZWQgYXMgXG5cdCAqL1xuXHRwdWJsaWMgZG93bmxvYWQoZGF0YTogYW55LCBmaWxlTmFtZTogc3RyaW5nKSB7XG5cdFx0Y29uc3QganNvbiA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuXHRcdGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbanNvbl0sIHtcblx0XHRcdHR5cGU6ICdvY3RldC9zdHJlYW0nXG5cdFx0fSk7XG5cdFx0Y29uc3QgdXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cdFx0Y29uc3QgYSA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cdFx0YS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdGEuaHJlZiA9IHVybDtcblx0XHRhLnRhcmdldCA9ICdfYmxhbmsnO1xuXHRcdGEuZG93bmxvYWQgPSBmaWxlTmFtZTtcblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGEpO1xuXHRcdGEuY2xpY2soKTtcblx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGEpO1xuXHR9XG59Il19