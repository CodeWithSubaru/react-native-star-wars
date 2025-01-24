import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { FAVORITE_KEY } from "@/constants/StorageKey";
import IFilm from "@/types/IFilm";
import Colors from "@/constants/Colors";
import ListEmptyComponent from "@/components/ListEmptyComponent";
import { useFocusEffect } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const Page = () => {
  const [favoriteFilms, setFavoriteFilms] = useState<IFilm[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  async function fetchFavoriteFilms() {
    setLoading(true);
    try {
      const favorites = await AsyncStorage.getItem(FAVORITE_KEY);
      if (favorites) {
        setFavoriteFilms(JSON.parse(favorites));
      }
    } catch (err) {
      console.log("Error: ", err);
    } finally {
      setLoading(false);
      setRefresh(false);
    }
  }

  function onRefresh() {
    fetchFavoriteFilms();
    setRefresh(true);
  }

  const handleRemoveFavoriteFilm = async (item: IFilm) => {
    const updateFavorite = favoriteFilms.filter(
      (favorite) => favorite.episode_id !== item.episode_id
    );
    setFavoriteFilms(updateFavorite);

    try {
      await AsyncStorage.setItem(FAVORITE_KEY, JSON.stringify(updateFavorite));
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const renderItem = ({ item }: { item: IFilm }) => (
    <View style={styles.itemContainer}>
      <Text>{item.title}</Text>
      <TouchableOpacity>
        <Ionicons
          name="trash-outline"
          size={24}
          color={Colors.light.text}
          onPress={() => handleRemoveFavoriteFilm(item)}
        />
      </TouchableOpacity>
    </View>
  );

  useFocusEffect(
    useCallback(() => {
      fetchFavoriteFilms();
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteFilms}
        keyExtractor={(item) => `${item.episode_id}`}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={onRefresh}
            tintColor={Colors.light.tint}
          />
        }
        renderItem={renderItem}
        ListEmptyComponent={
          <ListEmptyComponent loading={loading} message="No films found..." />
        }
      />
    </View>
  );
};
export default Page;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  itemContainer: {
    padding: 16,
    margin: 8,
    borderRadius: 8,
    backgroundColor: Colors.light.backgroundPrimary,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
