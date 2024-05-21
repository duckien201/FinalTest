import axios from "axios";

const API_URL = 'http://kiemtra.stecom.vn:8888/api/ung-vien/NDK0216766/create'

const addStudent = async (tenUngVien,maUngVien,moTaKinhNghiem,email,diaChi) => {
    try {
        const response = await axios.post(API_URL, {
            tenUngVien: tenUngVien,
            maUngVien: maUngVien,
            moTaKinhNghiem: moTaKinhNghiem,
            email : email,
            diaChi  : diaChi
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            // Lỗi từ phía máy chủ, ví dụ: trả về mã lỗi
            console.error('Server Error:', error.response.data);
        } else if (error.request) {
            // Yêu cầu không thành công, không nhận được phản hồi từ máy chủ
            console.error('Request Error:', error.request);
        } else {
            // Lỗi khác, chẳng hạn như lỗi cấu hình Axios
            console.error('Error:', error.message);
        }
        throw error; // Ném ra lỗi để xử lý ở phía gọi hàm
    }
}
export default addStudent