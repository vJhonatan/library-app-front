import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from "./src/pages/HomeScreen";
import { RentScreen } from "./src/pages/RentScreen";
import { Button, View } from 'react-native-web';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={({ navigation }) => ({
            title: "Bem-vindo à Biblioteca",
            headerRight: () => (
              <View style={{ marginRight: 15 }}>
                <Button
                  title="Empréstimos"
                  onPress={() => navigation.navigate("Rent")}
                  color="#007BFF"
                />
              </View>
            ),
          })}
        />
        <Stack.Screen 
          name="Rent"
          component={RentScreen}
          options={({ navigation }) => ({
            title: "Lista de empréstimos",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}