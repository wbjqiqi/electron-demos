import * as React from 'react';
import ElectronController from '../bussiness/controller/electron-controller';
import {remote} from 'electron';

let styles = require('./tool-bar.scss');

const switchMaxWindow = () => {
    ElectronController.instance.switchMaxWindow();
};

const closeWindow = () => {
    ElectronController.instance.closeWindow();
};

const minimizeWindow = () => {
    ElectronController.instance.minimizeWindow();
}


export default class ToolBar extends React.Component {
    state = {
        isMaximize: remote.getCurrentWindow().isMaximized(),
    };

    componentDidMount(): void {
        remote.getCurrentWindow().on('maximize', () => {
            this.setState({
                ...this.state,
                isMaximize: true,
            });
        });
        remote.getCurrentWindow().on('unmaximize', () => {
            this.setState({
                ...this.state,
                isMaximize: false,
            });
        });
    }

    render() {
        return (
            <div>
                <div className={styles.window_bar}>
                    <div className={styles.left}>
                        hello, electron
                    </div>
                    <div className={styles.center}>
                        <div className={styles.drag_area}>&nbsp;</div>
                    </div>
                    <div className={styles.right}>
                        <div onClick={() => minimizeWindow()}><i className="fa fa-window-minimize"/></div>
                        <div onClick={() => switchMaxWindow()}>{this.state.isMaximize ? (
                            <i className="fa fa-window-restore" />
                        ) : (
                            <i className="fa fa-window-maximize" />
                        )}</div>
                        <div onClick={() => closeWindow()}><i className="fa fa-window-close"/></div>
                    </div>
                </div>
            </div>
        );
    }
}
