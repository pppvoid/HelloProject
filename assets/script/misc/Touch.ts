export class TouchUtil {
    static touch: cc.Touch = new cc.Touch();
    static getTouchByMouse(event: cc.Event): cc.Touch {
        const eventMouse = event as cc.Event.EventMouse;
        const mousePos = eventMouse.getLocation();
        this.touch.setTouchInfo(0, mousePos.x, mousePos.y);

        return this.touch;
    }
}
