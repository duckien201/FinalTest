import { Alert,StyleSheet, Text, View, TouchableOpacity, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons'
import addStudent from '../api/API'



const Add = ({ navigation }) => {
    const [tenUngVien, setTenUngVien] = useState('');
    const [maUngVien, setMaUngVien] = useState('');
    const [moTaKinhNghiem, setMoTaKinhNghiem] = useState('');
    const [email, setEmail] = useState('');
    const [diaChi, setDiaChi] = useState('');

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleAddStudent = async () => {
        setLoading(true)
        try {
            await addStudent(tenUngVien,maUngVien, moTaKinhNghiem,email,diaChi)
            setLoading(false)
            navigation.navigate('Home')
        } catch (error) {
            setLoading(false)
            setError('Lưu ứng viên bị lỗi, Hãy thử lại')
        }
    }
    const handleCancel = () => {
        Alert.alert(
            'Xác nhận',
            'Bạn có muốn hủy bỏ không?',
            [
                {
                    text: 'Không',
                    style: 'cancel',
                },
                {
                    text: 'Có',
                    onPress: () => navigation.goBack(),
                },
            ],
            { cancelable: false }
        );
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name='arrow-left' size={20} color='black'></Feather>
                </TouchableOpacity>
                <Text style={styles.textHeader}>Thêm ứng viên</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.textBody}>Tên ứng viên</Text>
                <TextInput placeholder='Nhập tên ứng viên' style={[styles.textInput]}
                    value={tenUngVien}
                    onChangeText={setTenUngVien}></TextInput>
                <Text style={styles.textBody}>Mã số ứng viên</Text>
                <TextInput placeholder='Nhập mã số ứng viên' style={styles.textInput}
                    value={maUngVien}
                    onChangeText={setMaUngVien}></TextInput>
                <Text style={styles.textBody}>Mô tả kinh nghiệm</Text>
                <TextInput placeholder='Mô tả kinh nghiệm' style={styles.textInput}
                    value={moTaKinhNghiem}
                    onChangeText={setMoTaKinhNghiem}></TextInput>
                <Text style={styles.textBody}>Email</Text>
                <TextInput placeholder='email' style={styles.textInput}
                    value={email}
                    onChangeText={setEmail}></TextInput>
                <Text style={styles.textBody}>Địa chỉ</Text>
                <TextInput placeholder='Địa chỉ' style={styles.textInput}
                    value={diaChi}
                    onChangeText={setDiaChi}></TextInput>
                {/* <Text style={styles.textBody}>Mô tả kinh nghiệm</Text>
                <TextInput style={{
                    height: 100,
                    width: '100%',
                    borderColor: 'gray',
                    borderWidth: 1,
                    paddingLeft: 10,
                    marginTop: 10
                }}></TextInput>
                <Text style={styles.textBody}>Email</Text>
                <TextInput style={{
                    height: 80,
                    width: '100%',
                    borderColor: 'gray',
                    borderWidth: 1,
                    paddingLeft: 10,
                    marginTop: 10
                }}></TextInput> */}
            </View>
            <View style={styles.footer}>
                <Button title='Hủy bỏ' onPress={handleCancel}></Button>
                <Button title='Lưu lại' onPress={handleAddStudent} disabled={loading}></Button>
            </View>
        </View>
    )
}

export default Add

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        paddingHorizontal: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 80
    },
    body: {
        paddingHorizontal: 10
    },
    textBody: {
        marginTop: 10,
        fontWeight: 'bold'
    },
    textInput: {
        height: 35,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        marginTop: 10
    },
    footer: {
        marginTop: 10,
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})