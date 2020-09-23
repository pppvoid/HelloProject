// Inspect Sound file format
// https://developer.mozilla.org/en-US/docs/Web/HTML/Supported_media_formats#Browser_compatibility
// [mp3], [AAC/mp4](AAC is only supported in the MP4 container) is all support
// [Vorbis in Ogg] not support safari/IE
// [Vorbis in WebM] is support but IE is not
// TODO: 단독 모듈로 export

export enum AudioState {
    Off = "off", // Mute
    On = "on",
}

export enum MainVolumeState {
    Mute = 0,
    Max = 1,
}

export const soundPath = "audio/";

const mainVolume: string = "mainVolume";
const bgmVolume: string = "bgmVolume";
const audio: string = "audio";

const defaultBgmVolume = 0.5;

const playingList = new Set<number>();

let bgmClip: cc.AudioClip = null;
let bgmId: number = 0;
let bgmName: string = "";

function isMute(): boolean {
    let volume = cc.sys.localStorage.getItem(mainVolume);
    if (!volume) {
        volume = cc.sys.localStorage.setItem(mainVolume, defaultBgmVolume);
    }
    const isOff = AudioState.Off === cc.sys.localStorage.getItem(audio);
    if (volume <= 0 || isOff) {
        return true;
    }
    return false;
}

export function playSoundClip(clipName: string) {
    if (isMute()) {
        return;
    }

    cc.loader.loadRes(soundPath + clipName, cc.AudioClip, (err, clip) => {
        playSound(clip);
    });
}

export function playSoundFromClip(clip: cc.AudioClip): number {
    if (isMute()) {
        return -1;
    }
    return playSound(clip);
}

function playSound(clip: cc.AudioClip): number {
    const id = cc.audioEngine.play(clip, false, getVolume());
    playingList.add(id);
    cc.audioEngine.setFinishCallback(id, () => {
        playingList.delete(id);
    });
    return id;
}

export function playBgm(clipName: string = "") {
    if (clipName) {
        bgmName = clipName;
    }

    if (isMute()) {
        return;
    }

    if (bgmClip) {
        bgmId = cc.audioEngine.playMusic(bgmClip, true);
        return;
    }

    if (!bgmName) {
        cc.log("bgm name undefined");
        return;
    }

    cc.loader.loadRes(soundPath + bgmName, cc.AudioClip, (err, clip) => {
        bgmId = cc.audioEngine.playMusic(clip, true);
        bgmClip = clip;
        setVolumeBgm(defaultBgmVolume);
    });
}

export function stopBgm() {
    cc.audioEngine.stopMusic();
    bgmClip = null;
    bgmId = 0;
    bgmName = "";
}

export function audioActive(active: AudioState) {
    cc.sys.localStorage.setItem(audio, active);
    if (active === AudioState.Off) {
        cc.audioEngine.stopAll();
    }
}

export function setVolumeBgm(volume: number) {
    cc.sys.localStorage.setItem(bgmVolume, volume);
    cc.audioEngine.setVolume(bgmId, volume);
}

export function setVolume(volume: number) {
    cc.sys.localStorage.setItem(mainVolume, volume);
    playingList.forEach((id) => {
        cc.audioEngine.setVolume(id, volume);
    });
}

export function getVolume() {
    const volume = cc.sys.localStorage.getItem(mainVolume);
    return volume;
}

/**
 * Preload sound resource directory!
 * 사운드 디렉토리를 미리 로드 해서 재생시 에 끊김 현상을 없앰
 * @param targetDir Sound path를 제외한 하위 디렉토리 Assets/resources/Sound/Room 일 경우 Room
 * @example
 * ```ts
 * PreloadDir('Room'); // Assets/resources/Sound/Room
 * PreloadDir('Lobby'); // Assets/resource/Sound/Lobby
 * ```
 */
export function preloadDir(targetDir: string) {
    cc.loader.loadResDir(soundPath + targetDir, cc.AudioClip, (err, clips: cc.AudioClip[]) => {
        cc.log("preload sound list");
        clips.forEach((clip) => {
            cc.log(clip.name);
        });
        cc.log("completed preload sound dir", targetDir);
    });
}

/**
 * Preload sound resource file!
 * 사운드 파일을 미리 로드 해서 재생시 에 끊김 현상을 없앰
 * @param targetDir Sound path를 제외한 하위 파일 패스 Assets/resources/Sound/Room/click 일 경우 Room/click
 * @example
 * ```ts
 * PreloadFile('Room/click'); // Assets/resources/Sound/Room/click
 * PreloadFile('click'); // Assets/resource/Sound/click
 * ```
 */
export function preloadFile(targetFile: string) {
    cc.loader.loadRes(soundPath + targetFile, cc.AudioClip, (err, clip: cc.AudioClip) => {
        cc.log("completed preload sound file", clip.name);
    });
}

/**
 * Unload sound resource directory!
 * 메모리 및 캐시에서 제거함
 * @param targetDir Sound path를 제외한 하위 디렉토리 Assets/resources/Sound/Room 일 경우 Room
 * @example
 * ```ts
 * UnloadDir('Room'); // Assets/resources/Sound/Room
 * UnloadDir('Lobby'); // Assets/resource/Sound/Lobby
 * ```
 */
export function unloadDir(targetDir: string) {
    // cc.loader.releaseResDir(soundPath + targetDir);
    cc.loader.releaseResDir();
    cc.log("completed release sound dir", targetDir);
}

/**
 * Unload sound resource file!
 * 메모리 및 캐시에서 제거함
 * @param targetDir Sound path를 제외한 하위 파일 Assets/resources/Sound/Room/click 일 경우 Room/click
 * @example
 * ```ts
 * UnloadFile('Room/click'); // Assets/resources/Sound/Room/click
 * UnloadFile('click'); // Assets/resource/Sound/click
 * ```
 */
export function unloadFile(targetFile: string) {
    cc.loader.releaseRes(soundPath + targetFile);
    cc.log("completed release sound file", targetFile);
}
