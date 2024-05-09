import React, {useEffect, useRef, useState} from "react";
import {ReactComponent as IconSearch} from "bootstrap-icons/icons/search.svg";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";
import {Overlay, Popover} from "react-bootstrap";


const Search = ({allproducts, setSearchData}) => {
    const [searchVal, updateSearchVal] = useState('');
    const [show, setShow] = useState(false);
    const ref = useRef(null);
    const navigation = useNavigate();

    const update = (event) => { // const result = allproducts.filter(product => product.name.toLowerCase().includes(searchVal.toLowerCase()));
        const names = [];//Your code 
        const categories = [];//Your code 
        const description = [];//Your code 
        const result = [];//Your code 
        if (result.length < 1) {
            setShow(true);
            hidePopover(2);
        } else {
            setSearchData(result);
            navigation(`/searchResult`);
        }

    }

    const hidePopover = (seconds) => {
        const timer = setTimeout(() => {
            setShow(false);
        }, seconds * 1000);
        return() => clearTimeout(timer);
    }

    const LinkEnabled = () => {
        return (

            <button className="btn btn-primary text-white" type="submit" aria-label="Search"
                onClick={
                    event => update(event)
            }>
                <IconSearch/>
            </button>

        );
    }

    const LinkDisabled = () => {
        return (
            <button className="btn btn-primary text-white" type="submit" aria-label="Search"
                disabled={true}>
                <IconSearch/>
            </button>
        );
    }

    const SearchButton = () => {
        return(searchVal) ? <LinkEnabled/>: <LinkDisabled/>;
    }


    return (
        <form action="#" className="search">
            <div className="input-group"
                ref={ref}>

                <input id="searchInput" name="searchInput" type="text" className="form-control" placeholder="Search" required
                    value={searchVal}
                    onChange={
                        event => updateSearchVal(event.target.value)
                    }/>
                <label className="visually-hidden" htmlFor="search"></label>

                <Overlay show={show}
                    target={
                        ref.current
                    }
                    placement="bottom"
                    container={ref}
                    containerPadding={20}>
                    <Popover id="popover-contained"
                        style={
                            {margin: 0}
                    }>
                        <Popover.Header as="h3">Search result is empty.  Please try again</Popover.Header>
                    </Popover>
                </Overlay>
                <SearchButton/>
            </div>


        </form>
    );
};
export default Search;
