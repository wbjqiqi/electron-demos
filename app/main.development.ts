import {app, BrowserWindow} from 'electron';
import createWindow from './electron/init/init-window';
import createTray from './electron/init/tray';
import Tray = Electron.Tray;

if (process.env.NODE_ENV === 'production') {
    const sourceMapSupport = require('source-map-support'); // eslint-disable-line
    sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development') {
    require('electron-debug')(); // eslint-disable-line global-require
    const path = require('path'); // eslint-disable-line
    const p = path.join(__dirname, '..', 'app', 'node_modules'); // eslint-disable-line
    require('module').globalPaths.push(p); // eslint-disable-line
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

const installExtensions = () => {
    if (process.env.NODE_ENV === 'development') {
        const installer = require('electron-devtools-installer'); // eslint-disable-line global-require

        const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];
        const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
        return Promise.all(extensions.map((name) => installer.default(installer[name], forceDownload)));
    }

    return Promise.resolve([]);
};

export default class MainProcess {
    public static mainWindow: BrowserWindow;
    public static tray: Tray | any;

    private static _instance: MainProcess;

    public static get instance() {
        if (!this._instance) {
            this._instance = new MainProcess();
        }
        return this._instance;
    }

    public async initialize() {
        app.on('ready', () => {
            installExtensions().then(async () => {
                MainProcess.mainWindow = await createWindow();
                let mainWindow = MainProcess.mainWindow;
                MainProcess.tray = createTray({
                    onClick: () => {
                        if (mainWindow) {
                            mainWindow.show();
                        }
                    },
                    onQuit: () => {
                        app.quit();
                    },
                });
            });
        });

        app.on('window-all-closed', () => {
            MainProcess.tray = undefined;

            if (process.platform !== 'darwin') {
                app.quit();
            }
        });
    }
}

MainProcess.instance.initialize();
