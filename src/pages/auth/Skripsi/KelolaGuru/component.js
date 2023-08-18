import React, { Component } from 'react';
import Loading from '../../../../components/Loading/component';
import Table from '../../../../components/Table';
import Header from '../../../../components/Header';
import HeaderMainDataView from '../../../../components/HeaderMainDataView';
import AuthService from '../../../../utils/authService';
import { EditIcon, DeleteIcon, InfoIcon } from '../../../../configs/icons';
import { ADD_DATA_BTN, DELETE_DATA_BTN, EDIT_DATA_BTN, EXPORT_DATA_BTN, INFO_DATA_BTN } from '../../../../constants/buttonType';
import ModalCreate from '../../../../components/Modal/ModalCreate';
import Input from '../../../../components/Input';
import Dropdown from './../../../../components/Dropdown';
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
      fieldName: 'nama',
      fieldApi: 'nama'
    },
    {
      fieldName: 'jabatan',
      fieldApi: 'nama_jabatan'
    },
    {
      fieldName: 'gaji pokok',
      fieldApi: 'gaji_pokok',
      type: 'rupiah'
    },
    {
      fieldName: 'action',
      fieldApi: ''
    },
];

const buttonGroup = [
    { label: 'Tambah data guru', value: ADD_DATA_BTN},
    { label: 'Export', value: EXPORT_DATA_BTN },
]

const customIconAction = [
    {value: EDIT_DATA_BTN, icon: EditIcon},
    {value: DELETE_DATA_BTN, icon: DeleteIcon},
  ]

export default class KelolaGuru extends Component {
    state = {
      isLoading: true,
      isOpenCreate: false,
      isOpenEdit: false,
      isOpenDelete: false,
      id_guru: "",
      formGuru: {
        id_jabatan: "",
        nip: "",
        nama: "",
        tempat_lahir: "",
        tgl_lahir: "",
        agama: "",
        no_telp: "",
        tanggungan: "",
        pend_akhir: "",
        thn_lulus: "",
        gaji_pokok: "",
        jenis_kelamin: "",
        status: "",
      },
      statusName: "",
      jenisKelaminName: "",
      jabatanName: "",
    }

    componentDidMount() {
        const { actions, actionsJabatan } = this.props;

        actions.getDataGuru();
        actionsJabatan.getDataJabatan();
        this._setLoading();
    }

    _setLoading = () => {
        setTimeout(() => {
            this.setState({isLoading: false})
        }, 1000);
    }

    _handleClickButtonHeader = (value) => {
      const { dataGuru } = this.props;

      if (value === ADD_DATA_BTN) {
        this._handleOpenModalCreate();
      } else if (value === EXPORT_DATA_BTN) {
        let dataExportPDF = [];
        const attr = ['NO.', 'NIP', 'NAMA', 'KELAMIN', 'NO TELP', 'GAJI POKOK', 'JABATAN', 'TUNJANGAN '];
        const title = 'LAPORAN DATA GURU';
        const fileName = "data-laporan-data-guru";

        dataGuru.map((x, index) => {
            let tempRow = [];
            tempRow.push(index + 1);
            tempRow.push(x.nip ? x.nip : '-');
            tempRow.push(x.nama ? x.nama : '-');
            tempRow.push(x.jenis_kelamin ? x.jenis_kelamin === "l" ? "Laki - Laki" : "Perempuan" : '-');
            tempRow.push(x.no_telp ? x.no_telp : '-');
            tempRow.push(x.gaji_pokok ? IntToRupiah(x.gaji_pokok) : '-');
            tempRow.push(x.jabatan.nama_jabatan ? x.jabatan.nama_jabatan : '-');
            tempRow.push(x.jabatan.tunjangan ? IntToRupiah(x.jabatan.tunjangan) : '-');

            dataExportPDF.push(tempRow);
        });

        downloadToPdf(dataExportPDF, attr, title, fileName);
      }
    }

    _handleClickBtnAction = async (type, dataApi) => {
      const { dataJabatan } = this.props;
      console.log(dataApi);

      if (type === EDIT_DATA_BTN) {
        this._handleOpenModalEdit();
        this.setState({
          formGuru: {
            id_jabatan: dataApi.id_jabatan,
            nip: dataApi.nip,
            nama: dataApi.nama,
            tempat_lahir: dataApi.tempat_lahir,
            tgl_lahir: dataApi.tgl_lahir,
            agama: dataApi.agama,
            no_telp: dataApi.no_telp,
            tanggungan: dataApi.tanggungan,
            pend_akhir: dataApi.pend_akhir,
            thn_lulus: dataApi.thn_lulus,
            gaji_pokok: dataApi.gaji_pokok,
            jenis_kelamin: dataApi.jenis_kelamin,
            status: dataApi.status,
          },
          id_guru: dataApi.id,
          statusName: dataApi.status === "1" ? "Belum Menikah - Tidak Kawin" : "Menikah - Kawin",
          jenisKelaminName: dataApi.jenis_kelamin === "l" ? "Laki - Laki" : "Perempuan",
          jabatanName: dataJabatan.filter(i => i.id === dataApi.id_jabatan)[0].nama_jabatan,
        })
      } else if (type === DELETE_DATA_BTN) {
        this.setState({
          isOpenDelete: true,
          id_guru: dataApi.id,
        });
      }
    }

    _handleChangeCreateEdit = (e) => {
      const { name, value } = e.target;
      const { formGuru } = this.state;

      this.setState({
        formGuru: {
          ...formGuru,
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

    _handleCreateGuru = () => {
      const { formGuru } = this.state;
      const { actions } = this.props;

      actions.addDataGuru(formGuru)

      setTimeout(() => {
        actions.getDataGuru();
        this.setState({ isOpenCreate: false });
      }, 500);
    }

    // EDIT ACTION
    _handleOpenModalEdit = () => {
      this.setState({
        isOpenEdit: !this.state.isOpenEdit,
      });
    }

    _handleEditGuru = () => {
      const { formGuru, id_guru } = this.state;
      const { actions } = this.props;

      actions.editDataGuru(id_guru, formGuru);

      setTimeout(() => {
        actions.getDataGuru();
        this.setState({ isOpenEdit: false });
      }, 500);
    }

    // DELETE ACTION
    
    _handleOpenModalDelete = () => {
      this.setState({ isOpenDelete: !this.state.isOpenDelete });
    }

    _handleDeleteGuru = () => {
      const { id_guru } = this.state;
      const { actions } = this.props;

      actions.deleteDataGuru(id_guru);

      setTimeout(() => {
        actions.getDataGuru();
        this.setState({ isOpenDelete: false });
      }, 500);
    }

    _handleDropdownJenisKelamin = (data) => {
      const { formGuru } = this.state;

      this.setState({
        formGuru: {
          ...formGuru,
          jenis_kelamin: data.value
        },
        jenisKelaminName: data.name
      })
    }

    _handleDropdownStatus = (data) => {
      const { formGuru } = this.state;

      this.setState({
        formGuru: {
          ...formGuru,
          status: data.value
        },
        statusName: data.name
      })
    }
    
    _handleDropdownJabatan = (data) => {
      const { formGuru } = this.state;

      console.log(data);
      this.setState({
        formGuru: {
          ...formGuru,
          id_jabatan: data.id
        },
        jabatanName: data.nama_jabatan
      })
    }

    render() {
        const { isLoading, isOpenCreate, formGuru, isOpenEdit, isOpenDelete } = this.state;
        const { dataGuru, dataJabatan } = this.props;

        return (
            isLoading ? (
                <Loading />
            ) : (
                <div className="main-view-container">
                  <div className="header-dashboard">
                      <Header 
                        title="Kelola Guru"
                        fullName={JSON.parse(Auth.getProfile()).name}
                      />
                  </div>
          
                  <div className="main-content-view">
                      <div className="header-tools">
                      <HeaderMainDataView button={buttonGroup} onClick={this._handleClickButtonHeader} />
                      </div>
                      <div className="table-section">
                      <Table 
                        datasets={dataGuru} 
                        tableField={fieldTabel} 
                        customIconAction={customIconAction} 
                        onClickAction={this._handleClickBtnAction}
                      />
                      </div>
                  </div>

                  <ModalCreate 
                    isOpen={isOpenCreate}
                    onClick={this._handleOpenModalCreate}
                    createData={this._handleCreateGuru}
                    size="xl"
                    isAlign
                  >
                    <h4 style={{ marginBottom: 20 }}>Tambah Data Guru</h4>
                    <div style={{ margin: "32px 0" }}>
                      <Dropdown data={dataJabatan} nameKey="nama_jabatan" onChange={this._handleDropdownJabatan} label="Pilih Jabatan"  />
                    </div>
                    <div className="main-form" style={{ display: 'flex', gap: 64 }}>
                      <div className="left" style={{ width: '100%' }}>
                        <Input 
                          label="NIP"
                          name="nip"
                          placeholder="Masukan NIP"
                          onChange={this._handleChangeCreateEdit}
                        />
                        <Input 
                          label="Nama"
                          name="nama"
                          placeholder="Masukan nama"
                          onChange={this._handleChangeCreateEdit}
                        />
                        <div style={{ marginBottom: 14 }}>
                          <Dropdown 
                            data={[
                              { name: "Laki - Laki", value: 'l' },
                              { name: "Perempuan", value: 'p' }
                            ]} 
                            label="Jenis Kelamin"
                            onChange={this._handleDropdownJenisKelamin}
                            value={this.state.jenisKelaminName}
                          />
                        </div>
                        <Input 
                          label="Tempat Lahir"
                          name="tempat_lahir"
                          placeholder="Masukan tempat lahir"
                          onChange={this._handleChangeCreateEdit}
                        />
                        <Input 
                          label="Tanggal Lahir"
                          name="tgl_lahir"
                          placeholder="Masukan tanggal lahir"
                          onChange={this._handleChangeCreateEdit}
                        />
                        <Input 
                          label="Agama"
                          name="agama"
                          placeholder="Masukan agama"
                          onChange={this._handleChangeCreateEdit}
                        />
                      </div>
                      <div className="right" style={{ width: '100%' }}>
                        <Input 
                          label="Nomor telepon"
                          name="no_telp"
                          placeholder="Masukan nomor telepon"
                          onChange={this._handleChangeCreateEdit}
                        />
                        <div style={{ marginBottom: 14 }}>
                          <Dropdown 
                            data={[
                              { name: "Belum Menikah - Tidak Kawin", value: 1 },
                              { name: "Menikah - Kawin", value: 2 }
                            ]} 
                            label="Status"
                            onChange={this._handleDropdownStatus}
                            value={this.state.statusName}
                          />
                        </div>
                        <Input 
                          label="Tanggungan"
                          name="tanggungan"
                          placeholder="Masukan jumlah tanggungan"
                          onChange={this._handleChangeCreateEdit}
                        />
                        <Input 
                          label="Pendidikan Akhir"
                          name="pend_akhir"
                          placeholder="Masukan pendidikan terakhir"
                          onChange={this._handleChangeCreateEdit}
                        />
                        <Input 
                          label="Tahun Lulus"
                          name="thn_lulus"
                          placeholder="Masukan tahun lulus"
                          onChange={this._handleChangeCreateEdit}
                        />
                        <Input 
                          label="Gaji Pokok"
                          name="gaji_pokok"
                          placeholder="Masukan gaji pokok"
                          onChange={this._handleChangeCreateEdit}
                          type="number"
                        />
                      </div>
                    </div>
                  </ModalCreate>

                  <ModalEdit
                    isOpen={isOpenEdit}
                    onClick={this._handleOpenModalEdit}
                    editData={this._handleEditGuru}
                    size="xl"
                    isAlign
                  >
                    <h4 style={{ marginBottom: 20 }}>Edit Data Guru</h4>
                    <div style={{ margin: "32px 0" }}>
                      <Dropdown data={dataJabatan} nameKey="nama_jabatan" onChange={this._handleDropdownJabatan} label="Pilih Jabatan" value={this.state.jabatanName} />
                    </div>
                    <div className="main-form" style={{ display: 'flex', gap: 64 }}>
                      <div className="left" style={{ width: '100%' }}>
                        <Input 
                          label="NIP"
                          name="nip"
                          placeholder="Masukan NIP"
                          onChange={this._handleChangeCreateEdit}
                          defaultValue={formGuru.nip}
                        />
                        <Input 
                          label="Nama"
                          name="nama"
                          placeholder="Masukan nama"
                          onChange={this._handleChangeCreateEdit}
                          defaultValue={formGuru.nama}
                        />
                        <div style={{ marginBottom: 14 }}>
                          <Dropdown 
                            data={[
                              { name: "Laki - Laki", value: 'l' },
                              { name: "Perempuan", value: 'p' }
                            ]} 
                            label="Jenis Kelamin"
                            onChange={this._handleDropdownJenisKelamin}
                            value={this.state.jenisKelaminName}
                          />
                        </div>
                        <Input 
                          label="Tempat Lahir"
                          name="tempat_lahir"
                          placeholder="Masukan tempat lahir"
                          onChange={this._handleChangeCreateEdit}
                          defaultValue={formGuru.tempat_lahir}
                        />
                        <Input 
                          label="Tanggal Lahir"
                          name="tgl_lahir"
                          placeholder="Masukan tanggal lahir"
                          onChange={this._handleChangeCreateEdit}
                          defaultValue={formGuru.tgl_lahir}
                        />
                        <Input 
                          label="Agama"
                          name="agama"
                          placeholder="Masukan agama"
                          onChange={this._handleChangeCreateEdit}
                          defaultValue={formGuru.agama}
                        />
                      </div>
                      <div className="right" style={{ width: '100%' }}>
                        <Input 
                          label="Nomor telepon"
                          name="no_telp"
                          placeholder="Masukan nomor telepon"
                          onChange={this._handleChangeCreateEdit}
                          defaultValue={formGuru.no_telp}
                        />
                        <div style={{ marginBottom: 14 }}>
                          <Dropdown 
                            data={[
                              { name: "Belum Menikah - Tidak Kawin", value: 1 },
                              { name: "Menikah - Kawin", value: 2 }
                            ]} 
                            label="Status"
                            onChange={this._handleDropdownStatus}
                            value={this.state.statusName}
                          />
                        </div>
                        <Input 
                          label="Tanggungan"
                          name="tanggungan"
                          placeholder="Masukan jumlah tanggungan"
                          onChange={this._handleChangeCreateEdit}
                          defaultValue={formGuru.tanggungan}
                        />
                        <Input 
                          label="Pendidikan Akhir"
                          name="pend_akhir"
                          placeholder="Masukan pendidikan terakhir"
                          onChange={this._handleChangeCreateEdit}
                          defaultValue={formGuru.pend_akhir}
                        />
                        <Input 
                          label="Tahun Lulus"
                          name="thn_lulus"
                          placeholder="Masukan tahun lulus"
                          onChange={this._handleChangeCreateEdit}
                          defaultValue={formGuru.thn_lulus}
                        />
                        <Input 
                          label="Gaji Pokok"
                          name="gaji_pokok"
                          placeholder="Masukan gaji pokok"
                          onChange={this._handleChangeCreateEdit}
                          type="number"
                          defaultValue={formGuru.gaji_pokok}
                        />
                      </div>
                    </div>
                  </ModalEdit>

                  <ModalDelete
                    isOpen={isOpenDelete}
                    onClick={this._handleOpenModalDelete}
                    deleteData={this._handleDeleteGuru}
                    size="md"
                    isAlign
                  >
                    <h4 style={{ marginBottom: 20 }}>Hapus Data Guru</h4>
                    <p>Anda yakin akan menghapus guru ini? Klik hapus jika iya</p>
                  </ModalDelete>
                </div>
            )
        )
    }
}
