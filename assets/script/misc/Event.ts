export class Event {
    static MakeEventHandler(target: cc.Node, component: string, handler: string, customEventData?: string): cc.Component.EventHandler {
        let event = new cc.Component.EventHandler();
        event.target = target;
        event.component = component;
        event.handler = handler;
        event.customEventData = customEventData;
        return event;
    }
        
    static MakeDispatchEvent(callbackName: string, upcastingMessage: boolean, detail?: any): cc.Event.EventCustom {
        let event = new cc.Event.EventCustom(callbackName, upcastingMessage);
        event.detail = detail;
        return event;
    }
    // export function MakeEventHandler(target: cc.Node, component: string, handler: string, customEventData?: string): cc.Component.EventHandler {
    //     let event = new cc.Component.EventHandler();
    //     event.target = target;
    //     event.component = component;
    //     event.handler = handler;
    //     event.customEventData = customEventData;
    //     return event;
    // }
        
    // export function MakeDispatchEvent(callbackName: string, upcastingMessage: boolean, detail?: any): cc.Event.EventCustom {
    //     let event = new cc.Event.EventCustom(callbackName, upcastingMessage);
    //     event.detail = detail;
    //     return event;
    // }
}
