export class TouchUtil {
  static touch: cc.Touch = new cc.Touch();
  static getTouchByMouse(event: cc.Event): cc.Touch {
    let eventMouse = event as cc.Event.EventMouse;
    let mousePos = eventMouse.getLocation();
    this.touch.setTouchInfo(0, mousePos.x, mousePos.y);

    return this.touch;
  }
}
