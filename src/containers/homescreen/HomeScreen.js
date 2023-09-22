import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';

function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Button
                icon="account-group-outline"
                mode="contained-tonal"
                onPress={() => navigation.navigate('LoginEmpresa')}
                style={styles.buttonStyle}
            >
                Login Empresa
            </Button>
            <Button
                icon="account-multiple-outline"
                mode="contained-tonal"
                onPress={() => console.log('Pressed')}
                style={styles.buttonStyle}
            >
                Login Empleado
            </Button>
            <Button
                icon="post"
                mode="contained-tonal"
                onPress={() => navigation.navigate('PostsScreen')}
                style={styles.buttonStyle}
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