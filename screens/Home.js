import { Button, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome6 } from '@expo/vector-icons'
import axios from 'axios'
import { useIsFocused } from '@react-navigation/native'

const API_URL = 'http://kiemtra.stecom.vn:8888/api/ung-vien/NDK0216766/get-all'


const Home = ({ navigation }) => {

    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(true)
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [searchText, setSearchText] = useState('');
    const isFocused = useIsFocused()

    const fetchStudents = async () => {
        try {
            const res = await axios.get(API_URL)
            setStudents(res.data.items)
            setFilteredStudents(res.data.items)
            setLoading(false)
        } catch (err) {
            console.error('Error fetching students: ', err)
        }
    }

    useEffect(() => {
        fetchStudents()
    }, [isFocused])

    const handleSearch = () => {
        const filtered = students.filter(student =>
            student.name.toLowerCase().includes(searchText.toLowerCase()) ||
            student.studentCode.toLowerCase().includes(searchText.toLowerCase())
        )
        setFilteredStudents(filtered)
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>
                    Danh sách ứng viên
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Add')}>
                    <FontAwesome6 name='add' color='black' size={25}></FontAwesome6>
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <TextInput
                    placeholder='Tìm kiếm...'
                    style={styles.textInput}
                    value={searchText}
                    onChangeText={setSearchText}></TextInput>
                <Button title='Tìm kiếm' onPress={handleSearch}></Button>
            </View>
            <FlatList
                data={filteredStudents}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Detail', { student: item })}>
                        <View style={{ paddingHorizontal: 20 , marginTop : 10}}>
                            {/* <Text>Id: {item.id}</Text> */}
                            <Text>Tên ứng viên: {item.tenUngVien}</Text>
                            <Text>Mã ứng viên: {item.maUngVien}</Text>
                            <Text>Email: {item.email}</Text>
                            
                            <View style={{ width: '100%', height: 2, backgroundColor: 'gray', marginVertical: 5}}></View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        paddingVertical: 20
    },
    header: {
        marginTop: 10,
        flexDirection: 'row',
        marginHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textHeader: {
        fontWeight: 'bold',
        fontSize: 24,
        marginLeft: 80
    },
    body: {
        marginTop: 10,
        flexDirection: 'row',
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textInput: {
        height: 35,
        width: 250,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10
    },
    // footer: {
    //     marginTop: 10,
    //     paddingHorizontal: 10
    // }
})