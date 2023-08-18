import React, { Component } from 'react';

import AuthService from '../../../utils/authService';
import Loading from '../../../components/Loading/component';
import Table from '../../../components/Table';
import Header from '../../../components/Header/component';
import HeaderMainDataView from '../../../components/HeaderMainDataView';
import ModalCreateJurusan from '../../../components/Modal/ModalCreateJurusan';
import { DeleteIcon, EditIcon } from '../../../configs/icons';
import ModalDeleteData from '../../../components/Modal/ModalDeleteData';
import ModalEdit from '../../../components/Modal/ModalEditData/component';
import Input from '../../../components/Input';

const Auth = new AuthService();

const fieldTable = [
  {fieldName: 'no.', fieldApi: ''},
  {fieldName: 'kode jurusan', fieldApi: 'kodeJurusan'},
  {fieldName: 'nama jurusan', fieldApi: 'namaJurusan'},
  {fieldName: 'action', fieldApi: ''},
]

const buttonGroup = [
  { label: 'Tambah jurusan', value: 'add-data'},
]

const customIconAction = [
  { icon: EditIcon, value: 'edit' }, 
  { icon: DeleteIcon, value: 'delete' },
]

export default class Jurusan extends Component {
  state = {
    isLoading: true,
    isModalOpen: false,
    isModalDelete: false,
    isModalEdit: false,

    kodeJurusan: '',
    dataJurusan: '',
    selectedIdDel: '',
    editJurusan: {
      id: '',
      kodeJurusan: '',
      namaJurusan: '',
    }
  }

  componentDidMount() {
    const { actions } = this.props;

    setTimeout(() => {
      this.setState({isLoading: false})
    }, 2000);
    
    actions.getDataJurusan();
  }

  _handleClickButtonHeader = (value) => {
    console.log(value);
  }

  _handleOpenModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    })
  }

  _handleOpenModalDelete = (id) => {
    this.setState({
      isModalDelete: !this.state.isModalDelete,
      selectedIdDel: id,
    })
  }

  _handleChangeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  _handleAddDataJurusan = async () => {
    const {actions} = this.props;
    const { kodeJurusan, namaJurusan } = this.state;

    const data = {
      kodeJurusan,
      namaJurusan,
    };

    await actions.addDataJurusan(data);

    this.setState({
      isModalOpen: false,
    }, () => {
      actions.getDataJurusan();
    });
  }

  _handleDeleteDataJurusan = () => {
    const { selectedIdDel } = this.state;
    const { actions } = this.props;

    actions.deleteDataJurusan(selectedIdDel);

    this.setState({
      isModalDelete: false 
    }, () => {
      actions.getDataJurusan();
    })

  }

  _onClickActionButton = (type, dataApi) => {
    if(type === 'edit') {
      this._handleOpenModalEdit()
      this.setState({
        editJurusan: {
          id: dataApi.id,
          kodeJurusan: dataApi.kodeJurusan,
          namaJurusan: dataApi.namaJurusan,
        }
      })
    } else if(type === 'delete') {
      this._handleOpenModalDelete(dataApi.id);
    }
  }

  _handleOpenModalEdit = () => {
    this.setState({
      isModalEdit: !this.state.isModalEdit,
    })
  }

  _onChangeInputEdit = (e) => {
    this.setState({
      editJurusan: {
        ...this.state.editJurusan,
        [e.target.name]: e.target.value,
      }
    })
  }

  handleEditDataJurusan = () => {
    const { editJurusan } = this.state;
    const { actions } = this.props;

    const dataEdit = {
      kodeJurusan: editJurusan.kodeJurusan,
      namaJurusan: editJurusan.namaJurusan,
    }

    actions.editDataJurusan(editJurusan.id, dataEdit);

    this.setState({
      isModalEdit: false,
    }, () => {
      actions.getDataJurusan();
    })
  }

  render() {
    const { isLoading, isModalOpen, isModalDelete, isModalEdit, editJurusan } = this.state;
    const { dataJurusan } = this.props;

    return (
      isLoading ? (
        <Loading />
      ) : (
        <div className="main-view-container">
          <div className="header-dashboard">
            <Header 
              title="Jurusan"
              fullName={JSON.parse(Auth.getProfile()).nama}
              role={Auth.getUserType()}
            />
          </div>

          <div className="main-content-view">
            <div className="header-tools">
              <HeaderMainDataView button={buttonGroup} onClick={this._handleOpenModal} />
            </div>
            <div className="table-section">
              <Table datasets={dataJurusan} tableField={fieldTable} customIconAction={customIconAction} onClickAction={this._onClickActionButton} />
            </div>

            <ModalCreateJurusan onChangeInput={this._handleChangeInput} isOpen={isModalOpen} onClick={this._handleOpenModal} addDataJurusan={this._handleAddDataJurusan} />
            <ModalDeleteData isOpen={isModalDelete} onClick={this._handleOpenModalDelete} onDeleteData={this._handleDeleteDataJurusan} />
            <ModalEdit isOpen={isModalEdit} onClick={this._handleOpenModalEdit} editData={this.handleEditDataJurusan} >
              <h4 style={{fontFamily: 'Quicksand', fontWeight: 'Bold', marginBottom: 28}} >Edit Jurusan</h4>
              <Input label="Kode Jurusan" name="kodeJurusan" placeholder="Masukan kode jurusan" defaultValue={editJurusan.kodeJurusan} onChange={this._onChangeInputEdit} />
              <Input label="Nama Jurusan" name="namaJurusan" placeholder="Nama jurusan" defaultValue={editJurusan.namaJurusan} onChange={this._onChangeInputEdit} />
            </ModalEdit>
          </div>
        </div>
      )
    )
  }
}
