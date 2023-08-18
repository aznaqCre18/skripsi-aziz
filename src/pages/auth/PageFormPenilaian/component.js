import React, { Component } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import moment from 'moment';

import AuthService from '../../../utils/authService';
import Loading from '../../../components/Loading/component';
import Table from '../../../components/Table';
import Header from '../../../components/Header/component';
import HeaderMainDataView from '../../../components/HeaderMainDataView';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { EditBgIcon, EditIcon, EyeBgIcon } from '../../../configs/icons';
import ModalFormPresensi from '../../../components/Modal/ModalFormPresensi';
import SelectDateRangePicker from '../../../components/SelectDateRangePicker';
import Dropdown from '../../../components/Dropdown';
import ModalCreate from '../../../components/Modal/ModalCreate/component';

const Auth = new AuthService();

const fieldTable = [
  {fieldName: 'no.', fieldApi: ''},
  {fieldName: 'nama', fieldApi: 'nama'},
  {fieldName: 'uh1', fieldApi: 'uh1'},
  {fieldName: 'uh2', fieldApi: 'uh2'},
  {fieldName: 'uts', fieldApi: 'uts'},
  {fieldName: 'uas', fieldApi: 'uas'},
  {fieldName: '', fieldApi: ''},
];

const dataTableDummy = [
  {
    pertemuan: 'Pertemuan 1',
    tanggal: '18 April 2021',
  },
  {
    pertemuan: 'Pertemuan 2',
    tanggal: '25 April 2021',
  },
  {
    pertemuan: 'Pertemuan 3',
    tanggal: '01 Mei 2021',
  },
  {
    pertemuan: 'Pertemuan 4',
    tanggal: '08 Mei 2021',
  },
]

const buttonGroup = [
  { label: 'Tambah data pertemuan', value: 'add-data'},
]

const customIconAction = [
  { icon: EyeBgIcon, value: 'see' }, 
  { icon: EditBgIcon, value: 'edit' },
]

const dummyDataAbsen = [
  {name: 'Aziz Nur Abdul Qodir'},
  {name: 'Dyah Puji Astuti'},
  {name: 'Ridwansyah Oktavianto'},
  {name: 'Annisa Lutfiani'},
]

const dataDropdownKatNilai = [
  {name: "Ulangan Harian 1", value: "uh1"},
  {name: "Ulangan Harian 2", value: "uh2"},
  {name: "Ujian Tengah Semester", value: "uts"},
  {name: "Ujian Akhir Semester", value: "uas"},
]

export default class FormPenilaian extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      selectedCatNilai: '-- Kategori --',
      valueKatNilai: "uh1",
      isModalNilai: false,
      dataModal: {},
      type: '',
    };
  }

  componentDidMount() {
    const { valueKatNilai } = this.state;
    const { actions, actionsSiswa, dataNilai } = this.props;
    const { dataJadwalMapel } = this.props.location.state;
    
    actionsSiswa.getDataSiswaByIdKelas(dataJadwalMapel.kelas.id);
    actions.getDataNilaiByIdKelas(dataJadwalMapel.kelas.id, dataJadwalMapel.mapel.id, valueKatNilai );

    setTimeout(() => {
      this.setState({isLoading: false, payloadNilai: dataNilai})
    }, 2000)
  }

  componentDidUpdate(prevProps, prevState) {
    const { valueKatNilai } = this.state;
    const { actions, dataNilai } = this.props;
    const { dataJadwalMapel } = this.props.location.state;
    
    if(valueKatNilai !== prevState.valueKatNilai) {
      actions.getDataNilaiByIdKelas(dataJadwalMapel.kelas.id, dataJadwalMapel.mapel.id, valueKatNilai );
    }
  }

  _handleClickButtonHeader = (value) => {
    if(value === 'add-data') {
      this.setState({
        isModalFormPresens: false,
        isModalCreatePresens: !this.state.isModalCreatePresens
      })
    } else if(value === 'form-presense') {
      this.setState({
        isModalFormPresens: !this.state.isModalFormPresens,
        isModalCreatePresens: false
      })
    }
  }

  _handleActionButton = (value, dataApi) => {
    const { actions } = this.props;

    if(value === 'edit' ) {
      this._handleClickButtonHeader('form-presense');
      this.setState({ typeModalPresens: value, idPertemuan: dataApi.id });
      actions.getDataAbsensiByIdPertemuan(dataApi.id);
    } else if(value === 'see') {
      actions.getDataAbsensiByIdPertemuan(dataApi.id);
      this._handleClickButtonHeader('form-presense');
      this.setState({ typeModalPresens: value });
    }
  }

  _handleChangeCategoryNilai = (data) => {
    this.setState({
      selectedCatNilai: data.name,
      valueKatNilai: data.value,
    });
  }

  _handleOpenModal = (data) => {
    console.log(data, 'daya');

    this.setState({
      isModalNilai: !this.state.isModalNilai,
      dataModal: data,
      type: data.nilai === 0 ? 'add' : 'edit',
    })
  }

  _handleChangeInputNilai = (e) => {
    this.setState({
      dataModal: {
        ...this.state.dataModal,
        nilai: e.target.value
      }
    })
  }

  _handleInsertNilai = () => {
    const { dataModal, valueKatNilai, type } = this.state;
    const { actions, actionsSiswa } = this.props;
    const { dataJadwalMapel } = this.props.location.state;

    const payload = {
      idMapel: dataJadwalMapel?.mapel?.id,
      idSiswa: dataModal?.data?.id,
      idKelas: dataModal?.data?.idKelas,
      idTahunAjaran: dataModal?.data?.idTahunAjaran,
      kategori: valueKatNilai,
      nilai: dataModal.nilai,
    }

    if(type === 'add') {
      actions.addDataNilai(payload);
    } else if(type === 'edit') {
      actions.editDataNilai(payload, dataModal.idNilai); 
    }

    setTimeout(() => {
      actionsSiswa.getDataSiswaByIdKelas(dataJadwalMapel.kelas.id);
      actions.getDataNilaiByIdKelas(dataJadwalMapel.kelas.id, dataJadwalMapel.mapel.id, valueKatNilai );
    }, 500);

    this.setState({
      isModalNilai: false,
    });
  }
  
  render() {
    const { isLoading, isModalCreatePresens, isModalFormPresens, typeModalPresens, idPertemuan, selectedCatNilai, valueKatNilai, isModalNilai, dataModal } = this.state;
    const { dataPertemuan, dataSiswa, dataAbsensi, actionsSiswa, dataNilai } = this.props;
    const { dataJadwalMapel } = this.props.location.state;

    return (
      isLoading ? (
        <Loading />
      ) : (
        <div className="main-view-container">
          <div className="header-dashboard">
            <Header 
              title="Daftar Pertemuan"
              fullName={JSON.parse(Auth.getProfile()).nama}
              role={Auth.getUserType()}
            />
          </div>

          <div className="main-content-view">
            <div className="header-tools" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: "20px 32px"}}>
              <div className="info-mapel">
                <p className="mapel" style={{fontWeight: '600', fontFamily: 'Quicksand', fontSize: 22}}>{dataJadwalMapel.mapel.namaMapel}</p>
                <p className="guru" style={{fontSize: 14, fontWeight: '300'}}>{dataJadwalMapel.guru.nama} - {dataJadwalMapel.kelas.kodeKelas}</p>
              </div>
              <div className="action-btn-table" style={{display: 'flex', gap: 10}} >
                <Dropdown width={200} data={dataDropdownKatNilai} value={selectedCatNilai} onChange={this._handleChangeCategoryNilai} />
              </div>
            </div>
              <div className="table-section-nilai" style={selectedCatNilai === "-- Kategori --" ? {display: 'none'} : {display: 'block'}} >
                <table>
                  <tr className='row-head'>
                    <th>NO.</th>
                    <th>NIS</th>
                    <th>Nama</th>
                    <th>Kategori</th>
                    <th>Nilai</th>
                    <th>Action</th>
                  </tr>
                  {
                    dataSiswa.length > 0 ? dataSiswa.map((data, idx) => {
                      return (
                        <tr>
                          <td>{idx+1}</td>
                          <td>{data.nis}</td>
                          <td>{data.nama}</td>
                          <td>{selectedCatNilai}</td>
                          <td>{idx < dataNilai.length && dataNilai[idx].idSiswa === data.id && dataNilai[idx].kategori === valueKatNilai ? dataNilai[idx].nilai : '-'}</td>
                          <td>
                            <img 
                              style={{cursor: 'pointer'}} 
                              onClick={
                                () => this._handleOpenModal({
                                  data, 
                                  nilai: idx < dataNilai.length && dataNilai[idx].idSiswa === data.id && dataNilai[idx].kategori === valueKatNilai ? dataNilai[idx].nilai : 0,
                                  idNilai: idx < dataNilai.length && dataNilai[idx].idSiswa === data.id && dataNilai[idx].kategori === valueKatNilai ? dataNilai[idx].id : 0,
                                })
                              } 
                              src={EditBgIcon} 
                            />
                          </td>
                        </tr>
                      )
                    }) : (
                      <div>Data Nilai Tidak Ada</div>
                    )
                  }
                </table>
              </div>
              <div className="table-section-nilai" style={ selectedCatNilai === "-- Kategori --" ? {display: 'flex', alignItems: 'center', justifyContent: 'center', height: 160} : {display: 'none'}}>
                <p style={{fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: 18, marginTop: -20}} >Pilih kategori terlebih dahulu !</p>
              </div>
          </div>
          <ModalCreate size="m" isOpen={isModalNilai} onClick={this._handleOpenModal} isAlign createData={this._handleInsertNilai} >
            <h4 style={{marginBottom: 20}}>Input nilai</h4>
            <div style={{marginBottom: 20}} className="info">
              <div className="name" style={{display: 'flex', justifyContent: 'space-between', marginBottom: 8}}>
                <p>Nama</p>
                <p style={{fontWeight: '500'}} >{dataModal?.data?.nama}</p>
              </div>
              <div className="kelas" style={{display: 'flex', justifyContent: 'space-between'}}>
                <p>Kelas</p>
                <p style={{fontWeight: '500'}} >{dataModal?.data?.namaKelas}</p>
              </div>
            </div>

            <Input label="Nilai" defaultValue={dataModal?.nilai} placeholder="Masukan nilai siswa" onChange={this._handleChangeInputNilai} type="number" maxLength="3" max="3" />
          </ModalCreate>
        </div>
      )
    )
  }
}
