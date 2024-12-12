import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native-web";
import { StyleSheet } from "react-native";
import { getRents, putReturnBook } from "../../api/api";

export default function RentCard({ rent, onReturn }) {
    const isReturned = !!rent.updated_at;


    return (

        <View style={styles.card}>
            <Text style={styles.title}>{rent.bookDetails.name}</Text>
            <Text style={styles.subtitle}>✍️ Autor: {rent.bookDetails.authorName}</Text>
            <Text>📅 Ano de Lançamento: {rent.bookDetails.releaseYear}</Text>
            <Text>📦 Estoque Disponível: {rent.bookDetails.quantity}</Text>
            <View style={styles.divider} />
            <Text style={styles.renterInfo}>👤 Locatário: {rent.renterName}</Text>
            <Text>📆 Data do Empréstimo: {new Date(rent.rentedAt).toLocaleString()}</Text>
            {isReturned && (
                <Text style={styles.returnInfo}>
                    ✅ Devolvido em: {new Date(rent.updated_at).toLocaleString()}
                </Text>
            )}
            <TouchableOpacity
                style={[
                    styles.button,
                    isReturned ? styles.returnedButton : styles.returnButton,
                ]}
                disabled={isReturned}
                onPress={onReturn}
            >
                <Text style={styles.buttonText}>
                    {isReturned ? "Devolvido" : "Devolver Livro"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export function RentScreen() {
    const [rents, setRents] = useState([]);

    const getRentsAll = async () => {
        const data = await getRents();
        setRents(data);
    }

    useEffect(() => {
        getRentsAll();
    }, [])

    const returnBook = async (rentId) => {
        try {
            await putReturnBook(rentId);
            getRentsAll();
        } catch (error) {
            console.error("Erro ao devolver o livro:", error);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
            >
                {rents.map((rent) => (
                    <RentCard key={rent.rentId} rent={rent} onReturn={() => returnBook(rent.rentId)} />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f4f4f4",
        alignItems: "center",
    },
    card: {
        backgroundColor: "#fff",
        padding: 16,
        marginVertical: 10,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
        width: "90%",
    },
    scrollView: {
        flexGrow: 1,
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
        color: "#333",
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 4,
        color: "#555",
    },
    divider: {
        height: 1,
        backgroundColor: "#ccc",
        marginVertical: 12,
    },
    renterInfo: {
        fontSize: 16,
        color: "#333",
    },
    button: {
        padding: 12,
        borderRadius: 8,
        marginTop: 12,
        alignItems: "center",
    },
    returnButton: {
        backgroundColor: "#FFD700",
    },
    returnedButton: {
        backgroundColor: "#32CD32",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});
