import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store/store';
import { PaperProvider } from 'react-native-paper';
import NavigationConfig from './NavigationConfig';


export default function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <NavigationConfig />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}


