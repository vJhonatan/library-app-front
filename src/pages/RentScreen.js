import { Button, Text } from "react-native-web";

export default function RentScreen() {
    return (
        <Button
            onPress={() => navigation.navigate("Home")}
        >
        Ir para Home
    </Button>
    )
}