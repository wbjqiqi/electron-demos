import {remote} from 'electron';

export default class ElectronController {
    private static _instance: ElectronController;

    public static get instance() {
        if (!this._instance) {
            this._instance = new ElectronController();
        }
        return this._instance;
    }

    // remote
    public minimizeWindow() {
        remote.getCurrentWindow().minimize();
    }

    public hideWindow() {
        remote.getCurrentWindow().hide();
    }

    public switchMaxWindow() {
        const currentWindow = remote.getCurrentWindow();
        if (currentWindow.isMaximized()) {
            currentWindow.restore();
        } else {
            currentWindow.maximize();
        }
    }

    public closeWindow() {
        const currentWindow = remote.getCurrentWindow();
        currentWindow.close();
    }
}
