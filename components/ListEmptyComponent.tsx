import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

interface IProps {
  loading: boolean;
  message: string;
}

const ListEmptyComponent = ({
  loading,
  message = "No Items Found...",
}: IProps) => {
  return (
    <View style={styles.emptyContainer}>
      {loading ? (
        <ActivityIndicator size="small" color={Colors.light.text} />
      ) : (
        <Text style={styles.emptyText}>{message}</Text>
      )}
    </View>
  );
};

export default ListEmptyComponent;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: Colors.light.text,
  },
});
