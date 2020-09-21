import Popup from './Popup';

const { ccclass, property } = cc._decorator;

@ccclass
export default class NotifyPopup extends Popup {
    show(isShow: boolean) {
        this.node.active = isShow;
    }
}
