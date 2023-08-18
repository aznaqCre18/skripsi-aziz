import React, { Component } from 'react';
import qs from 'query-string';
import moment from 'moment';

import AuthService from '../../../utils/authService';
import Loading from '../../../components/Loading/component';
import Table from '../../../components/Table';
import Header from '../../../components/Header/component';

import Dropdown from '../../../components/Dropdown';
import Button from '../../../components/Button/component';
import { JadwalPelajaranImage } from '../../../configs/images';
import ModalJadwalMapel from '../../../components/Modal/ModalJadwalMapel';
import { DeleteIcon, EditBgIcon } from '../../../configs/icons';
import ModalCreate from '../../../components/Modal/ModalCreate';
import ModalDeleteData from '../../../components/Modal/ModalDeleteData';

const Auth = new AuthService();

const fieldTable = [
  {fieldName: 'no.', fieldApi: ''},
  {fieldName: 'jam', fieldApi: 'jam'},
  {fieldName: 'waktu', fieldApi: 'waktu'},
  {fieldName: 'mata pelajaran', fieldApi: 'mataPelajaran'},
  {fieldName: 'guru', fieldApi: 'guru'},
  {fieldName: 'aksi', fieldApi: ''},
];

const hari = [
  { name: "Senin", value: "senin"},
  { name: "Selasa", value: "selasa"},
  { name: "Rabu", value: "rabu"},
  { name: "Kamis", value: "kamis"},
  { name: "Jum'at", value: "jum'at"},
];

const customBtnAction = [
  {icon: EditBgIcon, value: 'edit'},
  {icon: DeleteIcon, value: 'delete'},
]

export default class WaktuMengajar extends Component {
  state = {
    isLoading: true,
    valueDropdown: '-- Pilih Kelas --',
    idKelasChoose: '',
    dataEditJadwal: {},
    defaultValuDropdownMultiple: {},
    defaultValuDropdownIdKelas: "",
    defaultValuDropdownKelas: '-- Pilih Kelas --',
    defaultValuDropdownHari: '-- Pilih Hari --',
    editValue: {
      hari: "",
      mapel: {name: "", value: ""},
      guru: {name: "", value: ""},
      waktu: {name: "", value: ""}
    },
    jadwalSelected: {},
    idSelectedJadwal: "",
    idDeleteJadwal: "",

    //modal
    isModalCreate: false,
    isModalEdit: false,
    isModalDelete: false,
  }

  componentDidMount() {
    const { actions, actionsGuru, actionsMapel, actionsKelas, actionsWaktuMengajar, history } = this.props;
    const queryParams = qs.parse(history.location.search);

    queryParams.idKelasChoose && actions.getJadwalPelajaranByIdKelas(queryParams.idKelasChoose);

    setTimeout(() => {
      this.setState({isLoading: false})
    }, 500);

    actionsGuru.getDataAllGuru();
    actionsMapel.getDataMapel();
    actionsKelas.getDataKelas();
    actionsWaktuMengajar.getDataWaktuMengajar();
  }

  _handleClickButtonHeader = (value) => {
    console.log(value);
  }

  _handleChangeDropdown = (value) => {
    const { actions } = this.props;
    const { history } = this.props;
    const { location } = history;
    const queryParams = qs.parse(location.search);

    actions.getJadwalPelajaranByIdKelas(value.id);

    const newQueryParams = {
      ...queryParams,
      idKelasChoose: value.id,
      valueDropdown: value.namaKelas,
    };

    history.push({
      search: qs.stringify(newQueryParams)
    });
  }

  _handleOpenModalCreate = () => {
    this.setState({
      isModalCreate: !this.state.isModalCreate,
    })
  }

  _handleClickActionTable = (value, data) => {
    console.log(data);
    if(value === 'edit') {
      this.setState({
        isModalEdit: !this.state.isModalEdit,
        idSelectedJadwal: data.id,
        jadwalSelected: {
          hari: { name: data.hari, value: data.hari.toLowerCase()},
          mapel: { name: data.mataPelajaran, value: data.idMapel },
          guru: { name: data.guru, value: data.idGuru },
          waktu: { name: data.waktu, value: data.idWaktuMengajar },
        }
      });
    } else if(value === 'delete') {
      this.setState({
        isModalDelete: !this.state.isModalDelete,
        idDeleteJadwal: data.id,
      })
    }
  }

  _handleCloseModalEdit = () => {
    this.setState({
      isModalEdit: !this.state.isModalEdit,
      jadwalSelected: {},
      editValue: {},
    });
  }

  _handleCloseModalDelete = () => {
    this.setState({
      isModalDelete: !this.state.isModalDelete,
    });
  }

  _handleCreateJadwalMapel = (data) => {
    const { actions } = this.props;
    const searchParams = qs.parse(this.props.history.location.search);

    actions.addJadwalPelajaran(data);

    setTimeout(() => {
      actions.getJadwalPelajaranByIdKelas(searchParams.idKelasChoose);
    }, 500);

    this.setState({
      isModalCreate: false,
      defaultValuDropdownMultiple: {},
      defaultValuDropdownHari: "-- Pilih Hari --",
    })
  }

  _handleChangeDropdownHari = (data) => {
    this.setState({
      defaultValuDropdownHari: data.name
    });
  }

  _handleChangeDropdownKelas = (data) => {
    this.setState({
      defaultValuDropdownIdKelas: data.id,
      defaultValuDropdownKelas: data.namaKelas
    });
  }

  _handleChangeDropdownMapel = (data) => {
    const { defaultValuDropdownMultiple } = this.state;

    if(data.customData.typeDr === 'guru') {
      this.setState({
        defaultValuDropdownMultiple: defaultValuDropdownMultiple[data.customData.keyForm] ? (
          {
            ...defaultValuDropdownMultiple,
            [data.customData.keyForm]: {
              ...defaultValuDropdownMultiple[data.customData.keyForm],
              guru: {id: data.id, nama: data.nama}
            }
          }
        ) : (
          {
            ...defaultValuDropdownMultiple,
            [data.customData.keyForm]: {
              guru: {id: data.id, nama: data.nama},
              idWaktuMengajar: data.customData.idWaktuMengajar,
            }
          }
        )
      })
    } else if(data.customData.typeDr === 'mapel') {
      this.setState({
        defaultValuDropdownMultiple: defaultValuDropdownMultiple[data.customData.keyForm] ? (
          {
            ...defaultValuDropdownMultiple,
            [data.customData.keyForm]: {
              ...defaultValuDropdownMultiple[data.customData.keyForm],
              mapel: {id: data.id, namaMapel: data.namaMapel}
            }
          }
        ) : (
          {
            ...defaultValuDropdownMultiple,
            [data.customData.keyForm]: {
              mapel: {id: data.id, namaMapel: data.namaMapel},
              idWaktuMengajar: data.customData.idWaktuMengajar,
            }
          }
        )
      });
    }
  }

  _handleChangeEditDropdownHari = (data) => {
    console.log(data);
    this.setState({
      editValue: {
        ...this.state.editValue,
        hari: data.value
      }
    });
  };

  _handleChangeEditDropdownMataPelajaran = (data) => {
    console.log(data);
    this.setState({
      editValue: {
        ...this.state.editValue,
        mapel: { name: data.namaMapel, value: data.id }
      }
    });
  };

  _handleChangeEditDropdownGuru = (data) => {
    console.log(data);
    this.setState({
      editValue: {
        ...this.state.editValue,
        guru: { name: data.nama, value: data.id }
      }
    });
  };

  _handleChangeEditDropdownWaktuMengajar = (data) => {
    console.log(data);
    this.setState({
      editValue: {
        ...this.state.editValue,
        waktu: { name: data.waktuMapel, value: data.id }
      }
    });
  };

  _handleSubmitEditJadwal = () => {
    const { editValue, jadwalSelected, idSelectedJadwal } = this.state;
    const { actions, history } = this.props;
    const searchParams = qs.parse(history.location.search);
    
    
    const payloadEditJadwal = {
      hari: editValue?.hari ? editValue?.hari : jadwalSelected?.hari?.name,
      idMapel: editValue?.mapel?.value ? editValue?.mapel?.value : jadwalSelected?.mapel?.value,
      idGuru: editValue?.guru?.value ? editValue?.guru?.value : jadwalSelected?.guru?.value,
      idWaktuMengajar: editValue?.waktu?.value ? editValue?.waktu?.value : jadwalSelected?.waktu?.value,
    }

    actions.editJadwalMapel(idSelectedJadwal, payloadEditJadwal);

    setTimeout(() => {
      actions.getJadwalPelajaranByIdKelas(searchParams.idKelasChoose);

      this.setState({
        isModalEdit: false,
        jadwalSelected: {},
        editValue: {},
      })
    }, 500)
  }

  _handleDeleteJadwal = () => {
    const { idDeleteJadwal } = this.state;

    console.log(idDeleteJadwal);
  }
  
  render() {
    const { isLoading, isModalCreate, isModalEdit, isModalDelete, valueDropdown, jadwalSelected, defaultValuDropdownHari, defaultValuDropdownIdKelas, defaultValuDropdownKelas, defaultValuDropdownMultiple, editValue } = this.state;
    const { dataGuru, dataMapel, dataKelas, dataJadwalMapel, dataWaktuMengajar, history } = this.props;
    const searchParams = qs.parse(history.location.search);

    return (
      isLoading ? (
        <Loading />
      ) : (
        <div className="main-view-container jadwal-mengajar">
          <div className="header-dashboard">
            <Header 
              title="Waktu Mengajar"
              fullName={JSON.parse(Auth.getProfile()).nama}
              role={Auth.getUserType()}
            />
          </div>

          <div 
            className="tools-jadwal"
            style={{
              height: 90,
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0 32px',
              backgroundColor: '#fff',
              borderRadius: 8,
              marginBottom: 20,
            }} 
          >
            <div className="dropdown">
              <Dropdown value={searchParams.valueDropdown} onChange={this._handleChangeDropdown} data={dataKelas} nameKey="namaKelas" width={210}  />
            </div>
            <div 
              className="btn-group-jadwal"
              style={{
                display: 'flex',
                gap: 12
              }}
            >
              <Button label="Buat Jadwal Pelajaran" onClick={this._handleOpenModalCreate} />
              <Button label="Export" />
            </div>
          </div>

          {
            dataJadwalMapel.length > 0 ? dataJadwalMapel.map((data, idx) => {
              return (
                <div className="main-content-view jadwal-mengajar" key={idx}>
                  <div className="header-tools" style={{padding: '16px 22px' ,display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} >
                    <p style={{fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: 18, textTransform: 'capitalize'}}>{data.hari}</p>
                  </div>
                  <div className="table-section">
                    <Table datasets={data.mapel.sort((a, b) => Number(a.jam) - Number(b.jam))} tableField={fieldTable} customIconAction={customBtnAction} onClickAction={this._handleClickActionTable} />
                  </div>
                </div>
              )
            }) : (
              <div 
                className="empty-page"
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '90px 0'
                }}
              >
                <img 
                  src={JadwalPelajaranImage} 
                  alt="jadwal-img" 
                  style={{marginBottom: 32}}
                />
                <div className="wording" style={{textAlign: 'center'}}>
                  <p 
                    className="title"
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      fontFamily: 'Quicksand',
                      marginBottom: 4
                    }}
                  >
                    {valueDropdown !== "-- Pilih Kelas --" && dataJadwalMapel.length < 1 ? "Jadwal Mata Pelajaran Belum Ada" : "Pilih Kelas Terlebih Dahulu" }
                  </p>
                  {valueDropdown !== "-- Pilih Kelas --" && dataJadwalMapel.length < 1 ? (
                    <React.Fragment>
                      <p 
                        className="subtitle"
                        style={{
                          fontSize: 16,
                          fontWeight: '300',
                          fontFamily: 'Quicksand',
                        }}
                      >
                        Tidak ada jadwal tersedia, harap buat terlebih dahulu !
                      </p>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <p 
                        className="subtitle"
                        style={{
                          fontSize: 16,
                          fontWeight: '300',
                          fontFamily: 'Quicksand',
                        }}
                      >
                        Pilih kelas terlebih dahulu untuk melihat
                      </p>
                      <p 
                        className="subtitle"
                        style={{
                          fontSize: 16,
                          fontWeight: '300',
                          fontFamily: 'Quicksand',
                        }}
                      >
                        jadwal masing-masing kelas
                      </p>
                    </React.Fragment>
                  ) }
                </div>
              </div>
            )
          }

          <ModalJadwalMapel 
            isShow={isModalCreate} 
            onHide={this._handleOpenModalCreate} 
            dataDropdownMapel={dataMapel}
            dataDropdownGuru={dataGuru}
            dataDropdownKelas={dataKelas}
            waktuMenagajar={dataWaktuMengajar}
            handleCreateJadwal={this._handleCreateJadwalMapel}
            dataBeforeEdit={{}}
            valueDropdownHari={defaultValuDropdownHari}
            valueDropdownKelas={{defaultValuDropdownIdKelas, defaultValuDropdownKelas}}
            defaultValuDropdownMultiple={defaultValuDropdownMultiple}
            changeDropdownHari={this._handleChangeDropdownHari}
            changeDropdownKelas={this._handleChangeDropdownKelas}
            changeDropdownMapel={this._handleChangeDropdownMapel}
          />

          <ModalCreate size='md' isOpen={isModalEdit} isAlign onClick={this._handleCloseModalEdit} createData={this._handleSubmitEditJadwal} >
            <h4>Edit Jadwal Mata Pelajaran</h4>
            <div style={{marginBottom: 12, marginTop: 18}} className="input-drop-group">
              <p style={{fontSize: 14, fontFamily: 'Quicksand', paddingBottom: 4}} >Hari</p>
              <Dropdown data={hari} onChange={this._handleChangeEditDropdownHari} value={editValue?.hari ? editValue?.hari : jadwalSelected?.hari?.name} />
            </div>
            <div style={{marginBottom: 12}} className="input-drop-group">
              <p style={{fontSize: 14, fontFamily: 'Quicksand', paddingBottom: 4}} >Mata pelajaran</p>
              <Dropdown data={dataMapel} nameKey="namaMapel" onChange={this._handleChangeEditDropdownMataPelajaran} value={editValue?.mapel?.name ? editValue?.mapel?.name : jadwalSelected?.mapel?.name} />
            </div>
            <div style={{marginBottom: 12}} className="input-drop-group">
              <p style={{fontSize: 14, fontFamily: 'Quicksand', paddingBottom: 4}} >Guru</p>
              <Dropdown data={dataGuru} nameKey="nama" onChange={this._handleChangeEditDropdownGuru} value={editValue?.guru?.name ? editValue?.guru?.name : jadwalSelected?.guru?.name} />
            </div>
            <div style={{marginBottom: 12}} className="input-drop-group">
              <p style={{fontSize: 14, fontFamily: 'Quicksand', paddingBottom: 4}} >Waktu mengajar</p>
              <Dropdown data={dataWaktuMengajar} nameKey="waktuMapel" onChange={this._handleChangeEditDropdownWaktuMengajar} value={editValue?.waktu?.name ? editValue?.waktu?.name : jadwalSelected?.waktu?.name} />
            </div>
          </ModalCreate>          

          <ModalDeleteData isOpen={isModalDelete} onClick={this._handleCloseModalDelete} onDeleteData={this._handleDeleteJadwal} />
        </div>
      )
    )
  }
}
   