import { useEffect, useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native-web";
import { getBooks } from "../../api/api";
import { StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
    const [books, setBooks] = useState([]);

    const getData = async () => {
        const data = await getBooks();

        setBooks(data);
    }
    useEffect(() => {
        getData()
    }, [])
    
    return (
       <View
        style={styles.container}
       >
            <View style={styles.card}>
                <Text style={styles.cardTitle}>test</Text>
                <Text style={styles.cardAuthor}>Autor: test</Text>
                <Text style={styles.cardYear}>Ano de Lançamento: -</Text>
                <Text style={styles.cardQuantity}>Quantidade Disponível: tes</Text>

                <TouchableOpacity style={styles.button} onPress={() => alert('Livro selecionado')}>
                    <Text style={styles.buttonText}>Selecionar Livro</Text>
                </TouchableOpacity>
            </View>
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
    title: {
        fontSize: 16,
        color: "red",
        fontWeight: "bold"
    },
    card: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 20,
      },
      cardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      cardAuthor: {
        fontSize: 16,
        marginBottom: 5,
        color: '#555',
      },
      cardYear: {
        fontSize: 16,
        marginBottom: 5,
        color: '#555',
      },
      cardQuantity: {
        fontSize: 16,
        marginBottom: 15,
        color: '#555',
      },
      button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
      },


});