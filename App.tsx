import React from 'react';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import { MainNavigator } from './navigators';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducer/reducer';
const store = createStore(reducer);

const App: React.FC = () => {
      let [fontsLoaded] = useFonts({
            'OpenSans-Regular': require('./assets/Fonts/OpenSans-Regular.ttf'),
      });

      if (!fontsLoaded) return <AppLoading />;
      else
            return (
                  <Provider store={store}>
                        <MainNavigator />
                  </Provider>
            );
};

export default App;
