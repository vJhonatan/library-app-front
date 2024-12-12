import { useEffect, useState } from "react";
import { Button, ScrollView, Text, TextInput, View, Image, StyleSheet, Modal } from "react-native";
import { getBooks, BASE_URL, postRent } from "../../api/api";

import { CardCustom } from "../components/CardCustom";
import { TotalDisplay } from "../components/TotalDisplay";

export default function HomeScreen({ navigation }) {

    const [searchText, setSearchText] = useState("");
    const [filteredBooks, setFilteredBooks] = useState([]);

    const [books, setBooks] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [selectedBook, setSelectedBook] = useState(null);
    const [pathImage, setPathImage] = useState("");

    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const getData = async () => {
        const data = await getBooks();
        setBooks(data);
        setFilteredBooks(data)
    };

    const handleOpenModal = (book, path) => {
        setPathImage(`${BASE_URL}/assets/${path}`);
        setSelectedBook(book);
        setModalVisible(true);
    };

    const handleSearch = (text) => {
        setSearchText(text);
        if (text) {
            const filtered = books.filter((book) =>
                book.name.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredBooks(filtered);
        } else {
            setFilteredBooks(books);
        }
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setName("");
        setBirthday("");
    };

    const handleSuccessClose = () => {
        setSuccessMessage(null);
        handleCloseModal();
    };

    const handleErrorClose = () => {
        setErrorMessage(null);
    };

    const handleSubmit = async () => {
        const rentData = {
            name,
            birthDate: birthday
        }

        const data = await postRent(selectedBook.id, rentData);

        if (data.success) {
            setSuccessMessage("Empréstimo realizado com sucesso!");
        } else {
            setErrorMessage(data.data.message || "Ocorreu um erro ao tentar emprestar o livro.");
        }

        getData();

        handleCloseModal();
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getData();
        });
    
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>
            <TotalDisplay total={filteredBooks.length || 0} />

            <TextInput
                style={styles.searchInput}
                placeholder="Pesquisar título do livro"
                value={searchText}
                onChangeText={handleSearch}
            />

            <ScrollView contentContainerStyle={styles.scrollView}>
                {filteredBooks.length === 0 ? (
                    <Text key={1} style={styles.noRecordsText}>Nenhum registro encontrado.</Text>
                ) : (
                    filteredBooks.map((item) => (
                        <CardCustom
                            key={item.id}
                            title={item.name}
                            author={item.authorName}
                            releaseYear={item.releaseYear}
                            quantity={item.quantity}
                            nameBtn="Emprestar Livro"
                            onPressBtn={() => handleOpenModal(item, item.pathImage)}
                        />
                    ))
                )}
            </ScrollView>
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Image
                            source={{ uri: pathImage }}
                            style={styles.image}
                        />
                        <Text style={styles.modalTitle}>Emprestar Livro</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nome do locatário"
                            value={name}
                            onChangeText={setName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Ano de Nascimento"
                            value={birthday}
                            onChangeText={setBirthday}
                        />
                        <View style={styles.buttonContainer}>
                            <Button title="Cancelar" onPress={handleCloseModal} color="#ff5c5c" />
                            <Button title="Confirmar" onPress={handleSubmit} color="#4caf50" />
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                transparent={true}
                visible={!!successMessage}
                animationType="slide"
            >
                <View style={styles.modalBackgroundErr}>
                    <View style={styles.modalContainerErr}>
                        <Text style={styles.modalTextErr}>{successMessage}</Text>
                        <Button title="Ok" onPress={handleSuccessClose} />
                    </View>
                </View>
            </Modal>

            <Modal
                transparent={true}
                visible={!!errorMessage}
                animationType="slide"
            >
                <View style={styles.modalBackgroundErr}>
                    <View style={styles.modalContainerErr}>
                        <Text style={styles.modalTextErr}>{errorMessage}</Text>
                        <Button title="Fechar" onPress={handleErrorClose} color="red" />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: 'flex-start',
        alignItems: "center",
    },
    searchInput: {
        width: "90%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    scrollView: {
        flexGrow: 1,
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        padding: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
    },
    image: {
        width: 150,
        height: 250,
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    noRecordsText: {
        fontSize: 16,
        color: "#888",
        textAlign: "center",
        marginTop: 20,
        width: "90%"
    },
    modalBackgroundErr: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContainerErr: {
        width: "80%",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    modalTextErr: {
        marginBottom: 15,
        textAlign: "center",
    },
});
