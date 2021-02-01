import React, {Component} from 'react';

import '../Stylesheets/SortChooser.css';
import '../Stylesheets/General.css'

import * as Utils from '../Utils/Utils';
import SortProperties from "./SortProperties";

interface ChooserProps {
    onSortClick(sort : number): void;
}

class SortChooser extends Component<ChooserProps, {}> {

    render() {
        let buttons : any[] = [];
        const houses : string[] = ["Hufflepuff", "Ravenclaw", "Gryffindor", "Slytherin"];
        for (let i = 0; i < Utils.SORTS.length; i++) {
            buttons.push(
                <button className={"House-Button " + houses[i]} onClick={() => {this.props.onSortClick(i);}}> {Utils.SORTS[i] + " Sort"} </button>
            );
        }
        return (
            <div className="Chooser-Wrapper">
                <div className="Flex-Row-Center">
                    <div className="Sort-Choose-Container">
                        <p className="Choose-Title">Choose a sorting algorithm</p>
                            <div className="Flex-Row">
                                <div className="Sort-Container">
                                    <div className="Hover-Container">
                                        <div className="Glow"/>
                                        {buttons[0]}
                                    </div>
                                    <div className="Vert-Divide"/>
                                    <SortProperties curSort={0}/>
                                </div>
                                <div className="Sort-Container">
                                <div className="Hover-Container">
                                    <div className="Glow"> </div>
                                    {buttons[1]}
                                </div>
                                <div className="Vert-Divide"/>
                                <SortProperties curSort={1}/>
                            </div>
                        </div>
                        <div className="Flex-Row">
                            <div className="Sort-Container">
                                <div className="Hover-Container">
                                    <div className="Glow"> </div>
                                    {buttons[2]}
                                </div>
                                <div className="Vert-Divide"/>
                                <SortProperties curSort={2}/>
                            </div>
                            <div className="Sort-Container">
                                <div className="Hover-Container">
                                    <div className="Glow"> </div>
                                    {buttons[3]}
                                </div>
                                <div className="Vert-Divide"/>
                                <SortProperties curSort={3}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SortChooser;