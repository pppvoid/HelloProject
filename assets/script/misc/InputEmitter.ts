import { Strings } from "./Strings";

const {ccclass, property} = cc._decorator;

export interface InputListener {
    onInput(event: cc.Event);
}

function isInputListener(impl: any): boolean {
    return undefined !== impl.onInput;
}

function forceCast<T>(input: any): T {
    return input;
}

@ccclass
export default class InputEmitter extends cc.Component {
    listeners = new Array<InputListener>();

    onLoad () {
        this.node.on(Strings.Input.mousedown, (event) => this.emit(event));
        this.node.on(Strings.Input.mouseup, (event) => this.emit(event));
        this.node.on(Strings.Input.mouseenter, (event) => this.emit(event));
        this.node.on(Strings.Input.mouseleave, (event) => this.emit(event));
        this.node.on(Strings.Input.mousemove, (event) => this.emit(event));
        this.node.on(Strings.Input.mousewheel, (event) => this.emit(event));

        this.node.on(Strings.Input.touchstart, (event) => this.emit(event));
        this.node.on(Strings.Input.touchend, (event) => this.emit(event));
        this.node.on(Strings.Input.touchmove, (event) => this.emit(event));
        this.node.on(Strings.Input.touchcancel, (event) => this.emit(event));

        this.collectListener();
    }

    collectListener() {
        let components = this.node.getComponentsInChildren<cc.Component>(cc.Component);
        components.forEach(com => {
            if (isInputListener(com)) {
                this.listeners.push(forceCast<InputListener>(com));
            }
        });
    }

    emit(event: cc.Event) {
        this.listeners.forEach(listener => {
            listener.onInput(event);
        });    
    }
}
