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
    initialRouteName: "Details"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component{
  render(){
    return <AppContainer />;
  }
}