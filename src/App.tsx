import React, {Component} from 'react';
import './Stylesheets/App.css';

import Header from "./Components/Header";
import SortChooser from "./Components/SortChooser";
import SortDisplay from "./Components/SortDisplay";

interface AppState {
    // The index of the selected sort
    sort: number | undefined;

}

class App extends Component<{}, AppState> {
    constructor(props: any) {
        super(props);
        this.state = {
            sort: undefined
        }
    }

    setSort = (sort : number) => {
        this.setState({
            sort: sort
        })
    }

    goBack = () => {
        this.setState({
            sort: undefined
        })
    }

    render() {
        let display : any[] = [];
        if (this.state.sort === undefined) {
            display.push(<SortChooser key={0} onSortClick={(sort : number) => this.setSort(sort)}/>);
        } else {
            display.push(<SortDisplay key={1} curSort={this.state.sort} onBackClick={() => this.goBack()}/>);
        }
        return (
            <div className="App-Wrapper">
                <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600&display=swap" rel="stylesheet"/>
                <Header/>
                {display}
            </div>
        )
    }

}

export default App;
