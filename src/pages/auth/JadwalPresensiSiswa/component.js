import React, { Component } from 'react';
import { Modal, ModalBody } from 'reactstrap';

import AuthService from '../../../utils/authService';
import Loading from '../../../components/Loading/component';
import Table from '../../../components/Table';
import Header from '../../../components/Header/component';
import HeaderMainDataView from '../../../components/HeaderMainDataView';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { JadwalPresensiIcon, CrossIcon, EditBgIcon, EditIcon, EyeBgIcon, SeePresenseBgIcon } from '../../../configs/icons';
import ModalFormPresensi from '../../../components/Modal/ModalFormPresensi';
import moment from 'moment';

const Auth = new AuthService();

const fieldTable = [
  {fieldName: 'no.', fieldApi: ''},
  {fieldName: 'mata pelajaran', fieldApi: 'namaMapel'},
  {fieldName: 'aksi', fieldApi: ''},
]

const dataTableDummy = [
  {
    mapel: 'Ilmu Pengetahuan Alam 1',
    guru: 'Yuni Ningsih, S.Pd',
  },
  {
    mapel: 'Ilmu Pengetahuan Sosial 1',
    guru: 'Ali Alhamid, S.Pd',
  },
  {
    mapel: 'Matematika 1',
    guru: 'Sunarto Munarman, S.Pd',
  },
  {
    mapel: 'Topologi Jaringan',
    guru: 'Tania Sabila, S.Pd',
  },
]

const buttonGroup = [
  { label: 'Export', value: 'export'},
]

const customIconAction = [
  { icon: SeePresenseBgIcon, value: 'absen' },
]

const dummyDataAbsen = [
  {name: 'Aziz Nur Abdul Qodir'},
  {name: 'Dyah Puji Astuti'},
  {name: 'Ridwansyah Oktavianto'},
  {name: 'Annisa Lutfiani'},
]

export default class JadwalPresensiSiswa extends Component {
  state = {
    isLoading: true,
    isModalFormPresens: false,
    idMapelClicked: '',
  }

  componentDidMount() {
    const { actionsJadwal } = this.props;

    actionsJadwal.getDataJadwalMapelForSiswa(JSON.parse(Auth.getProfile()).idKelas);

    setTimeout(() => {
      this.setState({isLoading: false})
    }, 2000)
  }

  _handleClickButtonHeader = (value) => {
    const { actionsJadwal } = this.props;
    
    if(value === 'form-presense') {
      this.setState({
        isModalFormPresens: !this.state.isModalFormPresens,
      })
    }
  }

  _handleActionButton = (value, dataApi) => {
    const { actionsJadwal } = this.props;
    const idSiswa = JSON.parse(Auth.getProfile()).id;

    this.setState({
      idMapelClicked: dataApi.idMapel,
    })
    
    if(value === 'absen') {
      actionsJadwal.getDataAbsensiForSiswa(idSiswa, dataApi.idMapel);
      
      setTimeout(() => {
        this._handleClickButtonHeader('form-presense');
      }, 500)
    }
  }
  
  render() {
    const { isLoading, isModalFormPresens, idMapelClicked } = this.state;
    const { dataJadwalMapel, dataJadwalSiswa, dataAbsensiSiswa } = this.props;

    console.log(dataAbsensiSiswa, "<<< ABSEN");

    return (
      isLoading ? (
        <Loading />
      ) : (
        <div className="main-view-container">
          <div className="header-dashboard">
            <Header
              title="Presensi Siswa"
              fullName={JSON.parse(Auth.getProfile()).nama}
              role={Auth.getUserType()}
            />
          </div>

          <div className="main-content-view">
            <div className="header-tools" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 32}}>
              <div className="info-mapel" style={{padding: '24px 0'}} >
                <table>
                  <tbody>
                    <tr style={{marginBottom: 8}}>
                      <td style={{fontWeight: 600}}>Jurusan</td>
                      <td style={{padding: '0 20px'}}>:</td>
                      <td>{JSON.parse(Auth.getProfile()).jurusan.namaJurusan}</td>
                    </tr>
                    <tr>
                      <td style={{fontWeight: 600}}>Wali Kelas</td>
                      <td style={{padding: '0 20px'}}>:</td>
                      <td>{`${JSON.parse(Auth.getProfile()).kelas.guru.gelarDepan ? JSON.parse(Auth.getProfile()).kelas.guru.gelarDepan + '.' : '' }${JSON.parse(Auth.getProfile()).kelas.guru.nama}, ${JSON.parse(Auth.getProfile()).kelas.guru.gelarBelakang}`}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* <HeaderMainDataView onClick={this._handleClickButtonHeader} isSearchField={false} /> */}
            </div>
            <div className="table-section">
              <Table datasets={dataJadwalSiswa} tableField={fieldTable} customIconAction={customIconAction} onClickAction={this._handleActionButton} />
            </div>
          </div>

          <Modal centered isOpen={isModalFormPresens} toggle={() => this.setState({ isModalFormPresens: !isModalFormPresens })} >
            <ModalBody style={{padding: '2rem'}} className="modal-body-custom">
              <img src={CrossIcon} alt="close" style={{position: 'absolute', top: 20, right: 20, cursor: 'pointer'}} onClick={() => this.setState({ isModalFormPresens: !isModalFormPresens })} />
              <div className="column-section" style={{marginTop: 30, marginBottom: 10, display: 'flex', justifyContent: 'space-between'}}>
                <p style={{fontFamily: 'Quicksand', fontWeight: 'Bold', fontSize: 14}} >Mata Pelajaran</p>
                <p style={{fontFamily: 'Quicksand', fontSize: 14}} >
                  {
                    dataJadwalSiswa.map((data, idx) => {
                      return (
                        data.idMapel === idMapelClicked && (
                          data.listJadwal[0].mapel.namaMapel
                        )
                      )
                    })
                  }
                </p>
              </div>
              <div className="column-section" style={{marginBottom: 10, display: 'flex', justifyContent: 'space-between'}}>
                <p style={{fontFamily: 'Quicksand', fontWeight: 'Bold', fontSize: 14}} >ID Mata Pelajaran</p>
                <p style={{fontFamily: 'Quicksand', fontSize: 14}} >
                  {
                    dataJadwalSiswa.map((data, idx) => {
                      return (
                        data.idMapel === idMapelClicked && (
                          data.listJadwal[0].mapel.id
                        )
                      )
                    })
                  }  
                </p>
              </div>
              <div className="column-section" style={{marginBottom: 20, display: 'flex', justifyContent: 'space-between'}}>
                <p style={{fontFamily: 'Quicksand', fontWeight: 'Bold', fontSize: 14}} >Guru</p>
                <p style={{fontFamily: 'Quicksand', fontSize: 14}} >
                  {
                    dataJadwalSiswa.map((data, idx) => {
                      return (
                        data.idMapel === idMapelClicked && (
                          data.listJadwal[0].guru
                        )
                      )
                    })
                  }
                </p>
              </div>
              <div className="column-section" style={{marginBottom: 20}}>
                <p style={{fontFamily: 'Quicksand', fontWeight: 'Bold', fontSize: 14, marginBottom: 6}} >Jadwal</p>
                {
                  dataJadwalSiswa.length > 0 ? dataJadwalSiswa.map((data, idx) => {
                    return (
                      data.idMapel === idMapelClicked && (
                        data.listJadwal.map((data, i) => {
                          return (
                            <div className="column-section" style={{display: 'flex', justifyContent: 'space-between', marginBottom: 6}}>
                              <div className="no-mapel" style={{display: 'flex', gap: 18}}>
                                <p style={{fontFamily: 'Quicksand', fontSize: 14}} >{i + 1}.</p>
                                <p style={{fontFamily: 'Quicksand', fontSize: 14}} >{data.hari}</p>
                              </div>
                              <p style={{fontFamily: 'Quicksand', fontSize: 14, fontWeight: 'Bold', textTransform: 'capitalize'}} >{data.waktu.waktuMapel}</p>
                            </div>
                          )
                        })
                      )
                    )
                  }) : (
                    <p style={{fontFamily: 'Quicksand', fontSize: 14, textTransform: 'capitalize'}} >Belum ada jadwal.</p>
                  )
                }
              </div>

              <div className="presens-summary" style={{backgroundColor: '#F5F6F8', padding: 16, borderRadius: 8, marginBottom: 20}}>
                <div className="column-section" style={{marginBottom: 10, display: 'flex', justifyContent: 'space-between'}}>
                  <p style={{fontFamily: 'Quicksand', fontWeight: 'Bold', fontSize: 14}} >Hadir</p>
                  <p style={{fontFamily: 'Quicksand', fontSize: 14}} >{dataAbsensiSiswa?.meta?.jmlHadir}</p>
                </div>
                <div className="column-section" style={{marginBottom: 10, display: 'flex', justifyContent: 'space-between'}}>
                  <p style={{fontFamily: 'Quicksand', fontWeight: 'Bold', fontSize: 14}} >Izin</p>
                  <p style={{fontFamily: 'Quicksand', fontSize: 14}} >{dataAbsensiSiswa?.meta?.jmlIzin}</p>
                </div>
                <div className="column-section" style={{marginBottom: 10, display: 'flex', justifyContent: 'space-between'}}>
                  <p style={{fontFamily: 'Quicksand', fontWeight: 'Bold', fontSize: 14}} >Sakit</p>
                  <p style={{fontFamily: 'Quicksand', fontSize: 14}} >{dataAbsensiSiswa?.meta?.jmlSakit}</p>
                </div>
                <div className="column-section" style={{display: 'flex', justifyContent: 'space-between'}}>
                  <p style={{fontFamily: 'Quicksand', fontWeight: 'Bold', fontSize: 14}} >Alpa</p>
                  <p style={{fontFamily: 'Quicksand', fontSize: 14}} >{dataAbsensiSiswa?.meta?.jmlAlpa}</p>
                </div>
              </div>

              <div className="daftar-absensi">
                <p style={{fontFamily: 'Quicksand', fontWeight: 'Bold', fontSize: 14, marginBottom: 12}} className="title">Daftar Absensi</p>
                <div className="list-absen">
                  {
                    dataAbsensiSiswa?.data && dataAbsensiSiswa?.data.length > 0 ? dataAbsensiSiswa?.data.map((data, idx) => {
                      return (
                        <div className="column-section" style={{display: 'flex', justifyContent: 'space-between', marginBottom: 6}}>
                          <div className="no-mapel" style={{display: 'flex', gap: 18}}>
                            <p style={{fontFamily: 'Quicksand', fontSize: 14}} >{idx + 1}.</p>
                            <p style={{fontFamily: 'Quicksand', fontSize: 14}} >{moment(data?.pertemuan?.tanggal).format('dddd, DD MMM YYYY')}</p>
                          </div>
                          <p style={{fontFamily: 'Quicksand', fontSize: 14, fontWeight: 'Bold', textTransform: 'capitalize'}} >{data.status}</p>
                        </div>
                      )
                    }) : (
                      <p style={{fontFamily: 'Quicksand', fontSize: 14, textTransform: 'capitalize'}} >Belum ada data absensi.</p>
                    )
                  }
                </div>
              </div>
            </ModalBody>
          </Modal>
        </div>
      )
    )
  }
}
