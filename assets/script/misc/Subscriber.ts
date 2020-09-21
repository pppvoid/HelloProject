import { subscribe, unsubscribe } from 'pubsub-js'

export class Subscriber {
    handles: Array<any> = Array<any>(); 

    push(msg: string, func: any) {
        let handle = subscribe(msg, func);
        this.handles.push(handle);
    }

    release() {
        this.handles.forEach(handle => unsubscribe(handle));
    }
}