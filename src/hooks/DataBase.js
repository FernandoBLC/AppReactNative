import * as React from 'react';
import * as SQLite from 'expo-sqlite';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

function DataBase() {
    const db = SQLite.openDatabase("testdb.db");
    // const [load, setLoad] = React.useState(true);
    const [dataDB, setDataDB] = React.useState([]);

    // React.useEffect(() => {
    //     db.transaction((tx) => {
    //         tx.executeSql('CREATE TABLE IF NOT EXISTS tablaprueba (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);');
    //     });

    //     db.transaction((tx) => {
    //         tx.executeSql('SELECT * FROM tablaprueba', null,
    //             (txObj, resultSet) => setDataDB(resultSet.rows._array)),
    //             (txObj, error) => console.log("Error\n", error)
    //     });
    //     setLoad(false);
    // }, [])

    // if (load) {
    //     return (
    //         <View>
    //             <Text>Cargando</Text>
    //         </View>
    //     )
    // }

    const createTable = () => {
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS tablaprueba (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);');
        });
    }

    const getData = () => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM tablaprueba', null,
                (txObj, resultSet) => setDataDB(resultSet.rows._array)),
                (txObj, error) => console.log("Error\n", error)
        });
    }

    const addData = () => {
        db.transaction(tx => {
            tx.executeSql('INSERT INTO tablaprueba (name) values (?)', [user],
                (txObj, resultSet) => {
                    let existingNames = [...dataDB];
                    console.log("Esto es resultSet\n", resultSet);
                    existingNames.push({ id: resultSet.insertId, name: user });
                    console.log("Esto es exixtingNames\n", existingNames);
                    setDataDB[existingNames];
                    setUser('');
                },
                (txObj, error) => console.log("Sucedio el siguiente error\n", error),
            )
        })
    }

    const showDataDB = () => {
        return dataDB.map((name, index) => {
            return (
                <View key={index}>
                    <Text>{name.name}</Text>
                </View>
            )
        })
    }

    return {
        db,
        // load,
        dataDB,
        createTable,
        getData,
        addData,
        showDataDB,
    }
}

export default DataBase;