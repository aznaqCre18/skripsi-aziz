import React, { Component } from 'react';
import Dropdown from '../../components/Dropdown';
import Input from '../../components/Input';
import Button from './../../components/Button';
import { dropdownUserType } from '../../utils/constant';
import { Siswa1Image, Siswa2Image } from '../../configs/images';
import AuthService from '../../utils/authService';

const Auth = new AuthService();

export default class Login extends Component {
  state = {
    username: "",
    password: "",
  }

  componentDidMount() {
    const { actionsTahunAjaran } = this.props;

    // actionsTahunAjaran.getDataTahunAjaran();
  }

  _handleChangeInput = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  }

  _handleSubmit = (e) => {
    e.preventDefault();

    const { actions } = this.props;
    actions.login(this.state);

    // Auth.setTahunAjaran(JSON.stringify(this.state.thnAjaranSelected))
  }

  render() {
    const { dataTahunAjaran } = this.props;

    console.log(dataTahunAjaran);

    return (
      <div className="login-container">
        <div className="login-form-wrapper">
          <div className="welcome-wording">
          </div>
          <p className="title">Login</p>
          <div className="form">
            <Input 
              label="Username"
              placeholder="Masukan username anda..."
              onChange={this._handleChangeInput}
              name="username"
            />
            <Input 
              label="Password"
              placeholder="Masukan password anda..."
              onChange={this._handleChangeInput}
              name="password"
              type="password"
            />
            <Button label="Login" onClick={this._handleSubmit} width={"100%"} />
          </div>
        </div>
        <div className="siswa1">
          <img src={Siswa1Image} alt="" />
        </div>
        <div className="siswa2">
          <img src={Siswa2Image} alt="" />
        </div>
      </div>
    )
  }
}
