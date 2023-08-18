import React, { Component } from 'react';
import Loading from '../../../../components/Loading/component';
import Table from '../../../../components/Table';
import Header from '../../../../components/Header';
import HeaderMainDataView from '../../../../components/HeaderMainDataView';
import AuthService from '../../../../utils/authService';
import { EditIcon, DeleteIcon } from '../../../../configs/icons';
import { ADD_DATA_BTN, DELETE_DATA_BTN, EDIT_DATA_BTN, EXPORT_DATA_BTN } from '../../../../constants/buttonType';
import Input from '../../../../components/Input';
import ModalCreate from '../../../../components/Modal/ModalCreate';
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
      fieldName: 'bidang studi',
      fieldApi: 'bidang_studi'
    },
    {
      fieldName: 'honor',
      fieldApi: 'honor',
      type: 'rupiah',
    },
    {
      fieldName: 'action',
      fieldApi: ''
    },
];

const buttonGroup = [
    { label: 'Tambah data honor', value: ADD_DATA_BTN},
    { label: 'Export', value: EXPORT_DATA_BTN },
]

const customIconAction = [
    {value: EDIT_DATA_BTN, icon: EditIcon},
    {value: DELETE_DATA_BTN, icon: DeleteIcon}
  ]

export default class KelolaHonor extends Component {
    state = {
        isLoading: true,
        isOpenCreate: false,
        isOpenEdit: false,
        isOpenDelete: false,
        idHonor: '',
        formHonor: {
          bidang_studi: '',
          honor: '',
        },
    }

    componentDidMount() {
        const { actions } = this.props;

        actions.getDataHonor();
        this._setLoading();
    }

    _setLoading = () => {
        setTimeout(() => {
            this.setState({isLoading: false})
        }, 2000);
    }

    _handleClickButtonHeader = (value) => {
      const { dataHonor } = this.props;

      if (value === ADD_DATA_BTN) {
        this._handleOpenModalCreate();
      } else if (value === EXPORT_DATA_BTN) {
        let dataExportPDF = [];
        const attr = ['NO.', 'ID', 'MATA PELAJARAN', 'HONOR'];
        const title = 'LAPORAN DATA HONOR MATA PELAJARAN';
        const fileName = "data-laporan-data-honor-mapel";

        dataHonor.map((x, index) => {
            let tempRow = [];
            tempRow.push(index + 1);
            tempRow.push(x.id ? x.id : '-');
            tempRow.push(x.bidang_studi ? x.bidang_studi : '-');
            tempRow.push(x.honor ? IntToRupiah(x.honor) : '-');

            dataExportPDF.push(tempRow);
        });

        downloadToPdf(dataExportPDF, attr, title, fileName);
      }
    }

    _handleClickBtnAction = async (type, dataApi) => {
      console.log(dataApi);
      if (type === EDIT_DATA_BTN) {
        this.setState({
          isOpenEdit: true,
          idHonor: dataApi.id,
          formHonor: {
            bidang_studi: dataApi.bidang_studi,
            honor: dataApi.honor,
          }
        });
      } else if (type === DELETE_DATA_BTN) {
        this.setState({
          isOpenDelete: true,
          idHonor: dataApi.id
        });
      }
    }

    _handleChangeCreateEdit = (e) => {
      const { name, value } = e.target;
      const { formHonor } = this.state;

      this.setState({
        formHonor: {
          ...formHonor,
          [name]: value
        }
      })
    }

    // CREATE ACTION

    _handleOpenModalCreate = () => {
      this.setState({
        isOpenCreate: !this.state.isOpenCreate,
      });
    }

    _handleCreateJabatan = () => {
      const { formHonor } = this.state;
      const { actions } = this.props;

      actions.addDataHonor(formHonor);

      setTimeout(() => {
        actions.getDataHonor();
        this.setState({ isOpenCreate: false });
      }, 500);
    }

    // EDIT ACTION
    _handleOpenModalEdit = () => { 
      this.setState({ isOpenEdit: !this.state.isOpenEdit });
    }

    _handleEditHonor = async () => {
      const { formHonor, idHonor } = this.state;
      const { actions } = this.props;

      actions.editDataHonor(idHonor, formHonor);

      setTimeout(() => {
        actions.getDataHonor();
        this._handleOpenModalEdit();
      }, 500);
    }

    // DELETE ACTION
    _handleOpenModalDelete = () => {
      this.setState({ isOpenDelete: !this.state.isOpenDelete });
    }
    _handleDeleteHonor = () => {
      const { idHonor } = this.state;
      const { actions } = this.props;

      actions.deleteDataHonor(idHonor);
      setTimeout(() => {
        actions.getDataHonor();
        this._handleOpenModalDelete();
      }, 500);
    }
    
    render() {
        const { isLoading, isOpenCreate, formHonor, isOpenEdit, isOpenDelete } = this.state;
        const { dataHonor } = this.props;
        return (
            isLoading ? (
                <Loading />
            ) : (
              <div className="main-view-container">
                <div className="header-dashboard">
                    <Header 
                      title="Kelola Honor"
                      fullName={JSON.parse(Auth.getProfile()).name}
                    />
                </div>
        
                <div className="main-content-view">
                    <div className="header-tools">
                    <HeaderMainDataView button={buttonGroup} onClick={this._handleClickButtonHeader} />
                    </div>
                    <div className="table-section">
                    <Table 
                      datasets={dataHonor} 
                      tableField={fieldTabel} 
                      customIconAction={customIconAction} 
                      onClickAction={this._handleClickBtnAction} 
                    />
                    </div>
                </div>

                {/* CREATE MODAL */}
                <ModalCreate
                  isOpen={isOpenCreate}
                  onClick={this._handleOpenModalCreate}
                  createData={this._handleCreateJabatan}
                  size="md"
                  isAlign
                >
                  <h4 style={{ marginBottom: 20 }}>Tambah Data Honor</h4>
                  <div className="main-form">
                    <Input 
                      label="Mata Pelajaran"
                      name="bidang_studi"
                      placeholder="Masukan mata pelajaran"
                      onChange={this._handleChangeCreateEdit}
                    />
                    <Input 
                      label="Honor per-jam"
                      name="honor"
                      placeholder="Masukan honor"
                      onChange={this._handleChangeCreateEdit}
                    />
                  </div>
                </ModalCreate>

                {/* MODAL EDIT */}
                <ModalEdit
                  isOpen={isOpenEdit}
                  onClick={this._handleOpenModalEdit}
                  editData={this._handleEditHonor}
                  size="md"
                  isAlign
                >
                  <h4 style={{ marginBottom: 20 }}>Edit Data Honor</h4>
                  <div className="main-form">
                    <Input 
                      label="Mata Pelajaran"
                      name="bidang_studi"
                      placeholder="Masukan mata pelajaran"
                      onChange={this._handleChangeCreateEdit}
                      defaultValue={formHonor.bidang_studi}
                    />
                    <Input 
                      label="Honor per-jam"
                      name="honor"
                      placeholder="Masukan honor"
                      onChange={this._handleChangeCreateEdit}
                      defaultValue={formHonor.honor}
                    />
                  </div>
                </ModalEdit>

                {/* DELETE MODAL */}
                <ModalDelete
                  isOpen={isOpenDelete}
                  onClick={this._handleOpenModalDelete}
                  deleteData={this._handleDeleteHonor}
                  size="md"
                  isAlign
                >
                  <h4 style={{ marginBottom: 20 }}>Hapus Data Honor</h4>
                  <p>Anda yakin akan menghapus data honor ini? Klik hapus jika iya</p>
                </ModalDelete>
              </div>
            )
        )
    }
}
