import React, { useState, useRef } from 'react';
import { CustomerService } from './service/CustomerService';
import { Panel } from 'primereact/panel';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';

const EMPTY_FORM = {
    firstName: '',
    lastName: '',
    address: '',
    location: ''
};

function SaveCustomer() {
    const [values, setValues] = useState(EMPTY_FORM);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const toast = useRef(null);

    const handleChange = (e) => {
        const value = e.target.value;
        setValues({ ...values, [e.target.name]: value });
    };

    const isFormValid = () => {
        return values.firstName.trim() && values.lastName.trim();
    };

    const RegisterCustomer = (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (!isFormValid()) {
            toast.current.show({
                severity: 'warn',
                summary: 'Campos requeridos',
                detail: 'El nombre y apellido son obligatorios.',
                life: 3000
            });
            return;
        }

        setLoading(true);

        new CustomerService().saveCustomer(values)
            .then((savedCustomer) => {
                toast.current.show({
                    severity: 'success',
                    summary: '¡Cliente guardado!',
                    detail: `El cliente "${savedCustomer.firstName} ${savedCustomer.lastName}" fue registrado con ID #${savedCustomer.id}.`,
                    life: 4000
                });
                setValues(EMPTY_FORM);
                setSubmitted(false);
                setLoading(false);
            })
            .catch((error) => {
                toast.current.show({
                    severity: 'error',
                    summary: 'Error al guardar',
                    detail: 'No se pudo registrar el cliente. Verifica que el servidor esté corriendo.',
                    life: 5000
                });
                setLoading(false);
            });
    };

    return (
        <div className="form-wrapper">
            {/* Toast para mensajes de confirmación - Actividad 1 */}
            <Toast ref={toast} position="top-right" />

            <Panel
                header="React Customer App - Save Customers"
                style={{ width: '100%', maxWidth: '500px', borderRadius: '14px', boxShadow: '0 10px 25px rgba(16, 24, 40, 0.16)' }}
                className="custom-panel"
                toggleable
            >
                <form onSubmit={RegisterCustomer}>

                    <div className="p-field" style={{ marginBottom: '1rem' }}>
                        <label htmlFor="firstName"><b>First Name *</b></label>
                        <br />
                        <InputText
                            id="firstName"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                            placeholder="Ingrese el nombre"
                            className={classNames('custom-input', { 'p-invalid': submitted && !values.firstName.trim() })}
                            style={{ width: '100%', marginTop: '0.4rem' }}
                        />
                        {submitted && !values.firstName.trim() && (
                            <small className="p-error">El nombre es requerido.</small>
                        )}
                    </div>

                    <div className="p-field" style={{ marginBottom: '1rem' }}>
                        <label htmlFor="lastName"><b>Last Name *</b></label>
                        <br />
                        <InputText
                            id="lastName"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            placeholder="Ingrese el apellido"
                            className={classNames('custom-input', { 'p-invalid': submitted && !values.lastName.trim() })}
                            style={{ width: '100%', marginTop: '0.4rem' }}
                        />
                        {submitted && !values.lastName.trim() && (
                            <small className="p-error">El apellido es requerido.</small>
                        )}
                    </div>

                    <div className="p-field" style={{ marginBottom: '1rem' }}>
                        <label htmlFor="address"><b>Address</b></label>
                        <br />
                        <InputText
                            id="address"
                            name="address"
                            value={values.address}
                            onChange={handleChange}
                            placeholder="Ingrese la dirección"
                            className="custom-input"
                            style={{ width: '100%', marginTop: '0.4rem' }}
                        />
                    </div>

                    <div className="p-field" style={{ marginBottom: '1.5rem' }}>
                        <label htmlFor="location"><b>Location</b></label>
                        <br />
                        <InputText
                            id="location"
                            name="location"
                            value={values.location}
                            onChange={handleChange}
                            placeholder="Ingrese la ciudad/ubicación"
                            className="custom-input"
                            style={{ width: '100%', marginTop: '0.4rem' }}
                        />
                    </div>

                    <Button
                        type="submit"
                        label="Registrar"
                        icon="pi pi-save"
                        loading={loading}
                        className="custom-button"
                        style={{ width: '100%', borderRadius: '14px' }}
                    />
                </form>
            </Panel>
        </div>
    );
}

export default SaveCustomer;
