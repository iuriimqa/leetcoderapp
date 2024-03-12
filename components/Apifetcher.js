import React, { useCallback, useState, useRef,useEffect } from "react";
import { View, SafeAreaView, ScrollView,Image } from "react-native";
import { Button } from "@rneui/themed";
import { Text } from "@rneui/base";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import Markdown from "react-native-marked";
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';


const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

const Apifetcher = ({route}) => {
  const { randtask } = route.params;
  const [reslt, setReslt] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();



  const fetchSolution = async () => {
    navigation.navigate('answer', { questionx: reslt });
  };


  const run = useCallback(async () => {

    setIsLoading(true);
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];


    const parts = [
      {
        text: `Write description and question of this Leetcode problem wiithout answer:

    **Problem:**
    
    ${randtask}
    
    `,
      },
    ];

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });

    const response = result.response;
    setReslt(response.text());
    setIsLoading(false);
  }, []);


  useEffect(() => {
    run();
  }, []);

  return (
    <ScrollView>
      {isLoading && <Image
  source={{url:'https://i.gifer.com/4Mg1.gif'}}
  style={{ width: 380, height: 800,objectFit:'cover' }}
/>}
      
        { reslt && <Markdown value={reslt}/>}
      
      <Button
          color={'primary'}
          onPress={fetchSolution}
        >
          Answer
        </Button>
    </ScrollView>
  );
};

export default Apifetcher;
