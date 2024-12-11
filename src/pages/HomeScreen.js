import { useEffect, useState } from "react";
import { Button, ScrollView, Text, TextInput, View } from "react-native-web";
import { getBooks } from "../../api/api";
import { Platform, StyleSheet, Modal } from "react-native";
import "react-datepicker/dist/react-datepicker.css";

import { CardCustom } from "../components/CardCustom";
import { TotalDisplay } from "../components/TotalDisplay";
import DatePicker from "react-datepicker";

export default function HomeScreen({ navigation }) {
    const [books, setBooks] = useState([]);

    const [birthday, setBirthday] = useState("");
    const [completedName, setCompletedName] = useState("");
    
    const [isModalVisible, setIsModalVisible] = useState(false);


    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const getData = async () => {
        const data = await getBooks();

        setBooks(data);
    }

    const handleSubmit = () => {
        console.log(books)
    }

    useEffect(() => {
        getData()
    }, [])
    
    return (
       <View
            style={styles.container}
       >
        <TotalDisplay
            total={books.length || 0}
        />
            <ScrollView
                contentContainerStyle={styles.scrollView}
            >
                {books.map((item) => (
                    <CardCustom
                        key={item.id}
                        title={item.name}
                        author={item.authorName}
                        releaseYear={item.releaseYear}
                        quantity={item.quantity}
                        nameBtn="Emprestar Livro"
                    />
                ))}  
            </ScrollView>

            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Emprestar Livro</Text>

                    <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.label}>Nome Completo:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o nome completo"
                        value={completedName}
                        onChangeText={setCompletedName}
                    />

                    <Text style={styles.label}>Data de Aniversário:</Text>
                    <DatePicker
                        selected={birthday}
                        onChange={(date) => setBirthday(date)}
                        dateFormat="dd/MM/yyyy"
                        className="datepicker-input"
                        style={styles.datePickerInput}
                    />

                    <Button title="Confirmar Empréstimo" onPress={handleSubmit} />
                    </ScrollView>
                </View>
                </Modal>
       </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',  
        alignItems: 'center',      
        backgroundColor: '#f0f0f0',
        padding: 20,
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
      },
      modalTitle: {
        fontSize: 20,
        marginBottom: 20,
      },
      label: {
        fontSize: 16,
        marginBottom: 10,
      },
      input: {
        width: 250,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingLeft: 10,
      },
      datePickerInput: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingLeft: 10,
        marginTop: 10, 
      },
});