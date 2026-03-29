import React from 'react';
import { Menubar } from 'primereact/menubar';

const Navigation = () => {

    const navlist = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            command: () => { window.location.href = '/'; }
        },
        {
            label: 'Customer',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'All Customers',
                    icon: 'pi pi-fw pi-users',
                    command: () => { window.location.href = '/allcustomers'; }
                },
                {
                    label: 'Save Customer',
                    icon: 'pi pi-fw pi-user-plus',
                    command: () => { window.location.href = '/savecustomer'; }
                },
                {
                    separator: true
                },
                {
                    label: 'Delete Customer',
                    icon: 'pi pi-fw pi-user-minus',
                    command: () => { window.location.href = '/deletecustomer'; }
                },
                {
                    label: 'Find by ID',
                    icon: 'pi pi-fw pi-search',
                    command: () => { window.location.href = '/findcustomer'; }
                }
            ]
        }
    ];

    return (
        <div>
            <header>
                <nav>
                    <Menubar model={navlist} />
                </nav>
            </header>
        </div>
    );
};

export default Navigation;
