import React, { Component } from 'react';

import AuthService from '../../../utils/authService';
import Loading from '../../../components/Loading/component';
import Table from '../../../components/Table';
import Header from '../../../components/Header/component';
import HeaderMainDataView from '../../../components/HeaderMainDataView';
import { EditIcon, DeleteIcon } from '../../../configs/icons';
import ModalCreate from '../../../components/Modal/ModalCreate';
import ModalDeleteData from '../../../components/Modal/ModalDeleteData';
import Input from '../../../components/Input';
import ModalEdit from '../../../components/Modal/ModalEditData/component';
import Dropdown from '../../../components/Dropdown';

const Auth = new AuthService();

const fieldTable = [
  {fieldName: 'no.', fieldApi: ''},
  {fieldName: 'kode kelas', fieldApi: 'kodeKelas'},
  {fieldName: 'kelas', fieldApi: 'namaKelas'},
  {fieldName: 'wali kelas', fieldApi: 'waliKelas'},
  {fieldName: 'jurusan', fieldApi: 'namaJurusan'},
  {fieldName: 'action', fieldApi: ''},
]

const buttonGroup = [
  { label: 'Tambah data kelas', value: 'add-data'},
  { label: 'Export', value: 'export' },
]

const customIconAction = [
  { icon: EditIcon, value: 'edit' }, 
  { icon: DeleteIcon, value: 'delete' },
]

export default class Kelas extends Component {
  state = {
    isLoading: true,
    resDataKelas: [],
    defaultValueDropdownGuru: 'Pilih Wali Kelas...',
    defaultValueDropdownJurusan: 'Pilih Jurusan...',

    //api payload
    apiPayload: {
      kodeKelas: "",
      namaKelas: "",
      idWaliKelas: null,
      idJurusan: null,
    },
    idDelete: '',
    idEdit: '',

    //modal
    isModalCreate: false,
    isModalEdit: false,
    isModalDelete: false,
  }

  componentDidMount() {
    const { actions, actionsJurusan, actionsGuru } = this.props;

    actions.getDataKelas();
    actionsJurusan.getDataJurusan();
    actionsGuru.getDataAllGuru();
    
    setTimeout(() => {
      this.setState({isLoading: false})
    }, 2000);
  }

  _handleClickButtonHeader = (value) => {
    if(value === 'add-data') {
      this._handleOpenModalCreate();
    } else if(value === 'export') {
      console.log(value);
    }
  }

  _handleChangeDropdownGuru = (item) => {
    this.setState({
      defaultValueDropdownGuru: `${item.gelarDepan} ${item.nama} ${item.gelarBelakang}`,
      apiPayload: {
        ...this.state.apiPayload,
        idWaliKelas: item.id
      }
    })
  }

  _handleChangeDropdownJurusan = (item) => {
    console.log(item);
    this.setState({
      defaultValueDropdownJurusan: `${item.kodeJurusan} - ${item.namaJurusan}`,
      apiPayload: {
        ...this.state.apiPayload,
        idJurusan: item.id
      }
    })
  }

  _onChangeInputKelas = (e) => {
    this.setState({
      apiPayload: {
        ...this.state.apiPayload,
        [e.target.name]: e.target.value
      }
    })
  }

  _onClickActionButton = (type, dataApi) => {
    if(type === 'edit') {
      console.log(dataApi, "DATA API");
      this._handleOpenModalEdit(dataApi.id);
      this.setState({
        apiPayload: {
          kodeKelas: dataApi.kodeKelas,
          namaKelas: dataApi.namaKelas,
          idWaliKelas: dataApi.idWaliKelas,
          idJurusan: dataApi.idJurusan,
        },
        defaultValueDropdownGuru: `${dataApi.guru.gelarDepan} ${dataApi.guru.nama} ${dataApi.guru.gelarBelakang}`,
        defaultValueDropdownJurusan: `${dataApi.jurusan.kodeJurusan} - ${dataApi.jurusan.namaJurusan}`,
      });
    } else if(type === 'delete') {
      this._handleOpenModalDelete(dataApi.id);
    }
  }

  _handleOpenModalCreate = () => {
    this.setState({
      isModalCreate: !this.state.isModalCreate
    })
  }

  _handleOpenModalEdit = (id) => {
    this.setState({
      isModalEdit: !this.state.isModalEdit,
      idEdit: id
    })
  }

  _handleOpenModalDelete = (id) => {
    this.setState({
      isModalDelete: !this.state.isModalDelete,
      idDelete: id
    })
  }

  _handleCreateKelas = () => {
    const { apiPayload } = this.state;
    const { actions } = this.props;

    actions.createDataKelas(apiPayload);

    setTimeout(() => {
      actions.getDataKelas();
    }, 500);

    this.setState({
      isModalCreate: false
    });
  }

  _handleDeleteKelas = () => {
    const { idDelete } = this.state;
    const { actions } = this.props;
    
    actions.deleteKelas(idDelete);

    setTimeout(() => {
      actions.getDataKelas();
    }, 500);

    this.setState({
      isModalDelete: false
    });
  }

  _handleEditKelas = () => {
    const { idEdit, apiPayload } = this.state;
    const { actions } = this.props;

    actions.editDataKelas(idEdit, apiPayload);

    setTimeout(() => {
      actions.getDataKelas();
    }, 500);

    this.setState({
      isModalEdit: false,
    });
  }
  
  render() {
    const { isLoading, isModalCreate, isModalDelete, isModalEdit, defaultValueDropdownGuru, defaultValueDropdownJurusan, apiPayload } = this.state;
    const { dataKelas, dataJurusan, dataGuru } = this.props;

    return (
      isLoading ? (
        <Loading />
      ) : (
        <div className="main-view-container">
          <div className="header-dashboard">
            <Header 
              title="Kelas"
              fullName={JSON.parse(Auth.getProfile()).nama}
              role={Auth.getUserType()}
            />
          </div>

          <div className="main-content-view">
            <div className="header-tools">
              <HeaderMainDataView button={buttonGroup} onClick={this._handleClickButtonHeader} />
            </div>
            <div className="table-section">
              <Table datasets={dataKelas} tableField={fieldTable} customIconAction={customIconAction} onClickAction={this._onClickActionButton} />
            </div>
          </div>

          <ModalCreate size="md" isOpen={isModalCreate} onClick={this._handleOpenModalCreate} isAlign createData={this._handleCreateKelas}>
            <h4 style={{fontFamily: 'Quicksand', fontWeight: 'Bold', marginBottom: 28}} >Tambah kelas</h4>
            <Input label="Kode Kelas" name="kodeKelas" placeholder="Masukan kode kelas" onChange={this._onChangeInputKelas} />
            <Input label="Nama Kelas" name="namaKelas" placeholder="Masukan nama kelas" onChange={this._onChangeInputKelas} />
            <div style={{marginBottom: 16}}>
              <p style={{fontSize: 14}}>Wali Kelas</p>
              <Dropdown data={dataGuru && dataGuru} nameKey="nama" value={defaultValueDropdownGuru} onChange={this._handleChangeDropdownGuru} />
            </div>
            <div style={{marginBottom: 16}}>
              <p style={{fontSize: 14}}>Jurusan</p>
              <Dropdown data={dataJurusan && dataJurusan} nameKey="namaJurusan" value={defaultValueDropdownJurusan} onChange={this._handleChangeDropdownJurusan} />
            </div>
          </ModalCreate>

          <ModalEdit size="md" isAlign isOpen={isModalEdit} onClick={this._handleOpenModalEdit} editData={this._handleEditKelas}>
            <h4 style={{fontFamily: 'Quicksand', fontWeight: 'Bold', marginBottom: 28}} >Edit kelas</h4>
            <Input label="Kode Kelas" name="kodeKelas" placeholder="Masukan kode kelas" onChange={this._onChangeInputKelas} defaultValue={apiPayload.kodeKelas} />
            <Input label="Nama Kelas" name="namaKelas" placeholder="Masukan nama kelas" onChange={this._onChangeInputKelas} defaultValue={apiPayload.namaKelas} />
            <div style={{marginBottom: 16}}>
              <p style={{fontSize: 14}}>Wali Kelas</p>
              <Dropdown data={dataGuru && dataGuru} nameKey="nama" value={defaultValueDropdownGuru} onChange={this._handleChangeDropdownGuru} />
            </div>
            <div style={{marginBottom: 16}}>
              <p style={{fontSize: 14}}>Jurusan</p>
              <Dropdown data={dataJurusan && dataJurusan} nameKey="namaJurusan" value={defaultValueDropdownJurusan} onChange={this._handleChangeDropdownJurusan} />
            </div>
          </ModalEdit>

          <ModalDeleteData isOpen={isModalDelete} onClick={this._handleOpenModalDelete} onDeleteData={this._handleDeleteKelas} />
        </div>
      )
    )
  }
}
