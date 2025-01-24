import Colors from "@/constants/Colors";
import IFilm from "@/types/IFilm";
import { Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FAVORITE_KEY } from "@/constants/StorageKey";

const Page = () => {
  const { id } = useLocalSearchParams();
  const [film, setFilm] = useState<IFilm | null>(null);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const fetchFilm = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://swapi.dev/api/films/${id}`);
      const data = await response.json();
      setFilm(data);
      checkFavoriteStatus(data);
    } catch (err) {
      console.log("Error: ", err);
    } finally {
      setLoading(false);
      setRefresh(false);
    }
  };

  const onRefresh = () => {
    setRefresh(true);
    fetchFilm();
  };

  const checkFavoriteStatus = async (film: IFilm) => {
    try {
      const favorites = await AsyncStorage.getItem(FAVORITE_KEY);

      if (favorites) {
        const favoriteFilms = JSON.parse(favorites) as IFilm[];
        setIsFavorite(
          favoriteFilms.some(
            (favorite: IFilm) => favorite.episode_id === film.episode_id
          )
        );
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const toggleFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem(FAVORITE_KEY);
      let favoriteFilms = favorites ? JSON.parse(favorites) : [];

      if (isFavorite) {
        favoriteFilms = favoriteFilms.filter(
          (f: IFilm) => f.episode_id !== film?.episode_id
        );
      } else {
        favoriteFilms.push(film);
      }
      await AsyncStorage.setItem(FAVORITE_KEY, JSON.stringify(favoriteFilms));
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchFilm();
    }, [])
  );

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!film) {
    return (
      <View>
        <Text>Film not found...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={onRefresh}
          tintColor={Colors.light.tabIconSelected}
        />
      }
    >
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={toggleFavorite}>
              <Ionicons
                name={isFavorite ? "star" : "star-outline"}
                size={24}
                color={Colors.light.icon}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Text style={styles.title}>{film.title}</Text>
      <Text style={styles.details}>Episode: {film.episode_id}</Text>
      <Text style={styles.details}>Director: {film.director}</Text>
      <Text style={styles.details}>Producer: {film.producer}</Text>
      <Text style={styles.details}>Release Date: {film.release_date}</Text>
      <Text style={styles.crawl}>{film.opening_crawl}</Text>
    </ScrollView>
  );
};
export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 16,
  },
  title: {
    marginBottom: 12,
    fontWeight: "bold",
    fontSize: 18,
  },
  details: {
    marginBottom: 8,
  },
  crawl: {
    marginTop: 16,
    fontStyle: "italic",
  },
});
