import { StyleSheet } from "react-native";
import { Text, TouchableOpacity, View } from "react-native-web";

export function CardCustom({ title, author, releaseYear, quantity, onPressBtn, nameBtn }) {
    const isDisabled = quantity === 0; 

    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardAuthor}>Autor: {author}</Text>
            <Text style={styles.cardYear}>Ano de Lançamento: {releaseYear}</Text>
            <Text style={styles.cardQuantity}>Quantidade Disponível: {quantity}</Text>

            <TouchableOpacity
                style={[styles.button, isDisabled && styles.disabledButton]} 
                onPress={isDisabled ? null : onPressBtn} 
                disabled={isDisabled} 
            >
                <Text style={[styles.buttonText, isDisabled && styles.disabledButtonText]}>
                    {!isDisabled ? nameBtn : "Estoque vazio"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "90%",
        minHeight: 150,
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center"
    },
    cardAuthor: {
        fontSize: 16,
        marginBottom: 5,
        color: "#555",
        textAlign: "center"
    },
    cardYear: {
        fontSize: 16,
        marginBottom: 5,
        color: "#555",
        textAlign: "center"
    },
    cardQuantity: {
        fontSize: 16,
        marginBottom: 15,
        color: "#555",
        textAlign: "center"
    },
    button: {
        backgroundColor: "#007BFF",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    disabledButton: {
        backgroundColor: "orange", 
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    disabledButtonText: {
        color: "#fff", 
        
    },
});
