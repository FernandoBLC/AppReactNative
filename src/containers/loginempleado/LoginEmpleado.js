import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput, MD2Colors, Modal, Portal, Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { changeCredentials } from '../../store/loginSlice/LoginSlice';
import * as SQLite from 'expo-sqlite';

function LoginEmpleado({ navigation }) {
    const db = SQLite.openDatabase("empleados.db");
    const [modalVisible, setModalVisible] = React.useState(false);
    const [user, setUser] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [error, setError] = React.useState('');
    const dispatch = useDispatch();
    const containerStyle = {
        backgroundColor: 'white', padding: 20,
    };

    const [showPassword, setShowPassword] = React.useState(true);

    function handleEventEye() {
        showPassword == false ? setShowPassword(true) : setShowPassword(false);
    }

    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);

    const modalWithMessage = (msg) => {
        console.log("Entro");
        showModal();
        setError(msg);
    }

    const onSubmit = () => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM empleados WHERE user = ? AND pass = ?', [user, pass],
                (txObj, resultSet) => {
                    const res = resultSet.rows._array;
                    if (res.length > 0) {
                        dispatch(changeCredentials({
                            user: res[0].name,
                            pass: res[0].pass,
                        }));
                        setPass('');
                        navigation.navigate('ScreenEmployee', {
                            name: res[0].name,
                            user: res[0].user,
                            pass: res[0].pass,
                        });
                    } else {
                        setError("COMPROBAR LAS CREDENCIALES");
                        showModal();
                    }

                },
                (txObj, error) => {
                    console.log("Entro error");
                    modalWithMessage(error);
                }
            );
        });
    }

    return (
        <View style={styles.container}>
            <TextInput
                label="Usuario"
                value={user}
                onChangeText={text => setUser(text)}
                style={styles.textInput}
                selectionColor={MD2Colors.deepPurple300}
            />
            <TextInput
                label="Password"
                value={pass}
                onChangeText={text => setPass(text)}
                secureTextEntry={showPassword}
                right={<TextInput.Icon icon="eye" onPress={handleEventEye} />}
                style={styles.textInput}
                selectionColor={MD2Colors.deepPurple300}
            />

            <Button
                icon="login"
                mode="contained-tonal"
                onPress={onSubmit}
                style={styles.buttonStyle}
                buttonColor={MD2Colors.deepPurpleA100}
            >
                Iniciar Sesion
            </Button>

            <Portal >
                <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <View style={styles.modalV1}>


                        <Text variant="headlineSmall">Error</Text>
                        <Text variant="titleLarge">{error}</Text>

                        <View style={styles.modalV2}>
                            <Button
                                icon="cancel"
                                mode="contained-tonal"
                                onPress={hideModal}
                                style={styles.buttonModal}
                                buttonColor={MD2Colors.redA200}
                            >
                                OK
                            </Button>
                        </View>
                    </View>
                </Modal>
            </Portal>
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
    },
    modalV1: {
        alignItems: 'center',
    },
    modalV2: {
        marginTop: 8,
        flex: 0,
        flexDirection: 'row',
    },
});

export default LoginEmpleado;