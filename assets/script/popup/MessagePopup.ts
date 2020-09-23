import Popup from "./Popup";
import { playSoundClip } from "../misc/Sound";
import { PopupStrings } from "./PopupStrings";
import { Event } from "../misc/Event";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MessagePopup extends Popup {
    _leftBtn: cc.Button;
    get leftBtn(): cc.Button {
        return this._leftBtn || (this._leftBtn = this.node.getChildByName("LeftButton").getComponent<cc.Button>(cc.Button));
    }

    _leftText: cc.Label;
    get leftText(): cc.Label {
        return this._leftText || (this._leftText = this.leftBtn.node.getChildByName("Label").getComponent<cc.Label>(cc.Label));
    }

    _rightBtn: cc.Button;
    get rightBtn(): cc.Button {
        return this._rightBtn || (this._rightBtn = this.node.getChildByName("RightButton").getComponent<cc.Button>(cc.Button));
    }

    _rightText: cc.Label;
    get rightText(): cc.Label {
        return this._rightText || (this._rightText = this.rightBtn.node.getChildByName("Label").getComponent<cc.Label>(cc.Label));
    }

    clickLeftCallback: () => void = null;
    clickRightCallback: () => void = null;

    onLoad() {
        this.eventInstructor();
    }

    eventInstructor() {}

    show(isShow: boolean) {
        this.node.active = isShow;
    }

    onClickLeft() {
        if (this.clickLeftCallback !== null) {
            this.clickLeftCallback();
        }

        playSoundClip("c_btn");
        this.Close();
    }

    onClickRight() {
        if (this.clickRightCallback !== null) {
            this.clickRightCallback();
        }

        playSoundClip("c_btn");
        this.Close();
    }

    setEvents(buttonCount: number) {
        this.leftBtn.clickEvents = [];
        this.leftBtn.clickEvents.push(Event.MakeEventHandler(this.node, PopupStrings.MessagePopup, PopupStrings.onClickLeft));
        this.leftBtn.node.active = true;

        if (buttonCount === 1) {
            const posx = this.rightBtn.node.x - this.leftBtn.node.x;
            const pos = this.leftBtn.node.getPosition();
            pos.x += posx / 2;
            this.leftBtn.node.setPosition(pos);
        } else {
            this.rightBtn.clickEvents = [];
            this.rightBtn.clickEvents.push(Event.MakeEventHandler(this.node, PopupStrings.MessagePopup, PopupStrings.onClickRight));
            this.rightBtn.node.active = true;
        }
    }

    setButton(text: string, callback: any) {
        this.clickLeftCallback = callback;
        this.leftText.string = text;

        this.setEvents(1);
    }

    setButtons(leftText: string, leftCallback: any, rightText: string, rightCallback: any) {
        this.clickLeftCallback = leftCallback;
        this.leftText.string = leftText;

        this.clickRightCallback = rightCallback;
        this.rightText.string = rightText;

        this.setEvents(2);
    }
}
