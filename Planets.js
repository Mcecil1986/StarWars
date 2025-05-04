import React, { useState, useEffect } from "react";
import { View, Text, Button, StatusBar, FlatList, ActivityIndicator,Modal } from "react-native";
import { SearchInput } from "./components/searchInput";
import { SearchModal } from "./components/searchModal";
import styles from "./styles";
import Swipeable from "./components/Swipeable";


const fetchPlanets = async () => {
  try {
    const response = await fetch("https://swapi.tech/api/planets/");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching planets:", error);
    return []
  }
};

export default function Planets({ navigation }) {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const [searchTerm, setSearchTerm] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  
  const [selectedPlanetName, setSelectedPlanetName] = useState(null);
  const [infoModalVisible, setInfoModalVisible] = useState(false);

  useEffect(() => {
   
    const getPlanets = async () => {
      const data = await fetchPlanets();
      setPlanets(data);
      setLoading(false);
      console.log('fetched  planets:', data);
    };

    getPlanets();
  }, []);

  const deleteItem = (indexToDelete) => {
    setPlanets((prev) => prev.filter((_,i) => i !== indexToDelete));
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
 
  const handleSearchSubmit = (text) => {
    setSearchTerm(text);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
   
      <View style={styles.topContainer}>
        <Text style={styles.Text}>Star Wars Planets</Text>

   
        <SearchInput onSubmit={handleSearchSubmit}/>
     
        <SearchModal 
        visible={modalVisible}
        text={searchTerm}
        onClose={ ()=> setModalVisible(false) }
        />

        <View style={styles.buttonContainer}>
          <Button
            title="Home"
            onPress={() => navigation.navigate("Home")}
            color= '#D8C021'
          />
          <Button
            title="Films"
            onPress={() => navigation.navigate("Films")}
            color= '#D8C021'
          />
          <Button
            title="Spaceships"
            onPress={() => navigation.navigate("Spaceships")}
            color= '#D8C021'
          />
        </View> 
      </View> 
      <FlatList
        data={planets}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Swipeable 
          name={item.name}
          onSwipe={() => {
            setSelectedPlanetName(item.name);
            setInfoModalVisible(true);
            }}
          />
        )}
      />

      <Modal 
      visible={infoModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setInfoModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.text}>Planet name: {selectedPlanetName}</Text>
            <Button  title="Close" onPress={() => setInfoModalVisible(false)} color="#D8C021"/>
          </View>
        </View>
      </Modal>

    </View> 
  );
}