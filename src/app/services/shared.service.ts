
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharedDataService {

    private titleSource = new BehaviorSubject<string>('Default Title');
    currentTitle$ = this.titleSource.asObservable();

    constructor() { }

    setPageTitle(title: string) {
        this.titleSource.next(title);
    }


}




