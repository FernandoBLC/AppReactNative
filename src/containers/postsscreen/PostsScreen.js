import * as React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Button, Text, Card, ActivityIndicator, MD2Colors, Divider } from 'react-native-paper';


function PostsScreen() {
    const [posts, setPosts] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        setIsLoading(true);
        const getPosts = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                if (!response.ok) {
                    throw new Error('La solicitud no tuvo éxito');
                }
                const data = await response.json();
                console.log('Posts recibidos:', data);
                setPosts(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error al realizar la solicitud:', error);
                setIsLoading(false);
            }
        };

        getPosts();
    }, []);
    if (isLoading) {
        return (
            <View style={styles.loadingStyle}>
                <ActivityIndicator
                    animating={true}
                    size='large'
                    color={MD2Colors.deepPurpleA200}
                />
            </View>
        )
    }

    if (!posts) {
        return (
            <ScrollView style={styles.scrollStyle}>
                <View>
                    <Text>No hay posts</Text>
                </View>
            </ScrollView>
        );
    }

    const showPosts = () => {
        return posts.map((item, index) => {
            return (
                <View key={index}>
                    <Card style={styles.cardStyle} >
                        <Card.Title title={item.title} subtitle={`User ID:${item.userId}`} />
                        <Card.Content>
                            <Text variant="titleLarge">ID</Text>
                            <Text variant="bodyMedium">{item.id}</Text>
                            <Text variant="titleLarge">Descripcion</Text>
                            <Text variant="bodyMedium">{item.body}</Text>
                        </Card.Content>
                        <Card.Actions>
                            {/* <Button onPress={() => showModalProfile(item)} icon="eye-check">Ver</Button> */}
                            {/* <Button>Ok</Button> */}
                        </Card.Actions>
                    </Card>
                    <Divider bold={true} />
                </View>
            )
        })
    }

    return (
        <ScrollView style={styles.scrollStyle}>
            <View>
                {showPosts()}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonStyle: {
        width: '100%'
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
    },
    loadingStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default PostsScreen;