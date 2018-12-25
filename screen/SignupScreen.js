import React, { Component } from 'react';
import {Alert, StyleSheet, View, TouchableOpacity, Image, TextInput, Text} from 'react-native';
import { firebaseApp } from './FirebaseConfig';

class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: '',
      Password: '',
      RePassword: '',
      PhoneNumber: '',
    };
  }

  static navigationOptions={
    header: null
  }

  createAccount = () => {
    console.log('firebase: '+firebaseApp);
    if(this.state.RePassword == this.state.Password){
      firebaseApp.auth().createUserWithEmailAndPassword(this.state.Email, this.state.Password)
      .then(() => {
        Alert.alert(
          'Thông báo',
          'Đăng ký thành công!'+this.state.Email,
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: () => this.props.navigation.navigate('Login',null)},
          ],
          { cancelable: false }
        )
        this.setState({
          Email: '',
          Password: '',
        })
      })
      .catch(function(error){
        Alert.alert(
          'Thông báo',
          'Đăng ký thất bại!',
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      });
    }else{
      Alert.alert(
        'Thông báo',
        'Xác nhận mật khẩu không đúng!',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.loginLogoContainer}>
            <TouchableOpacity style={styles.loginLogo} onPress={()=>{this.props.navigation.navigate('Login',null)}}>
              <View style={styles.arrowContainer}>
                  <View style={styles.arrow}>
                    <Image style={styles.arrowImg} source={require('../img/arrow-point-to-left.png')} resizeMode="contain"/>
                  </View>
              </View>
              <Text style={styles.loginText}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signupLogoContainer}>
            <Text style={styles.signupLogo}>Đăng ký</Text>
          </View>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.formEle}>
            <Text style={styles.label}>Tài khoản:</Text>
            <TextInput style={styles.input} onChangeText={
                (text) => this.setState({Email: text})
              } 
              placeholder="Nhập địa chỉ email"/>
          </View>
          <View style={styles.formEle}>
            <Text style={styles.label}>Mật khẩu:</Text>
            <TextInput style={styles.input} onChangeText={
                (text) => this.setState({Password: text})
              }
              secureTextEntry={true}
              placeholder="Nhập mật khẩu"/>
          </View>
          <View style={styles.formEle}>
            <Text style={styles.label}>Xác nhận mật khẩu:</Text>
            <TextInput style={styles.input} onChangeText={
                (text) => this.setState({RePassword: text})
              }
              secureTextEntry={true}
              placeholder="Nhập lại mật khẩu"/>
          </View>
          <View style={styles.formEle}>
            <Text style={styles.label}>Số điện thoại:</Text>
            <TextInput style={styles.input} onChangeText={
                (text) => this.setState({PhoneNumber: text})
              }
              placeholder="Nhập số điện thoại"/>
          </View>
        </View>
        <View style={styles.grpBtnContainer}>
          <View style={styles.loginBtnContainer}>
            <TouchableOpacity style={styles.loginBtn} onPress={this.createAccount}>
              <Text style={styles.loginBtnText}>Đăng ký</Text>
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
  topContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  signupLogoContainer: {
    flex: 1,
    marginBottom: 10,
    alignItems: 'flex-end',
  },
  signupLogo: {
    backgroundColor: '#fca504',
    width: 115,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    paddingVertical: 8,
    fontSize: 21,
    fontWeight: 'bold',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    paddingLeft: 15,
  },
  loginLogoContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  loginLogo: {
    backgroundColor: 'yellow',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    flexDirection: 'row',
    width: 140,
    position: 'relative',
  },
  loginText: {
    flex: 2,
    textAlign: 'center',
    padding: 7,
    paddingLeft: 45,
    fontWeight: 'bold',
  },
  arrowContainer: {
    borderRadius: 40,
    backgroundColor: 'white',
    width: 40,
    height: 40,
    position: 'absolute',
    top: -4,
    left: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    padding: 8,
    width: '90%',
    height: '90%',
    backgroundColor: 'white',
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'yellow',
  },
  arrowImg: {
    flex: 1,
    height: undefined,
    width: undefined,
    alignSelf: 'stretch',
  },
  formContainer: {
    flex: 4,
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
  },
  forgetPass: {
    color: '#28912c',
    textAlign: 'center',
  },
  loginBtnContainer: {
    flex: 5,
    justifyContent: 'center',
  },
  loginBtn: {
    backgroundColor: '#fca504',
    borderRadius: 50,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5,
    height: 55,
  },
  loginBtnText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  otherLoginContainer: {
    flex: 2,
    marginTop: 10,
    alignItems: 'center',
  },
  loginTagContainer:{
    flex: 1,
  },
  loginTag: {
    backgroundColor: 'yellow',
    width: '70%',
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    borderRadius: 50,
  },
  tagIcon: {
    flex: 1,
    height: '100%',
    alignSelf: 'stretch',
  },
  tagText: {
    flex: 3,
    marginLeft: 10,
  },
  facebook: {
    backgroundColor: '#3b5998',
    borderWidth: 1,
    borderColor: '#3b5998',
  },
  google: {
    backgroundColor: '#dd4b39',
    borderWidth: 1,
    borderColor: '#dd4b39',
  },
});

export default SignupScreen;