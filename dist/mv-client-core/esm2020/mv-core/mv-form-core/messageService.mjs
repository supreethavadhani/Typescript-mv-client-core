import { Injectable } from "@angular/core";
import { MatSnackBarConfig } from "@angular/material/snack-bar";
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/snack-bar";
export class MessageService {
    constructor(snackBar) {
        this.snackBar = snackBar;
    }
    showSuccess(message) {
        const config = new MatSnackBarConfig();
        config.panelClass = ['snackbar-success'];
        config.duration = 3000;
        this.snackBar.open(message, undefined, config);
    }
    showError(message) {
        const config = new MatSnackBarConfig();
        config.panelClass = ['snackbar-error'];
        config.duration = 3000;
        this.snackBar.open(message, undefined, config);
    }
    showInfo(message) {
        const config = new MatSnackBarConfig();
        config.panelClass = ['snackbar-info'];
        config.duration = 3000;
        this.snackBar.open(message, undefined, config);
    }
    showDetail(message) {
        const config = new MatSnackBarConfig();
        config.horizontalPosition = 'end';
        config.verticalPosition = 'bottom';
        this.snackBar.open(message, undefined, config);
    }
    close() {
        this.snackBar.dismiss();
    }
}
MessageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MessageService, deps: [{ token: i1.MatSnackBar }], target: i0.ɵɵFactoryTarget.Injectable });
MessageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MessageService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MessageService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.MatSnackBar }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZVNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tdi1jbGllbnQtY29yZS9zcmMvbXYtY29yZS9tdi1mb3JtLWNvcmUvbWVzc2FnZVNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFVBQVUsRUFDWCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBRUwsaUJBQWlCLEVBQ2xCLE1BQU0sNkJBQTZCLENBQUE7OztBQUVwQyxNQUFNLE9BQU8sY0FBYztJQUN6QixZQUFvQixRQUFxQjtRQUFyQixhQUFRLEdBQVIsUUFBUSxDQUFhO0lBQUcsQ0FBQztJQUU3QyxXQUFXLENBQUMsT0FBZTtRQUN6QixNQUFNLE1BQU0sR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUM7UUFDdkMsTUFBTSxDQUFDLFVBQVUsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDekMsTUFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBQ0QsU0FBUyxDQUFDLE9BQWU7UUFDdkIsTUFBTSxNQUFNLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELFFBQVEsQ0FBQyxPQUFlO1FBQ3RCLE1BQU0sTUFBTSxHQUFHLElBQUksaUJBQWlCLEVBQUUsQ0FBQztRQUN2QyxNQUFNLENBQUMsVUFBVSxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDdEMsTUFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBQ0QsVUFBVSxDQUFDLE9BQWU7UUFDeEIsTUFBTSxNQUFNLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDbEMsTUFBTSxDQUFDLGdCQUFnQixHQUFHLFFBQVEsQ0FBQztRQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQ2hELENBQUM7SUFDRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUMxQixDQUFDOzsyR0E5QlUsY0FBYzsrR0FBZCxjQUFjOzJGQUFkLGNBQWM7a0JBRDFCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBJbmplY3RhYmxlXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1xuICBNYXRTbmFja0JhcixcbiAgTWF0U25hY2tCYXJDb25maWdcbn0gZnJvbSBcIkBhbmd1bGFyL21hdGVyaWFsL3NuYWNrLWJhclwiXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWVzc2FnZVNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNuYWNrQmFyOiBNYXRTbmFja0Jhcikge31cblxuICBzaG93U3VjY2VzcyhtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBjb25maWcgPSBuZXcgTWF0U25hY2tCYXJDb25maWcoKTtcbiAgICBjb25maWcucGFuZWxDbGFzcyA9IFsnc25hY2tiYXItc3VjY2VzcyddO1xuICAgIGNvbmZpZy5kdXJhdGlvbiA9IDMwMDA7XG4gICAgdGhpcy5zbmFja0Jhci5vcGVuKG1lc3NhZ2UsIHVuZGVmaW5lZCwgY29uZmlnKTtcbiAgfVxuICBzaG93RXJyb3IobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgY29uc3QgY29uZmlnID0gbmV3IE1hdFNuYWNrQmFyQ29uZmlnKCk7XG4gICAgY29uZmlnLnBhbmVsQ2xhc3MgPSBbJ3NuYWNrYmFyLWVycm9yJ107XG4gICAgY29uZmlnLmR1cmF0aW9uID0gMzAwMDtcbiAgICB0aGlzLnNuYWNrQmFyLm9wZW4obWVzc2FnZSwgdW5kZWZpbmVkLCBjb25maWcpO1xuICB9XG5cbiAgc2hvd0luZm8obWVzc2FnZTogc3RyaW5nKSB7XG4gICAgY29uc3QgY29uZmlnID0gbmV3IE1hdFNuYWNrQmFyQ29uZmlnKCk7XG4gICAgY29uZmlnLnBhbmVsQ2xhc3MgPSBbJ3NuYWNrYmFyLWluZm8nXTtcbiAgICBjb25maWcuZHVyYXRpb24gPSAzMDAwO1xuICAgIHRoaXMuc25hY2tCYXIub3BlbihtZXNzYWdlLCB1bmRlZmluZWQsIGNvbmZpZyk7XG4gIH1cbiAgc2hvd0RldGFpbChtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBjb25maWcgPSBuZXcgTWF0U25hY2tCYXJDb25maWcoKTtcbiAgICBjb25maWcuaG9yaXpvbnRhbFBvc2l0aW9uID0gJ2VuZCc7XG4gICAgY29uZmlnLnZlcnRpY2FsUG9zaXRpb24gPSAnYm90dG9tJztcbiAgICB0aGlzLnNuYWNrQmFyLm9wZW4obWVzc2FnZSwgdW5kZWZpbmVkLCBjb25maWcpXG4gIH1cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5zbmFja0Jhci5kaXNtaXNzKCk7XG4gIH1cbn1cbiJdfQ==