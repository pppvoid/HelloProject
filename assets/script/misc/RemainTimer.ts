const { ccclass, property } = cc._decorator;

@ccclass
export default class RemainTimer extends cc.Component {
    remainTime: number;
    endTime: number;

    onEnd: () => void;
    infinity: boolean;

    _currentTime: number;
    get currentTime(): number {
        return this._currentTime;
    }
    set currentTime(value: number) {
        this._currentTime = value;
    }

    onLoad() {
        this.clear();
    }

    clear() {
        this.enabled = false;
        this.remainTime = 0;
        this.endTime = 0;
        this.onEnd = null;
        this.infinity = false;
        this.currentTime = 0;
    }

    update() {
        let remain = Math.floor(this.endTime - Date.now());
        if (remain <= 0) {
            if (this.onEnd) {
                this.onEnd();
            }

            if (this.infinity) {
                this.endTime = Date.now() + this.remainTime;
            } else {
                this.destroyTimer();
            }
        }

        this.currentTime = remain;
    }

    startTimer(remainTime: number, onEnd: () => void, infinity: boolean = false) {
        this.enabled = true;

        this.remainTime = remainTime;
        this.endTime = Date.now() + remainTime;

        this.onEnd = onEnd;
        this.infinity = infinity;
    }

    destroyTimer() {
        this.clear();
    }

    resetTimer() {
        this.endTime = Date.now() + this.remainTime;
    }

    isActive(): boolean {
        return this.enabled;
    }
}

