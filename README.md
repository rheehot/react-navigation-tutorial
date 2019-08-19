# 진행한 과정

프로젝트 생성
``` cmd
expo init react-navigation-tutorial

# blank base project
```

yarn 설치
``` cmd
npm install -g yarn
```

필요 라이브러리 설치
``` yarn
yarn add react-navigation

expo install react-native-gesture-handler
expo install react-native-reanimated
```

App.js 편집
``` javascript
import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

class HomeScreen extends React.Component {
  render(){
    return (
      <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
        <Text>HomeScreen</Text>
      </View>
    )
  }
}

const AppNavigator = createStackNavigator({
    Home: {
      screen:HomeScreen
    }
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component{
  render(){
    return <AppContainer />;
  }
}
```

DetailsScreen 추가
- screens폴더 생성
``` javascript
// ./screens/DetailsScreen.js
import React, { Component } from 'react'
import { Text, View } from 'react-native'

class DetailsScreen extends Component {
    render() {
        return (
            <View style={{flex:1, alignItems:"center", justifyContent:"center", backgroundColor:"skyblue"}}>
                <Text> DetailsScreen </Text>
            </View>
        )
    }
}

export default DetailsScreen;
```