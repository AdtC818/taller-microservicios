import React, { useState, useRef } from 'react';
import { CustomerService } from './service/CustomerService';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { Panel } from 'primereact/panel';
import { Divider } from 'primereact/divider';

function FindCustomer() {
    const [searchId, setSearchId] = useState(null);
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const toast = useRef(null);

    const handleSearch = () => {
        if (!searchId) {
            toast.current.show({
                severity: 'warn',
                summary: 'ID requerido',
                detail: 'Por favor ingresa un ID válido para buscar.',
                life: 3000
            });
            return;
        }

        setLoading(true);
        setCustomer(null);
        setSearched(false);

        new CustomerService().getById(searchId)
            .then(data => {
                setCustomer(data);
                setSearched(true);
                setLoading(false);
                toast.current.show({
                    severity: 'success',
                    summary: 'Cliente encontrado',
                    detail: `Se encontró a "${data.firstName} ${data.lastName}".`,
                    life: 3000
                });
            })
            .catch(err => {
                setSearched(true);
                setLoading(false);
                if (err.response && err.response.status === 404) {
                    toast.current.show({
                        severity: 'warn',
                        summary: 'No encontrado',
                        detail: `No existe un cliente con el ID #${searchId}.`,
                        life: 4000
                    });
                } else {
                    toast.current.show({
                        severity: 'error',
                        summary: 'Error de conexión',
                        detail: 'No se pudo contactar el servidor.',
                        life: 4000
                    });
                }
            });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSearch();
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
            <Toast ref={toast} position="top-right" />

            <div style={{ width: '100%', maxWidth: '500px' }}>
                <Panel header="Buscar Cliente por ID" toggleable>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="searchId"><b>Customer ID</b></label>
                            <br />
                            <InputNumber
                                id="searchId"
                                value={searchId}
                                onValueChange={(e) => setSearchId(e.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ej: 1"
                                min={1}
                                style={{ width: '100%', marginTop: '0.4rem' }}
                            />
                        </div>
                        <Button
                            label="Buscar"
                            icon="pi pi-search"
                            loading={loading}
                            onClick={handleSearch}
                        />
                    </div>

                    {searched && !customer && (
                        <div style={{ textAlign: 'center', color: '#e74c3c', padding: '1rem' }}>
                            <i className="pi pi-exclamation-circle" style={{ fontSize: '2rem' }} />
                            <p>No se encontró ningún cliente con ese ID.</p>
                        </div>
                    )}

                    {customer && (
                        <>
                            <Divider />
                            <Card
                                title={`${customer.firstName} ${customer.lastName}`}
                                subTitle={`ID: #${customer.id}`}
                                style={{ marginTop: '1rem' }}
                            >
                                <div style={{ lineHeight: '2rem' }}>
                                    <p>
                                        <i className="pi pi-map-marker" style={{ marginRight: '0.5rem', color: '#3498db' }} />
                                        <b>Dirección:</b> {customer.address || 'No especificada'}
                                    </p>
                                    <p>
                                        <i className="pi pi-globe" style={{ marginRight: '0.5rem', color: '#2ecc71' }} />
                                        <b>Ubicación:</b> {customer.location || 'No especificada'}
                                    </p>
                                </div>
                            </Card>
                        </>
                    )}
                </Panel>
            </div>
        </div>
    );
}

export default FindCustomer;
