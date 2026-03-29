import React, { Component } from 'react';
import { CustomerService } from './service/CustomerService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';

export default class AllCustomers extends Component {

    constructor() {
        super();
        this.state = {
            customers: [],
            loading: true,
            error: null
        };
        this.customerService = new CustomerService();
    }

    componentDidMount() {
        this.customerService.getAll()
            .then(data => {
                this.setState({ customers: data, loading: false });
            })
            .catch(err => {
                this.setState({
                    error: 'No se pudo conectar con el servidor. Verifica que el microservicio esté corriendo.',
                    loading: false
                });
            });
    }

    render() {
        const { customers, loading, error } = this.state;

        return (
            <div style={{ padding: '2rem' }}>
                <h2>Lista de Clientes</h2>

                {loading && (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <ProgressSpinner />
                        <p>Cargando clientes...</p>
                    </div>
                )}

                {error && (
                    <Message severity="error" text={error} style={{ marginBottom: '1rem', width: '100%' }} />
                )}

                {!loading && !error && (
                    <DataTable
                        value={customers}
                        paginator
                        rows={10}
                        emptyMessage="No hay clientes registrados."
                        tableStyle={{ minWidth: '50rem' }}
                        header="React Customer App - All Customers"
                    >
                        <Column field="id" header="ID" sortable style={{ width: '5rem' }} />
                        <Column field="firstName" header="First Name" sortable />
                        <Column field="lastName" header="Last Name" sortable />
                        <Column field="address" header="Address" />
                        <Column field="location" header="Location" />
                    </DataTable>
                )}
            </div>
        );
    }
}
