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

### 가정

    Test.js 가 존재한다고 가정하고 해당 클래스 명이 Test 일때
    class도 export 를 해주고 끝단에서 export default 해줄경우

``` javascript
import Testttttt, { Test } from 'Test';
// 'Testttttt' 는 Test파일에 있는 컴포넌트를 부르는 호칭
// { Test }는 export한 클래스를 직접 부르는 호칭
```

``` javascript
// { Test as Test1} 을 통해서 Test를 Test1으로 부를 수 있다.
import Testttttt, { Test as Test1 } from 'Test';
Test2 == Testttttt // True
```

## Props 값을 받아올 수 있도록 DetailsScreens.js 변경
``` javascript
import React, { Component } from 'react'
import { Text, View } from 'react-native'

class DetailsScreen extends Component {
    render() {
        return (
            <View style={{flex:1, alignItems:"center", justifyContent:"center", backgroundColor:"skyblue"}}>
                <Text> DetailsScreen: { this.props.titleID } !!! </Text>
            </View>
        )
    }
}

export default DetailsScreen;
```

## App.js에서 Props를 전달하기 위해서 함수형 컴포넌트로 변형 ( 좀 어려운 난이도로 응용한 형태 )
### AppNavigator 에서 initialRouteName이 Home으로 잘 되어 있는지 확인
``` javascript
import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import DetailsScreen from './screens/DetailsScreen.js'

class HomeScreen extends React.Component {
  render(){
    return (
      <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
        <Text>HomeScreen</Text>
      </View>
    )
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Details: () => (<DetailsScreen titleID="홀리몰리" />),
    // Details: DetailsScreen
  },
  { 
    initialRouteName: "Home"
  }
);

... <<이하생략>>
```

# 화면이동 실습

## Button 기능을 사용해서 화면 이동하기 실습
``` javascript
import React from 'react';
import { Button, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import DetailsScreen from './screens/DetailsScreen.js'

class HomeScreen extends React.Component {
  render(){
    return (
      <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
        {/* <Text>HomeScreen</Text> */}
        <Button
          title="세부화면으로"
          onPress={() => this.props.navigation.navigate("Details")}
        />
      </View>
    )
  }
}

```

## TouchableOpaciy 기능을 사용해서 화면 이동하기 실습
``` javascript
import React from 'react';
import { Button, TouchableOpacity, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import DetailsScreen from './screens/DetailsScreen.js'

class HomeScreen extends React.Component {
  render(){
    return (
      <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
        {/* <Text>HomeScreen</Text> */}
        <Button
          title="세부화면으로"
          onPress={() => this.props.navigation.navigate("Details")}
        />
        <TouchableOpacity
         style ={{ justifyContent:'center', height : 50, alignItem:"center", backgroundColor:"pink"}} 
         onPress={() => this.props.navigation.navigate("Details")}>
          <Text style={{color:'white'}}>눌러보세요</Text> 
        </TouchableOpacity>
      </View>
    )
  }
}
...<<이하 생략>>
```

## onPress 함수 외부에서 정의하기 (feat. Arrow Function) & 화면 이동하기 실습
``` javascript
import React from 'react';
import { Button, TouchableOpacity, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import DetailsScreen from './screens/DetailsScreen.js'

class HomeScreen extends React.Component {

  onPress = () => {
    return this.props.navigation.navigate("Details")
  }
  
  render(){
    return (
      <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
        {/* <Text>HomeScreen</Text> */}
        <Button
          title="세부화면으로"
          onPress={this.onPress}
        />
        <TouchableOpacity
         style ={{ justifyContent:'center', height : 50, alignItem:"center", backgroundColor:"pink"}} 
         onPress={this.onPress}>
          <Text style={{color:'white'}}>눌러보세요</Text> 
        </TouchableOpacity>
      </View>
    )
  }
}
...<<이하 생략>>
```

## DetailsScreen.js 에서도 다음 화면 이동 버틍 수행 실습
### 함수형 컴포넌트로 실행한 경우 한단계를 더 실행해야함!


### 아래와 같은 코드일 경우 변경할 필요없음
``` javascript
// ./App.js
const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Details: DetailsScreen
  },
  { 
    initialRouteName: "Home"
  }
);
...<< 이하생략 >>
```

### 함수형 컴포넌트인 경우 변경해야할 내용
``` javascript
// ./App.js
const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Details: (props) => (<DetailsScreen navigation={props.navigation} titleID="홀리몰리"  />),
    //Details: DetailsScreen
  },
  { 
    initialRouteName: "Home"
  }
);
...<< 이하생략 >>
```

- navigation에서 .push라는 함수를 통해 실행됌
``` javascript
import React, { Component } from 'react'
import { Button, TouchableOpacity, Text, View } from 'react-native'

class DetailsScreen extends Component {
    render() {
        return (
            <View style={{flex:1, alignItems:"center", justifyContent:"center", backgroundColor:"skyblue"}}>
                <Text> DetailsScreen: { this.props.titleID } !!! </Text>
                <Button 
                  title = "다시 세부 화면으로..."
                  onPress={() => this.props.navigation.push('Details')}
                />
            </View>
        )
    }
}

export default DetailsScreen;
```
