import PopupManager from './PopupManager';
import { PopupStrings } from './PopupStrings';

const { ccclass, property } = cc._decorator;
  
@ccclass
export default abstract class Popup extends cc.Component {
    onClose: () => void;
    popupName = PopupStrings.Popup;

    private label: cc.Label;
    get Label(): cc.Label {
        return (this.label || (this.label = this.node.getChildByName(PopupStrings.Background).getChildByName(PopupStrings.Context).getComponent<cc.Label>(cc.Label)));
    }

    Open() {}
    Close() {
        console.log('Close Popup type is ' + this.popupName);
        if (this.onClose) {
            this.onClose();
        }
        PopupManager.Remove(this);
        this.node.destroy();
    }

    SetEvent(event: string, callback: () => void) {
        const propertyNames = Object.getOwnPropertyNames(this);
        if (propertyNames.find(propertyName => event === propertyName)) {
            this[event] = callback;
        }
    }

    SetLabel(message: string): Popup {
        this.Label.string = message;
        return this;
    }
}
