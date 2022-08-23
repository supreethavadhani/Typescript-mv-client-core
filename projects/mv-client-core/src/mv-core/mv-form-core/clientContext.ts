/**
 * acts as a cache from session storage. designed keeping in mind that
 * most session-scoped data is stored-once-accessed-often
 */
import {
  Injectable
} from "@angular/core";


const USER = "_user";
const TOKEN = "_token";


@Injectable({
  providedIn: 'root'
})

export class ClientContext {
  constructor() {}
  private values = new Map < string, any > ();
  private validPages = {};
  private validPagesArray = [];

  public setToken(token: string) {
    this.setValue(TOKEN, token);
  }


  /**
   * any data that  is to be saved as part of session.
   * This will survive page reloads, but not browser closure
   *
   * @param key
   * @param value
   */
  public setValue(key: string, value: any): void {
    this.values.set(key, value);
    if (value == null) {
      sessionStorage.removeItem(key);
    } else {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  }

  /**
   * value of a field that is session scoped
   * @param key
   */
  public getValue(key: string): any {
    let value = this.values.get(key);
    if (value) {
      return value;
    }
    const s = sessionStorage.getItem(key);
    if (!s) {
      return s;
    }
    value = s;
    this.values.set(key, value);
    return value;
  }

  /**
   * details of logged-in user.
   */
  public getToken(): string {
    return this.getValue(TOKEN) as string;
  }
}