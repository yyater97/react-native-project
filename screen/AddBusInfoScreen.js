import React, { Component } from 'react';
import {ScrollView, Alert, StyleSheet, View, TouchableOpacity, Image, TextInput, Text} from 'react-native';
import { firebaseApp } from './FirebaseConfig';

class AddBusInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        beginStation: '',
        endStation: '',
        goRoute: '',
        backRoute: '',
        typeBus: '',
        distance: '',
        numberOfRoute: '',
        routeTime: '',
        halfTime: '',
        runTime: '',
        seat: '',
    };

  }

  static navigationOptions={
    header: null
  }

  addBusInfo = () =>{
    var id = 'bus'+this.state.name;
    firebaseApp.database().ref('BusInfo/' + id).set({
        name: this.state.name,
        beginStation: this.state.beginStation,
        endStation: this.state.endStation,
        goRoute: this.state.goRoute,
        backRoute: this.state.backRoute,
        typeBus: this.state.typeBus,
        distance: this.state.distance,
        numberOfRoute: this.state.numberOfRoute,
        routeTime: this.state.routeTime,
        halfTime: this.state.halfTime,
        runTime: this.state.runTime,
        seat: this.state.seat,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>THÔNG TIN CÁC TUYẾN XE</Text>
        </View>
        <View style={styles.formContainer}>
            <ScrollView style={{flex: 1}}>
                <View style={styles.formEle}>
                    <Text style={styles.label}>Tên tuyến:</Text>
                    <TextInput style={styles.input} onChangeText={
                        (text) => this.setState({name: text})
                    } 
                    placeholder="Nhập tên tuyến"/>
                </View>
                <View style={styles.formEle}>
                    <Text style={styles.label}>Bến đầu:</Text>
                    <TextInput style={styles.input} onChangeText={
                        (text) => this.setState({beginStation: text})
                    }
                    
                    placeholder="Nhập bến đầu"/>
                </View>
                <View style={styles.formEle}>
                    <Text style={styles.label}>Bến cuối:</Text>
                    <TextInput style={styles.input} onChangeText={
                        (text) => this.setState({endStation: text})
                    }
                    
                    placeholder="Nhập bến cuối"/>
                </View>
                <View style={styles.formEle}>
                    <Text style={styles.label}>Lượt đi:</Text>
                    <TextInput style={styles.input} onChangeText={
                        (text) => this.setState({goRoute: text})
                    }
                    placeholder="Nhập lượt đi"/>
                </View>
                <View style={styles.formEle}>
                    <Text style={styles.label}>Lượt về:</Text>
                    <TextInput style={styles.input} onChangeText={
                        (text) => this.setState({backRoute: text})
                    } 
                    placeholder="Nhập lượt về"/>
                </View>
                <View style={styles.formEle}>
                    <Text style={styles.label}>Loại hình hoạt động:</Text>
                    <TextInput style={styles.input} onChangeText={
                        (text) => this.setState({typeBus: text})
                    }
                    
                    placeholder="Nhập loại hình hoạt động"/>
                </View>
                <View style={styles.formEle}>
                    <Text style={styles.label}>Khoảng cách:</Text>
                    <TextInput style={styles.input} onChangeText={
                        (text) => this.setState({distance: text})
                    }
                    
                    placeholder="Nhập khoảng cách"/>
                </View>
                <View style={styles.formEle}>
                    <Text style={styles.label}>Số chuyến:</Text>
                    <TextInput style={styles.input} onChangeText={
                        (text) => this.setState({numberOfRoute: text})
                    }
                    placeholder="Nhập số chuyến"/>
                </View>
                <View style={styles.formEle}>
                    <Text style={styles.label}>Thời gian chuyến:</Text>
                    <TextInput style={styles.input} onChangeText={
                        (text) => this.setState({routeTime: text})
                    } 
                    placeholder="Nhập thời gian chuyến"/>
                </View>
                <View style={styles.formEle}>
                    <Text style={styles.label}>Giãn cách:</Text>
                    <TextInput style={styles.input} onChangeText={
                        (text) => this.setState({halfTime: text})
                    }
                    
                    placeholder="Nhập giãn cách giữa các chuyến"/>
                </View>
                <View style={styles.formEle}>
                    <Text style={styles.label}>Thời gian hoạt động:</Text>
                    <TextInput style={styles.input} onChangeText={
                        (text) => this.setState({runTime: text})
                    }
                    
                    placeholder="Nhập thời gian hoạt động"/>
                </View>
                <View style={styles.formEle}>
                    <Text style={styles.label}>Loại xe:</Text>
                    <TextInput style={styles.input} onChangeText={
                        (text) => this.setState({seat: text})
                    }
                    placeholder="Nhập loại xe"/>
                </View>
            </ScrollView>
        </View>
        <View style={styles.grpBtnContainer}>
          <View style={styles.BtnContainer}>
            <TouchableOpacity style={styles.Btn} onPress={this.addBusInfo}>
              <Text style={styles.BtnText}>Thêm tuyến</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.BtnContainer}>
            <TouchableOpacity style={[styles.Btn,styles.cancelBtn]} onPress={this.addBusInfo}>
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
    fontSize: 23,
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

export default AddBusInfoScreen;