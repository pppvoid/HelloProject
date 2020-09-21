export namespace Strings {
    export namespace Input {
        export let mousedown: string = 'mousedown';
        export let mouseup: string = 'mouseup';
        export let mouseenter: string = 'mouseenter';
        export let mouseleave: string = 'mouseleave';
        export let mousemove: string = 'mousemove';
        export let mousewheel: string = 'mousewheel';
        export let touchstart: string = 'touchstart';
        export let touchend: string = 'touchend';
        export let touchmove: string = 'touchmove';
        export let touchcancel: string = 'touchcancel';
    }
  
    export namespace PubSub {
        export let initPosition: string = 'initPosition';
        export let gameStart: string = 'gameStart';
        export let gamePause: string = 'gamePause';
        export let changeSpeed: string = 'changeSpeed';
        export let changeSignature: string = 'changeSignature';
      
        export let damage: string = 'damage';
        export let superTime: string = 'superTime';
  
        export let jump: string = 'jump';

        export let destroyMap: string = 'destroyMap';

        export let stageSnapshot: string = 'stageSnapshot'; 
    }
  
    export namespace Emit {
        export let onPause: string = 'onPause';
        export let onResume: string = 'onResume';
        export let onQuitGame: string = 'onQuitGame';
        

        export let doMethod: string = 'do';
        export let showSignature: string = 'showSignature';
        export let updateTravelDistToMeter = 'updateTravelDistToMeter';
        export let updateCoin: string = 'updateCoin';
    }
  
    export namespace Dispatch {
        export let dieRunner: string = 'dieRunner';

        export let preloadMap: string = 'preloadMap';
        export let preloadNextMap: string = 'preloadNextMap';
        export let loadCompleteMap: string = 'loadCompleteMap';
        //export let curMapPosition: string = 'curMapPosition';
        //export let preloadNextType: string = 'preloadNextType';

        export let getCoin: string = 'getCoin';
        export let getSignature: string = 'getSignature';
        export let changeSpeedType: string = 'changeSpeedType';
        export let cameraShake: string = 'cameraShake';
        //export let gameEndMapPosition: string = 'gameEndMapPosition';
        export let stageMapProcessContinue: string = 'stageMapDisposeContinue';
    }

    export namespace Event {
        export let onClickPause: string = 'onClickPause';
        export let onClickClose: string = 'onClickClose';
        export let onClickPutMoney: string = 'onClickPutMoney';
        export let onClickAd: string = 'onClickAd';
        export let onClickGo: string = 'onClickGo';
    }

    export namespace EventToC {
        export let onContinueClose: string = 'onContinueClose';
        export let onContinuePutMoney: string = 'onContinuePutMoney';
        export let onCompleteShowAd: string = 'onCompleteShowAd';
        export let onGameOver: string = 'onGameOver';
    }

    export namespace UI {
        export let StageUI: string = 'StageUI';
        export let BlackBg: string = 'BlackBg';
        export let PopupBg: string = 'PopupBg';
        export namespace Popup {
            export let ContinuePopup: string = 'ContinuePopup';
            export let GameOverPopup: string = 'GameOverPopup';
        }    
    }
  
    export namespace Ani {
        export let cameraShake: string = 'cameraShake';
    }
  
    export namespace Node {
        export let Signature: string = 'Signature';
    }
  
    export namespace Com {
        export let Effector: string = 'Effector';
        export let Continue: string = 'Continue';
        export let GameOver: string = 'GameOver';
    }
  
    export namespace Path {
        export let MapPath: string = 'prefabs/map/';
        export let signPath: string = 'image/signature/';
        export let effectPath: string = 'effect/prefabs/';
    }
  
    export namespace Storage {
        export let getSignCount: string = 'getSignCount';
        export let coin: string = 'coin';
        export let maxDistance: string = 'maxDistance';
    }

    export namespace Sound {
        export let btn: string = 'c_btn';
        export let bgm: string = 'bgm/bgm';
        export let getCoin: string = 'get_coin';
        export let getSignature: string = 'get_signature';
        export let hit: string = 'hit';
        export let death: string = 'death';
        export let speeedUp: string = 'speed_up';
        export let boost: string = 'boost';
        export let nerf: string = 'nerf';
        export let getSuper: string = 'get_super';
        export let landing: string = 'landing';
    }
  }
  