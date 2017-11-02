module lxl {

    export class LoadingUI extends egret.Sprite {

        public constructor() {
            super();
        }

        private textField: egret.TextField;

        createView(): void {
            this.textField = new egret.TextField();
            let bitmap:egret.Bitmap = lxl.Tool.createBitmapByName("logo_png");
            let tw = this.height * 1.775
            let h = this.height * (bitmap.height / 1080);
            let w = tw * (bitmap.width / 1920);
            bitmap.width = w;
            bitmap.height = h;
            bitmap.anchorOffsetX = bitmap.width / 2;
            bitmap.anchorOffsetY = bitmap.height / 2;
            bitmap.x = this.width / 2;
            bitmap.y = this.height / 2;
            this.textField.textColor = 0x000000;
            this.textField.size = 20;
            this.textField.width = w;
            this.textField.height = 100;
            this.textField.anchorOffsetX = this.textField.width / 2;
            this.textField.anchorOffsetY = this.textField.height / 2;
            this.textField.y = this.height / 2 + 120;
            this.textField.x = this.width / 2;
            this.textField.textAlign = "center";
            this.addChild(this.textField);
            this.addChild(bitmap);
        }

        public setProgress(current: number, total: number): void {
            // this.textField.text = `Loading...${current}/${total}`;
        }
    }
}