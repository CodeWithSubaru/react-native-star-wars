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
import RenderItem from "@/components/RenderItem";
import useApi from "@/hooks/useApi";

const Page = () => {
  const { id } = useLocalSearchParams();
  const {
    data: film,
    loading,
    refresh,
    fetchItems: fetchFilm,
    onRefresh,
  } = useApi<IFilm>(
    `https://swapi.dev/api/films/${id}`,
    null,
    true,
    async (film: IFilm) => {
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
    }
  );

  const [isFavorite, setIsFavorite] = useState(false);

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

  return (
    <RenderItem
      item={film}
      loading={loading}
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
      <Text style={styles.title}>{film?.title}</Text>
      <Text style={styles.details}>Episode: {film?.episode_id}</Text>
      <Text style={styles.details}>Director: {film?.director}</Text>
      <Text style={styles.details}>Producer: {film?.producer}</Text>
      <Text style={styles.details}>Release Date: {film?.release_date}</Text>
      <Text style={styles.crawl}>{film?.opening_crawl}</Text>
    </RenderItem>
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
