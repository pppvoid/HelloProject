import { getSpriteFromBlob } from './BlobLoader';

export class ResourceUtil {
  // cocos creator 2.0에서 depracated 처리. 프로젝트에서 참조하는 곳도 없으므로 주석 처리.
  // static ClearTextureCache() {
  //   cc.textureCache.removeAllTextures();
  // }

  static SetSpriteFrame(sprite: cc.Sprite, path: string) {
    if (null === sprite) {
      console.warn('target sprite is undefined');
      return;
    }
    if (undefined === path) {
      console.warn('path is undefined');
      return;
    }
    if (path.length <= 0) {
      console.warn('need path. empty string', path);
      return;
    }

    cc.loader.loadRes(path, cc.SpriteFrame, (error, data: cc.SpriteFrame) => {
      if (!error) {
        sprite.spriteFrame = data;
      }
    });
  }

  public static async ImageChange(sprite: cc.Sprite, url: string) {
    if (null === sprite) {
      console.warn('target sprite is undefined');
      return;
    }
    if (undefined === url) {
      console.warn('url is undefined');
      return;
    }
    if (url.length <= 0) {
      console.warn('need url. empty string', url);
      return;
    }
    if (false === url.includes('.png')) {
      console.warn('image must be png', url);
      return;
    }

    let newSpriteFrame = await getSpriteFromBlob(url);
    if (sprite.spriteFrame) {
      newSpriteFrame.setOffset(sprite.spriteFrame.getOffset());
    }
    sprite.spriteFrame = newSpriteFrame;
  }
}
