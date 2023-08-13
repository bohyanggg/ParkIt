import { StyleSheet, View, Text, Pressable } from "react-native";

function HistoryItem(props) {
  return (
    <View style={styles.goalItem}>
      <Pressable
        android_ripple={{ color: "#dddddd" }}
        onPress={props.onGo.bind(this, props.text)}
        style={({ pressed }) => pressed && styles.pressedItem}
      >
        <Text style={styles.goalText}>{props.text}</Text>
      </Pressable>
    </View>
  );
}

export default HistoryItem;

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 12,
    backgroundColor: "#cccccc",
    paddingHorizontal: 20,
  },
  goalText: {
    padding: 8,
    borderRadius: 12,
    textAlign: "center",
    color: "purple",
  },
  pressedItem: {
    opacity: 0.5,
  },
});
