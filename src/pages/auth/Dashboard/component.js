import React, { Component } from 'react';
import AuthService from '../../../utils/authService';
import AdminDashboard from './AdminDashboard';
import GuruDashboard from './GuruDashboard';
import SiswaDashboard from './SiswaDashboard';

const Auth = new AuthService();

export default class Dashboard extends Component {
  
  _handleRenderDashboard = () => {
    const userType = Auth.getUserType();

    switch (userType) {
      case 'admin':
        return (
          <AdminDashboard />
        );
      case 'guru':
        return (
          <GuruDashboard />
        );
      case 'siswa':
        return (
          <SiswaDashboard />
        );
      default:
        return (
          <div>blom ada</div>
        )
    }
  }
    
  render() {
    return (
      <React.Fragment>
        <AdminDashboard />
      </React.Fragment>
    )
  }
}
