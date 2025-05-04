import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, StatusBar } from "react-native";
import styles from "../styles/styles";
import SearchInput from "../components/searchInput"; // Assuming you have a SearchInput component
import { useNavigation } from "@react-navigation/native";
import Swipeable from "react-native-gesture-handler/Swipeable";


{
  try {
    const response = await fetch("https://www.swapi.tech/api/films");
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error loading Films: ", error);
    return [];
  }
};

export default function Films() {
  const [films, setFilms] = useState([]);
  const [filteredFilms, setFilteredFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getFilms = async () => {
      const data = await fetchFilms();
      setFilms(data);
      setFilteredFilms(data); // Initialize filtered list with all films
      setLoading(false);
    };
    getFilms();
  }, []);

  useEffect(() => {
    const filtered = films.filter((film) =>
      film.properties.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFilms(filtered);
  }, [searchTerm]);

  if (loading) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.text}>Star Wars Films</Text>

      <SearchInput
        onSubmit={(text) => setSearchTerm(text)}
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)} // Update search term dynamically
      />

      <FlatList
        data={filteredFilms}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.text}>{item.properties.title}</Text>
          </View>
        )}
      />
    </View>
  );
  const Item = ({ item }) => {
    const navigation = useNavigation();
  
    const renderRightActions = () => {
      return (
        <View style={styles.swipeContainer}>
          <Text style={styles.swipeText}>Swipe to View Details</Text>
        </View>
      );
    };
  
    return (
      <Swipeable
        renderRightActions={renderRightActions}
        onSwipeableRightOpen={() => navigation.navigate('Detail', { item })}
      >
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>{item.name}</Text>
        </View>
      </Swipeable>
    );
  };
  
  const styles = StyleSheet.create({
    itemContainer: {
      padding: 20,
      backgroundColor: '#ddd',
      marginBottom: 10,
    },
    swipeContainer: {
      backgroundColor: '#007bff',
      justifyContent: 'center',
      alignItems: 'center',
      width: 100,
      margin: 5,
    },
    swipeText: {
      color: 'white',
      fontWeight: 'bold',
    },
    itemText: {
      fontSize: 18,
    },
  });
  
  // Remove this export as there is already a default export for Films
}