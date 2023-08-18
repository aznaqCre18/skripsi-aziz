import React, { Component } from 'react';

import Header from '../../../../components/Header';
import Loading from '../../../../components/Loading/component';
import OtherButtonDashboard from '../../../../components/OtherButtonDashboard';
import { BigJadwalIcon, BigPenilaianIcon } from '../../../../configs/icons';

import AuthService from '../../../../utils/authService';

const Auth = new AuthService();

const buttonContent = [
  { 
    icon: BigJadwalIcon, 
    title: "Lihat Jadwal, Presensi dan Nilai Siswa", 
    description: "Klik untuk melihat jadwal mengajar, presensi dan nilai siswa",
    path: "/jadwal-penilaian",
    type: "success"
  },
];

export default class GuruDashboard extends Component {
  state = {
    isLoading: true,
    thnAjaranSelected: "Pilih tahun ajaran",
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({isLoading: false})
    }, 500);
  }

  _handleSelectDropdown = (item) => {
    this.setState({ thnAjaranSelected: item.name });
  }

  render() {
    const { isLoading, thnAjaranSelected } = this.state;
    const profileGuru = JSON.parse(Auth.getProfile());

    return (
      isLoading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <div className="container-dashboard-admin">
            <div className="header-section">
              <Header 
                title="Guru Dashboard"
                fullName={JSON.parse(Auth.getProfile()).nama}
                role={Auth.getUserType()}
              />
            </div>
            <div className="main-content-data">
              <div className="banner-welcome other">
                <h3>Selamat Datang, {JSON.parse(Auth.getProfile()).nama} !</h3>
                <div className="data-diri">
                  <table>
                    <tbody>
                      <tr>
                        <td>Nama</td>
                        <td>:</td>
                        <th>{`${profileGuru.gelarDepan ? profileGuru.gelarDepan + '.' : ''}${profileGuru.nama}, ${profileGuru.gelarBelakang}`}</th>
                      </tr>
                      <tr>
                        <td>NIP</td>
                        <td>:</td>
                        <th>{profileGuru.nip}</th>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>:</td>
                        <th>{profileGuru.email}</th>
                      </tr>
                      <tr>
                        <td>Tempat Lahir</td>
                        <td>:</td>
                        <th>{profileGuru.tempatLahir}</th>
                      </tr>
                      <tr>
                        <td>Tanggal Lahir</td>
                        <td>:</td>
                        <th>{profileGuru.tanggalLahir}</th>
                      </tr>
                      <tr>
                        <td>Wali Kelas</td>
                        <td>:</td>
                        <th>{profileGuru.kelas.namaKelas}</th>
                      </tr>
                      <tr>
                        <td>Jurusan</td>
                        <td>:</td>
                        <th>{profileGuru.kelas.jurusan.namaJurusan}</th>
                      </tr>
                    </tbody>
                  </table>
                  <table style={{height: 'auto'}} className="table-2">
                    <tbody>
                      <tr>
                        <td>Alamat</td>
                        <td>:</td>
                        <th>
                          <p>{profileGuru.alamat}</p>
                        </th>
                      </tr>
                      <tr>
                        <td>Jenis Kelamin</td>
                        <td>:</td>
                        <th>{profileGuru.jenisKelamin === 'l' ? 'Laki - Laki' : 'Perempuan'}</th>
                      </tr>
                      <tr>
                        <td>Tahun Bertugas</td>
                        <td>:</td>
                        <th>{profileGuru.mulaiBertugas}</th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="wrapper-menu-button">
              <OtherButtonDashboard content={buttonContent} />
            </div>
          </div>
        </React.Fragment>
      )
    )
  }
}
