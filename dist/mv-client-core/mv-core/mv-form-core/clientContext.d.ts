import * as i0 from "@angular/core";
export declare class ClientContext {
    constructor();
    private values;
    private validPages;
    private validPagesArray;
    setToken(token: string): void;
    /**
     * any data that  is to be saved as part of session.
     * This will survive page reloads, but not browser closure
     *
     * @param key
     * @param value
     */
    setValue(key: string, value: any): void;
    /**
     * value of a field that is session scoped
     * @param key
     */
    getValue(key: string): any;
    /**
     * details of logged-in user.
     */
    getToken(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ClientContext, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ClientContext>;
}
//# sourceMappingURL=clientContext.d.ts.map