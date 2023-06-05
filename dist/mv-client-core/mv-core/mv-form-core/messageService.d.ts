import { MatSnackBar } from "@angular/material/snack-bar";
import * as i0 from "@angular/core";
export declare class MessageService {
    private snackBar;
    constructor(snackBar: MatSnackBar);
    showSuccess(message: string): void;
    showError(message: string): void;
    showInfo(message: string): void;
    showDetail(message: string): void;
    close(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MessageService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MessageService>;
}
//# sourceMappingURL=messageService.d.ts.map