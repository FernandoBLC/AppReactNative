import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import HomeScreen from "./src/containers/homescreen/HomeScreen";
import LoginEmpresa from './src/containers/loginempresa/LoginEmpresa';
import LoginEmpleado from './src/containers/loginempleado/LoginEmpleado';
import ListaEmpleados from './src/containers/listaempleados/ListaEmpleados';
import PostsScreen from './src/containers/postsscreen/PostsScreen';

const stack = createNativeStackNavigator();

function NavigationScreens() {
    return (
        <stack.Navigator
            initialRouteName='HomeScreen'

        >
            <stack.Screen options={{ headerShown: false }} name="HomeScreen" component={HomeScreen} />
            <stack.Screen options={{ headerShown: true, title: '', }} name="LoginEmpresa" component={LoginEmpresa} />
            <stack.Screen options={{ headerShown: true, title: '', }} name="LoginEmpleados" component={LoginEmpleado} />
            <stack.Screen options={{ headerShown: true, title: 'Empleados', headerTitleAlign: 'center'}} name="ListEmployes" component={ListaEmpleados} />
            <stack.Screen options={{ headerShown: true, title: 'Posts', headerTitleAlign: 'center'}} name="PostsScreen" component={PostsScreen} />
        </stack.Navigator>
    );
}

function NavigationConfig() {
    return (
        <NavigationContainer>
            <NavigationScreens />
        </NavigationContainer>
    );
}

export default NavigationConfig;