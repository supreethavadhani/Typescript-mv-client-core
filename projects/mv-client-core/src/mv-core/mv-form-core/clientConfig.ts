import { Injectable } from '@angular/core';

@Injectable({ providedIn: "root" })
export class ClientConfig {
    url = 'http://localhost:8080/a';
}