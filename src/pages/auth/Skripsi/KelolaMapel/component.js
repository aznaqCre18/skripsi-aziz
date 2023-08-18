import React, { Component } from 'react';
import Loading from '../../../../components/Loading/component';
import Table from '../../../../components/Table';
import Header from '../../../../components/Header';
import HeaderMainDataView from '../../../../components/HeaderMainDataView';
import AuthService from '../../../../utils/authService';
import { EditIcon, DeleteIcon } from '../../../../configs/icons';
import ModalCreate from '../../../../components/Modal/ModalCreate';
import ModalEdit from '../../../../components/Modal/ModalEditData/component';
import Input from '../../../../components/Input';
import ModalDelete from '../../../../components/Modal/ModalDelete/component';
import { ADD_DATA_BTN, DELETE_DATA_BTN, EDIT_DATA_BTN, EXPORT_DATA_BTN } from '../../../../constants/buttonType';
import Dropdown from '../../../../components/Dropdown';
import { listHari } from '../../../../utils/constant';

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
      fieldName: 'nama mapel',
      fieldApi: 'nama_mapel'
    },
    {
      fieldName: 'hari',
      fieldApi: 'hari'
    },
    {
      fieldName: 'jam',
      fieldApi: 'jam_mapel',
    },
    {
      fieldName: 'kelas',
      fieldApi: 'kelas',
    },
    {
      fieldName: 'jurusan',
      fieldApi: 'jurusan',
    },
    {
      fieldName: 'action',
      fieldApi: ''
    },
];

const buttonGroup = [
    { label: 'Tambah data mapel', value: ADD_DATA_BTN},
]

const customIconAction = [
    {value: EDIT_DATA_BTN, icon: EditIcon},
    {value: DELETE_DATA_BTN, icon: DeleteIcon}
  ]

export default class KelolaMapel extends Component {
    state = {
        isLoading: true,
        isOpenCreate: false,
        isOpenEdit: false,
        isOpenDelete: false,
        idJadwalMapel: '',
        formJadwalMapel: {
          id_honor: '',
          id_guru: '',
          jam_mapel: '',
          jumlah_jam: '',
          kelas: '',
          jurusan: '',
          hari: '',
          thn_ajaran: '',
        },
        honorName: '',
        guruName: '',

    }

    componentDidMount() {
        const { actions, actionsHonor, actionsGuru } = this.props;

        actions.getDataMapel();
        actionsHonor.getDataHonor();
        actionsGuru.getDataGuru();

        this._setLoading();
    }

    _setLoading = () => {
        setTimeout(() => {
            this.setState({isLoading: false})
        }, 300);
    }

    _handleClickButtonHeader = (value) => {
      if (value === ADD_DATA_BTN) {
        this._handleOpenModalCreate();
      } else if (value === EXPORT_DATA_BTN) {
        console.log('export');
      }
    }

    _handleClickBtnAction = async (type, dataApi) => {
      const { dataHonor, dataGuru } = this.props;

      if (type === EDIT_DATA_BTN) {
        this.setState({
          isOpenEdit: true,
          formJadwalMapel: {
            id_honor: dataApi.id_honor,
            id_guru: dataApi.id_guru,
            jam_mapel: dataApi.jam_mapel,
            jumlah_jam: dataApi.jumlah_jam,
            kelas: dataApi.kelas,
            jurusan: dataApi.jurusan,
            hari: dataApi.hari,
            thn_ajaran: dataApi.thn_ajaran,
          },
          idJadwalMapel: dataApi.id,
          honorName: dataHonor.filter(i => i.id === dataApi.id_honor)[0].bidang_studi,
          guruName: dataGuru.filter(i => i.id === dataApi.id_guru)[0].nama,
        });
      } else if (type === DELETE_DATA_BTN) {
        this.setState({
          isOpenDelete: true,
          idJadwalMapel: dataApi.id,
        });
      }
    }

    _handleChangeCreateEdit = (e) => {
      const { name, value } = e.target;
      const { formJadwalMapel } = this.state;

      this.setState({
        formJadwalMapel: {
          ...formJadwalMapel,
          [name]: value
        }
      })
    }

    _onChangeDropdownMapel = (data) => {
      const { formJadwalMapel } = this.state;
      this.setState({
        formJadwalMapel: {
          ...formJadwalMapel,
          id_honor: data.id,
        },
        honorName: data.bidang_studi,
      })
    }
    
    _onChangeDropdownGuru = (data) => {
      const { formJadwalMapel } = this.state;
      this.setState({
        formJadwalMapel: {
          ...formJadwalMapel,
          id_guru: data.id,
        },
        guruName: data.nama
      })
    }
    
    _onChangeDropdownHari = (data) => {
      const { formJadwalMapel } = this.state;
      this.setState({
        formJadwalMapel: {
          ...formJadwalMapel,
          hari: data.name,
        },
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

    _handleCreateJadwalMapel = () => {
      const { formJadwalMapel } = this.state;
      const { actions } = this.props;

      actions.addDataJadwalMapel(formJadwalMapel);

      setTimeout(() => {
        actions.getDataMapel();
        this.setState({ isOpenCreate: false, honorName: "", formJadwalMapel: { hari: "" }, guruName: "" });
      }, 500);
    }

    // EDIT ACTION

    _handleOpenModalEdit = async (value, dataClick) => { 
      this.setState({ isOpenEdit: !this.state.isOpenEdit });
    }

    _handleEditJadwalMapel = async () => {
      const { formJadwalMapel, idJadwalMapel } = this.state;
      const { actions } = this.props;

      actions.editDataJadwalMapel(idJadwalMapel, formJadwalMapel);

      setTimeout(() => {
        actions.getDataMapel();
        this._handleOpenModalEdit();
      }, 300);
    }

    // DELETE ACTION

    _handleOpenModalDelete = () => {
      this.setState({ isOpenDelete: !this.state.isOpenDelete });
    }

    _handleDeleteJadwalMapel = () => {
      const { idJadwalMapel } = this.state;
      const { actions } = this.props;

      actions.deleteJadwalMapel(idJadwalMapel);
      setTimeout(() => {
        actions.getDataMapel();
        this._handleOpenModalDelete();
      }, 300);
    }

    render() {
        const { isLoading, isOpenCreate, isOpenEdit, isOpenDelete, formJadwalMapel, honorName, guruName } = this.state;
        const { dataMapel, dataHonor, dataGuru } = this.props;
        return (
            isLoading ? (
                <Loading />
            ) : (
              <div className="main-view-container">
                <div className="header-dashboard">
                  <Header 
                    title="Kelola Mapel"
                    fullName={JSON.parse(Auth.getProfile()).name}
                  />
                </div>
        
                <div className="main-content-view">
                  <div className="header-tools">
                    <HeaderMainDataView button={buttonGroup} onClick={this._handleClickButtonHeader} />
                  </div>
                  <div className="table-section">
                    <Table 
                      datasets={dataMapel} 
                      tableField={fieldTabel} 
                      customIconAction={customIconAction} 
                      onClickAction={this._handleClickBtnAction} 
                    />
                  </div>
                </div>

                <ModalCreate
                    isOpen={isOpenCreate}
                    onClick={this._handleOpenModalCreate}
                    createData={this._handleCreateJadwalMapel}
                    size="lg"
                    isAlign
                  >
                    <h4 style={{ marginBottom: 20 }}>Tambah Data Jadwal Mata Pelajaran</h4>
                    <div className="main-form" style={{ display: 'flex', gap: 20 }}>
                      <div className='left' style={{ width: "100%" }}>
                        <div style={{ marginBottom: 15 }}>
                          <Dropdown label="Mata Pelajaran" data={dataHonor} nameKey="bidang_studi" onChange={this._onChangeDropdownMapel} value={honorName} />
                        </div>
                        <div style={{ marginBottom: 15 }}>
                          <Dropdown label="Guru" data={dataGuru} nameKey="nama" onChange={this._onChangeDropdownGuru} value={guruName} />
                        </div>
                        <div style={{ marginBottom: 15 }}>
                          <Dropdown label="Hari" data={listHari} onChange={this._onChangeDropdownHari} value={formJadwalMapel.hari} />
                        </div>
                        <Input 
                          label="Jam Pelajaran"
                          name="jam_mapel"
                          placeholder="Masukan jam mapelnya"
                          onChange={this._handleChangeCreateEdit}
                        />
                      </div>

                      <div className='right' style={{ width: "100%" }}>
                        <Input 
                          label="Jumlah Jam"
                          name="jumlah_jam"
                          placeholder="Masukan jumlah jam"
                          onChange={this._handleChangeCreateEdit}
                        />
                        <Input 
                          label="Kelas"
                          name="kelas"
                          placeholder="Masukan kelas"
                          onChange={this._handleChangeCreateEdit}
                        />
                        <Input 
                          label="Jurusan"
                          name="jurusan"
                          placeholder="Masukan jurusan"
                          onChange={this._handleChangeCreateEdit}
                        />
                        <Input 
                          label="Tahun Ajaran"
                          name="thn_ajaran"
                          placeholder="Masukan tahun ajaran"
                          onChange={this._handleChangeCreateEdit}
                        />
                      </div>
                    </div>
                  </ModalCreate>

                  <ModalEdit
                    isOpen={isOpenEdit}
                    onClick={this._handleOpenModalEdit}
                    editData={this._handleEditJadwalMapel}
                    size="lg"
                    isAlign
                  >
                    <h4 style={{ marginBottom: 20 }}>Edit Data Jadwal Mata Pelajaran</h4>
                    <div className="main-form" style={{ display: 'flex', gap: 20 }}>
                      <div className='left' style={{ width: "100%" }}>
                        <div style={{ marginBottom: 15 }}>
                          <Dropdown label="Mata Pelajaran" data={dataHonor} nameKey="bidang_studi" onChange={this._onChangeDropdownMapel} value={honorName} />
                        </div>
                        <div style={{ marginBottom: 15 }}>
                          <Dropdown label="Guru" data={dataGuru} nameKey="nama" onChange={this._onChangeDropdownGuru} value={guruName} />
                        </div>
                        <div style={{ marginBottom: 15 }}>
                          <Dropdown label="Hari" data={listHari} onChange={this._onChangeDropdownHari} value={formJadwalMapel.hari} />
                        </div>
                        <Input 
                          label="Jam Pelajaran"
                          name="jam_mapel"
                          placeholder="Masukan jam mapelnya"
                          onChange={this._handleChangeCreateEdit}
                          defaultValue={formJadwalMapel.jam_mapel}
                        />
                      </div>

                      <div className='right' style={{ width: "100%" }}>
                        <Input 
                          label="Jumlah Jam"
                          name="jumlah_jam"
                          placeholder="Masukan jumlah jam"
                          onChange={this._handleChangeCreateEdit}
                          defaultValue={formJadwalMapel.jumlah_jam}
                        />
                        <Input 
                          label="Kelas"
                          name="kelas"
                          placeholder="Masukan kelas"
                          onChange={this._handleChangeCreateEdit}
                          defaultValue={formJadwalMapel.kelas}
                        />
                        <Input 
                          label="Jurusan"
                          name="jurusan"
                          placeholder="Masukan jurusan"
                          onChange={this._handleChangeCreateEdit}
                          defaultValue={formJadwalMapel.jurusan}
                        />
                        <Input 
                          label="Tahun Ajaran"
                          name="thn_ajaran"
                          placeholder="Masukan tahun ajaran"
                          onChange={this._handleChangeCreateEdit}
                          defaultValue={formJadwalMapel.thn_ajaran}
                        />
                      </div>
                    </div>
                  </ModalEdit>

                  <ModalDelete
                    isOpen={isOpenDelete}
                    onClick={this._handleOpenModalDelete}
                    deleteData={this._handleDeleteJadwalMapel}
                    size="md"
                    isAlign
                  >
                    <h4 style={{ marginBottom: 20 }}>Hapus Data Jawdal Mata Pelajaran</h4>
                    <p>Anda yakin akan menghapus jadwal ini? Klik hapus jika iya</p>
                  </ModalDelete>
              </div>
            )
        )
    }
}
