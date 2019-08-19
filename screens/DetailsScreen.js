import React, { Component } from 'react'
import { Button, TouchableOpacity, Text, View } from 'react-native';

class DetailsScreen extends Component {
    static navigationOptions = {
        title: "세부화면",
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
    };

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