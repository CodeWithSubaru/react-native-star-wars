import ICharacter from "@/types/ICharacter";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import useApi from "@/hooks/useApi";
import RenderItem from "@/components/RenderItem";
import Colors from "@/constants/Colors";

const Page = () => {
  const { id } = useLocalSearchParams();
  const {
    data: character,
    loading,
    refresh,
    onRefresh,
  } = useApi<ICharacter>(`https://swapi.dev/api/people/${id}`, null, true);

  const { data: species } = useApi<ICharacter>(
    `${character?.species?.at(0)}`,
    null,
    true
  );

  return (
    <RenderItem
      item={character}
      loading={loading}
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={onRefresh}
          tintColor={Colors.light.tabIconSelected}
        />
      }
    >
      <View style={styles.container}>
        <Text style={styles.name}>{character?.name}</Text>
        <Text style={styles.details}>Birth Year: {character?.birth_year}</Text>
        <Text style={styles.details}>Gender: {character?.gender}</Text>
        <Text style={styles.details}>Height: {character?.height}</Text>
        <Text style={styles.details}>Species: {species?.name}</Text>
        <Text style={styles.details}>Skin Color: {character?.skin_color}</Text>
        <Text style={styles.films}>Films {character?.films}</Text>
      </View>
    </RenderItem>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 16,
    backgroundColor: Colors.light.backgroundPrimary,
    borderRadius: 8,
  },
  name: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 4,
  },
  details: {},
  films: {
    marginTop: 12,
  },
});
