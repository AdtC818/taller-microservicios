import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './Navigation';
import Home from './Home';
import AllCustomers from './AllCustomers';
import SaveCustomer from './SaveCustomer';
import DeleteCustomer from './DeleteCustomer';
import FindCustomer from './FindCustomer';

export default function Menu() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navigation />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/allcustomers" element={<AllCustomers />} />
                    <Route path="/savecustomer" element={<SaveCustomer />} />
                    <Route path="/deletecustomer" element={<DeleteCustomer />} />
                    <Route path="/findcustomer" element={<FindCustomer />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
