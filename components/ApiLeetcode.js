import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  SafeAreaView,
  useWindowDimensions,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  Image
} from "react-native";
import {
  Headline,
  Paragraph,
  TextInput,
  Text,
  IconButton,ActivityIndicator
} from "react-native-paper";
import { Button } from "@rneui/base";
import React, { useState,useEffect } from "react";
import axios from "axios";
import HTML from "react-native-render-html";
import { Example } from "../components/СodeForm";
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';


export const ApiFetcher = ({route}) => {
  const { randtask } = route.params;
  const [task, setTask] = useState(null);
  const [hint, setHint] = useState(0);
  const [response, setResponse] = useState();
  const windowWidth = useWindowDimensions().width;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const hints = () => {
    if (hint <= task.hints.length) {
      setHint(hint+1)
      alert(`${task.hints[hint]}`);
    } else {
      alert('Sorry no more hints..');
    }
  };

  const fetchSolution = async () => {
    navigation.navigate('answer', { questionx: task.question });
  };
  

  const fetching = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://leetcdtasker.onrender.com/select?titleSlug=${randtask}`);
      setTask(response.data);
      setIsLoading(false);
    } catch (error) {
      Alert.alert("We can't load this task correctly, try again please");
    }
  };
  useEffect(() => {
    fetching();
  }, [randtask]);
  
  return (
      <SafeAreaView style={styles.container}>
        {isLoading && <Image
  source={require('../loading.gif')}
  style={{ width: '100%', height: '100%' }}
/>}
        <Text variant="headlineMedium">{task && task.questionTitle}</Text>
        <StatusBar style="dark" />
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Paragraph>
            {task && (
              <HTML
                source={{
                  html: `<div style="width:100%;">${task.question}</div>`,
                }}
                contentWidth={windowWidth}
                ignoredDomTags={["font"]}
              />
            )}
          </Paragraph>

          
        </ScrollView>
        
        <Button  color={'warning'} onPress={hints}>Hint</Button>
        
        <Button
          color={'primary'}
          onPress={fetchSolution}
        >
          Answer
        </Button>

      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    marginLeft: 5,
  },
});
