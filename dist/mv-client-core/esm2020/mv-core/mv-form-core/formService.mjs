import { Injectable } from "@angular/core";
import { FormData } from "./formData";
import * as i0 from "@angular/core";
export class FormService {
    static getFormFd(formName, sa, allServices) {
        let form = allServices[formName].getInstance();
        let fd = new FormData(form, sa);
        return fd;
    }
}
FormService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: FormService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FormService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: FormService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: FormService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybVNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tdi1jbGllbnQtY29yZS9zcmMvbXYtY29yZS9tdi1mb3JtLWNvcmUvZm9ybVNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFVBQVUsRUFDWCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sWUFBWSxDQUFDOztBQUd0QyxNQUFNLE9BQU8sV0FBVztJQUNmLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBZSxFQUFDLEVBQWUsRUFBQyxXQUFlO1FBQ3JFLElBQUksSUFBSSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtRQUM5QyxJQUFJLEVBQUUsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLENBQUE7UUFDOUIsT0FBTyxFQUFFLENBQUE7SUFDWCxDQUFDOzt3R0FMVSxXQUFXOzRHQUFYLFdBQVc7MkZBQVgsV0FBVztrQkFEdkIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEluamVjdGFibGVcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFNlcnZpY2VBZ2VudCB9IGZyb20gXCIuL3NlcnZpY2VBZ2VudFwiO1xuaW1wb3J0IHsgRm9ybURhdGEgfSBmcm9tIFwiLi9mb3JtRGF0YVwiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRm9ybVNlcnZpY2Uge1xuICBwdWJsaWMgc3RhdGljIGdldEZvcm1GZChmb3JtTmFtZTpzdHJpbmcsc2E6U2VydmljZUFnZW50LGFsbFNlcnZpY2VzOmFueSkge1xuICAgIGxldCBmb3JtID0gYWxsU2VydmljZXNbZm9ybU5hbWVdLmdldEluc3RhbmNlKClcbiAgICBsZXQgZmQgPSBuZXcgRm9ybURhdGEoZm9ybSxzYSlcbiAgICByZXR1cm4gZmRcbiAgfVxufVxuIl19