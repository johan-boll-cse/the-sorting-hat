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
    sorting: boolean,
    reads: number,
    writes: number,
    storage: number
}

const timeouts : any[] = [];

class SortDisplay extends Component<DisplayProps, DisplayState> {

    constructor(props: DisplayProps) {
        super(props);
        this.state = {
            vals: this.generateVals(Utils.DEFAULT_NUM_BARS),
            numBars: Utils.DEFAULT_NUM_BARS,
            speedMS: Utils.DEFAULT_SPEED,
            sorting: false,
            reads: 0,
            writes: 0,
            storage: 0
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
            sorting: false,
            reads: 0,
            writes: 0,
            storage: 0
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
        let results : any;
        let swapCoef : number = 1;
        this.clearTimeouts();
        let arr = this.state.vals.slice();
        if (this.props.curSort === 0) {
            results = SortFunctions.selectionSort(arr);
            swapCoef = 5;
        } else if (this.props.curSort === 1) {
            results = SortFunctions.bubbleSort(arr);
        } else if (this.props.curSort === 2) {
            results = SortFunctions.mergeSort(arr);
            this.resetBarColor();
            this.animateSortMerge(arr, results);
            this.setState({
                vals: arr,
                sorting: true
            });
            return;
        } else if (this.props.curSort === 3) {
            results = SortFunctions.quickSort(arr);
        }
        this.resetBarColor();
        this.animateSort(arr, results, swapCoef);
        this.setState({
            vals: arr,
            sorting: true
        });
    }

    animateSortMerge = (arr : number[], results : any) : void => {
        const animations = results['animations'];
        const counts = results['counts'];
        if (animations.length !== counts.length) {
            console.log("Size mismatch: Animations size", animations.length, "Counts size", counts.length);
            this.clearTimeouts();
            return;
        }
        const docBars = document.getElementsByClassName('Bar');
        let swapTime = 0.0;
        let shift = 0;
        let pastLeftMax = 0;
        const speed = Utils.SPEED_NUMBERS[this.state.speedMS - 1];
        for (let i = 0; i < animations.length; i++) {
            const curAnim = animations[i];
            const curCount = counts[i];
            const firstLeftMax = curAnim['leftMax'];
            if (pastLeftMax !== firstLeftMax) {
                shift = 0;
                pastLeftMax = firstLeftMax;
            }
            const leftMax = firstLeftMax + shift;
            const arrIndex = curAnim['arrIndex'];
            const leftIndex = curAnim['leftIndex'] + shift;
            const rightIndex = curAnim['rightIndex'];
            const rightMax = curAnim['rightMax'];
            const leftSwap = curAnim['leftSwap'];
            const final = curAnim['final'];
            swapTime += speed;
            // Fastest speed has visibility problems because it is faster than rendering speed
            // So we only render counts every 5 on fastest speed
            if (this.state.speedMS !== 7 || i % 5 === 0) {
                timeouts.push(setTimeout(() => {
                    this.setState( {
                        reads: curCount['reads'],
                        writes: curCount['writes'],
                        storage: curCount['storage']
                    })
                }, swapTime))
            }
            timeouts.push(setTimeout( () => {
                if (leftIndex <= leftMax) {
                    const leftStyle : any = docBars[leftIndex]
                    leftStyle.style.backgroundColor = Utils.CUR_COLOR;
                }
                if (rightIndex <= rightMax) {
                    const rightStyle : any = docBars[rightIndex]
                    rightStyle.style.backgroundColor = Utils.SWAP_COLOR;
                }
            }, swapTime));
            swapTime += speed;
            timeouts.push(setTimeout( () => {
                if (leftSwap) {
                    let tmp : number = arr.splice(leftIndex, 1)[0];
                    arr.splice(arrIndex, 0, tmp);
                } else {
                    if (leftIndex <= leftMax) {
                        const leftStyle: any = docBars[leftIndex]
                        leftStyle.style.backgroundColor = Utils.INIT_COLOR;
                        const nextleftStyle: any = docBars[leftIndex + 1]
                        nextleftStyle.style.backgroundColor = Utils.CUR_COLOR;
                    }
                    if (rightIndex <= rightMax && rightIndex !== leftIndex + 1) {
                        const rightStyle: any = docBars[rightIndex]
                        rightStyle.style.backgroundColor = Utils.INIT_COLOR;
                    }
                    if (rightIndex + 1 <= rightMax) {
                        const rightStyle: any = docBars[rightIndex + 1]
                        rightStyle.style.backgroundColor = Utils.SWAP_COLOR;
                    }
                    let tmp : number = arr.splice(rightIndex, 1)[0];
                    arr.splice(arrIndex, 0, tmp);
                }
                this.setState({
                    vals: arr
                })
            }, swapTime));
            const leftresetShift = leftSwap ? 0 : 1;
            const rightresetShift = (leftSwap || rightIndex + 1 > rightMax) ? 0 : 1;
            if (!leftSwap) {
                shift++;
            }
            timeouts.push(setTimeout(() => {
                if (leftIndex <= leftMax) {
                    const leftStyle : any = docBars[leftIndex + leftresetShift]
                    leftStyle.style.backgroundColor = Utils.INIT_COLOR;
                }
                if (rightIndex <= rightMax) {
                    const rightStyle : any = docBars[rightIndex + rightresetShift]
                    rightStyle.style.backgroundColor = Utils.INIT_COLOR;
                }
                if (final) {
                    const arrStyle : any = docBars[arrIndex]
                    arrStyle.style.backgroundColor = Utils.SORTED_COLOR;
                }
            }, swapTime + speed))
        }
        swapTime += speed;
        timeouts.push(setTimeout(() => {
            this.setState({
                sorting: false
            })
        }, swapTime));
    }

    animateSort = (arr : number[], results : any, swapCoef: number) : void => {
        const animations = results['animations'];
        const counts = results['counts'];
        if (animations.length !== counts.length) {
            console.log("Size mismatch: Animations size", animations.length, "Counts size", counts.length);
            this.clearTimeouts();
            return;
        }
        const docBars = document.getElementsByClassName('Bar');
        let swapTime = 0.0;
        const speed = Utils.SPEED_NUMBERS[this.state.speedMS - 1];
        for (let i = 0; i < animations.length; i++) {
            const curAnim = animations[i];
            const curCount = counts[i];
            const cur = curAnim['cur'];
            const swap = curAnim['swap'];
            const highlight = curAnim['highlight'];
            const swapVals = curAnim['switch'];
            const final = curAnim['final'];
            const noChange = cur !== undefined && swap === undefined && highlight === undefined && final;
            swapTime += speed;
            // Fastest speed has visibility problems because it is faster than rendering speed
            // So we only render counts every 5 on fastest speed
            if (this.state.speedMS !== 7 || i % 5 === 0) {
                timeouts.push(setTimeout(() => {
                    this.setState( {
                        reads: curCount['reads'],
                        writes: curCount['writes']
                    })
                }, swapTime))
            }
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
                    swapTime += speed * swapCoef;
                    timeouts.push(setTimeout(() => {
                        SortFunctions.swap(cur, swap, arr);
                        this.setState({
                            vals: arr,
                        })
                    }, swapTime));
                    if (final) {
                        swapTime += speed;
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
                                        <div className="Flex-Col-Center FixedW250">
                                            <p className="Slider-Label">Number of Bars: {this.state.numBars}</p>
                                            <Slider xmin={10} xmax={200} xstep={10} x={this.state.numBars} onChange={({x}) => this.handleNumBarSlider(x)}/>
                                        </div>
                                        <div className="Flex-Col-Center FixedW250">
                                            <p className="Slider-Label">Animation Speed: {Utils.SPEEDS[this.state.speedMS - 1]}</p>
                                            <Slider xmin={1} xmax={7} xstep={1} x={this.state.speedMS} onChange={({x}) => this.setState({speedMS : x})}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="Flex-Row-Center">
                            <div className="FixedW250">
                                <p className="Slider-Label"> Array Reads: {this.state.reads}</p>
                            </div>
                            <div className="FixedW250">
                            <p className="Slider-Label">Array Writes: {this.state.writes}</p>
                            </div>
                            <div className="FixedW250">
                                <p className="Slider-Label">Additional Storage: {this.state.storage}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default SortDisplay;