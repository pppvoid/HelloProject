export class ColorUtil_NoCC {
    static componentToHex(c: number): string {
        if (!Number.isInteger(c)) {
            console.warn("not integer, it's " + c);
            return "not integer";
        }
        if (c > 255) {
            console.warn("over 255 number, number is " + c);
            return "over 255";
        }

        const hex = c.toString(16);
        if (hex.length === 1) {
            return "0" + hex;
        } else if (hex.length > 2) {
            console.warn("over FF");
            return "over FF";
        }

        return hex;
    }

    static rgbToHex(r: number, g: number, b: number): string {
        return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    }

    static hexToRgb(hex: string): { r: number; g: number; b: number } {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? {
                  r: parseInt(result[1], 16),
                  g: parseInt(result[2], 16),
                  b: parseInt(result[3], 16),
              }
            : null;
    }
}

export class ColorUtil extends ColorUtil_NoCC {
    static rgbToColor(rgb: { r: number; g: number; b: number }): cc.Color {
        return new cc.Color(rgb.r, rgb.g, rgb.b, 255);
    }

    static hexToColor(hex: string): cc.Color {
        const rgb = this.hexToRgb(hex);
        if (null === rgb) {
            return cc.Color.WHITE;
        }
        return this.rgbToColor(rgb);
    }
}
