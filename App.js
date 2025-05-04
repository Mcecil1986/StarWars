import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, SafeAreaView, TextInput, Button } from 'react-native';
import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import styles from './styles/styles';
import Header from './components/header';
import SearchResults from './screens/searchResults';
import NetInfo from '@react-native-community/netinfo';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [connected, setConnected] = useState("");

  const connectedMap = {
    none: "Disconnected",
    unknown: "Disconnected",
    wifi: "Connected",
    cell: "Connected",
    mobile: "Connected",
  };

  useEffect(() => {
    function onNetworkChange(connection) {
      setConnected(connectedMap[connection.type]);
    }

    const unsubscribe = NetInfo.addEventListener(onNetworkChange);

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    setShowResults(true);
  };

  if (showResults) {
    return <SearchResults query={searchQuery} goBack={() => setShowResults(false)} />;
  }

  return (
    <View style={styles.container}>
      <Header />
      <Text>{connected}</Text>
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.input}
          placeholder='Search YourFlix'
          placeholderTextColor={'#999'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Button title='Search' onPress={handleSearch} color='#D32F2F'/>
      </View>
    </View>
  );
}