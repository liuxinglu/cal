module lxl {
    export class Application extends ui.CLayer {
        public loading;
        public root:ui.CLayer;
        public shape:egret.Shape;
        private _logo:eui.Image;
        public preURL:string;
        public popLayer:ui.CLayer;

        public constructor() {
            super();
        }

        onActivity():void {
            super.onActivity();
            this.stage.scaleMode = egret.StageScaleMode.NO_SCALE;
            this.root = new ui.CLayer();
            this.popLayer = new ui.CLayer();
            this.popLayer.touchEnabled = false;
            this.shape = new egret.Shape();
            this._logo = new eui.Image();
            let assetAdapter = new AssetAdapter();
            egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
            egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

            this.addEventListener(egret.Event.RESIZE, this._resizeHandler, this);
            
            Res.addListener(CEvent.LOAD_CONFIG_COMPLETE, this._conConfigComplete, this);
            this.preURL = lxl.Tool.callJS("getURL");
            Res.loadConfig(this.preURL +"resource/default.res.json", this.preURL + "resource/");
        }

        private _conConfigComplete(event:RES.ResourceEvent):void {
            Res.removeListener(CEvent.LOAD_CONFIG_COMPLETE, this._conConfigComplete, this);
            
            //加在皮肤主题配置文件，可以手动覆盖这个文件，替换默认皮肤
            let theme = new eui.Theme(this.preURL + "resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
            Res.addListener(CEvent.LOAD_GROUP_COMPLETE, this._onResourceLoadComplete, this);
            Res.loadGroup("preload");
        }

        private _resizeHandler(event:egret.Event):void {
            this.shape.graphics.clear();
            this.shape.graphics.beginFill(0x996600);
            this.shape.graphics.drawRect(0, 0, this.width, this.height);
            this.shape.graphics.endFill();
        }

        private isThemeLoadEnd:boolean = false;

        private onThemeLoadComplete(e:eui.UIEvent):void {
            this.isThemeLoadEnd = true;
            this.createScene();
        }

        private isResourceLoadEnd:boolean = false;
        private _onResourceLoadComplete(e:CEvent):void {
            if("preload" == e.data.groupName) {
                this.loading = new LoadingUI();
                this.loading.width = this.width;
                this.loading.height = this.height;
                this.loading.createView();
                this.stage.addChild(this.loading);
                Res.addListener(CEvent.LOAD_PROGRESS, this._onResourceProgress, this);
                Res.loadGroup("main");
                
            } else {
                egret.Tween.get( this.loading)
                    .to( {alpha: 0}, 1000)
                    .call(this.resourceComplete, this);    
            }
        }

        private resourceComplete():void {
            this.stage.removeChild(this.loading);
            this.isResourceLoadEnd = true;
            
            this.createScene();
            Res.removeListener(CEvent.LOAD_GROUP_COMPLETE, this._onResourceLoadComplete, this);
        }

        private _onResourceProgress(e:CEvent):void {
            this.loading.setProgress(e.data.itemsLoaded, e.data.itemsTotal);
        }

        private createScene():void {
            if(this.isThemeLoadEnd && this.isResourceLoadEnd) {
                this.start(()=>{
                    this.root.delegate = this;
                    this.stage.addChild(this.root);
                    this.stage.addChild(this.popLayer);
                    this._logo.source = "img_logo_png";
                    this._logo.x = 20;
                    this._logo.y = 20;
                    this._logo.addEventListener(egret.TouchEvent.TOUCH_TAP, this._logoHandler, this);
                    this.stage.addChild(this._logo);
                    if(egret.Capabilities.runtimeType == "web") {
                        document.onkeydown = this.keyDownHandler;
                    }
                    this.shape.graphics.beginFill(0x996600);
                    this.shape.graphics.drawRect(0, 0, this.width, this.height);
                    this.shape.graphics.endFill();
                    this.shape.alpha = 0;
                    this.shape.visible = false;
                    this.stage.addChild(this.shape);
                    Toast.getInstance().init(this.popLayer, Res.getRes("img_tishi_kuang_png"));
                }, this);
                lxl.CDispatcher.getInstance().addListener(lxl.CEvent.EYE_CHANGE, this.changeModel, this);
                lxl.CDispatcher.getInstance().addListener(lxl.CEvent.SHOW_LOGO_CHANGE, this.changeLogo, this);
                
            }
        }

        private _logoHandler(e:egret.TouchEvent) {
            lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.SHOW_INFO));
        }

        private changeLogo(e:lxl.CEvent) {
            this._logo.visible = !this._logo.visible;
        }

        private keyDownHandler(ev:KeyboardEvent):any {
            switch (ev.keyCode) {
                case 32:
                    CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.SPACE, "space"));
                break;
                case 37:
                    CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.LEFT, "left"));
                break;
                case 38:
                    CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.UP, "up"));
                break;
                case 39:
                    CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.RIGHT, "right"));
                break;
                case 40:
                    CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.DOWN, "down"));
                break;
                case 96://0
                    CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.KEY_0, "0"));
                break;
                case 97://1
                    CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.KEY_1, "1"));
                break;
                case 98://2;
                    CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.KEY_2, "2"));
                break;
                case 99://3
                    CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.KEY_3, "3"));
                break;
                case 100://4
                    CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.KEY_4, "4"));
                break;
                case 101://5
                    CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.KEY_5, "5"));
                break;
                case 102://6
                    CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.KEY_6, "6"));
                break;
                case 103://7
                    CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.KEY_7, "7"));
                break;
                case 104://8
                    CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.KEY_8, "8"));
                break;
                case 105://9
                    CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.KEY_9, "9"));
                break;
                case 106://*
                    CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.KEY_MULTIPLY, "*"));
                break;
                case 107://+
                    CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.KEY_ADD, "+"));
                break;
                case 109://-
                    CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.KEY_SUBTRACT, "-"));
                break;
                case 110://.
                    CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.KEY__, "."));
                break;
                case 111:///
                    CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.KEY_DIVIDE, "/"));
                break;
                case 13://回车
                    CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.KEY_ENTER, "submit"));
                break;
                case 108://小键盘回车
                    CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.KEY_ENTER, "submit"));
                break;
                case 46://删除
                    CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.KEY_DEL, "clear"));
                break;
                case 48://0
                    CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.KEY_0, "0"));
                break;
                case 49://1
                    CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.KEY_1, "1"));
                break;
                case 50://2
                    CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.KEY_2, "2"));
                break;
                case 51://3
                    CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.KEY_3, "3"));
                break;
                case 52://4
                    CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.KEY_4, "4"));
                break;
                case 53://5
                    CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.KEY_5, "5"));
                break;
                case 54://6
                    CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.KEY_6, "6"));
                break;
                case 55://7
                    CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.KEY_7, "7"));
                break;
                case 56://8
                    CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.KEY_8, "8"));
                break;
                case 57://9
                    CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.KEY_9, "9"));
                break;
            }
        }

        private changeModel(e:CEvent):void {
            if(this.shape.visible == false) {
                this.shape.alpha = 0;
                this.shape.visible = true;
                egret.Tween.get(this.shape)
                    .to( { alpha: 0.35 }, 1000, egret.Ease.quadOut  ).call(()=>{
                        CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.PROTECTE_EYE, 1));
				}, this);
            } else {
                egret.Tween.get(this.shape)
                    .to( { alpha: 0 }, 1000, egret.Ease.quintIn  ).call( ()=>{
                        this.shape.visible = false;
                        CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.PROTECTE_EYE, 0));
				}, this);
            }
        }

        protected start(cb:any, ctx:any):void {

        }

        
    }
    
}