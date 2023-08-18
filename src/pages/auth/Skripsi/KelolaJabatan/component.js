import React, { Component } from 'react';
import Loading from '../../../../components/Loading/component';
import Table from '../../../../components/Table';
import Header from '../../../../components/Header';
import HeaderMainDataView from '../../../../components/HeaderMainDataView';
import AuthService from '../../../../utils/authService';
import { EditIcon, DeleteIcon } from '../../../../configs/icons';
import { ADD_DATA_BTN, DELETE_DATA_BTN, EDIT_DATA_BTN, EXPORT_DATA_BTN } from '../../../../constants/buttonType';
import ModalCreate from '../../../../components/Modal/ModalCreate';
import Input from '../../../../components/Input';
import ModalEdit from '../../../../components/Modal/ModalEditData/component';
import ModalDelete from '../../../../components/Modal/ModalDelete/component';
import IntToRupiah from '../../../../utils/IntToRupiah';
import downloadToPdf from '../../../../utils/downloadToPdf';

const Auth = new AuthService();

const fieldTabel = [
    {
      fieldName: 'NO.',
      fieldApi: ''
    },
    {
      fieldName: 'ID',
      fieldApi: 'id'
    },
    {
      fieldName: 'nama jabatan',
      fieldApi: 'nama_jabatan'
    },
    {
      fieldName: 'tunjangan',
      fieldApi: 'tunjangan',
      type: 'rupiah'
    },
    {
      fieldName: 'action',
      fieldApi: ''
    },
];

const buttonGroup = [
    { label: 'Tambah data jabatan', value: ADD_DATA_BTN},
    { label: 'Export', value: EXPORT_DATA_BTN },
]

const customIconAction = [
    {value: EDIT_DATA_BTN, icon: EditIcon},
    {value: DELETE_DATA_BTN, icon: DeleteIcon}
  ]

export default class KelolaJabatan extends Component {
    state = {
      isLoading: true,
      isOpenCreate: false,
      isOpenEdit: false,
      isOpenDelete: false,
      formJabatan: {
        id: '',
        nama_jabatan: '',
        tunjangan: '',
      },
    }

    componentDidMount() {
        const { actions } = this.props;

        actions.getDataJabatan();
        this._setLoading();
    }

    _setLoading = () => {
        setTimeout(() => {
            this.setState({isLoading: false})
        }, 2000);
    }

    _handleClickButtonHeader = (value) => {
      const { dataJabatan } = this.props;

      if (value === ADD_DATA_BTN) {
        this._handleOpenModalCreate();
      } else if (value === EXPORT_DATA_BTN) {
        let dataExportPDF = [];
        const attr = ['NO.', 'ID', 'NAMA JABATAN', 'TUNJANGAN'];
        const title = 'LAPORAN DATA JABATAN';
        const fileName = "data-laporan-jabatan";

        dataJabatan.map((x, index) => {
            let tempRow = [];
            tempRow.push(index + 1);
            tempRow.push(x.id ? x.id : '-');
            tempRow.push(x.nama_jabatan ? x.nama_jabatan : '-');
            tempRow.push(x.tunjangan ? IntToRupiah(x.tunjangan) : '-');

            dataExportPDF.push(tempRow);
        });

        downloadToPdf(dataExportPDF, attr, title, fileName);
      }
    }

    _handleClickBtnAction = async (type, dataApi) => {
      if (type === EDIT_DATA_BTN) {
        this.setState({
          isOpenEdit: true,
          formJabatan: {
            id: dataApi.id,
            nama_jabatan: dataApi.nama_jabatan,
            tunjangan: dataApi.tunjangan,
          }
        });
      } else if (type === DELETE_DATA_BTN) {
        this.setState({
          isOpenDelete: true,
          formJabatan: {
            id: dataApi.id,
            nama_jabatan: dataApi.nama_jabatan,
            tunjangan: dataApi.tunjangan,
          }
        });
      }
    }

    _handleChangeCreateEdit = (e) => {
      const { name, value } = e.target;
      const { formJabatan } = this.state;

      this.setState({
        formJabatan: {
          ...formJabatan,
          [name]: value
        }
      })
    }

    // CREATE ACTION

    _handleOpenModalCreate = () => {
      this.setState({
        isOpenCreate: !this.state.isOpenCreate,
        formJabatan: {
          id: '',
          nama_jabatan: '',
          tunjangan: '',
        },
      });
    }

    _handleCreateJabatan = () => {
      const { formJabatan } = this.state;
      const { actions } = this.props;
      
      const payload = {
        nama_jabatan: formJabatan.nama_jabatan,
        tunjangan: formJabatan.tunjangan,
      };

      console.log(payload);

      actions.addDataJabatan(payload);

      setTimeout(() => {
        actions.getDataJabatan();
        this.setState({ isOpenCreate: false });
      }, 500);
    }

    // EDIT ACTION

    _handleOpenModalEdit = async (value, dataClick) => { 
      this.setState({ isOpenEdit: !this.state.isOpenEdit });
    }

    _handleEditUser = async () => {
      const { formJabatan } = this.state;
      const { actions } = this.props;

      actions.editDataJabatanById(formJabatan);

      setTimeout(() => {
        actions.getDataJabatan();
        this._handleOpenModalEdit();
      }, 500);
    }

    // DELETE ACTION

    _handleOpenModalDelete = () => {
      this.setState({ isOpenDelete: !this.state.isOpenDelete });
    }

    _handleDeleteUser = () => {
      const { formJabatan } = this.state;
      const { actions } = this.props;

      actions.deleteDataJabatanById(formJabatan);
      setTimeout(() => {
        this._handleOpenModalDelete();
        actions.getDataJabatan();
      }, 500);
    }

    render() {
        const { isLoading, isOpenCreate, formJabatan, isOpenEdit, isOpenDelete } = this.state;
        const { dataJabatan } = this.props;
        return (
            isLoading ? (
                <Loading />
            ) : (
                <div className="main-view-container">
                  <div className="header-dashboard">
                      <Header 
                        title="Kelola Jabatan"
                        fullName={JSON.parse(Auth.getProfile()).name}
                      />
                  </div>
          
                  <div className="main-content-view">
                      <div className="header-tools">
                      <HeaderMainDataView button={buttonGroup} onClick={this._handleClickButtonHeader} />
                      </div>
                      <div className="table-section">
                      <Table 
                        datasets={dataJabatan} 
                        tableField={fieldTabel} 
                        customIconAction={customIconAction} 
                        onClickAction={this._handleClickBtnAction} 
                      />
                      </div>
                  </div>
                  
                  <ModalCreate 
                    isOpen={isOpenCreate}
                    onClick={this._handleOpenModalCreate}
                    createData={this._handleCreateJabatan}
                    size="md"
                    isAlign
                  >
                    <h4 style={{ marginBottom: 20 }}>Tambah Data Jabatan</h4>
                    <div className="main-form">
                      <Input 
                        label="Nama Jabatan"
                        name="nama_jabatan"
                        placeholder="Masukan nama jabatan"
                        onChange={this._handleChangeCreateEdit}
                      />
                      <Input 
                        label="Tunjangan"
                        name="tunjangan"
                        placeholder="Masukan jumlah tunjangan"
                        onChange={this._handleChangeCreateEdit}
                      />
                    </div>
                  </ModalCreate>

                  <ModalEdit 
                    isOpen={isOpenEdit}
                    onClick={this._handleOpenModalEdit}
                    editData={this._handleEditUser}
                    size="md"
                    isAlign
                  >
                    <h4 style={{ marginBottom: 20 }}>Edit Data Jabatan</h4>
                    <div className="main-form">
                      <Input 
                        label="Nama Jabatan"
                        name="nama_jabatan"
                        placeholder="Masukan nama"
                        defaultValue={formJabatan.nama_jabatan}
                        onChange={this._handleChangeCreateEdit}
                      />
                      <Input 
                        label="Tunjangan"
                        name="tunjangan"
                        placeholder="Masukan username"
                        defaultValue={formJabatan.tunjangan}
                        onChange={this._handleChangeCreateEdit}
                      />
                    </div>
                  </ModalEdit>

                  <ModalDelete
                    isOpen={isOpenDelete}
                    onClick={this._handleOpenModalDelete}
                    deleteData={this._handleDeleteUser}
                    size="md"
                    isAlign
                  >
                    <h4 style={{ marginBottom: 20 }}>Hapus Data Jabatan</h4>
                    <p>Anda yakin akan menghapus jabatan ini? Klik hapus jika iya</p>
                  </ModalDelete>
                </div>
            )
        )
    }
}
