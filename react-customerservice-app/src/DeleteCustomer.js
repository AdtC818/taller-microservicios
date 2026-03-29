import React, { useState, useEffect, useRef } from 'react';
import { CustomerService } from './service/CustomerService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';

function DeleteCustomer() {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const toast = useRef(null);
    const service = new CustomerService();

    const loadCustomers = () => {
        setLoading(true);
        setError(null);
        service.getAll()
            .then(data => {
                setCustomers(data);
                setLoading(false);
            })
            .catch(() => {
                setError('No se pudo cargar la lista de clientes.');
                setLoading(false);
            });
    };

    useEffect(() => {
        loadCustomers();
    }, []);

    const confirmDelete = (customer) => {
        confirmDialog({
            message: `¿Estás seguro de eliminar a "${customer.firstName} ${customer.lastName}"?`,
            header: 'Confirmar eliminación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí, eliminar',
            rejectLabel: 'Cancelar',
            acceptClassName: 'p-button-danger',
            accept: () => handleDelete(customer),
        });
    };

    const handleDelete = (customer) => {
        service.deleteCustomer(customer.id)
            .then(() => {
                toast.current.show({
                    severity: 'success',
                    summary: 'Cliente eliminado',
                    detail: `"${customer.firstName} ${customer.lastName}" fue eliminado correctamente.`,
                    life: 4000
                });
                setSelectedCustomer(null);
                loadCustomers();
            })
            .catch(() => {
                toast.current.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No se pudo eliminar el cliente.',
                    life: 4000
                });
            });
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <Button
                icon="pi pi-trash"
                className="p-button-danger p-button-sm"
                label="Eliminar"
                onClick={() => confirmDelete(rowData)}
            />
        );
    };

    return (
        <div style={{ padding: '2rem' }}>
            <Toast ref={toast} position="top-right" />
            <ConfirmDialog />

            <h2>Eliminar Cliente</h2>
            <p style={{ color: '#666' }}>Selecciona un cliente de la lista y haz clic en "Eliminar".</p>

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
                    selectionMode="single"
                    selection={selectedCustomer}
                    onSelectionChange={(e) => setSelectedCustomer(e.value)}
                    paginator
                    rows={10}
                    emptyMessage="No hay clientes registrados."
                    tableStyle={{ minWidth: '50rem' }}
                    header="Selecciona el cliente a eliminar"
                >
                    <Column selectionMode="single" headerStyle={{ width: '3rem' }} />
                    <Column field="id" header="ID" sortable style={{ width: '5rem' }} />
                    <Column field="firstName" header="First Name" sortable />
                    <Column field="lastName" header="Last Name" sortable />
                    <Column field="address" header="Address" />
                    <Column field="location" header="Location" />
                    <Column header="Acción" body={actionBodyTemplate} style={{ width: '10rem' }} />
                </DataTable>
            )}
        </div>
    );
}

export default DeleteCustomer;
