import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";

type Props = {};

const Home = (props: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Home</Text>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    margin: 5,
    marginTop: StatusBar.currentHeight,
  },
});
