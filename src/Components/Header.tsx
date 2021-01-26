import React, {Component} from 'react';
import '../Stylesheets/Header.css';
import '../Stylesheets/General.css';

import sortingHatLeft from '../Pictures/SortingHatLeft.png';
import sortingHatRight from '../Pictures/SortingHatRight.png';
import divider from '../Pictures/divider.png';

class Header extends Component<{}, {}> {

    render() {
        return (
            <div className="Header-Wrapper">
                <div className="Flex-Row-Center">
                    <img className="Header-Hat" src={sortingHatLeft} alt={"Sorting Hat"}/>
                    <div className="Header-Title">
                        The Sorting Hat
                    </div>
                    <img className="Header-Hat" src={sortingHatRight} alt={"Sorting Hat"}/>
                </div>
                <div>
                    <img className="Header-Divider" src={divider} alt={"Divider"}/>
                </div>
            </div>
        )
    }

}

export default Header;
