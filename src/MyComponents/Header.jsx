import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";


export default function Header(props) {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand"> {props.title}</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            {/* <a className="nav-link active" aria-current="page" href="#">Home</a> */}
                            <Link to="/" className="navbar-brand">Home </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/TodoItems" className="navbar-brand"> ToDos</Link>
                        </li>

                    </ul>
                    {props.searchBar ? <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form> : "No Search Bar"}
                </div>
            </div>
        </nav>


    )

}

Header.defaultProps = {
    title: "Dev team forgot to pass title."
}

Header.propTypes = {
    title: PropTypes.string,
    searchBar: PropTypes.bool.isRequired

}