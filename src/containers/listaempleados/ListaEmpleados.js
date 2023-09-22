import * as React from 'react';
import { View, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { Button, Text, Modal, Portal, TextInput, Avatar, Card, MD2Colors } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';

function ListaEmpleados({ navigation }) {
    const db = SQLite.openDatabase("testdb1.db");
    const [load, setLoad] = React.useState(true);
    const [dataDB, setDataDB] = React.useState([]);
    const [name, setName] = React.useState('');
    const [user, setUser] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [profile, setProfile] = React.useState('');

    const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

    const [modalVisible, setModalVisible] = React.useState(false);
    const [modalProfile, setModalProfile] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(true);
    const containerStyle = {
        backgroundColor: 'white', padding: 20,
    };

    function handleEventEye() {
        showPassword == false ? setShowPassword(true) : setShowPassword(false);
    }

    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);
    const showModalProfile = (profile) => {
        setProfile(profile);
        setModalProfile(true);
    };
    const hideModalProfile = () => setModalProfile(false);

    React.useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS tablaprueba1 (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, user TEXT, pass Text);');
        });

        // setDataDB(resultSet.rows._array))
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM tablaprueba1', null,
                (txObj, resultSet) => setDataDB(resultSet.rows._array)),
                (txObj, error) => console.log("Error\n", error)
        });
        setLoad(false);
    }, []);

    if (load) {
        return (
            <View>
                <Text>Cargando</Text>
            </View>
        )
    }

    const addData = () => {
        db.transaction(tx => {
            tx.executeSql('INSERT INTO tablaprueba1 (name, user, pass) values (?,?,?)', [name, user, pass],
                (txObj, resultSet) => {
                    let existingNames = [...dataDB];
                    existingNames.push({ id: resultSet.insertId, name: name, user: user, pass: pass });
                    setDataDB(existingNames);
                    setUser('');
                },
                (txObj, error) => console.log("Sucedio el siguiente error\n", error),
            )
        });
        hideModal();
        setName('')
        setUser('')
        setPass('')
    }

    const showDataDB = () => {
        return dataDB.map((item, index) => {
            return (
                <Card style={styles.cardStyle} key={index}>
                    <Card.Content>
                        <Text variant="headlineSmall">Nombre</Text>
                        <Text variant="titleLarge">{item.name}</Text>
                    </Card.Content>
                    <Card.Actions>
                        <Button onPress={() => showModalProfile(item)} icon="eye-check">Ver</Button>
                        {/* <Button>Ok</Button> */}
                    </Card.Actions>
                </Card>
            )
        })
    }


    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollStyle}>
                <View>
                    {showDataDB()}
                </View>
            </ScrollView>
            <Portal >
                <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <View style={styles.modalV1}>
                        <Text variant="headlineLarge">Crear Empleado</Text>
                        <TextInput
                            label="Nombre"
                            value={name}
                            onChangeText={text => setName(text)}
                            style={styles.textInput}
                        />
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
                        <View style={styles.modalV2}>
                            <Button
                                icon="plus"
                                mode="contained-tonal"
                                onPress={addData}
                                style={styles.buttonModal}
                                buttonColor={MD2Colors.deepPurpleA100}
                                >
                                Crear
                            </Button>
                            <Button
                                icon="cancel"
                                mode="contained-tonal"
                                onPress={hideModal}
                                style={styles.buttonModal}
                                buttonColor={MD2Colors.redA200}
                            >
                                Cancelar
                            </Button>
                        </View>
                    </View>
                </Modal>
            </Portal>

            <Portal >
                <Modal visible={modalProfile} onDismiss={hideModalProfile} contentContainerStyle={containerStyle}>
                    <View style={styles.modalV1}>
                        {/* <Text variant="headlineLarge">Profile Info</Text> */}

                        <Text variant="headlineSmall">Nombre</Text>
                        <Text variant="titleLarge">{profile.name}</Text>

                        {/* <Text variant="headlineSmall">Usuario</Text>
                        <Text variant="titleLarge">{profile.user}</Text>

                        <Text variant="headlineSmall">Password</Text>
                        <Text variant="titleLarge">{profile.pass}</Text> */}
                        <View style={styles.modalV2}>
                            <Button
                                icon="cancel"
                                mode="contained-tonal"
                                onPress={hideModalProfile}
                                style={styles.buttonModal}
                                buttonColor={MD2Colors.redA200}
                            >
                                Salir
                            </Button>
                        </View>
                    </View>
                </Modal>
            </Portal>

            <Button
                icon="account-plus"
                mode="contained-tonal"
                onPress={showModal}
                style={styles.buttonStyle}
                buttonColor={MD2Colors.deepPurpleA100}
            >
                Crear Nuevo Empleado
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
        width: '100%',
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
    buttonModal: {
        marginHorizontal: 8,
    },
    cardStyle: {
        width: '100%',
        marginVertical: 8,
    },
    scrollStyle: {
        width: '100%',

    }
});

export default ListaEmpleados; 