import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';

import AuthService from '../../../utils/authService';
import Loading from '../../../components/Loading/component';
import Table from '../../../components/Table';
import Header from '../../../components/Header/component';
import HeaderMainDataView from '../../../components/HeaderMainDataView';
import Dropdown from '../../../components/Dropdown';
import Button from '../../../components/Button/component';

const Auth = new AuthService();

const hari = [
  {name: 'Senin', value: 'senin'},
  {name: 'Selasa', value: 'selasa'},
  {name: 'Rabu', value: 'rabu'},
  {name: 'Kamis', value: 'kamis'},
  {name: "Jum'at", value: "jum'at"},
]

export default class JadwalPresensi extends Component {
  state = {
    isLoading: true,
    dropdownValue: "Filter berdasarkan hari..."
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.getJadwalMengajar(JSON.parse(Auth.getProfile()).id);
    setTimeout(() => {
      this.setState({isLoading: false})
    }, 2000)
  }

  _handleChangeFilterHari = (data) => {
    const { actions } = this.props;

    this.setState({
      dropdownValue: data.name
    })

    actions.getJadwalMengajar(JSON.parse(Auth.getProfile()).id, data.value);
  }
  
  render() {
    const { isLoading, dropdownValue } = this.state;
    const { dataMengajar } = this.props;

    return (
      isLoading ? (
        <Loading />
      ) : (
        <div className="main-view-container">
          <div className="header-dashboard">
            <Header 
              title="Jadwal & Penilaian"
              fullName={JSON.parse(Auth.getProfile()).nama}
              role={Auth.getUserType()}
            />
          </div>

          <div className="jadwal-presensi">
            <div className="filter-container">
              <Dropdown value={dropdownValue} data={hari} onChange={this._handleChangeFilterHari} />
            </div>
            {
              dataMengajar.map((data, idx) => {
                return (
                  <div key={idx} className="list-jadwal-container">
                    <div className="jadwal">
                      <div className="left-section">
                        <p>{data.mapel.namaMapel}</p>
                        {/* <p style={{fontSize: 16, marginBottom: 20, fontWeight: 'normal', fontFamily: 'Poppins'}} >{data.guru.nama}</p> */}
                        <div className="btn-gr-ab" style={{display: 'flex', gap: 12}}>
                          <Link to={{pathname: `${window.location.pathname}/presensi-siswa`, state: {dataJadwalMapel: data}}} >
                            <Button label="Isi Absensi" type="success" width={154} />
                          </Link>
                          <Link to={{pathname: `${window.location.pathname}/penilaian`, state: {dataJadwalMapel: data}}} >
                            <Button label="Penilaian" type="info" width={154} />
                          </Link>
                        </div>
                      </div>
                      <div className="separator"></div>
                      <div className="right-section">
                        <div className="inside-section">
                          <div className="inside-wrapper">
                            <p className="title">Hari</p>
                            <p className="value">{data.hari}</p>
                          </div>
                          <div className="inside-wrapper">
                            <p className="title">Jam ke</p>
                            <p className="value">{data.waktuMengajar.jamMapel}</p>
                          </div>
                        </div>
                        <div className="inside-section">
                          <div className="inside-wrapper">
                            <p className="title">Waktu</p>
                            <p className="value">{data.waktuMengajar.waktuMapel}</p>
                          </div>
                          <div className="inside-wrapper">
                            <p className="title">Kelas</p>
                            <p className="value">{data.kelas.namaKelas}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      )
    )
  }
}
