import React, { Component } from 'react';
import Header from '../../../components/Header/component';
import HeaderMainDataView from '../../../components/HeaderMainDataView';
import Loading from '../../../components/Loading/component';
import Table from '../../../components/Table';
import AuthService from '../../../utils/authService';
import { EditIcon, DeleteIcon } from '../../../configs/icons';
import ModalCreate from '../../../components/Modal/ModalCreate/component';
import Input from '../../../components/Input';
import ModalDeleteData from '../../../components/Modal/ModalDeleteData';
import ModalEdit from '../../../components/Modal/ModalEditData/component';
import 'jspdf-autotable';
import downloadToPdf from '../../../utils/downloadToPdf';

const Auth = new AuthService();

const fieldTabel = [
  {
    fieldName: 'no.',
    fieldApi: ''
  },
  {
    fieldName: 'kode mapel',
    fieldApi: 'kodeMapel'
  },
  {
    fieldName: 'nama mapel',
    fieldApi: 'namaMapel'
  },
  {
    fieldName: 'kkm',
    fieldApi: 'kkm'
  },
  {
    fieldName: 'action',
    fieldApi: ''
  },
];

const buttonGroup = [
  { label: 'Tambah data mapel', value: 'add-data'},
  { label: 'Export', value: 'export' },
]

const customIconAction = [
  { icon: EditIcon, value: 'edit' }, 
  { icon: DeleteIcon, value: 'delete' },
]

export default class MataPelajaran extends Component {
  state = {
    isLoading: true,

    isModalCreate: false,
    isModalEdit: false,
    isModalDelete: false,
    idEdit: '',
    idDelete: '',

    //input
    inputMapel: {
      namaMapel: "",
      kodeMapel: "",
      kkm: "",
    }
  }

  componentDidMount() {
    const { actions } = this.props;
    this._setLoading();

    actions.getDataMapel();
  }

  _setLoading = () => {
    setTimeout(() => {
      this.setState({isLoading: false})
    }, 2000);
  }

  _handleClickButtonHeader = (value) => {
    const { dataMapel } = this.props;

    if(value === 'add-data') {
      this._handleOpenModalCreate();
    } else if(value === 'export') {
      let dataExportPDF = [];
      const attr = ['No.', 'Kode Mapel', 'Nama Mapel', 'KKM'];
      const title = "Data Mata Pelajaran";
      const fileName = "Data Mata Pelajaran";

      dataMapel.map((x, index) => {
        let tempRow = [];
        tempRow.push(index + 1);
        tempRow.push(x.kodeMapel ? x.kodeMapel : '-');
        tempRow.push(x.namaMapel ? x.namaMapel : '-');
        tempRow.push(x.kkm ? x.kkm : '-');

        dataExportPDF.push(tempRow);
      });

      downloadToPdf(dataExportPDF, attr, title, fileName);
    }
  }

  _onClickActionButton = (type, dataApi) => {
    if(type === 'edit') {
      this._handleOpenModalEdit(dataApi.id);
      this.setState({
        inputMapel: {
          kodeMapel: dataApi.kodeMapel,
          namaMapel: dataApi.namaMapel,
          kkm: dataApi.kkm,
        }
      })
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

  _onChangeInput = (e) => {
    this.setState({
      inputMapel: {
        ...this.state.inputMapel,
        [e.target.name]: e.target.value
      }
    })
  }

  _onChangeInputEdit = (e) => {
    this.setState({
      inputMapel: {
        ...this.state.inputMapel,
        [e.target.name]: e.target.value,
      }
    })
  }

  _handleCreateMapel = () => {
    const { inputMapel } = this.state;
    const { actions } = this.props;

    actions.addDataMapel(inputMapel);

    setTimeout(() => {
      actions.getDataMapel();
    }, 500)

    this.setState({
      isModalCreate: false,
    });
  }

  _handleEditMapel = () => {
    const { idEdit, inputMapel } = this.state;
    const { actions } = this.props;
    
    actions.editDataMapel(idEdit, inputMapel);

    setTimeout(() => {
      actions.getDataMapel();
    }, 500)

    this.setState({
      isModalEdit: false
    })
  }

  _handleDeleteMapel = () => {
    const { idDelete } = this.state;
    const { actions } = this.props;
    
    actions.deleteDataMapel(idDelete);

    setTimeout(() => {
      actions.getDataMapel();
    }, 500)

    this.setState({
      isModalDelete: false
    })
  }

  render() {
    const { isLoading, isModalCreate, isModalDelete, isModalEdit, inputMapel } = this.state;
    const { dataMapel } = this.props;

    return (
      isLoading ? (
        <Loading />
      ) : (
        <div className="main-view-container">
          <div className="header-dashboard">
            <Header 
              title="Mata Pelajaran"
              fullName={JSON.parse(Auth.getProfile()).nama}
              role={Auth.getUserType()}
            />
          </div>

          <div className="main-content-view">
            <div className="header-tools">
              <HeaderMainDataView button={buttonGroup} onClick={this._handleClickButtonHeader}  />
            </div>
            <div className="table-section">
              <Table datasets={dataMapel} tableField={fieldTabel} customIconAction={customIconAction} onClickAction={this._onClickActionButton} />
            </div>
          </div>

          <ModalCreate size="md" isOpen={isModalCreate} onClick={this._handleOpenModalCreate} isAlign createData={this._handleCreateMapel}>
            <h4 style={{fontFamily: 'Quicksand', fontWeight: 'Bold', marginBottom: 28}} >Tambah mata pelajaran</h4>
            <Input label="Kode Mapel" name="kodeMapel" placeholder="Masukan kode mapel" onChange={this._onChangeInput} />
            <Input label="Nama Mapel" name="namaMapel" placeholder="Masukan nama mapel" onChange={this._onChangeInput} />
            <Input label="KKM" name="kkm" placeholder="Masukan kkp" onChange={this._onChangeInput} />
          </ModalCreate>

          <ModalEdit size="md" isAlign isOpen={isModalEdit} onClick={this._handleOpenModalEdit} editData={this._handleEditMapel}>
            <h4 style={{fontFamily: 'Quicksand', fontWeight: 'Bold', marginBottom: 28}} >Tambah mata pelajaran</h4>
            <Input label="Kode Mapel" name="kodeMapel" placeholder="Masukan kode mapel" onChange={this._onChangeInputEdit} defaultValue={inputMapel.kodeMapel} />
            <Input label="Nama Mapel" name="namaMapel" placeholder="Masukan nama mapel" onChange={this._onChangeInputEdit} defaultValue={inputMapel.namaMapel} />
            <Input label="KKM" name="kkm" placeholder="Masukan kkp" onChange={this._onChangeInputEdit} defaultValue={inputMapel.kkm} />
          </ModalEdit>

          <ModalDeleteData isOpen={isModalDelete} onClick={this._handleOpenModalDelete} onDeleteData={this._handleDeleteMapel} />
        </div>
      )
    )
  }
}
