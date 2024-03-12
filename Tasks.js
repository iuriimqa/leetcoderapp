import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View,Alert } from "react-native";
import { Text } from "react-native-paper";
import { Button } from "@rneui/themed";
import axios from "axios";
import { ApiFetcher } from "./components/Apifetcher";
import { useNavigation } from "@react-navigation/native";

const TaskList = () => {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(true);
  const [randomTask, setRandomTask] = useState();
  const [tasks, setTasks] = useState({
    easy: [],
    medium: [],
    hard: [],
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const easyTasks = await axios.get("https://leetcoderx.onrender.com/easy");
        const mediumTasks = await axios.get("https://leetcoderx.onrender.com/medium");
        const hardTasks = await axios.get("https://leetcoderx.onrender.com/hard");

        setTasks({
          easy: easyTasks.data,
          medium: mediumTasks.data,
          hard: hardTasks.data,
        });
      } catch (error) {
        console.error("Tasks fetching error:", error);
      }
    };

    fetchTasks();
  }, []);

  const selectRandomTask = (cat) => {
    try {
      const randomTask = cat[Math.floor(Math.random() * cat.length)];
      navigation.navigate("Daily", { randtask: randomTask.titleslug });
    } catch (err) {
      Alert.alert('Task Not Found');
    }
  };

  const handlePress = () => setExpanded(!expanded);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttons}>
        <Text
          style={{ color: "lightblue", shadowColor: "black" }}
          variant="headlineMedium"
        >
          What is your level?
        </Text>
        <Button
          style={styles.button}
          color={"success"}
          onPress={() => selectRandomTask(tasks.easy)}
        >
          Easy task
        </Button>
        <Button
          style={styles.button}
          color={"primary"}
          onPress={() => selectRandomTask(tasks.medium)}
        >
          Medium Task
        </Button>
        <Button
          style={styles.button}
          color={"warning"}
          onPress={() => selectRandomTask(tasks.hard)}
        >
          Hard Task
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    paddingTop: 10,
  },
});

export default TaskList;
