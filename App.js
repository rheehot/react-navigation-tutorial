import React from 'react';
import { Image, Button, TouchableOpacity, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import DetailsScreen from './screens/DetailsScreen.js'

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
  static navigationOptions = {
    headerTitle:<LogoTitle />,
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