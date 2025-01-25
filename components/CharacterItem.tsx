import ICharacter from "@/types/ICharacter";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "@/constants/Colors";
const CharacterItem: React.FC<{ character: ICharacter }> = ({ character }) => {
  const id = character.url.split("/").at(5);

  return (
    <Link href={`/people/${id}`} style={styles.characterItem} asChild>
      <TouchableOpacity>
        <Text style={styles.characterName}>{character.name}</Text>
      </TouchableOpacity>
    </Link>
  );
};

export default CharacterItem;

const styles = StyleSheet.create({
  characterItem: {
    flex: 1,
    backgroundColor: Colors.light.backgroundPrimary,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  characterName: {
    color: Colors.light.text,
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 2,
  },
  characterEpisodeId: {
    color: Colors.light.text,
    fontSize: 14,
  },
  characterCreated: {
    color: Colors.light.text,
    fontSize: 14,
  },
});
