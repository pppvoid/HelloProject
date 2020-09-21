import Popup from "./Popup";
import { ccDelay } from "../misc/Delay";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Notice extends Popup {
    destPosition: cc.Vec2 = cc.Vec2.ZERO;
    startPostion: cc.Vec2; 

    onLoad() {
        this.startPostion = this.node.position;
        this.node.opacity = 0;

        this.Show();
    }

    async Show() {
        let tweenPos = cc.moveTo(0.5, this.destPosition);
        tweenPos.easing(cc.easeIn(2));
        let fadeIn = cc.fadeIn(0.5);
        this.node.runAction(cc.spawn(tweenPos, fadeIn));

        await ccDelay(this.node, 5500);

        tweenPos = cc.moveTo(0.5, this.startPostion);
        tweenPos.easing(cc.easeIn(2));
        let fadeOut = cc.fadeOut(0.5);
        this.node.runAction(cc.sequence(cc.spawn(tweenPos, fadeOut), cc.callFunc(() => this.Close())));
    }
}