import React, { Component } from 'react';

import AuthService from '../../../utils/authService';
import Loading from '../../../components/Loading/component';
import Table from '../../../components/Table';
import Header from '../../../components/Header/component';
import HeaderMainDataView from '../../../components/HeaderMainDataView';
import { EditIcon, DeleteIcon } from '../../../configs/icons';
import ModalCreate from '../../../components/Modal/ModalCreate';
import Input from '../../../components/Input';
import ModalDeleteData from '../../../components/Modal/ModalDeleteData';

const Auth = new AuthService();

const fieldTable = [
  {fieldName: 'no.', fieldApi: ''},
  {fieldName: 'tahun ajaran', fieldApi: 'thnAjaran'},
  {fieldName: 'semester', fieldApi: 'semester'},
  {fieldName: 'action', fieldApi: ''},
];

const buttonGroup = [
  { label: 'Tambah Tahun Ajaran', value: 'add-data'},
];

const customIconAction = [
  // { icon: EditIcon, value: 'edit' }, 
  { icon: DeleteIcon, value: 'delete' },
]

export default class TahunAjaran extends Component {
  state = {
    isLoading: true,
    apiPayload: {
      thnAjaran: "",
      semester: ""
    },
    idDelete: '',

    //modal
    isModalCreate: false,
    isModalDelete: false,
  }

  componentDidMount() {
    const { actions } = this.props;

    setTimeout(() => {
      this.setState({isLoading: false})
    }, 2000);

    actions.getDataTahunAjaran();
  }

  _handleClickButtonHeader = (value) => {
    if(value === 'add-data') {
      this._handleOpenModalCreate();
    }
  }

  _onClickActionButton = (type, dataApi) => {
    if(type === 'delete') {
      this._handleOpenModalDelete(dataApi.id);
    }
  }

  _handleOpenModalCreate = () => {
    this.setState({
      isModalCreate: !this.state.isModalCreate
    })
  }

  _handleOpenModalDelete = (id) => {
    this.setState({
      isModalDelete: !this.state.isModalDelete,
      idDelete: id
    })
  }

  _onChangeInput = (e) => {
    this.setState({
      apiPayload: {
        ...this.state.apiPayload,
        [e.target.name]: e.target.value,
      }
    })
  }

  _handleCreateData = () => {
    const { apiPayload } = this.state;
    const { actions } = this.props;

    actions.addDataTahunAjaran(apiPayload);

    setTimeout(() => {
      actions.getDataTahunAjaran();
    }, 500);

    this.setState({
      isModalCreate: false
    });
  }

  _handleDeleteData = () => {
    const { idDelete } = this.state;
    const { actions } = this.props;

    actions.deleteDataTahunAjaran(idDelete);

    setTimeout(() => {
      actions.getDataTahunAjaran();
    }, 500);

    this.setState({
      isModalDelete: false
    });
  }
  
  render() {
    const { isLoading, isModalCreate, isModalDelete } = this.state;
    const { dataTahunAjaran } = this.props;

    console.log(dataTahunAjaran);
    return (
      isLoading ? (
        <Loading />
      ) : (
        <div className="main-view-container">
          <div className="header-dashboard">
            <Header 
              title="Tahun Ajaran"
              fullName={JSON.parse(Auth.getProfile()).nama}
              role={Auth.getUserType()}
            />
          </div>

          <div className="main-content-view">
            <div className="header-tools">
              <HeaderMainDataView button={buttonGroup} onClick={this._handleClickButtonHeader} isSearchField={false} />
            </div>
            <div className="table-section">
              <Table datasets={dataTahunAjaran} tableField={fieldTable} customIconAction={customIconAction} onClickAction={this._onClickActionButton} />
            </div>
          </div>

          <ModalCreate isOpen={isModalCreate} onClick={this._handleClickButtonHeader} size="md" isAlign createData={this._handleCreateData} >
            <h4 style={{fontFamily: 'Quicksand', fontWeight: 'Bold', marginBottom: 28}} >Tambah tahun ajaran</h4>
            <Input label="Tahun Ajaran" name="thnAjaran" placeholder="Masukan tahun ajaran" onChange={this._onChangeInput} />
            <Input label="Semester" name="semester" placeholder="Masukan semester" onChange={this._onChangeInput} />
          </ModalCreate>

          <ModalDeleteData isOpen={isModalDelete} onClick={this._handleOpenModalDelete} onDeleteData={this._handleDeleteData} />
        </div>
      )
    )
  }
}
