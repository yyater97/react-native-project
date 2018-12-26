import React, { Component } from 'react';
import {ScrollView, Alert, StyleSheet, View, TouchableOpacity, Image, TextInput, Text} from 'react-native';
import { firebaseApp } from './FirebaseConfig';

class AddMarkerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        detail: '',
        latitude: 10.8830802,
        longitude: 106.7808475,
        routes: '',
    };

  }

  static navigationOptions={
    header: null
  }

  addMarker = () =>{
    firebaseApp.database().ref('Marker/').push({
        name: this.state.name,
        detail: this.state.detail,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        routes: this.state.routes,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>THÔNG TIN TRẠM, BẾN XE BUÝT</Text>
        </View>
        <View style={styles.formContainer}>
            <ScrollView style={{flex: 1}}>
                <View style={styles.formEle}>
                    <Text style={styles.label}>Tên trạm:</Text>
                    <TextInput style={styles.input} onChangeText={
                        (text) => this.setState({name: text})
                    } 
                    placeholder="Nhập tên trạm"/>
                </View>
                <View style={styles.formEle}>
                    <Text style={styles.label}>Chi tiết trạm:</Text>
                    <TextInput style={styles.input} onChangeText={
                        (text) => this.setState({detail: text})
                    } 
                    placeholder="Nhập chi tiết tên trạm"/>
                </View>
                <View style={styles.formEle}>
                    <Text style={styles.label}>Tọa độ (latitude - vĩ độ):</Text>
                    <TextInput style={styles.input} onChangeText={
                        (text) => this.setState({latitude: text})
                    }
                    
                    placeholder="Nhập tọa độ theo vĩ độ (latitude)"/>
                </View>
                <View style={styles.formEle}>
                    <Text style={styles.label}>Tọa độ (longitude - kinh độ):</Text>
                    <TextInput style={styles.input} onChangeText={
                        (text) => this.setState({longitude: text})
                    }
                    
                    placeholder="Nhập tọa độ theo kinh độ (longitude)"/>
                </View>
                <View style={styles.formEle}>
                    <Text style={styles.label}>Các tuyến xe đi qua:</Text>
                    <TextInput style={styles.input} onChangeText={
                        (text) => this.setState({routes: text})
                    }
                    placeholder="Nhập các tuyến xe đi qua (cách nhau bởi dấu ',')"/>
                </View>
            </ScrollView>
        </View>
        <View style={styles.grpBtnContainer}>
          <View style={styles.BtnContainer}>
            <TouchableOpacity style={styles.Btn} onPress={this.addMarker}>
              <Text style={styles.BtnText}>Thêm trạm</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.BtnContainer}>
            <TouchableOpacity style={[styles.Btn,styles.cancelBtn]} onPress={
                    () => {this.props.navigation.navigate("Map",null)}
                }>
              <Text style={styles.BtnText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 0.5,
    backgroundColor: '#fca504',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5,
  },
  title:{
    fontSize: 21,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'white',
  },
  formContainer: {
    flex: 4.5,
  },
  formEle:{
    flex: 1,
    margin: 12,
    marginBottom: 20,
  },
  label: {
    marginBottom: 10,
    marginLeft: 15,
    fontWeight: 'bold',
  },
  input: {
    paddingLeft: 20,
    borderRadius: 10,
    borderRadius: 50,
    backgroundColor: '#f1f1f1',
  },
  grpBtnContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  BtnContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  Btn: {
    backgroundColor: '#fca504',
    borderRadius: 50,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5,
    height: 55,
  },
  BtnText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  cancelBtn: {
    backgroundColor: '#c9c9c9',
  }
});

export default AddMarkerScreen;