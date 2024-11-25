import axios from 'axios';

// กำหนด Base URL ของ API ที่ใช้ในแอปพลิเคชันของคุณ
const API_URL = 'YOUR_BACKEND_API_URL';

export const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
) => {
    try {
        const response = await axios.post(`${API_URL}/register`, {
            email,
            password,
            first_name: firstName,
            last_name: lastName,
        });
        return response.data;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            username: email, // เปลี่ยน form_data.username ไปเป็น email
            password,
        });
        return response.data; // return token information
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

export const fetchCurrentUser = async (token: string) => {
    try {
        const response = await axios.get(`${API_URL}/me`, {
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
