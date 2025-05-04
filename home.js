import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, StatusBar } from "react-native";
import styles from "../styles/styles";
import SearchInput from "../components/searchInput"; // Assuming you have a SearchInput component


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
}