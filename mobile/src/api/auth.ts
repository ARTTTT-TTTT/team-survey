import axios from 'axios';

// const API_URL = 'http://192.168.1.77:8000';
const API_URL = 'http://172.30.89.94:8000';

export const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, {
            email,
            password,
            first_name: firstName,
            last_name: lastName,
            role: {
                admin_id: '',
                role: '',
                team_leader_id: '',
            },
            customer: [
                {
                    customer_id: '',
                    status: '',
                },
            ],
        });
        return response.data;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};

export const login = async (email: string, password: string) => {
    try {
        const data = new URLSearchParams();
        data.append('username', email);
        data.append('password', password);

        const response = await axios.post(`${API_URL}/auth/login`, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

export const fetchCurrentUser = async (token: string) => {
    try {
        const response = await axios.get(`${API_URL}/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching current user:', error);
        throw error;
    }
};
