import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/customers';

export class CustomerService {

    getAll() {
        return axios.get(BASE_URL).then(res => res.data);
    }

    saveCustomer(customer) {
        return axios.post(BASE_URL, customer).then(res => res.data);
    }

    getById(id) {
        return axios.get(`${BASE_URL}/${id}`).then(res => res.data);
    }

    deleteCustomer(id) {
        return axios.delete(`${BASE_URL}/${id}`).then(res => res.data);
    }
}
