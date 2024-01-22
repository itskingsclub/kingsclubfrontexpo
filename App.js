// App.js
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import theme from './theme';

import Appnavigator from './Appnavigator';

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Appnavigator />
    </PaperProvider>
  );
}
