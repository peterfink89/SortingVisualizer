import React from 'react';
import {getMergeSortAnimations} from './SortingAlgorithms/sortingAlgorithms.js';
import {getBubbleSortAnimations} from './SortingAlgorithms/sortingAlgorithms.js';
import {getQuickSortAnimations} from './SortingAlgorithms/sortingAlgorithms.js';
import {getHeapSortAnimations} from './SortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

const NUM_OF_BARS = 130;

const PRIMARY_BAR_COLOR = '#DA0049';

const SECONDARY_BAR_COLOR = '#FFFFFF';


export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    };

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < NUM_OF_BARS; ++i){
            array.push(randomIntFromInterval(5, 550));
        }
        this.setState({array});
    }

    mergeSort() {
        var cur = document.getElementById("range-speed");
        var Sped = cur.value;
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i <animations.length; ++i){
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange){
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_BAR_COLOR : PRIMARY_BAR_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * Sped);
            }
            else{
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * Sped);
            }
        }
    }

    sortAnimation(algo) {
        var cur = document.getElementById("range-speed");
        var speeed = cur.value;
        var animations;
        switch(algo){
            case "quick":
                animations = getQuickSortAnimations(this.state.array);
            break;
            case "heap":
                animations = getHeapSortAnimations(this.state.array);
            break;
            case "bubble":
                animations = getBubbleSortAnimations(this.state.array);
            break;
            default:
        }
        let b1 = 0;
        let b2 = 0;
        for (let i = 0; i < animations.length; ++i){
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange){
                const [barOneIdx, barTwoIdx] = animations[i];
                b1 = barOneIdx;
                b2 = barTwoIdx;
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_BAR_COLOR : PRIMARY_BAR_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * speeed);
            }
            else{
                const [barOneHeight, barTwoHeight] = animations[i];
                const barOneStyle = arrayBars[b1].style;
                const barTwoStyle = arrayBars[b2].style;
                setTimeout(() => {
                    barOneStyle.height = `${barTwoHeight}px`;
                    barTwoStyle.height = `${barOneHeight}px`;
                }, i * speeed);
            }
        }
    }

    render(){
        const {array} = this.state;

        return(
            <body className="full-page">
                <div className="button-container">
                    <button className="button1" onClick={() => this.resetArray()}>New Array</button>
                </div>
                <div className="button-container">
                <div className="button2">Speed:</div>
                <div className="slider">
                    <input id="range-speed" className="range-slider" type="range" min=".1" max="10" step=".1" defaultValue="3"></input>
                </div>
                </div>
                <div className="buttons-container">
                    <div className="button-container">
                        <button className="button1" onClick={() => this.mergeSort()}>Merge Sort</button>
                    </div>
                    <div className="button-container">
                        <button className="button1" onClick={() => this.sortAnimation("heap")}>Heap Sort</button>
                    </div>
                    <div className="button-container">
                        <button className="button1" onClick={() => this.sortAnimation("bubble")}>Bubble Sort</button>
                    </div>
                    <div className="button-container">
                        <button className="button1" onClick={() => this.sortAnimation("quick")}>Quick Sort</button>
                    </div>                    
                </div>
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div 
                            className="array-bar" 
                            key={idx}
                            style={{height: `${value}px`}}>
                        </div>
                    ))}
                </div>
            </body>
        );
    }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}