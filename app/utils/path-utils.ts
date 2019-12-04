import * as fs from 'fs';

const path = require('path');

export default class PathUtils {
    public static startPath = path.join(__dirname, '..');

    public static userPath = process.env['USERPROFILE'];

    public static userDocPath: string;

    public static appdataPath = process.env['APPDATA'];

    public static resolvePath = (dirPath: string) => {
        return path.join(PathUtils.startPath, dirPath || '.');
    };

    public static resolveUserPath = (dirPath: string) => {
        return path.join(PathUtils.userPath, dirPath || '.');
    };

    public static resolveUserDocPath = (dirPath: string) => {
        return new Promise((resolve, reject) => {
            getUserDoc().then((docPath: string) => {
                PathUtils.userDocPath = docPath;
                resolve(PathUtils.userDocPath);
            });
        });
    };
}

const getUserDoc = () => {
    return new Promise((resolve, reject) => {
        const regedit = require('regedit');
        regedit.setExternalVBSLocation(PathUtils.resolvePath('vbs'));

        const key = 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\User Shell Folders';
        regedit.list(key, function(err: any, result: any) {
            if (err) {
                console.error('Window Reg:', err);
            } else {
                try {
                    resolve(result[key].values['Personal'].value);
                } catch (e) {
                    const docPath = path.join(PathUtils.userPath, 'Documents');
                    if (!fs.existsSync(docPath)) {
                        fs.mkdirSync(docPath);
                    }
                    resolve(docPath);
                }
            }
        });
    });
};
