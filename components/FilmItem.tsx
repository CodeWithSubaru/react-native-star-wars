import IFilm from "@/types/IFilm";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";

const FilmItem: React.FC<{ item: IFilm }> = ({ item }) => {
  const id = item.url.split("/").at(5);

  return (
    <Link href={`/films/${id}`} asChild>
      <TouchableOpacity>
        <View style={styles.filmItem}>
          <Text style={styles.filmTitle}>{item.title}</Text>
          <Text style={styles.filmEpisodeId}>Episode: {item.episode_id}</Text>
          <Text style={styles.filmCreated}>
            Release Date: {item.release_date}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default FilmItem;

const styles = StyleSheet.create({
  filmItem: {
    flex: 1,
    backgroundColor: Colors.light.backgroundPrimary,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  filmTitle: {
    color: Colors.light.text,
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 2,
  },
  filmEpisodeId: {
    color: Colors.light.text,
    fontSize: 14,
  },
  filmCreated: {
    color: Colors.light.text,
    fontSize: 14,
  },
});
