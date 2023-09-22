import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

function LoginEmpleado() {
    const [credentials, setCredentials] = React.useState({
        User: "",
        Password: "",
    });
    const [showPassword, setShowPassword] = React.useState(true)

    return (
        <View style={styles.container}>
            <TextInput
                label="Usuario"
                value={credentials.User}
                onChange={text => console.log("Esto es text\n", text)}
            />
            <TextInput
                label="Password"
                value={credentials.User}
                onChange={text => console.log("Esto es text\n", text)}
                secureTextEntry={showPassword}
            />

            <Button
                icon="post"
                mode="contained-tonal"
                onPress={() => console.log('Pressed')}
                style={styles.buttonStyle}
            >
                Iniciar Sesion
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonStyle: {
        marginTop: 8,
    }
})

export default LoginEmpleado;