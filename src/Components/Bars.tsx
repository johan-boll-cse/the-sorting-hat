import React, {Component} from 'react';
import * as Utils from "../Utils/Utils";
import '../Stylesheets/Bars.css'

interface BarProps {
    vals: number[],
    barWidth: number
}

class Bars extends Component<BarProps, {}> {

    generateBars = () : any[] => {
        const bars = [];
        const width : number = Math.round(this.props.barWidth);
        let margin : number;
        if (width < 4) {
            margin = 0.5;
        } else {
            margin = width / 5.0;
        }
        for (let i = 0; i < this.props.vals.length; i++) {
            let rand = this.props.vals[i];
            bars.push(
                <div className="Bar" id={i + ""}
                     key={"bar" + i}
                     style={{height: rand * Utils.BAR_HEIGHT + "px",
                         width: width + "px",
                         minWidth: width + "px",
                         fontSize: width - margin + "px",
                         marginRight: margin + "px",
                         marginLeft: margin + "px",
                         marginBottom: 0,
                         marginTop: (Utils.MAX_VAL - rand) * (Utils.BAR_HEIGHT) + "px",
                         backgroundColor: Utils.INIT_COLOR}}>
                    {rand}
                </div>
            );
        }
        return bars;
    }

    render() {
        return (
            <div className="Bar-Container">
                {this.generateBars()}
            </div>
        )
    }
}

export default Bars;