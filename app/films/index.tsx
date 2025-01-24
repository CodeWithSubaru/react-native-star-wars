import { StyleSheet, FlatList, View, RefreshControl } from "react-native";
import Colors from "@/constants/Colors";
import { useEffect, useState } from "react";
import IFilm from "@/types/IFilm";
import ListEmptyComponent from "@/components/ListEmptyComponent";
import FilmItem from "@/components/FilmItem";

const Page = () => {
  const [films, setFilms] = useState<IFilm[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchFilms = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      const data = await response.json();
      setFilms(data.results);
    } catch (err) {
      console.log("Error: ", err);
    } finally {
      setLoading(false);
      setRefresh(false);
    }
  };

  const onRefresh = () => {
    setRefresh(true);
    fetchFilms();
  };

  useEffect(() => {
    fetchFilms();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={films}
        keyExtractor={(item) => `${item.episode_id}`}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={onRefresh}
            tintColor={Colors.dark.tint}
          />
        }
        renderItem={({ item }) => <FilmItem item={item} />}
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
    paddingVertical: 8,
  },
  details: {},
});
