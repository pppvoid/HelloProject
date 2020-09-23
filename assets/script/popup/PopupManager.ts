import Popup from "./Popup";
import { PopupStrings } from "./PopupStrings";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PopupManager extends cc.Component {
    private popups = new Array<Popup>();
    public static manager: PopupManager;
    async onLoad() {
        PopupManager.manager = this;
        await this.preload();
    }

    async preload() {}

    public static async Open(popupName: string, labelString: string): Promise<Popup> {
        return await this.manager.loadAsync(popupName, labelString);
    }

    public static AddOpen<T extends Popup>(popupType: { new (): T }): T {
        const newNode = new cc.Node();
        const touchBlockChild = new cc.Node();
        touchBlockChild.width = cc.Canvas.instance.designResolution.width;
        touchBlockChild.height = cc.Canvas.instance.designResolution.height;
        touchBlockChild.addComponent(cc.BlockInputEvents);
        newNode.addChild(touchBlockChild);

        this.manager.node.addChild(newNode);
        const popup = newNode.addComponent(popupType);
        popup.Open();
        PopupManager.manager.popups.push(popup);
        return popup;
    }

    public static CloseTop(): boolean {
        if (0 >= this.manager.popups.length) {
            return false;
        }

        const last = this.manager.popups.pop();
        last.Close();
        return true;
    }

    public static Clear() {
        this.manager.popups.forEach((p) => {
            p.Close();
        });
        this.manager.popups = new Array<Popup>();
    }

    public static Remove(find: Popup) {
        const index = this.manager.popups.findIndex((p) => p === find);
        if (-1 === index) {
            cc.warn("can not find and remove ", find.popupName);
            return;
        }
        this.manager.popups.splice(index, 1);
    }

    public static GetPopup(popupName: string): Popup {
        return this.manager.popups.find((e) => e.popupName === popupName);
    }

    // static isExist(key: string): boolean {
    //     let result = this.manager.popups.find(e => e.keyText.length > 0 && e.keyText === key);
    //     return result ? true : false;
    // }

    loadAsync(popupName: string, key: string): Promise<Popup> {
        return new Promise((resolve) => {
            // if (key.length > 0) {
            //     if (PopupManager.isExist(key)) {
            //         return resolve(null);
            //     }
            // }

            cc.loader.loadRes(PopupStrings.prefabsPath + popupName, (err, prefab) => {
                if (err) {
                    cc.error("Failed to load popup: " + popupName);
                    cc.error(err);
                    resolve(null);
                }
                const popup = cc.instantiate<cc.Node>(prefab);
                this.node.addChild(popup);
                const compo = popup.getComponent(Popup);

                // key 값 없을경우 text 셋팅않하도록 처리
                if (key.length > 0) {
                    compo.SetLabel(key);
                }
                compo.Open();

                PopupManager.manager.popups.push(compo);
                resolve(compo);
            });
        });
    }
}
