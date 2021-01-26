import React, {Component} from 'react';

import * as Utils from '../Utils/Utils';

import '../Stylesheets/ColorKey.css';

interface KeyProps {
    curSort: number;
}

class ColorKey extends Component<KeyProps, {}> {
    render() {
        let hilight = Utils.HILIGHTS[this.props.curSort];
        let hilightKey : any;
        if (hilight.length > 0) {
            hilightKey =
            <div className="Key-Pairs">
                <p className="Key-Label"> {hilight} </p>
                <div className="Key-Rect" style={{backgroundColor: Utils.HI_COLOR}}/>
            </div>
        } else {
            hilightKey = <div/>
        }
        return (
            <div className="Key-Container">
                <p className="Key-Title"> Color Key </p>
                <div className="Key-Pairs">
                    <p className="Key-Label"> Unsorted </p>
                    <div className="Key-Rect" style={{backgroundColor: Utils.INIT_COLOR}}/>
                </div>
                <div className="Key-Pairs">
                    <p className="Key-Label"> Sorted </p>
                    <div className="Key-Rect" style={{backgroundColor: Utils.SORTED_COLOR}}/>
                </div>
                <div className="Key-Pairs">
                    <p className="Key-Label"> Current </p>
                    <div className="Key-Rect" style={{backgroundColor: Utils.CUR_COLOR}}/>
                </div>
                <div className="Key-Pairs">
                    <p className="Key-Label"> Swap </p>
                    <div className="Key-Rect" style={{backgroundColor: Utils.SWAP_COLOR}}/>
                </div>
                {hilightKey}
            </div>
        )
    }
}

export default ColorKey;