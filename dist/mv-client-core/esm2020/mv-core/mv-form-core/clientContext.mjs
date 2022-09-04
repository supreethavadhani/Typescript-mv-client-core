/**
 * acts as a cache from session storage. designed keeping in mind that
 * most session-scoped data is stored-once-accessed-often
 */
import { Injectable } from "@angular/core";
import * as i0 from "@angular/core";
const USER = "_user";
const TOKEN = "_token";
export class ClientContext {
    constructor() {
        this.values = new Map();
        this.validPages = {};
        this.validPagesArray = [];
    }
    setToken(token) {
        this.setValue(TOKEN, token);
    }
    /**
     * any data that  is to be saved as part of session.
     * This will survive page reloads, but not browser closure
     *
     * @param key
     * @param value
     */
    setValue(key, value) {
        this.values.set(key, value);
        if (value == null) {
            sessionStorage.removeItem(key);
        }
        else {
            sessionStorage.setItem(key, JSON.stringify(value));
        }
    }
    /**
     * value of a field that is session scoped
     * @param key
     */
    getValue(key) {
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
    getToken() {
        return this.getValue(TOKEN);
    }
}
ClientContext.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: ClientContext, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ClientContext.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: ClientContext, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: ClientContext, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50Q29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL212LWNsaWVudC1jb3JlL3NyYy9tdi1jb3JlL212LWZvcm0tY29yZS9jbGllbnRDb250ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUNILE9BQU8sRUFDTCxVQUFVLEVBQ1gsTUFBTSxlQUFlLENBQUM7O0FBR3ZCLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQztBQUNyQixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUM7QUFPdkIsTUFBTSxPQUFPLGFBQWE7SUFDeEI7UUFDUSxXQUFNLEdBQUcsSUFBSSxHQUFHLEVBQW1CLENBQUM7UUFDcEMsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNoQixvQkFBZSxHQUFHLEVBQUUsQ0FBQztJQUhkLENBQUM7SUFLVCxRQUFRLENBQUMsS0FBYTtRQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBR0Q7Ozs7OztPQU1HO0lBQ0ksUUFBUSxDQUFDLEdBQVcsRUFBRSxLQUFVO1FBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM1QixJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFDakIsY0FBYyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNoQzthQUFNO1lBQ0wsY0FBYyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ3BEO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNJLFFBQVEsQ0FBQyxHQUFXO1FBQ3pCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pDLElBQUksS0FBSyxFQUFFO1lBQ1QsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELE1BQU0sQ0FBQyxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLENBQUMsRUFBRTtZQUNOLE9BQU8sQ0FBQyxDQUFDO1NBQ1Y7UUFDRCxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzVCLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVEOztPQUVHO0lBQ0ksUUFBUTtRQUNiLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQVcsQ0FBQztJQUN4QyxDQUFDOzswR0FsRFUsYUFBYTs4R0FBYixhQUFhLGNBSFosTUFBTTsyRkFHUCxhQUFhO2tCQUp6QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogYWN0cyBhcyBhIGNhY2hlIGZyb20gc2Vzc2lvbiBzdG9yYWdlLiBkZXNpZ25lZCBrZWVwaW5nIGluIG1pbmQgdGhhdFxuICogbW9zdCBzZXNzaW9uLXNjb3BlZCBkYXRhIGlzIHN0b3JlZC1vbmNlLWFjY2Vzc2VkLW9mdGVuXG4gKi9cbmltcG9ydCB7XG4gIEluamVjdGFibGVcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuXG5jb25zdCBVU0VSID0gXCJfdXNlclwiO1xuY29uc3QgVE9LRU4gPSBcIl90b2tlblwiO1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuXG5leHBvcnQgY2xhc3MgQ2xpZW50Q29udGV4dCB7XG4gIGNvbnN0cnVjdG9yKCkge31cbiAgcHJpdmF0ZSB2YWx1ZXMgPSBuZXcgTWFwIDwgc3RyaW5nLCBhbnkgPiAoKTtcbiAgcHJpdmF0ZSB2YWxpZFBhZ2VzID0ge307XG4gIHByaXZhdGUgdmFsaWRQYWdlc0FycmF5ID0gW107XG5cbiAgcHVibGljIHNldFRva2VuKHRva2VuOiBzdHJpbmcpIHtcbiAgICB0aGlzLnNldFZhbHVlKFRPS0VOLCB0b2tlbik7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBhbnkgZGF0YSB0aGF0ICBpcyB0byBiZSBzYXZlZCBhcyBwYXJ0IG9mIHNlc3Npb24uXG4gICAqIFRoaXMgd2lsbCBzdXJ2aXZlIHBhZ2UgcmVsb2FkcywgYnV0IG5vdCBicm93c2VyIGNsb3N1cmVcbiAgICpcbiAgICogQHBhcmFtIGtleVxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICovXG4gIHB1YmxpYyBzZXRWYWx1ZShrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMudmFsdWVzLnNldChrZXksIHZhbHVlKTtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogdmFsdWUgb2YgYSBmaWVsZCB0aGF0IGlzIHNlc3Npb24gc2NvcGVkXG4gICAqIEBwYXJhbSBrZXlcbiAgICovXG4gIHB1YmxpYyBnZXRWYWx1ZShrZXk6IHN0cmluZyk6IGFueSB7XG4gICAgbGV0IHZhbHVlID0gdGhpcy52YWx1ZXMuZ2V0KGtleSk7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGNvbnN0IHMgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgaWYgKCFzKSB7XG4gICAgICByZXR1cm4gcztcbiAgICB9XG4gICAgdmFsdWUgPSBzO1xuICAgIHRoaXMudmFsdWVzLnNldChrZXksIHZhbHVlKTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogZGV0YWlscyBvZiBsb2dnZWQtaW4gdXNlci5cbiAgICovXG4gIHB1YmxpYyBnZXRUb2tlbigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmdldFZhbHVlKFRPS0VOKSBhcyBzdHJpbmc7XG4gIH1cbn0iXX0=