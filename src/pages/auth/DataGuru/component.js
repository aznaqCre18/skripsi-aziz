import React, { Component } from 'react';
import Header from '../../../components/Header/component';
import HeaderMainDataView from '../../../components/HeaderMainDataView';
import Loading from '../../../components/Loading/component';
import ModalCreate from '../../../components/Modal/ModalCreate';
import ModalDeleteData from '../../../components/Modal/ModalDeleteData';
import Table from '../../../components/Table';
import { DeleteIcon, EditIcon } from '../../../configs/icons';
import AuthService from '../../../utils/authService';
import Input from '../../../components/Input';
import Dropdown from '../../../components/Dropdown';
import ModalEdit from '../../../components/Modal/ModalEditData/component';
import downloadToPdf from '../../../utils/downloadToPdf';

const Auth = new AuthService();

const fieldTabel = [
  {
    fieldName: 'no.',
    fieldApi: ''
  },
  {
    fieldName: 'nip',
    fieldApi: 'nip'
  },
  {
    fieldName: 'nama lengkap',
    fieldApi: 'nama'
  },
  {
    fieldName: 'email',
    fieldApi: 'email'
  },
  {
    fieldName: 'action',
    fieldApi: ''
  },
];

const buttonGroup = [
  { label: 'Tambah data guru', value: 'add-data'},
  { label: 'Export', value: 'export' },
]

const customIconAction = [
  {value: 'edit', icon: EditIcon},
  {value: 'delete', icon: DeleteIcon}
]

const dropdownJenisKelamin = [
  {name: 'Laki - Laki', value: 1},
  {name: 'Perempuan', value: 0},
]

export default class DataGuru extends Component {
  state = {
    isLoading: true,
    idDelete: '',
    actionGuru: {
      id: "",
      nip: "",
      nama: "",
      email: "",
      tempatLahir: "",
      tanggalLahir: "",
      jenisKelamin: "",
      gelarDepan: "",
      gelarBelakang: "",
      alamat: "",
      foto: "",
      mulaiBertugas: "",
    },

    isModalDelete: false,
    isModalEdit: false,
    isModalCreate: false,

    isModifySuccess: "n",
  }

  componentDidMount() {
    const { actions } = this.props;
    
    actions.getDataAllGuru();

    this._setLoading();
  }

  _setLoading = () => {
    setTimeout(() => {
      this.setState({isLoading: false})
    }, 2000);
  }

  _handleClickButtonHeader = (value) => {
    const { dataGuru } = this.props;

    if(value === 'add-data') {
      this.setState({
        isModalCreate: !this.state.isModalCreate
      })
    } else if(value === 'export') {
      let dataExportPDF = [];
      const attr = ['No.', 'NIP', 'Nama Lengkap', 'Email', 'Jenis Kelamin', 'Mulai Bertugas'];
      const title = "Data Laporan Guru";
      const fileName = "data-laporan-guru";

      dataGuru.dataGuru.map((x, index) => {
        let tempRow = [];
        tempRow.push(index + 1);
        tempRow.push(x.nip ? x.nip : '-');
        tempRow.push(x.nama ? x.nama : '-');
        tempRow.push(x.email ? x.email : '-');
        tempRow.push(x.jenisKelamin ? x.jenisKelamin === 1 ? 'Laki - Laki' : 'Perempuan' : '-');
        tempRow.push(x.mulaiBertugas ? x.mulaiBertugas : '-');

        dataExportPDF.push(tempRow);
      });

      downloadToPdf(dataExportPDF, attr, title, fileName);
    }
  }

  _handleOpenModalCreateGuru = () => {
    this.setState({
      isModalCreate: !this.state.isModalCreate,
    })
  }

  _handleOpenModalEdit = () => {
    this.setState({
      isModalEdit: !this.state.isModalEdit
    })
  }

  _onChangeInput = (e) => {
    this.setState({
      actionGuru: {
        ...this.state.actionGuru,
        [e.target.name]: e.target.value,
      }
    })
  }

  _handleCreateDataGuru = async () => {
    const { actionGuru } = this.state;
    const { actions } = this.props;

    const sendCreate = {
      nip: actionGuru.nip,
      nama: actionGuru.nama,
      email: actionGuru.email,
      tempatLahir: actionGuru.tempatLahir,
      tanggalLahir: actionGuru.tanggalLahir,
      jenisKelamin: actionGuru.jenisKelamin,
      gelarDepan: actionGuru.gelarDepan,
      gelarBelakang: actionGuru.gelarBelakang,
      alamat: actionGuru.alamat,
      foto: "",
      mulaiBertugas: actionGuru.mulaiBertugas,
    };

    await actions.createDataGuru(sendCreate);

    setTimeout(() => {
      actions.getDataAllGuru();
      this.setState({
        isModalCreate: false,
      });
    }, 500);

  }

  _handleChangeDropdown = (value) => {
    this.setState({
      actionGuru: {
        ...this.state.actionGuru,
        jenisKelamin: value.value,
      }
    })
  }

  _handleClickBtnAction = (type, dataApi) => {
    if(type === 'edit') {
      this.setState({
        isModalEdit: !this.state.isModalEdit,
        idDelete: dataApi.id,
        actionGuru: {
          ...dataApi,
        }
      })
    } else if (type === 'delete') {
       this.setState({
         isModalDelete: !this.state.isModalDelete,
       })
     }
  }

  _handleEditData = () => {
    const { actionGuru } = this.state;
    const { actions } = this.props;

    const sendEdit = {
      nip: actionGuru.nip,
      nama: actionGuru.nama,
      email: actionGuru.email,
      tempatLahir: actionGuru.tempatLahir,
      tanggalLahir: actionGuru.tanggalLahir,
      jenisKelamin: actionGuru.jenisKelamin,
      gelarDepan: actionGuru.gelarDepan,
      gelarBelakang: actionGuru.gelarBelakang,
      alamat: actionGuru.alamat,
      foto: "",
      mulaiBertugas: actionGuru.mulaiBertugas,
    };

    actions.editDataGuru(sendEdit, actionGuru.id);

    setTimeout(() => {
      actions.getDataAllGuru();

      this.setState({
        isModalEdit: false,
      });
    }, 500);
  }

  _handleDeleteDataGuru = async () => {
    const { idDelete } = this.state;
    const { actions } = this.props;

    await actions.deleteDataGuru(idDelete);

    this.setState({
      isModalDelete: false,
    }, () => {
      actions.getDataAllGuru();
    }, 500);
  }

  render() {
    const { isLoading, isModalCreate, isModalDelete, isModalEdit,actionGuru } = this.state;
    const { dataGuru } = this.props;

    return (
      isLoading ? (
        <Loading />
      ) : (
        <div className="main-view-container">
          <div className="header-dashboard">
            <Header 
              title="Data Guru"
              fullName={JSON.parse(Auth.getProfile()).nama}
              role={Auth.getUserType()}
            />
          </div>

          <div className="main-content-view">
            <div className="header-tools">
              <HeaderMainDataView button={buttonGroup} onClick={this._handleClickButtonHeader} />
            </div>
            <div className="table-section">
              <Table datasets={dataGuru ? dataGuru.dataGuru : null} tableField={fieldTabel} customIconAction={customIconAction} onClickAction={this._handleClickBtnAction} />
            </div>
          </div>

          <ModalCreate isOpen={isModalCreate} onClick={this._handleOpenModalCreateGuru} createData={this._handleCreateDataGuru}>
            <h4 style={{fontFamily: 'Quicksand', fontWeight: 'Bold', marginBottom: 28}} >Tambah data guru</h4>
            <Input label="NIP" name="nip" placeholder="Masukan NIP" onChange={this._onChangeInput} />
            <Input label="Nama guru" name="nama" placeholder="Nama guru" onChange={this._onChangeInput} />
            <Input label="Email" name="email" placeholder="Masukan email" onChange={this._onChangeInput} />
            <Input label="Tempat lahir" name="tempatLahir" placeholder="Masukan tempat lahir" onChange={this._onChangeInput} />
            <Input label="Tanggal lahir" name="tanggalLahir" placeholder="Masukan tanggal lahir" onChange={this._onChangeInput} />
            <div style={{marginBottom: 16}}>
              <p style={{fontSize: 14}}>Jenis kelamin</p>
              <Dropdown data={dropdownJenisKelamin} value={actionGuru.jenisKelamin === 1 ? "Laki - Laki" : actionGuru.jenisKelamin === "" ? "Pilih jenis kelamin" : "Perempuan"} onChange={this._handleChangeDropdown} />
            </div>
            <div style={{display: 'flex', width: 'auto', gap: 20}}>
              <Input label="Gelar depan" name="gelarDepan" placeholder="Gelar depan" onChange={this._onChangeInput} style={{width: '100%'}} />
              <Input label="Gelar belakang" name="gelarBelakang" placeholder="Gelar Belakang" onChange={this._onChangeInput} style={{width: '100%'}} />
            </div>
            <Input label="Alamat" name="alamat" placeholder="Alamat" onChange={this._onChangeInput} />
            <Input label="Mulai bertugas" name="mulaiBertugas" placeholder="Tanggal mulai bertugas" onChange={this._onChangeInput} />
          </ModalCreate>
          <ModalEdit size="xl" isOpen={isModalEdit} onClick={this._handleOpenModalEdit} editData={this._handleEditData} >
            <h4 style={{fontFamily: 'Quicksand', fontWeight: 'Bold', marginBottom: 28}} >Edit data guru</h4>
            <Input label="NIP" name="nip" placeholder="Masukan NIP" onChange={this._onChangeInput} defaultValue={actionGuru.nip} />
            <Input label="Nama guru" name="nama" placeholder="Nama guru" onChange={this._onChangeInput} defaultValue={actionGuru.nama} />
            <Input label="Email" name="email" placeholder="Masukan email" onChange={this._onChangeInput} defaultValue={actionGuru.email} />
            <Input label="Tempat lahir" name="tempatLahir" placeholder="Masukan tempat lahir" onChange={this._onChangeInput} defaultValue={actionGuru.tempatLahir} />
            <Input label="Tanggal lahir" name="tanggalLahir" placeholder="Masukan tanggal lahir" onChange={this._onChangeInput} defaultValue={actionGuru.tanggalLahir} />
            <div style={{marginBottom: 16}}>
              <p style={{fontSize: 14}}>Jenis kelamin</p>
              <Dropdown data={dropdownJenisKelamin} value={actionGuru.jenisKelamin === 1 ? "Laki - Laki" : actionGuru.jenisKelamin === "" ? "Pilih jenis kelamin" : "Perempuan"} onChange={this._handleChangeDropdown} />
            </div>
            <div style={{display: 'flex', width: 'auto', gap: 20}}>
              <Input label="Gelar depan" name="gelarDepan" placeholder="Gelar depan" onChange={this._onChangeInput} style={{width: '100%'}} defaultValue={actionGuru.gelarDepan} />
              <Input label="Gelar belakang" name="gelarBelakang" placeholder="Gelar Belakang" onChange={this._onChangeInput} style={{width: '100%'}} defaultValue={actionGuru.gelarBelakang} />
            </div>
            <Input label="Alamat" name="alamat" placeholder="Alamat" onChange={this._onChangeInput} defaultValue={actionGuru.alamat} />
            <Input label="Mulai bertugas" name="mulaiBertugas" placeholder="Tanggal mulai bertugas" onChange={this._onChangeInput} defaultValue={actionGuru.mulaiBertugas} />
          </ModalEdit>
          <ModalDeleteData isOpen={isModalDelete} onClick={this._handleClickBtnAction} onDeleteData={this._handleDeleteDataGuru} />
        </div>
      )
    )
  }
}