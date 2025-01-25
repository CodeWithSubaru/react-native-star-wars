import CharacterItem from "@/components/CharacterItem";
import useApi from "@/hooks/useApi";
import ICharacter from "@/types/ICharacter";
import { View, FlatList } from "react-native";

const Page = () => {
  const { data: people } = useApi<ICharacter[]>(
    "https://swapi.dev/api/people/",
    []
  );

  return (
    <View>
      <FlatList
        data={people}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <CharacterItem character={item} />}
      />
    </View>
  );
};
export default Page;
