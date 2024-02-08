import { useFonts } from "expo-font"
import { Text } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StartPage, NotesPage } from "./src/pages/"

const Stack = createNativeStackNavigator()
export default function App() {
  const [fontsLoaded] = useFonts({
    "Mont-Regular": require("./assets/fonts/Mont/Mont-Regular.ttf"),
    "Mont-Bold": require("./assets/fonts/Mont/Mont-Bold.ttf"),
  })
  if (!fontsLoaded) {
    return <Text>Loading...</Text>
  }
  console.log(fontsLoaded)
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"Start"}
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Start' component={StartPage} />
        <Stack.Screen
          name='Main'
          component={NotesPage}
          screenOptions={{ gestureDirection: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
