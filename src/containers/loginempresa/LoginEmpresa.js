import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { changeCredentials } from '../../store/loginSlice/LoginSlice';

import LoginAuth from '../../hooks/LoginAuth';



function LoginEmpresa({ navigation }) {
    const dataEmpresaUser = useSelector((state) => state.LoginEmpresaReducer);
    const { userLog, passLog, isLoading, dispatch, login, } = LoginAuth();

    const [user, setUser] = React.useState('');
    const [pass, setPass] = React.useState('');
    
    const [showPassword, setShowPassword] = React.useState(true);

    function handleEventEye() {
        showPassword == false ? setShowPassword(true) : setShowPassword(false);
    }

    const onSubmit = () => {
        const res = login({
            user: user,
            pass: pass,
        });
        setPass('');
        res === 1 ? navigation.navigate('ListEmployes') : console.log("Error en el acceso");
    }

    return (
        <View style={styles.container}>
            <TextInput
                label="Usuario"
                value={user}
                onChangeText={text => setUser(text)}
                style={styles.textInput}
            />
            <TextInput
                label="Password"
                value={pass}
                onChangeText={text => setPass(text)}
                secureTextEntry={showPassword}
                right={<TextInput.Icon icon="eye" onPress={handleEventEye} />}
                style={styles.textInput}
            />

            <Button
                icon="login"
                mode="contained-tonal"
                onPress={onSubmit}
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

    },
    textInput: {
        marginTop: 8,
        maxWidth: '60%',
        width: '100%',
    }
});

export default LoginEmpresa;