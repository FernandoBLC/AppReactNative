import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

function ScreenEmployee({ route, navigation }) {
    const { name, user, pass } = route.params;
    return (
        <View style={styles.container}>
            <Text variant="headlineSmall">Nombre</Text>
            <Text variant="titleLarge">{name}</Text>

            <Text variant="headlineSmall">Usuario</Text>
            <Text variant="titleLarge">{user}</Text>

            <Text variant="headlineSmall">Password</Text>
            <Text variant="titleLarge">{pass}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default ScreenEmployee;