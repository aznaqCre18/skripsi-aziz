import React, { Component } from 'react';
import ButtonMenuDashboard from './../../../../components/ButtonMenuDashboard';
import Dropdown from '../../../../components/Dropdown/component';

import Header from '../../../../components/Header/component';
import Loading from '../../../../components/Loading/component';
import { LogoImage } from '../../../../configs/images';
import { JmlGuruIcon, JmlSiswaIcon, JmlJurusanIcon, JmlKelasIcon } from '../../../../configs/icons';

import AuthService from '../../../../utils/authService';

const Auth = new AuthService();

const thnAjaranDummy = [
  {id:"1", name: "2020/2021 - Ganjil", semester: "ganjil", value: "2020-2021-ganjil"},
  {id:"2", name: "2020/2021 - Genap", semester: "genap", value: "2020-2021-genap"},
  {id:"3", name: "2021/2022 - Ganjil", semester: "ganjil", value: "2021-2022-ganjil"},
  {id:"3", name: "2021/2022 - Genap", semester: "genap", value: "2021-2022-genap"},
]

export default class AdminDashboard extends Component {
  state = {
    isLoading: true,
    thnAjaranSelected: Auth.getTahunAjaran() ? JSON.parse(Auth.getTahunAjaran()).name : "Pilih tahun ajaran",
  }

  componentDidMount() {
    const { actionsGuru, actionsHonor } = this.props;

    setTimeout(() => {
      this.setState({isLoading: false})
    }, 500);

    actionsGuru.getDataGuru();
    actionsHonor.getDataHonor();
  }

  _handleSelectDropdown = (item) => {
    console.log(item);
    this.setState({ thnAjaranSelected: item.name });
    Auth.setTahunAjaran(JSON.stringify(item));

    console.log(JSON.parse(Auth.getTahunAjaran()).name);
  }

  render() {
    const { isLoading } = this.state;
    const { dataHonor, dataGuru } = this.props;

    return (
      isLoading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <div className="container-dashboard-admin">
            <div className="header-section">
              <Header 
                title="Dashboard"
                fullName={JSON.parse(Auth.getProfile()).name}
                // role={Auth.getUserType()}
              />
            </div>
            <div className="main-content-data">
              <div className="dropdown-thn-section">
                {/* <Dropdown data={dataTahunAjaran} onChange={this._handleSelectDropdown} width={224} value={thnAjaranSelected} /> */}
              </div>
              <div className="banner-welcome">
                <h3>Selamat Datang</h3>
                <img src={LogoImage} alt="logo-smk-pelita" />
                <h5>SMK PELITA DEPOK</h5>
                <div className="alamat">
                  <p>Jl. Kenanga No.4, Kel. Pancoran Mas,</p>
                  <p>Kec. Pancoran Mas, Kota Depok, Jawa Barat 16431</p>
                </div>
              </div>
            </div>
            <div className="wrapper-menu-button">
              <ButtonMenuDashboard
                category="Jumlah Guru"
                count={dataGuru.length}
                backgroundType="success"
                icon={JmlGuruIcon}
              />
              <ButtonMenuDashboard
                category="Jumlah Mapel"
                count={dataHonor.length}
                backgroundType="info"
                icon={JmlSiswaIcon}
              />
            </div>
          </div>
        </React.Fragment>
      )
    )
  }
}
