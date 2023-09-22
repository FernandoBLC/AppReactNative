import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, MD2Colors } from 'react-native-paper';

function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Button
                icon="account-group-outline"
                mode="contained-tonal"
                onPress={() => navigation.navigate('LoginEmpresa')}
                style={styles.buttonStyle}
                buttonColor={MD2Colors.deepPurpleA100}
            >
                Login Empresa
            </Button>
            <Button
                icon="account-multiple-outline"
                mode="contained-tonal"
                onPress={() => navigation.navigate('LoginEmpleados')}
                style={styles.buttonStyle}
                buttonColor={MD2Colors.deepPurpleA100}
            >
                Login Empleado
            </Button>
            <Button
                icon="post"
                mode="contained-tonal"
                onPress={() => navigation.navigate('PostsScreen')}
                style={styles.buttonStyle}
                buttonColor={MD2Colors.deepPurpleA100}
            >
                Posts
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
});

export default HomeScreen;