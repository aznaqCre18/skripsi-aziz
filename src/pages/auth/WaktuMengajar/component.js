import React, { Component } from 'react';

import AuthService from '../../../utils/authService';
import Loading from '../../../components/Loading/component';
import Table from '../../../components/Table';
import Header from '../../../components/Header/component';
import HeaderMainDataView from '../../../components/HeaderMainDataView';
import { EditIcon, DeleteIcon } from '../../../configs/icons';
import ModalCreate from '../../../components/Modal/ModalCreate';
import ModalEdit from '../../../components/Modal/ModalEditData/component';
import ModalDeleteData from '../../../components/Modal/ModalDeleteData';
import Input from '../../../components/Input';

const Auth = new AuthService();

const fieldTable = [
  {fieldName: 'no.', fieldApi: ''},
  {fieldName: 'jam', fieldApi: 'jamMapel'},
  {fieldName: 'waktu', fieldApi: 'waktuMapel'},
  {fieldName: 'action', fieldApi: ''},
];

const buttonGroup = [
  { label: 'Tambah data waktu mengajar', value: 'add-data'},
  { label: 'Export', value: 'export'},
];

const customIconAction = [
  { icon: EditIcon, value: 'edit' }, 
  { icon: DeleteIcon, value: 'delete' },
];

export default class WaktuMengajar extends Component {
  state = {
    isLoading: true,
    apiPayload: {
      kodeWaktuMengajar: '',
      jamMapel: '',
      waktuMapel: '',
    },
    idEdit: '',
    idDelete: '',

    //modal
    isModalCreate: false,
    isModalEdit: false,
    isModalDelete: false,
  }

  componentDidMount() {
    const { actions } = this.props;
    
    setTimeout(() => {
      this.setState({isLoading: false})
    }, 2000);

    actions.getDataWaktuMengajar();
  }

  _handleClickButtonHeader = (value) => {
    if(value === 'add-data') {
      this._handleOpenModalCreate();
    } else if(value === 'export') {
      console.log(value);
    }
  }

  _onClickActionButton = (type, dataApi) => {
    if(type === 'edit') {
      console.log(dataApi, "DATA API");
      this._handleOpenModalEdit(dataApi.id);
      this.setState({
        apiPayload: {
          kodeWaktuMengajar: dataApi.kodeWaktuMengajar,
          jamMapel: dataApi.jamMapel,
          waktuMapel: dataApi.waktuMapel,
        },
      });
    } else if(type === 'delete') {
      this._handleOpenModalDelete(dataApi.id);
    }
  }

  _onChangeInput = (e) => {
    this.setState({
      apiPayload: {
        ...this.state.apiPayload,
        [e.target.name]: e.target.value
      }
    })
  }

  _handleOpenModalCreate = () => {
    this.setState({
      isModalCreate: !this.state.isModalCreate
    })
  }

  _handleOpenModalEdit = (id) => {
    this.setState({
      isModalEdit: !this.state.isModalEdit,
      idEdit: id,
    })
  }

  _handleOpenModalDelete = (id) => {
    this.setState({
      isModalDelete: !this.state.isModalDelete,
      idDelete: id,
    })
  }

  _handleCreateWaktuMengajar = () => {
    const { apiPayload } = this.state;
    const { actions } = this.props;

    actions.addDataWaktuMengajar(apiPayload);

    setTimeout(() => {
      actions.getDataWaktuMengajar();
    }, 500);

    this.setState({
      isModalCreate: false
    })
  }

  _handleEditWaktuMengajar = () => {
    const { apiPayload, idEdit } = this.state;
    const { actions } = this.props;

    const newApiPayload = {
      waktuMapel: apiPayload.waktuMapel,
      jamMapel: apiPayload.jamMapel,
    }

    actions.editDataWaktuMengajar(idEdit, newApiPayload);

    setTimeout(() => {
      actions.getDataWaktuMengajar();
    }, 500);

    this.setState({
      isModalEdit: false
    })
  }

  _handleDeleteWaktuMengajar = () => {
    const { idDelete } = this.state;
    const { actions } = this.props;

    actions.deleteDataWaktuMengajar(idDelete);

    setTimeout(() => {
      actions.getDataWaktuMengajar();
    }, 500);

    this.setState({
      isModalDelete: false
    })
  }
  
  render() {
    const { isLoading, isModalCreate, isModalDelete, isModalEdit, apiPayload } = this.state;
    const { dataWaktuMengajar } = this.props;

    return (
      isLoading ? (
        <Loading />
      ) : (
        <div className="main-view-container">
          <div className="header-dashboard">
            <Header 
              title="Waktu Mengajar"
              fullName={JSON.parse(Auth.getProfile()).nama}
              role={Auth.getUserType()}
            />
          </div>

          <div className="main-content-view">
            <div className="header-tools">
              <HeaderMainDataView button={buttonGroup} onClick={this._handleClickButtonHeader} isSearchField={false} />
            </div>
            <div className="table-section">
              <Table datasets={dataWaktuMengajar} tableField={fieldTable} customIconAction={customIconAction} onClickAction={this._onClickActionButton} />
            </div>
          </div>

          <ModalCreate isOpen={isModalCreate} onClick={this._handleOpenModalCreate} createData={this._handleCreateWaktuMengajar} size="m" >
            <h4 style={{fontFamily: 'Quicksand', fontWeight: 'Bold', marginBottom: 28}} >Tambah waktu mengajar</h4>
            <Input label="Kode Waktu Mengajar" name="kodeWaktuMengajar" placeholder="Masukan kode waktu" onChange={this._onChangeInput} />
            <Input label="Jam Mata Pelajaran" name="jamMapel" placeholder="Masukan jam mapel" onChange={this._onChangeInput} />
            <Input label="Waktu Mata Pelajaran" name="waktuMapel" placeholder="Masukan waktu mapel" onChange={this._onChangeInput} />
          </ModalCreate>

          <ModalEdit isOpen={isModalEdit} onClick={this._handleOpenModalEdit} editData={this._handleEditWaktuMengajar} >
            <h4 style={{fontFamily: 'Quicksand', fontWeight: 'Bold', marginBottom: 28}} >Edit waktu mengajar</h4>
            <Input label="Jam Mata Pelajaran" name="jamMapel" placeholder="Masukan jam mapel" onChange={this._onChangeInput} defaultValue={apiPayload.jamMapel} />
            <Input label="Waktu Mata Pelajaran" name="waktuMapel" placeholder="Masukan waktu mapel" onChange={this._onChangeInput} defaultValue={apiPayload.waktuMapel} />
          </ModalEdit>

          <ModalDeleteData isOpen={isModalDelete} onClick={this._handleOpenModalDelete} onDeleteData={this._handleDeleteWaktuMengajar} />
        </div>
      )
    )
  }
}
