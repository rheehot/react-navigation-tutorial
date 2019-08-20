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
  static navigationOptions = ({navigation})=>{
    return {
      headerTitle:<LogoTitle />,
      headerRight: (
      <Button
        onPress={navigation.getParam('_increaseCount')}
        title="+1"
        color="transparent"
      />
    )
    }
  };
  constructor(props){
    super(props);
    this.state = {
      count : 0,
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({_increaseCount:this._increaseCount});
  }

  _increaseCount = () => {
    this.setState({count:this.state.count+1})
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
        backgroundColor:'gray',
      },
      headerTintColor:'#ff0012',
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