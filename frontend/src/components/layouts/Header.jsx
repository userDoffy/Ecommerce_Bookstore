import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <i className="bi bi-book" style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}></i>
                    <span>Bookstore</span>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/popular">Popular</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/store">Store</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                    </ul>
                    <div className="d-flex">
                        <Link to="/login" className="nav-link">
                            <i className="bi bi-person-circle" style={{ fontSize: '1.5rem' }}></i>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;