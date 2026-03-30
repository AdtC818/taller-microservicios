import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [customerOpen, setCustomerOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => setMenuOpen((prev) => !prev);

    const activePath = (path) => location.pathname === path;

    const closeAll = () => {
        setMenuOpen(false);
        setCustomerOpen(false);
    };

    return (
        <header className="app-navbar">
            <div className="navbar-inner">
                <Link to="/" className="navbar-logo" onClick={closeAll}>
                    <span className="logo-dot">•</span> CustomerApp
                </Link>

                <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
                    <span />
                    <span />
                    <span />
                </button>

                <ul className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
                    <li className={activePath('/') ? 'active' : ''}>
                        <Link to="/" onClick={closeAll}><i className="pi pi-home" /> Home</Link>
                    </li>
                    <li className={`submenu ${customerOpen ? 'open' : ''}`}>
                        <button type="button" onClick={() => setCustomerOpen((v) => !v)}>
                            <i className="pi pi-user" /> Customer
                        </button>
                        <ul className="dropdown-menu">
                            <li className={activePath('/allcustomers') ? 'active' : ''}>
                                <Link to="/allcustomers" onClick={closeAll}><i className="pi pi-users" /> All Customers</Link>
                            </li>
                            <li className={activePath('/savecustomer') ? 'active' : ''}>
                                <Link to="/savecustomer" onClick={closeAll}><i className="pi pi-user-plus" /> Save Customer</Link>
                            </li>
                            <li className={activePath('/deletecustomer') ? 'active' : ''}>
                                <Link to="/deletecustomer" onClick={closeAll}><i className="pi pi-user-minus" /> Delete Customer</Link>
                            </li>
                            <li className={activePath('/findcustomer') ? 'active' : ''}>
                                <Link to="/findcustomer" onClick={closeAll}><i className="pi pi-search" /> Find by ID</Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Navigation;
