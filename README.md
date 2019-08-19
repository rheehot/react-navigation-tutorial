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

App.js 
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
./screens/DetailsScreen.js
``` javascript
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
./App.js
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
./App.js
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
./App.js
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
./App.js
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
./App.js
``` javascript
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
./App.js
``` javascript
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
./screens/DetailsScreen.js
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

## 홈 화면으로, 뒤로가기 버튼 구현
./screens/DetailsScreen.js
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
                <Button
                  title = "홈으로"
                  onPress={() => this.props.navigation.navigate('Home')}
                />
                <Button
                  title = "뒤로"
                  onPress = {() => this.props.navigation.goBack()}
                />
            </View>
        )
    }
}

export default DetailsScreen;
```

# 파라미터 값 전달하기
## onPress안에서 직접 실행하는 경우
./app.js
``` javascript
class HomeScreen extends React.Component {

  
  render(){
    return (
      <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
        {/* <Text>HomeScreen</Text> */}
        <Button
          title="세부화면으로"
          onPress={() => {
            this.props.navigation.navigate("Details", {
            itemId: 86,
            otherParam: "파라미터 전달",
            });
          }}
        />
        <TouchableOpacity
         style ={{ justifyContent:'center', height : 50, alignItem:"center", backgroundColor:"pink"}} 
         onPress={() => {
            this.props.navigation.navigate("Details", {
            itemId: 86,
            otherParam: "파라미터 전달",
            });}>
          <Text style={{color:'white'}}>눌러보세요</Text> 
        </TouchableOpacity>
      </View>
    )
  }
}
```
## 함수형으로 외부에 뺀 경우
./app.js
``` javascript
class HomeScreen extends React.Component {

  onPress = () => {
    return this.props.navigation.navigate("Details", {
      itemId: 86,
      otherParam: "파라미터 전달",
    });
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
```

## DetailsScreen.js 수정
### 추가로 세부화면으로 다시 실행할 경우 랜덤한 값이 전달될 수 있도록 Math 라이브러리를 통해 랜덤한 값을 전달할 수 있도록 함
./screens/DetailsScreen.js
``` javascript
import React, { Component } from 'react'
import { Button, TouchableOpacity, Text, View } from 'react-native'

class DetailsScreen extends Component {
    render() {
        const navigation = this.props.navigation;
        const itemId = navigation.getParam('itemId', 'NO-ID');
        const otherParam = navigation.getParam('otherParam', 'Default Value');
        return (
            <View style={{flex:1, alignItems:"center", justifyContent:"center", backgroundColor:"skyblue"}}>
                <Text>itemId : {itemId} </Text>
                <Text>otherParam: {otherParam}</Text>
                <Text> DetailsScreen: { this.props.titleID } !!! </Text>
                <Button 
                  title = "다시 세부 화면으로..."
                  onPress={() => this.props.navigation.push('Details', {
                      itemId: Math.floor(Math.random() * 100),
                  })}
                />
                <Button
                  title = "홈으로"
                  onPress={() => this.props.navigation.navigate('Home')}
                />
                <Button
                  title = "뒤로"
                  onPress = {() => this.props.navigation.goBack()}
                />
            </View>
        )
    }
}

export default DetailsScreen;
```

## 좌측 상단에 홈이라는 글자를 추가해주기 위한 작업 (상단바 좌측 홈 추가)
./App.js
``` javascript
class HomeScreen extends React.Component {
  static navigationOptions = {
    title: '홈',
  };
... <<이하생략>>
```

## 세부항목에서도 변경내역을 뜰 수 있게 작업
### 앞서서 navigation 옵션 변경한 부분 수정 (변경한 사람만, 아래 소스코드 확인)
props로 넘기게 되면 이전의 값을 덮어 씌우면서 전달하기 때문에 적용이 제대로 안되었다. 따라서 소스코드의 변경이 필요로 하다. <br>
./App.js
``` javascript
const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    // Details: (props) => (<DetailsScreen navigation={props.navigation} titleID="홀리몰리"  />),
    Details: DetailsScreen
  },
  { 
    initialRouteName: "Home"
  }
);
```
./screens/DetailsScreen.js
``` javascript
class DetailsScreen extends Component {
    static navigationOptions = {
        title: "세부화면",
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
    };
...<<이하생략>>
```

## 전체 앱 디자인을 위해 설정
./App.js
``` javascript
import React from 'react';
import { Button, TouchableOpacity, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import DetailsScreen from './screens/DetailsScreen.js'

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: '홈',
  };

  onPress = () => {
    return this.props.navigation.navigate("Details", {
      itemId: 86,
      otherParam: "파라미터 전달",
    });
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

// 실제로 앱의 디자인을 설정을 해주는 부분
const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    // Details: (props) => (<DetailsScreen navigation={props.navigation} titleID="홀리몰리"  />),
    Details: DetailsScreen
  },
  { 
    initialRouteName: "Home",
    defaultNavigationOptions:{
      headerStyle:{
        backgroundColor:'violet',
      },
      headerTintColor:'#fff',
      headerTintStyle:{
        fontWeith:'bold',
      },
    },
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component{
  render(){
    return <AppContainer />;
  }
}
```

# 로고 이미지 추가
./App.js
```javascript
class LogoTitle extends React.Component{
  render() {
    return (
      <Image
        source={{uri:'https://images.pexels.com/photos/2071873/pexels-photo-2071873.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}}
        style={{width:40, height:40}}
      />
    );
  }
}
// 아래와 같이 변경을 하면, 해당 컴포넌트를 통해 이미지 로그를 가져올 수 있다.
class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle:<LogoTitle />,
  };

  ...<<이하생략>>
```