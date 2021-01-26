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
        const width = this.props.barWidth;
        for (let i = 0; i < this.props.vals.length; i++) {
            let rand = this.props.vals[i];
            console.log(rand, ((Utils.MAX_VAL - rand) * (Utils.BAR_HEIGHT) + "px"));
            bars.push(
                <div className="Bar" id={i + ""}
                     key={"bar" + i}
                     style={{height: rand * Utils.BAR_HEIGHT + "px",
                         width: width + "px",
                         fontSize: width - width / 5 + "px",
                         marginRight: width / 5 + "px",
                         marginLeft: width / 5 + "px",
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