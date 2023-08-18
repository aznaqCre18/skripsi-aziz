import React, { Component } from 'react';

import Header from '../../../components/Header/component';
import HeaderMainDataView from '../../../components/HeaderMainDataView';
import Loading from '../../../components/Loading/component';
import Table from '../../../components/Table';
import AuthService from '../../../utils/authService';
import { EditIcon, DeleteIcon } from '../../../configs/icons';
import ModalCreate from '../../../components/Modal/ModalCreate';
import Input from '../../../components/Input';
import Dropdown from '../../../components/Dropdown';
import ModalEdit from '../../../components/Modal/ModalEditData/component';
import ModalDeleteData from '../../../components/Modal/ModalDeleteData';
import downloadToPdf from '../../../utils/downloadToPdf';

const Auth = new AuthService();

const fieldTabel = [
  {
    fieldName: 'no.',
    fieldApi: ''
  },
  {
    fieldName: 'nis',
    fieldApi: 'nis'
  },
  {
    fieldName: 'nama lengkap',
    fieldApi: 'nama'
  },
  {
    fieldName: 'kelas',
    fieldApi: 'namaKelas'
  },
  {
    fieldName: 'jurusan',
    fieldApi: 'namaJurusan'
  },
  {
    fieldName: 'action',
    fieldApi: ''
  },
];

const buttonGroup = [
  { label: 'Tambah data siswa', value: 'add-data'},
  { label: 'Export', value: 'export' },
];

const customIconAction = [
  { icon: EditIcon, value: 'edit' }, 
  { icon: DeleteIcon, value: 'delete' },
];

const jenisKelamin = [
  {name: "Laki - Laki", value: 'p'},
  {name: "Perempuan", value: 'l'},
];

export default class DataSiswa extends Component {
  state = {
    isLoading: true,
    apiPayload: {
      nis: "",
      nisn: "",
      email: "",
      nama: "",
      tempatLahir: "",
      tanggalLahir: "",
      jenisKelamin: "",
      idJurusan: "",
      idKelas: "",
      namaWaliMurid: "",
      alamat: "",
      idTahunAjaran: JSON.parse(Auth.getTahunAjaran()).id,
    },
    defaultValueDropdownJurusan: "Pilih jurusan...",
    defaultValueDropdownKelas: "Pilih kelas...",
    defaultValueJenisKelamin: "Pilih jenis kelamin...",
    idDelete: "",
    idEdit: "",
    idKelasFilter: "",
    search: "",

    //modal
    isModalCreate: false,
    isModalEdit: false,
    isModalDelete: false,
  }

  componentDidMount() {
    const { actions, actionsJurusan, actionsKelas } = this.props;

    this._setLoading();
    actions.getDataSiswa();
    actionsJurusan.getDataJurusan();
    actionsKelas.getDataKelas();
  }

  componentDidUpdate(prevProps, prevState) {
    const { actions } = this.props;
    const { search, idKelasFilter } = this.state;

    let payload;

    if(search !== prevState.search) {
      if(idKelasFilter) {
        payload = {
          search,
          idKelas: idKelasFilter,
        };

        actions.getDataSiswa(payload);
      } else {
        if(search !== "" && idKelasFilter === "") {
          payload = {
            search,
          };
          actions.getDataSiswa(payload);
        } else {
          actions.getDataSiswaByIdKelas(idKelasFilter);
        }
      }
    }
  }

  _setLoading = () => {
    setTimeout(() => {
      this.setState({isLoading: false})
    }, 2000);
  }

  _handleClickButtonHeader = (value) => {
    const { dataSiswa } = this.props;

    if(value === 'add-data') {
      this._handleOpenModalCreate();
    } else if(value === 'export') {
      let dataExportPDF = [];
      const attr = ['No.', 'NIS', 'Nama Lengkap', 'Kelas', 'Jurusan'];
      const title = "Data Laporan Siswa";
      const fileName = "data-laporan-siswa";

      dataSiswa.map((x, index) => {
        let tempRow = [];
        tempRow.push(index + 1);
        tempRow.push(x.nis ? x.nis : '-');
        tempRow.push(x.nama ? x.nama : '-');
        tempRow.push(x.namaKelas ? x.namaKelas : '-');
        tempRow.push(x.namaJurusan ? x.namaJurusan : '-');

        dataExportPDF.push(tempRow);
      });

      downloadToPdf(dataExportPDF, attr, title, fileName);
    }
  }

  _onClickActionButton = (type, dataApi) => {
    if(type === 'edit') {
      this._handleOpenModalEdit(dataApi.id);

      console.log(dataApi, "DATA API");
      
      this.setState({
        apiPayload: {
          ...this.state.apiPayload,
          nis: dataApi.nis,
          nisn: dataApi.nisn,
          email: dataApi.email,
          nama: dataApi.nama,
          tempatLahir: dataApi.tempatLahir,
          tanggalLahir: dataApi.tanggalLahir,
          jenisKelamin: dataApi.jenisKelamin,
          idJurusan: dataApi.idJurusan,
          idKelas: dataApi.idKelas,
          namaWaliMurid: dataApi.namaWaliMurid,
          alamat: dataApi.alamat,
          idTahunAjaran: JSON.parse(Auth.getTahunAjaran()).id,
        },
        defaultValueDropdownJurusan: `${dataApi.jurusan.kodeJurusan} - ${dataApi.jurusan.namaJurusan}`,
        defaultValueDropdownKelas: `${dataApi.kelas.kodeKelas} - ${dataApi.kelas.namaKelas}`,
        defaultValueJenisKelamin: dataApi.jenisKelamin === 'l' ? 'Laki - Laki' : 'Perempuan',
      });
    } else if(type === 'delete') {
      this._handleOpenModalDelete(dataApi.id);
    }
  }

  _handleChangeDropdownKelas = (item) => {
    this.setState({
      defaultValueDropdownKelas: `${item.namaKelas}`,
      apiPayload: {
        ...this.state.apiPayload,
        idKelas: item.id,
      }
    });
  }

  _handleChangeDropdownJurusan = (item) => {
    this.setState({
      defaultValueDropdownJurusan: `${item.kodeJurusan} - ${item.namaJurusan}`,
      apiPayload: {
        ...this.state.apiPayload,
        idJurusan: item.id,
      }
    });
  }

  _handleChangeDropdownJK = (item) => {
    this.setState({
      defaultValueJenisKelamin: item.name,
      apiPayload: {
        ...this.state.apiPayload,
        jenisKelamin: item.value,
      }
    });
  }

  _handleOpenModalCreate = () => {
    this.setState({
      isModalCreate: !this.state.isModalCreate
    });
  }

  _handleOpenModalEdit = (id) => {
    this.setState({
      isModalEdit: !this.state.isModalEdit,
      idEdit: id
    });
  }

  _handleOpenModalDelete = (id) => {
    this.setState({
      isModalDelete: !this.state.isModalDelete,
      idDelete: id,
    });
  }

  _onChangeInput = (e) => {
    this.setState({
      apiPayload: {
        ...this.state.apiPayload,
        [e.target.name]: e.target.value
      }
    })
  }

  _handleCreateSiswa = () => {
    const { apiPayload } = this.state;
    const { actions } = this.props;

    actions.addDataSiswa(apiPayload);

    setTimeout(() => {
      actions.getDataSiswa();
    }, 500);

    this.setState({
      isModalCreate: false,
    });
  }

  _handleEditSiswa = () => {
    const { apiPayload, idEdit } = this.state;
    const { actions } = this.props;

    actions.editDataSiswa(idEdit, apiPayload);

    setTimeout(() => {
      actions.getDataSiswa();
    }, 500);

    this.setState({
      isModalEdit: false,
    });
  }

  _handleDeleteKelas = () => {
    const { idDelete } = this.state;
    const { actions } = this.props;

    actions.deleteDataSiswa(idDelete);

    setTimeout(() => {
      actions.getDataSiswa();
    }, 500);

    this.setState({
      isModalDelete: false,
    });
  }

  _fetchSiswaByKelas = (id) => {
    const { actions } = this.props;

    actions.getDataSiswaByIdKelas(id);
    this.setState({ idKelasFilter: id });
  }

  _handleChangeSearch = (e) => {
    const { value } = e.target;

    console.log(value);

    this.setState({
      search: value,
    })
  }

  render() {
    const { isLoading, isModalCreate, isModalDelete, isModalEdit, defaultValueDropdownJurusan, defaultValueDropdownKelas, defaultValueJenisKelamin, apiPayload } = this.state;
    const { dataSiswa, dataJurusan, dataKelas } = this.props;

    return (
      isLoading ? (
        <Loading />
      ) : (
        <div className="main-view-container">
          <div className="header-dashboard">
            <Header 
              title="Data Siswa"
              fullName={JSON.parse(Auth.getProfile()).nama}
              role={Auth.getUserType()}
            />
          </div>

          <div className="main-content-view">
            <div className="header-tools">
              <HeaderMainDataView 
                button={buttonGroup} 
                onClick={this._handleClickButtonHeader} 
                isDropdownFilter={true}
                dataDropdown={{dataKelas, key: "namaKelas"}}
                onFilter={this._fetchSiswaByKelas} 
                onChangeSearch={this._handleChangeSearch}
              />
            </div>
            <div className="table-section">
              <Table datasets={dataSiswa} tableField={fieldTabel} customIconAction={customIconAction} onClickAction={this._onClickActionButton} />
            </div>
          </div>

          <ModalCreate isOpen={isModalCreate} onClick={this._handleOpenModalCreate} size="lg" createData={this._handleCreateSiswa} >
            <h4 style={{fontFamily: 'Quicksand', fontWeight: 'Bold', marginBottom: 28}} >Tambah siswa</h4>
            <Input label="NIS" name="nis" placeholder="Masukan nis siswa" onChange={this._onChangeInput} />
            <Input label="NISN" name="nisn" placeholder="Masukan nisn siswa" onChange={this._onChangeInput} />
            <Input label="Nama Lengkap" name="nama" placeholder="Masukan nama lengkap siswa" onChange={this._onChangeInput} />
            <Input label="Email" name="email" placeholder="Masukan email siswa" onChange={this._onChangeInput} />
            <div style={{marginBottom: 16}}>
              <p style={{fontSize: 14}}>Jenis Kelamin</p>
              <Dropdown data={jenisKelamin} value={defaultValueJenisKelamin} onChange={this._handleChangeDropdownJK} />
            </div>
            <div style={{marginBottom: 16}}>
              <p style={{fontSize: 14}}>Kelas</p>
              <Dropdown data={dataKelas && dataKelas} nameKey="namaKelas" value={defaultValueDropdownKelas} onChange={this._handleChangeDropdownKelas} />
            </div>
            <div style={{marginBottom: 16}}>
              <p style={{fontSize: 14}}>Jurusan</p>
              <Dropdown data={dataJurusan && dataJurusan} nameKey="namaJurusan" value={defaultValueDropdownJurusan} onChange={this._handleChangeDropdownJurusan} />
            </div>
            <Input label="Tempat Lahir" name="tempatLahir" placeholder="Masukan tempat lahir siswa" onChange={this._onChangeInput} />
            <Input label="Tanggal Lahir" name="tanggalLahir" placeholder="Masukan tanggal lahir siswa dd-mm-yy" onChange={this._onChangeInput} />
            <Input label="Wali Murid" name="namaWaliMurid" placeholder="Masukan wali murid siswa" onChange={this._onChangeInput} />
            <Input label="Alamat" name="alamat" placeholder="Masukan alamat siswa" onChange={this._onChangeInput} />
          </ModalCreate>

          <ModalEdit isOpen={isModalEdit} onClick={this._handleOpenModalEdit} size="lg" editData={this._handleEditSiswa} >
            <h4 style={{fontFamily: 'Quicksand', fontWeight: 'Bold', marginBottom: 28}} >Tambah mata pelajaran</h4>
            <Input defaultValue={apiPayload.nis} label="NIS" name="nis" placeholder="Masukan nis siswa" onChange={this._onChangeInput} />
            <Input defaultValue={apiPayload.nisn} label="NISN" name="nisn" placeholder="Masukan nisn siswa" onChange={this._onChangeInput} />
            <Input defaultValue={apiPayload.nama} label="Nama Lengkap" name="nama" placeholder="Masukan nama lengkap siswa" onChange={this._onChangeInput} />
            <Input defaultValue={apiPayload.email} label="Email" name="email" placeholder="Masukan email siswa" onChange={this._onChangeInput} />
            <div style={{marginBottom: 16}}>
              <p style={{fontSize: 14}}>Jenis Kelamin</p>
              <Dropdown data={jenisKelamin} value={defaultValueJenisKelamin} onChange={this._handleChangeDropdownJK} />
            </div>
            <div style={{marginBottom: 16}}>
              <p style={{fontSize: 14}}>Kelas</p>
              <Dropdown data={dataKelas && dataKelas} nameKey="namaKelas" value={defaultValueDropdownKelas} onChange={this._handleChangeDropdownKelas} />
            </div>
            <div style={{marginBottom: 16}}>
              <p style={{fontSize: 14}}>Jurusan</p>
              <Dropdown data={dataJurusan && dataJurusan} nameKey="namaJurusan" value={defaultValueDropdownJurusan} onChange={this._handleChangeDropdownJurusan} />
            </div>
            <Input defaultValue={apiPayload.tempatLahir} label="Tempat Lahir" name="tempatLahir" placeholder="Masukan tempat lahir siswa" onChange={this._onChangeInput} />
            <Input defaultValue={apiPayload.tanggalLahir} label="Tanggal Lahir" name="tanggalLahir" placeholder="Masukan tanggal lahir siswa dd-mm-yy" onChange={this._onChangeInput} />
            <Input defaultValue={apiPayload.namaWaliMurid} label="Wali Murid" name="namaWaliMurid" placeholder="Masukan wali murid siswa" onChange={this._onChangeInput} />
            <Input defaultValue={apiPayload.alamat} label="Alamat" name="alamat" placeholder="Masukan alamat siswa" onChange={this._onChangeInput} />
          </ModalEdit>

          <ModalDeleteData isOpen={isModalDelete} onClick={this._handleOpenModalDelete} onDeleteData={this._handleDeleteKelas} />
        </div>
      )
    )
  }
}
