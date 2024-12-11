import { StyleSheet } from "react-native"
import { Text, TouchableOpacity, View } from "react-native-web"

export function CardCustom({ title, author, releaseYear, quantity, onPressBtn, nameBtn }) {
    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardAuthor}>Autor: {author}</Text>
            <Text style={styles.cardYear}>Ano de Lançamento: {releaseYear}</Text>
            <Text style={styles.cardQuantity}>Quantidade Disponível: {quantity}</Text>

            <TouchableOpacity style={styles.button} onPress={() => onPressBtn}>
                <Text style={styles.buttonText}>{nameBtn}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
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
})