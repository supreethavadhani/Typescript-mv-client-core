import {
	HttpClient,
	HttpParams,
	HttpResponse
} from '@angular/common/http';
import {
	Injectable
} from '@angular/core';
import {
	ClientConfig
} from './clientConfig';
import {
	Conventions
} from './conventions';
import {
	Vo,
	ServerResponse,
	FilterRequest
} from './types';
import {
  throwError,
  Observable
} from 'rxjs';
import {
ClientContext
} from './clientContext';
import {
	Form
} from './form';
import {
	catchError,
	map
} from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
/**
 * A wrapper on HttpClient to take care of our protocols
 * Draws heavily on Observables. If you are tounderstand/maintain this code,  you MUST be thorough with the Observables
 */
export class ServiceAgent {
	constructor(private http: HttpClient, private config: ClientConfig, private ctx: ClientContext) {}

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
	public serve(serviceName: string,
		options: {
			data ? : Vo | FilterRequest | null ,
			asQueryParams ? : boolean,
			headers ? : {
				[key: string]: string
			}
		} = {},
		withAuth: boolean = true):(Observable < Vo >) {

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
		const obs = this.http.post <ServerResponse>(this.config.url, data, {
			observe: "response",
			headers: headers,
			params: params
		});
		return obs.pipe(map((resp:HttpResponse<ServerResponse>) => {
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
		
			const {
				messages,
				allOk,
				data,
				token
			} = resp.body;
			if (allOk) {
				if (token) {
					this.ctx.setToken(token);
				}
				if (messages) {
					if (messages[0].type == 'info') {
						throw messages;
					}
				}
				return data as Vo;
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
	public filter(form: Form, filters: FilterRequest): Observable < Vo[] > {
		const serviceName = form.getServiceName(Conventions.OP_FILTER);
		if (!serviceName) {
			return throwError(Conventions.OP_FILTER + ' operation is not allowed.');
		}

		const obs = this.serve(serviceName, {
			data: filters
		});
		return obs.pipe(
			map((vo:any) => {
				return vo['list'] as Vo[];
			}),
			catchError(msgs => {
				console.error('catching in sa')
				throw msgs;
			})
		);
	}
	/**
	 * 
	 * @param call parameters for serve that was interrupted.
	 * We have to design a way to return an observable that works after a successful login.
	 */
	private notLoggedIn(params: any): Observable < Vo > {
		/**
		 * what we want to do is:
		 * 1. show a modal panel and accept credentials.
		 * 2. call login service with these credentials.
		 * 3. on successful login, make this service request again.
		 * Logic would be quite tricky becaue we have t0 return an observable right now that triggers all these..
		 ^ for te time being, we just throw-up our hands!!!
		 */
		const msg = 'Sorry you are not logged in. Please try again after logging in';
		return new Observable((observer:any) => {
			const {
				error
			} = observer;
			error('msg');
		});
	}

	private toParams(data: any): HttpParams {
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
	public download(data: any, fileName: string) {
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