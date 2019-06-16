import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Dialog from "react-native-dialog";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percentage: 0,
      dialogVisible: false,
      fadeAnim: new Animated.Value(1)
    };
  }

  showDialog = () => {
    this.setState({ dialogVisible: true });
  };

  handleAddDrink = type => {
    const isUnSafeDrink = type === "alcohol";

    let newPercentageValue =
      (isUnSafeDrink ? -20 : 20) + +this.state.percentage;

    if (newPercentageValue < 0 || newPercentageValue > 100) {
      newPercentageValue = this.state.percentage;
    }
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 3000
    }).start(() => this.setState({ fadeAnim: new Animated.Value(0) }));

    this.setState({
      percentage: newPercentageValue,
      dialogVisible: false
    });
  };

  handleDelete = () => {
    this.setState({ dialogVisible: false });
  };

  render() {
    const { percentage, fadeAnim } = this.state;

    return (
      <View style={styles.container}>
        <Text>Your daily water routine</Text>
        <Text style={styles.title}>{percentage}%</Text>
        <TouchableOpacity
          style={styles.waterContainer}
          onPress={() => {
            this.showDialog();
          }}
        >
          <LinearGradient colors={["#0B5BD3", "#FFF"]} style={{ flex: 1 }}>
            <Animated.View
              style={[
                styles.waterPortion,
                percentage === 100 && { opacity: fadeAnim },
                percentage > 80 && { opacity: 0 }
              ]}
            />
            <View style={styles.separator} />
            <Animated.View
              style={[
                styles.waterPortion,
                percentage === 80 && { opacity: fadeAnim },
                percentage > 60 && { opacity: 0 }
              ]}
            />
            <View style={styles.separator} />
            <Animated.View
              style={[
                styles.waterPortion,
                percentage === 60 && { opacity: fadeAnim },
                percentage > 40 && { opacity: 0 }
              ]}
            />
            <View style={styles.separator} />
            <Animated.View
              style={[
                styles.waterPortion,
                percentage === 40 && { opacity: fadeAnim },
                percentage > 20 && { opacity: 0 }
              ]}
            />
            <View style={styles.separator} />
            <Animated.View
              style={[
                styles.waterPortion,
                percentage === 20 && { opacity: fadeAnim },
                percentage > 0 && { opacity: 0 }
              ]}
            />
          </LinearGradient>
        </TouchableOpacity>
        <Dialog.Container
          visible={this.state.dialogVisible}
          onBackdropPress={() => this.setState({ dialogVisible: false })}
        >
          <Dialog.Title>Select drink type</Dialog.Title>
          <Dialog.Description>What did you drink?</Dialog.Description>
          <Dialog.Button
            label="A glass of pure Water"
            onPress={() => this.handleAddDrink("water")}
          />
          <Dialog.Button
            label="Drink with Sugar"
            onPress={() => this.handleAddDrink("water")}
          />
          <Dialog.Button
            label="Alcohol"
            onPress={() => this.handleAddDrink("alcohol")}
          />
        </Dialog.Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 32,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    textAlign: "center",
    color: "#007AFF",
    padding: 32
  },
  waterPortion: {
    borderWidth: 1,
    flex: 1,
    backgroundColor: "white"
  },
  waterContainer: {
    flex: 1,
    height: "80%",
    width: "80%",
    borderWidth: 4
  },
  separator: {
    borderWidth: 1
  }
});
