import React, {Component} from 'react';

import * as Utils from '../Utils/Utils';

import '../Stylesheets/SortProperties.css';
import '../Stylesheets/General.css';

interface PropertiesProps {
    curSort: number;
}

class SortProperties extends Component<PropertiesProps, {}> {
    render() {
        let difColor = Utils.DIFFICULTY_COLOR[this.props.curSort];
        let spaceColor = Utils.SPACE_COLOR[this.props.curSort];
        let stableColor = Utils.STABLE_COLOR[this.props.curSort];
        return (
            <div className="Sort-Properties-Container">
                <div className="Flex-Row-Full Margin0">
                    <p className="Right-Label">Difficulty</p>
                    <p className={"Left-Label " + difColor}>{Utils.PROPERTIES_DIFFICULTY[this.props.curSort]}</p>
                </div>
                <div className="Flex-Row-Full Margin0">
                    <p className="Right-Label">Runtime</p>
                    {Utils.PROPERTIES_RUNTIME[this.props.curSort]}
                </div>
                <div className="Flex-Row-Full Margin0">
                    <p className="Right-Label">Space</p>
                    <p className={"Left-Label " + spaceColor}>{Utils.PROPERTIES_SPACE[this.props.curSort]}</p>
                </div>
                <div className="Flex-Row-Full Margin0">
                    <p className="Right-Label">Stable</p>
                    <p className={"Left-Label " + stableColor}>{Utils.PROPERTIES_STABLE[this.props.curSort]}</p>
                </div>
            </div>
        )
    }
}

export default SortProperties;