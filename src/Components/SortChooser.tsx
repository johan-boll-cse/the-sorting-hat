import React, {Component} from 'react';

import '../Stylesheets/SortChooser.css';
import '../Stylesheets/General.css'

import * as Utils from '../Utils/Utils';

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
                                    <p className="Choose-Sort-Description">
                                        Selection sort is an in-place comparison sorting algorithm. It has an O(n<sup>2</sup>) time complexity, which makes it inefficient on large lists, and generally performs worse than the similar bubble sort. Selection sort is noted for its simplicity and has performance advantages over more complicated algorithms in certain situations, particularly where auxiliary memory is limited.
                                    </p>
                                </div>
                                <div className="Sort-Container">
                                <div className="Hover-Container">
                                    <div className="Glow"> </div>
                                    {buttons[1]}
                                </div>
                                <div className="Vert-Divide"/>
                                <p className="Choose-Sort-Description">
                                    Bubble sort
                                </p>
                            </div>
                        </div>
                        <div className="Flex-Row">
                            <div className="Sort-Container">
                                <div className="Hover-Container">
                                    <div className="Glow"> </div>
                                    {buttons[2]}
                                </div>
                                <div className="Vert-Divide"/>
                                <p className="Choose-Sort-Description">
                                    Merge Sort
                                </p>
                            </div>
                            <div className="Sort-Container">
                                <div className="Hover-Container">
                                    <div className="Glow"> </div>
                                    {buttons[3]}
                                </div>
                                <div className="Vert-Divide"/>
                                <p className="Choose-Sort-Description">
                                    Quick sort
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SortChooser;