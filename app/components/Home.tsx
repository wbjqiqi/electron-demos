import * as React from 'react';
import { Link } from 'react-router-dom';
import ToolBar from './tool-bar';

let styles = require('./Home.scss');

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <ToolBar/>
                <div className={styles.container} data-tid="container">
                    <h2>Home</h2>
                    <Link to="/counter">to Counter</Link>
                </div>
            </div>
        );
    }
}
