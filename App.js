import React from 'react';
import { Image, Button, TouchableOpacity, Text, View } from 'react-native';
import { createBottomTabNavigator, createMaterialTopTabNavigator,createStackNavigator, createAppContainer } from 'react-navigation';
import DetailsScreen from './screens/DetailsScreen.js'
import { Ionicons } from '@expo/vector-icons'

class ModalScreen extends React.Component {
  render() {
    return (
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Text style={{fontSize:30}}>this is a modal!</Text>
        <Button
          onPress={()=>this.props.navigation.goBack()}
          title="Dismiss"
        />
      </View>
    )
  }
}

class LogoTitle extends React.Component{
  render() {
    return (
      <View style={{flex:1,alignItems:'center', justifyContent:'center'}}>
        <Image
          source={{uri:'https://images.pexels.com/photos/2071873/pexels-photo-2071873.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}}
          style={{width:40, height:40}}
        />
      </View>
    );
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = ({navigation})=>{
    return {
      headerTitle:<LogoTitle />,
      headerRight: (
        <View style={{flex:1, flexDirection:'row'}}>
          <Button
            onPress={navigation.getParam('increaseCountOne')}
            title="+1"
            color="transparent"
          />
          <Button
            onPress={navigation.getParam('increaseCountTwo')}
            title="+2"
            color="transparent"
          />
          <Button
            onPress={navigation.getParam('increaseCountThree')}
            title="+3"
            color="transparent"
          />
        </View>
      ),
      headerLeft: (
        <View style={{flex:1, flexDirection:'row'}}>
          <Button
            onPress={navigation.getParam("resetCount")}
            title="Reset"
            color="transparent"
          />
          <Button
            onPress={navigation.getParam("decreaseCount")}
            title="-1"
            color="transparent"
          />
          <Button
            onPress={()=> navigation.navigate('MyModal')}
            title="Modal"
            color="transparet"
          />
        </View>
      )
    }
  };
  constructor(props){
    super(props);
    this.state = {
      count : 0,
    };
  }

  _decreaseCount = () => {
    this.setState({count:this.state.count-1})
  }

  _increaseCountOne = () => {
    this.setState({count:this.state.count+1})
  }

  _increaseCountTwo = () => {
    this.setState({count:this.state.count+2})
  }

  _increaseCountThree = () => {
    this.setState({count:this.state.count+3})
  }

  _reset = () => {
    this.setState({count:0})
  }

  componentDidMount() {
    this.props.navigation.setParams({
      decreaseCount:this._decreaseCount,
      increaseCountOne:this._increaseCountOne,
      increaseCountTwo:this._increaseCountTwo,
      increaseCountThree:this._increaseCountThree,
      resetCount:this._reset
    });
  }

  onPress = () => {
    return this.props.navigation.navigate("Details", {
      itemId: 86,
      otherParam: "파라미터 전달",
    });
  }
  
  render(){
    return (
      <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
        {/* <Text>HomeScreen</Text>
        <Button
          title="세부화면으로"
          onPress={this.onPress}
        />
        <TouchableOpacity
         style ={{ justifyContent:'center',width: 90, height: 40 , alignItem:"center", backgroundColor:"black"}} 
         onPress={this.onPress}>
          <Text style={{color:'white'}}>눌러보세요</Text> 
        </TouchableOpacity> */}
        <Text style={{fontSize:25}}>HomeScreen</Text>
        <Text style={{fontSize:25}}>Count: {this.state.count}</Text>
        <Button
          title="Go to Details"
          onPress={()=>this.props.navigation.navigate('Details')}
        />
      </View>
    )
  }
}

// 기존 AppNavigator -> MainStack
// 네비게이터 변경해보는 실습
// createStackNavigator
// createMaterialTopTabNavigator 
// createBottomTabNavigator
const MainStack = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    // Details: (props) => (<DetailsScreen navigation={props.navigation} titleID="홀리몰리"  />),
    Details: DetailsScreen,
  },
  { 
    defaultNavigationOptions:({navigation})=> ({
      tabBarIcon:({focused, tintColor})=>{
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home'){
          iconName = `ios-home`
        } else if (routeName === 'Details'){
          iconName=`ios-menu`;
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor:'gray',
    }
  }
);

const RootStack = createStackNavigator(
  {
    Main:{
      screen:MainStack,
    },
    MyModal: {
      screen:ModalScreen
    },
  },
  {
    mode:'modal',
    headerMode:'none',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component{
  render(){
    return <AppContainer />;
  }
}