import axios from 'axios';

// const API_URL = 'http://192.168.1.77:8000';
const API_URL = 'http://172.30.89.94:8000';

export const uploadIdCardImage = async (fileUri: string) => {
    try {
        const formData = new FormData();

        // เพิ่มไฟล์เข้าไปใน FormData
        formData.append('image_file', {
            uri: fileUri, // URI ของไฟล์
            name: 'id_card.jpg', // ชื่อไฟล์ที่ส่งไปยัง API
            type: 'image/jpeg', // MIME Type
        } as any); // Note: `as any` อาจจำเป็นสำหรับบาง TypeScript config

        // เรียกใช้ API
        const response = await axios.post(
            `${API_URL}/scan/process-id-card`, // แก้ URL ให้ตรงกับ API
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data', // แจ้ง Content-Type
                },
            },
        );

        // ส่งข้อมูลกลับไป
        return response.data;
    } catch (error: any) {
        console.log('Error uploading image:', error);
        throw error.response?.data || { message: 'Failed to process image' };
    }
};
