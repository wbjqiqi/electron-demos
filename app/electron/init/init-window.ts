import {app, BrowserWindow, Menu} from 'electron';

let appPath = __dirname;

if (process.env.NODE_ENV === 'production') {
    appPath = __dirname;
} else {
    console.log('dirname', __dirname);
}

const createWindow = async () => {
    let mainWindow: any = new BrowserWindow({
        minWidth: 330,
        minHeight: 750,
        maxWidth: 660,
        title: app.getName(),
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true,
        },
        frame: false,
        fullscreenable: false,
        skipTaskbar: true,
        show: false,
        center: true,
    });

    mainWindow.loadURL(`file://${appPath}/app.html`);

    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.show();
        mainWindow.focus();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
        app.quit();
    });

    if (process.env.NODE_ENV === 'development') {
        mainWindow.openDevTools();
        mainWindow.webContents.on('context-menu', (e: any, props: any) => {
            const {x, y} = props;

            Menu.buildFromTemplate([
                {
                    label: 'Inspect element',
                    click() {
                        mainWindow.inspectElement(x, y);
                    },
                },
            ]).popup(mainWindow);
        });
    }

    return mainWindow;
};

export default createWindow;
