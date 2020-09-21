import { ResourceUtil } from './Resource';

const { ccclass, property } = cc._decorator;

@ccclass('AtlasNode')
export class AtlasNode {
    @property()
    public key = '';

    @property(cc.SpriteAtlas)
    public atlas: cc.SpriteAtlas = null;
}

@ccclass
export default class AtlasManager extends cc.Component {
    public static instance: AtlasManager = null;

    public static setSpriteFrameIndex(sprite: cc.Sprite, index: number, name: string, editorPath: string) {
        if (CC_BUILD) {
            const frame = AtlasManager.instance.getSpriteFrameIndex(index, name);
            if (frame) {
                sprite.spriteFrame = frame;
            } else {
                cc.log('Error SpriteFrameIndex Name : ', name);
            }
        } else {
            ResourceUtil.SetSpriteFrame(sprite, editorPath + name);
        }
    }

    public static setSpriteFrameKey(sprite: cc.Sprite, key: string, name: string, editorPath: string) {
        if (CC_BUILD) {
            const frame = AtlasManager.instance.getSpriteFrameKey(key, name);
            if (frame) {
                sprite.spriteFrame = frame;
            } else {
                cc.log('Error SpriteFrameKey Name : ', name);
            }
        } else {
            ResourceUtil.SetSpriteFrame(sprite, editorPath + name);
        }
    }

    @property(AtlasNode)
    public list: AtlasNode[] = new Array<AtlasNode>();

    public projectResPath = 'blackjack/';

    protected onLoad() {
        AtlasManager.instance = this;
    }

    public getSpriteFrameIndex(index: number, name: string): cc.SpriteFrame {
        const list = AtlasManager.instance.list;
        if (index >= list.length) {
            cc.log('Error Atlas index : ', index);
            return null;
        }

        return list[index].atlas.getSpriteFrame(name);
    }

    public getSpriteFrameKey(key: string, name: string): cc.SpriteFrame {
        const node = AtlasManager.instance.list.find(e => e.key === key);
        if (!node) {
            cc.log('Error Atlas Key : ', key);
            return null;
        }

        return node.atlas.getSpriteFrame(name);
    }
}
