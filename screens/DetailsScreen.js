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