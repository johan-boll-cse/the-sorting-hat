import React, {Component} from 'react';
import Slider from 'react-input-slider';


import '../Stylesheets/SortDisplay.css';
import '../Stylesheets/General.css';

import * as Utils from '../Utils/Utils';
import * as SortFunctions from '../Utils/SortFunctions';
import ColorKey from "./ColorKey";
import Bars from "./Bars";

import sortingHatLeft from '../Pictures/SortingHatLeft.png';

interface DisplayProps {
    curSort: number;
    onBackClick():void;
}

interface DisplayState {
    vals: number[],
    numBars: number,
    speedMS: number,
    sorting: boolean
}

const timeouts : any[] = [];

class SortDisplay extends Component<DisplayProps, DisplayState> {

    constructor(props: DisplayProps) {
        super(props);
        this.state = {
            vals: this.generateVals(40),
            numBars: 40,
            speedMS: 10,
            sorting: false
        }
    }

    handleBackClick = () => {
        this.clearTimeouts();
        this.props.onBackClick();
    }

    handleNumBarSlider = (x : number) => {
        if (x / 10 === this.state.numBars / 10) {
            return;
        }
        this.setState({
            vals: this.generateVals(x),
            numBars: x
        })
    }

    clearTimeouts = () => {
        this.setState({
            sorting: false
        })
        for (let i = 0; i < timeouts.length; i++) {
            clearTimeout(timeouts[i]);
        }
    }

    getButtonText = () : string => {
        if (this.state.sorting) {
            return "Reset";
        } else {
            return "Generate New Array";
        }
    }

    getBarWidth = () : number => {
        return 400 / this.state.numBars;
    }

    generateVals = (numBars : number) : number[] => {
        this.clearTimeouts();
        const vals = [];
        for (let i = 1; i < numBars + 1; i++) {
            let rand = Math.round((Math.random() * (Utils.MAX_VAL - Utils.MIN_VAL)) + Utils.MIN_VAL);
            vals.push(rand);
        }
        this.resetBarColor();
        return vals;
    }

    resetBarColor = () => {
        const docBars : any = document.getElementsByClassName('Bar');
        for (let i = 0; i < docBars.length; i++) {
            docBars[i].style.backgroundColor = Utils.INIT_COLOR;
        }
    }

    sortArray = () : void => {
        let animations : any[] = [];
        let arr = this.state.vals.slice();
        if (this.props.curSort === 0) {
            animations = SortFunctions.selectionSort(arr);
        }
        this.clearTimeouts();
        this.resetBarColor();
        if (animations.length === 0) {
            console.log("No Animations");
            arr.sort();
        } else {
            this.animateSort(arr, animations);
        }
        this.setState({
            vals: arr,
            sorting: true
        })
    }

    animateSort = (arr : number[], animations : any[]) : void => {
        const docBars = document.getElementsByClassName('Bar');
        let swapTime = 0;
        const speed = this.state.speedMS;
        for (let i = 0; i < animations.length; i++) {
            const curAnim = animations[i];
            const cur = curAnim['cur'];
            const swap = curAnim['swap'];
            const highlight = curAnim['highlight'];
            const swapVals = curAnim['switch'];
            const final = curAnim['final'];
            const noChange = cur !== undefined && swap === undefined && highlight === undefined && final;
            swapTime += speed;
            if (noChange) {
                timeouts.push(setTimeout(() => {
                    const finalStyle : any = docBars[cur];
                    finalStyle.style.backgroundColor = Utils.SORTED_COLOR;
                }, swapTime));
            } else {
                timeouts.push(setTimeout( () => {
                    if (cur !== undefined) {
                        const curStyle : any = docBars[cur];
                        curStyle.style.backgroundColor = Utils.CUR_COLOR;
                    }
                    if (swap !== undefined) {
                        const swapStyle : any = docBars[swap];
                        swapStyle.style.backgroundColor = Utils.SWAP_COLOR;
                    }
                    if (highlight !== undefined) {
                        const hiStyle : any = docBars[highlight];
                        hiStyle.style.backgroundColor = Utils.HI_COLOR;
                    }
                }, swapTime));
                if (cur !== undefined && swap !== undefined && swapVals) {
                    swapTime += speed * 4;
                    timeouts.push(setTimeout(() => {
                        SortFunctions.swap(cur, swap, arr);
                        this.setState({
                            vals: arr,
                        })
                    }, swapTime));
                    if (final) {
                        swapTime += speed / 4;
                        timeouts.push(setTimeout(() => {
                            const finalStyle : any = docBars[cur];
                            finalStyle.style.backgroundColor = Utils.SORTED_COLOR;
                        }, swapTime));
                    }
                }
                timeouts.push(setTimeout(() => {
                    if (cur !== undefined) {
                        const curStyle : any = docBars[cur];
                        if (!final) {
                            curStyle.style.backgroundColor = Utils.INIT_COLOR;
                        }
                    }
                    if (swap !== undefined) {
                        const swapStyle : any = docBars[swap];
                        swapStyle.style.backgroundColor = Utils.INIT_COLOR;
                    }
                    if (highlight !== undefined) {
                        const hiStyle : any = docBars[highlight];
                        hiStyle.style.backgroundColor = Utils.INIT_COLOR;
                    }
                }, swapTime + speed))
            }
        }
        swapTime += speed;
        timeouts.push(setTimeout(() => {
            this.setState({
                sorting: false
            })
        }, swapTime))
    }

    render() {
        const hatMessage = "I know just what to do with you";
        return (
            <div className="Display-Wrapper">
                <button className="Back-Button" onClick={() => this.handleBackClick()}>&laquo; Back </button>
                <div className="Flex-Row-Center">
                    <div className="Sort-Display-Container">
                        <div className="Display-Title">
                            {Utils.SORTS[this.props.curSort]} Sort
                        </div>
                        <div className="Display-Flex">
                            <div className="Display-Flex-Side">
                                <div className="Flex-Col-Left">
                                    <div className="Flex-Col-Center MarginL30">
                                        <div className="Display-Hat-Container">
                                            <img className="Display-Hat" src={sortingHatLeft} alt={"Sorting Hat"}/>
                                            <p className="Display-Label">{hatMessage}</p>
                                        </div>
                                        <div className="Display-Button-Container">
                                            <button className="Display-Buttons" onClick={() => this.sortArray()}>Sort</button>
                                            <div className="Behind"/>
                                        </div>
                                        <div className="Display-Button-Container">
                                            <button className="Display-Buttons"
                                                    onClick={() => this.setState({vals: this.generateVals(this.state.numBars)})}>{this.getButtonText()}</button>
                                            <div className="Behind"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Bars vals={this.state.vals} barWidth={this.getBarWidth()} />
                            <div className="Display-Flex-Side">
                                <div className="Flex-Col-Right">
                                    <div className="Flex-Col-Center MarginR30">
                                        <ColorKey curSort={this.props.curSort}/>
                                        <div className="Flex-Col-Center">
                                            <p className="Slider-Label">Number of Bars {this.state.numBars}</p>
                                            <Slider xmin={10} xmax={100} xstep={10} x={this.state.numBars} onChange={({x}) => this.handleNumBarSlider(x)}/>
                                        </div>
                                        <div className="Flex-Col-Center">
                                            <p className="Slider-Label">Animation Speed {this.state.speedMS}</p>
                                            <Slider xmin={1} xmax={900} x={this.state.speedMS} onChange={({x}) => this.setState({speedMS : x})}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default SortDisplay;