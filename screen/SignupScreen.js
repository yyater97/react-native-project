import React, { Component } from 'react';
import {StyleSheet, View, Label, TouchableOpacity, Image, TextInput, Text} from 'react-native';

class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtAccount: 'text',
      txtPassword: 'text',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.loginLogoContainer}>
            <Text style={styles.loginLogo}>Login</Text>
          </View>
          <View style={styles.signupLogoContainer}>
            <TouchableOpacity style={styles.signupLogo}>
              <Text style={styles.signupText}>Signup</Text>
              <Text style={styles.arrBtn}>></Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.formEle}>
            <Text style={styles.label}>Tài khoản:</Text>
            <TextInput style={styles.input} onChangeText={(text) => this.setState({txtAccount: text})} value={this.state.txtAccount}/>
          </View>
          <View style={styles.formEle}>
            <Text style={styles.label}>Mật khẩu:</Text>
            <TextInput style={styles.input} onChangeText={(text) => this.setState({txtPassword: text})} value={this.state.txtPassword}/>
          </View>
        </View>
        <View style={styles.grpBtnContainer}>
          <View style={styles.forgetPassContainer}>
            <TouchableOpacity>
              <Text style={styles.forgetPass}>Quên mật khẩu</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.loginBtnContainer}>
            <TouchableOpacity style={styles.loginBtn}>
              <Text style={styles.loginBtnText}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.otherLoginContainer}>
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
  loginLogoContainer: {
    flex: 1,
  },
  loginLogo: {
    backgroundColor: '#fca504',
    width: 100,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    padding: 5,
    flexDirection: 'row',
  },
  signupText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  signupLogoContainer: {
    flex: 1,
  },
  signupLogo: {
    backgroundColor: 'yellow',
    padding: 5,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    flexDirection: 'row',
  },
  signupText: {
    flex: 1,
    textAlign: 'right',
  },
  arrBtn: {
    flex: 1,
    fontWeight: 'bold',
    borderRadius: 50,
    backgroundColor: 'white',
    width: 10,
    height: 10,
  },
  formContainer: {
    flex: 3,
  },
  formEle:{
    flex: 1,
    margin: 12,
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    marginLeft: 15,
  },
  input: {
    paddingLeft: 20,
    borderRadius: 10,
    borderRadius: 50,
    backgroundColor: '#f1f1f1',
  },
  grpBtnContainer: {
    flex: 2,
  },
  forgetPassContainer: {
    flex: 1,
    margin: 20,
  },
  forgetPass: {
    color: '#28912c',
    textAlign: 'center',
  },
  loginBtnContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  loginBtn: {
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
    height: 60,
  },
  loginBtnText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  otherLoginContainer: {
    flex: 3,
    alignItems: 'center',
  },
  loginTag: {
    flex: 1,
    width: '65%',
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagIcon: {
    flex: 1,
    height: '100%',
    alignSelf: 'stretch',
  },
  tagText: {
    flex: 4,
    marginLeft: 15,
  }
});

export default SignupScreen;