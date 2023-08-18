import React, { useEffect, useState } from 'react'
import Loading from '../../../../components/Loading/component';
import AuthService from '../../../../utils/authService';
import Header from '../../../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import ModalCreate from '../../../../components/Modal/ModalCreate';
import Dropdown from '../../../../components/Dropdown';
import Table from './../../../../components/Table';
import HeaderMainDataView from '../../../../components/HeaderMainDataView';
import { ADD_DATA_BTN, DELETE_DATA_BTN, EDIT_DATA_BTN } from '../../../../constants/buttonType';
import { DeleteIcon, EditIcon } from '../../../../configs/icons';
import { addDataAbsen, deleteDataAbsen, editDataAbsen, getAllDataAbsen } from './action';
import Input from '../../../../components/Input';
import { getDataMapel } from '../KelolaMapel/action';
import ReactDatePicker from 'react-datepicker';
import { forwardRef } from 'react';
import ModalEdit from '../../../../components/Modal/ModalEditData/component';
import ModalDelete from '../../../../components/Modal/ModalDelete/component';

const Auth = new AuthService();

const FieldTabel = [
    {
        fieldName: 'NO.',
        fieldApi: ''
    },
    {
        fieldName: 'TANGGAL',
        fieldApi: 'tanggal',
        type: 'date'
    },
    {
        fieldName: 'NAMA GURU',
        fieldApi: 'nama_guru'
    },
    {
        fieldName: 'MATA PELAJARAN',
        fieldApi: 'mata_pelajaran'
    },
    {
        fieldName: 'TAHUN AJARAN',
        fieldApi: 'thn_ajaran'
    },
    {
        fieldName: 'STATUS',
        fieldApi: 'status',
        render: ({ item }) => {
            if (item === 1) {
                return <p>HADIR</p>
            } else if (item === 2) {
                return <p>TIDAK HADIR</p>
            } else {
                return <p>-</p>
            }
        }
    },
    {
        fieldName: 'action',
        fieldApi: ''
    },
  ];

const buttonGroup = [
    { label: 'Tambah data absensi', value: ADD_DATA_BTN},
];

const customIconAction = [
    {value: EDIT_DATA_BTN, icon: EditIcon},
    {value: DELETE_DATA_BTN, icon: DeleteIcon}
];

const statusKehadiranOption = [
    {name: 'Hadir', value: 1},
    {name: 'Tidak Hadir', value: 2},
]

const KelolaAbsensi = () => {
    const { dataAbsensi } = useSelector(state => state.AbsensiRed);
    const { dataMapel } = useSelector(state => state.MapelSkripsiRed);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [isModalCreate, setIsModalCreate] = useState(false);
    const [isModalEdit, setIsModalEdit] = useState(false);
    const [isModalDelete, setIsModalDelete] = useState(false);
    const [contentMapelDetail, setContentMapelDetail] = useState(null);
    const [formCreate, setFormCreate] = useState({
        id: '',
        id_mapel: '',
        id_guru: '',
        namaMapel: '',
        tanggal: new Date(),
        status: '',
        statusName: '',
    })

    useEffect(() => {
        dispatch(getAllDataAbsen());
        dispatch(getDataMapel());

        setTimeout(() => {
            setLoading(false);
        }, 500)
    }, []);

    const _handleClickButtonHeader = (value) => {
        if (value === ADD_DATA_BTN) {
            _handleOpenModalCreate();
        }
    }

    const _handleStatusKehadiran = (id) => {
        if (id === 1) {
            return "HADIR"
        } else if (id === 2) {
            return "TIDAK HADIR"
        } else {
            return "-"
        }
    }

    const _handleClickBtnAction = (type, dataApi) => {
        setFormCreate({
            ...formCreate,
            id: dataApi.id,
            id_guru: dataApi.id_guru,
            id_mapel: dataApi.id_mapel,
            status: dataApi.status,
            tanggal: dataApi.tanggal,
            statusName: _handleStatusKehadiran(dataApi.status),
        });

        if (type === EDIT_DATA_BTN) {
            _handleOpenModalEdit();
        } else if (type === DELETE_DATA_BTN) {
            _handleOpenModalDelete();
        }
    }

    // CREATE ACTION
    const _handleOpenModalCreate = () => {
        setIsModalCreate(current => !current);
    }

    const _handleChangeMapelDropdown = (data) => {
        setFormCreate(currentValue => ({
            ...currentValue,
            id_mapel: data.id,
            id_guru: data.id_guru,
            namaMapel: data.nameCombine
        }));
        setContentMapelDetail(data);
    }

    const _handleChangeStatusDropdown = (data) => {
        setFormCreate(currentValue => ({
            ...currentValue,
            status: data.value,
            statusName: data.name,
        }));
    }

    const CustomDatePicker = forwardRef((e, ref) => {
        return (
            <Input
                ref={ref}
                label="Tanggal"
                name="tanggal"
                placeholder="Masukan tanggal"
                onClick={e.onClick}
                defaultValue={e.value}
                disabled
            />
        )
    });

    const _handleChangeDate = (date) => {
        setFormCreate(currentValue => ({
            ...currentValue,
            tanggal: date
        }))
    };

    const _handleCreateAbsensi = (e) => {
        dispatch(addDataAbsen(formCreate));

        setTimeout(() => {
            dispatch(getAllDataAbsen());
            _handleOpenModalCreate();
            setFormCreate({
                id_mapel: '',
                namaMapel: '',
                tanggal: new Date(),
                status: '',
                statusName: '',
            })
        }, 300);
    }

    // FUNCTION EDIT
    const _handleOpenModalEdit = () => {
        setIsModalEdit(current => !current);
    }

    const _handleEditAbsensi = () => {
        dispatch(editDataAbsen(formCreate));

        setTimeout(() => {
            dispatch(getAllDataAbsen());
            _handleOpenModalEdit();
            setFormCreate({
                id_mapel: '',
                namaMapel: '',
                tanggal: new Date(),
                status: '',
                statusName: '',
            })
        }, 300);
    }

    // FUNCTION DELETE
    const _handleOpenModalDelete = () => {
        setIsModalDelete(current => !current);
    }

    const _handleDeleteAbsensi = () => {
        dispatch(deleteDataAbsen(formCreate.id));

        setTimeout(() => {
            dispatch(getAllDataAbsen());
            _handleOpenModalDelete();
            setFormCreate({
                id_mapel: '',
                namaMapel: '',
                tanggal: new Date(),
                status: '',
                statusName: '',
            })
        }, 300);
    }

    // HANDLE SEARCH
    const _handleChangeSearch = (e) => {
        const { value } = e.target;
        
        setTimeout(() => {
            dispatch(getAllDataAbsen(value));
        }, 1000)
    }

    return (
        loading ? (
            <Loading />
        ) : (
            <div className="main-view-container">
                <div className="header-dashboard">
                    <Header 
                        title="Kelola Absensi"
                        fullName={JSON.parse(Auth.getProfile()).name}
                    />
                </div>

                <div className="main-content-view">
                      <div className="header-tools">
                        <HeaderMainDataView button={buttonGroup} onClick={_handleClickButtonHeader} onChangeSearch={_handleChangeSearch} />
                      </div>
                      <div className="table-section">
                        <Table
                            datasets={dataAbsensi} 
                            tableField={FieldTabel} 
                            customIconAction={customIconAction} 
                            onClickAction={_handleClickBtnAction} 
                        />
                      </div>
                </div>
                
                <ModalCreate
                    isOpen={isModalCreate}
                    onClick={_handleOpenModalCreate}
                    size="lg"
                    isAlign
                    createData={_handleCreateAbsensi}
                >
                    <h3 style={{ marginBottom: 24 }}>Buat Presensi</h3>
                    <div className="status-adbsen" style={{ marginBottom: 16 }}>
                        <label>Pilih Jadwal Mata Pelajaran</label>
                        <Dropdown data={dataMapel} nameKey="nameCombine" onChange={_handleChangeMapelDropdown} value={formCreate.namaMapel} />
                    </div>
                    {
                        contentMapelDetail ? (
                            <div className="detail-jadwal" style={{ backgroundColor: '#E7EDF7', display: 'flex', alignItems: 'center', padding: '22px 24px', borderRadius: 6, gap: 40, margin: '30px 0' }}>
                                <div className="left" style={{ width: '100%' }}>
                                    <div className="nama-guru" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
                                        <b>Nama Guru</b>
                                        <p style={{ textTransform: 'capitalize' }}>{contentMapelDetail.guru.nama}</p>
                                    </div>
                                    <div className="kelas" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <b>Kelas</b>
                                        <p>{`${contentMapelDetail.kelas} - ${contentMapelDetail.jurusan}`}</p>
                                    </div>
                                </div>
                                <div className="right" style={{ width: '100%' }}>
                                    <div className="hari" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
                                        <b>Hari</b>
                                        <p>{contentMapelDetail.hari}</p>
                                    </div>
                                    <div className="jam-mapel" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <b>Jam Mapel</b>
                                        <p>{contentMapelDetail.jam_mapel}</p>
                                    </div>
                                </div>
                            </div>
                        ) : null
                    }
                    <div style={{ display: 'flex', gap: 32 }}>
                        <div style={{ width: '100%' }}>
                            <ReactDatePicker
                                selected={formCreate.tanggal}
                                onChange={_handleChangeDate}
                                customInput={<CustomDatePicker />}
                            />
                        </div>
                        <div className="status-adbsen" style={{ width: '100%' }}>
                            <label>Status Kehadiran</label>
                            <Dropdown data={statusKehadiranOption} onChange={_handleChangeStatusDropdown} value={formCreate.statusName} />
                        </div>
                    </div>
                </ModalCreate>

                {/* MODAL EDIT */}
                <ModalEdit
                    isOpen={isModalEdit}
                    onClick={_handleOpenModalEdit}
                    editData={_handleEditAbsensi}
                    size="md"
                    isAlign
                  >
                    <h4 style={{ marginBottom: 20 }}>Edit Data User</h4>
                    <div className="main-form">
                        <div className="status-adbsen" style={{ width: '100%' }}>
                            <label>Status Kehadiran</label>
                            <Dropdown data={statusKehadiranOption} onChange={_handleChangeStatusDropdown} value={formCreate.statusName} />
                        </div>
                    </div>
                </ModalEdit>

                {/* MODAL DELETE */}
                <ModalDelete
                    isOpen={isModalDelete}
                    onClick={_handleOpenModalDelete}
                    deleteData={_handleDeleteAbsensi}
                    size="md"
                    isAlign
                  >
                    <h4 style={{ marginBottom: 20 }}>Hapus Data User</h4>
                    <p>Anda yakin akan menghapus user ini? Klik hapus jika iya</p>
                  </ModalDelete>
            </div>
        )
    )
}

export default KelolaAbsensi