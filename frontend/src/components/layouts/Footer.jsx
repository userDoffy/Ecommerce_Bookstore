import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <footer className="bg-light text-dark py-1 fixed-bottom">
            <div className="container text-center">
                <p>&copy; {new Date().getFullYear()} Ecommerce Bookstore. All rights reserved.</p>
                <ul className="list-inline">
                    <li className="list-inline-item">
                        <Link to="/privacy" className="text-dark text-decoration-none">Privacy Policy</Link>
                    </li>
                    <li className="list-inline-item">|</li>
                    <li className="list-inline-item">
                        <Link to="/terms" className="text-dark text-decoration-none">Terms of Service</Link>
                    </li>
                    <li className="list-inline-item">|</li>
                    <li className="list-inline-item">
                        <Link to="/contact" className="text-dark text-decoration-none">Contact Us</Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;