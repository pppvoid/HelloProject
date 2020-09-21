export function applySpriteFromBlob(url: string, sprite: cc.Sprite) {
  return new Promise(resolve => {
    let x = cc.loader.getXMLHttpRequest();
    x.open('GET', url);
    x.responseType = 'blob';
    x.onloadend = () => {
      let blob = new Blob([x.response], { type: 'image/png' });
      console.log(blob, blob.type, x.response, typeof x.response);

      imageFromBlob(blob).then(img => {
        if (!sprite || !sprite.node) {
          return resolve();
        }

        let tex = new cc.Texture2D();
        tex.initWithElement(img);
        tex.handleLoadedTexture();

        let frame = new cc.SpriteFrame(tex);
        sprite.spriteFrame = frame;
        resolve();
      });
    };
    x.onerror = () => {
      console.warn('onerror() - XMLHttpRequset url:', url);
    };
    x.send();
  });
}

export function getSpriteFromBlob(url: string): Promise<cc.SpriteFrame> {
  return new Promise(resolve => {
    let x = cc.loader.getXMLHttpRequest();
    x.open('GET', url);
    x.responseType = 'blob';
    x.onload = () => {
      let blob = new Blob([x.response], { type: 'image/png' });
      console.log(blob, blob.type, x.response, typeof x.response);

      imageFromBlob(blob).then(img => {
        let tex = new cc.Texture2D();
        tex.initWithElement(img);
        tex.handleLoadedTexture();

        resolve(new cc.SpriteFrame(tex));
      });
    };
    x.onerror = () => {
      console.warn('onerror() - XMLHttpRequset url:', url);
    };
    x.send();
  });
}

function imageFromBlob(blob: Blob): Promise<HTMLImageElement> {
  return new Promise(resolve => {
    let img = new Image();
    img.onload = () => {
      resolve(img);
      URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(blob);
  });
}
