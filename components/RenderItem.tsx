import { PropsWithChildren } from "react";
import {
  RefreshControlProps,
  ScrollView,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from "react-native";

const Page = ({
  loading,
  item,
  styles,
  refreshControl,
  children,
}: PropsWithChildren<{
  loading: boolean;
  item: any | null;
  refreshControl?:
    | React.ReactElement<
        RefreshControlProps,
        string | React.JSXElementConstructor<any>
      >
    | undefined;
  styles?: StyleProp<ViewStyle>;
}>) => {
  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!item) {
    return (
      <View style={styles}>
        <Text>Film not found...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles} refreshControl={refreshControl}>
      {children}
    </ScrollView>
  );
};
export default Page;
