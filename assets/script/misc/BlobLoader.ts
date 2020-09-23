export function applySpriteFromBlob(url: string, sprite: cc.Sprite) {
    return new Promise((resolve) => {
        const x = cc.loader.getXMLHttpRequest();
        x.open("GET", url);
        x.responseType = "blob";
        x.onloadend = () => {
            const blob = new Blob([x.response], { type: "image/png" });
            // tslint:disable-next-line: no-console
            console.log(blob, blob.type, x.response, typeof x.response);

            imageFromBlob(blob).then((img) => {
                if (!sprite || !sprite.node) {
                    return resolve();
                }

                const tex = new cc.Texture2D();
                tex.initWithElement(img);
                tex.handleLoadedTexture();

                const frame = new cc.SpriteFrame(tex);
                sprite.spriteFrame = frame;
                resolve();
            });
        };
        x.onerror = () => {
            // tslint:disable-next-line: no-console
            console.warn("onerror() - XMLHttpRequset url:", url);
        };
        x.send();
    });
}

export function getSpriteFromBlob(url: string): Promise<cc.SpriteFrame> {
    return new Promise((resolve) => {
        const x = cc.loader.getXMLHttpRequest();
        x.open("GET", url);
        x.responseType = "blob";
        x.onload = () => {
            const blob = new Blob([x.response], { type: "image/png" });
            console.log(blob, blob.type, x.response, typeof x.response);

            imageFromBlob(blob).then((img) => {
                const tex = new cc.Texture2D();
                tex.initWithElement(img);
                tex.handleLoadedTexture();

                resolve(new cc.SpriteFrame(tex));
            });
        };
        x.onerror = () => {
            console.warn("onerror() - XMLHttpRequset url:", url);
        };
        x.send();
    });
}

function imageFromBlob(blob: Blob): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            resolve(img);
            URL.revokeObjectURL(img.src);
        };
        img.src = URL.createObjectURL(blob);
    });
}
