import MessagePopup from "./MessagePopup";
import PopupManager from "./PopupManager";
import NotifyPopup from "./NotifyPopup";
import { PopupStrings } from "./PopupStrings";

export class PopupUtil {
    static async ShowNotify(message: string, autoCloseTime: number = 0): Promise<NotifyPopup> {
        const popup = (await PopupManager.Open(PopupStrings.NotifyPopup, message)) as NotifyPopup;
        if (!popup) {
            return;
        }

        let seq;
        if (autoCloseTime <= 0) {
            seq = cc.sequence(cc.fadeIn(0.1), null);
        } else {
            seq = cc.sequence(
                cc.fadeIn(0.1),
                cc.delayTime(autoCloseTime),
                cc.fadeOut(0.1),
                cc.callFunc(() => {
                    popup.Close();
                })
            );
        }
        popup.node.runAction(seq);

        return popup;
    }

    static async ShowMessageOneButton(message: string, buttonText: string, callback: any = null): Promise<MessagePopup> {
        const popup = (await PopupManager.Open(PopupStrings.MessagePopup, message)) as MessagePopup;
        if (!popup) {
            return;
        }
        popup.setButton(buttonText, callback);
        popup.node.runAction(cc.sequence(cc.fadeIn(0.1), null));

        return popup;
    }

    static async ShowMessageTwoButton(message: string, leftText: string, leftCallback: any = null, rightText: string, rightCallback: any = null): Promise<MessagePopup> {
        const popup = (await PopupManager.Open(PopupStrings.MessagePopup, message)) as MessagePopup;
        if (popup === null) {
            return;
        }

        popup.setButtons(leftText, leftCallback, rightText, rightCallback);
        popup.node.runAction(cc.sequence(cc.fadeIn(0.1), null));

        return popup;
    }
}
