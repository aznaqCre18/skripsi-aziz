import React, { useEffect, useState } from 'react'
import Loading from '../../../../components/Loading/component';
import AuthService from '../../../../utils/authService';
import Header from '../../../../components/Header';
import { ArrowRightIcon, DownIcon } from '../../../../configs/icons';
import ReactDatePicker from 'react-datepicker';
import { forwardRef } from 'react';
import Input from '../../../../components/Input';
import ModalCreate from '../../../../components/Modal/ModalCreate';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getDataLaporanAbsensi, getDataLaporanGaji } from './action';
import downloadToPdf from '../../../../utils/downloadToPdf';
import { listBulan } from '../../../../utils/constant';
import Dropdown from '../../../../components/Dropdown';
import IntToRupiah from '../../../../utils/IntToRupiah';

const Auth = new AuthService();

const Laporan = () => {
    const [loading, setLoading] = useState(false);
    const [isOpenModalCetakAbsensi, setIsOpenModalCetakAbsensi] = useState(false);
    const [isOpenModalCetakGaji, setIsOpenModalCetakGaji] = useState(false);
    const [formDateRange, setFormDateRange] = useState({
        startDate: '',
        endDate: '',
    })
    const [formDateView, setformDateView] = useState({
        startDate: '',
        endDate: '',
    })
    const [bulanName, setBulanName] = useState("");

    const { dataLaporanAbsensi, dataLaporanGaji } = useSelector(state => state.LaporanRed);
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500)
    }, []);
    

    useEffect(() => {
        let dataExportPDF = [];
        const attr = ['No.', 'Hari', 'Tanggal', 'Nama', 'Jam', 'Kelas', 'Jurusan', 'Status'];
        const title = "LAPORAN DATA ABSENSI GURU";
        const fileName = "data-laporan-absensi-guru";

        dataLaporanAbsensi.map((x, index) => {
            let tempRow = [];
            tempRow.push(index + 1);
            tempRow.push(x.mapel ? x.mapel.hari : '-');
            tempRow.push(x.tanggal ? x.tanggal : '-');
            tempRow.push(x.guru ? x.guru.nama : '-');
            tempRow.push(x.mapel ? x.mapel.jam_mapel : '-');
            tempRow.push(x.mapel ? x.mapel.kelas : '-');
            tempRow.push(x.mapel ? x.mapel.jurusan : '-');
            tempRow.push(x.mapel ? x.mapel.jurusan : '-');
            tempRow.push(x.status ? x.status === "1" ? "HADIR" : "TIDAK" : '-');

            dataExportPDF.push(tempRow);
        });

        if(dataLaporanAbsensi.length > 0 && isOpenModalCetakAbsensi) downloadToPdf(dataExportPDF, attr, title, fileName);
    }, [dataLaporanAbsensi]);

    useEffect(() => {
        let dataExportPDF = [];
        const attr = ['NO.', 'NAMA', 'BULAN', 'TAHUN', 'GAJI POKOK', 'TOTAL HONOR', 'POTONGAN', 'PPH 21', 'THP'];
        const title = `LAPORAN DATA GAJI GURU - BULAN ${bulanName.toUpperCase()}`;
        const fileName = "data-laporan-gaji-guru";

        dataLaporanGaji.map((x, index) => {
            let tempRow = [];
            tempRow.push(index + 1);
            tempRow.push(x.guru ? x.guru.nama : '-');
            tempRow.push(x.bulan_tahun ? x.bulan_tahun : '-');
            tempRow.push(x.tahun ? x.tahun : '-');
            tempRow.push(x.gaji_pokok ? IntToRupiah(x.gaji_pokok) : '-');
            tempRow.push(x.total_honor ? IntToRupiah(x.total_honor) : '-');
            tempRow.push(x.potongan ? IntToRupiah(x.potongan) : '-');
            tempRow.push(x.pph21_perbulan ? IntToRupiah(x.pph21_perbulan) : '-');
            tempRow.push(x.thp ? IntToRupiah(x.thp) : '-');

            dataExportPDF.push(tempRow);
        });

        if(dataLaporanGaji.length > 0 && isOpenModalCetakGaji) downloadToPdf(dataExportPDF, attr, title, fileName);
    }, [dataLaporanGaji]);

    const CustomDatePickerStart = forwardRef((e, ref) => {
        return (
            <Input
                ref={ref}
                label="Start Date"
                name="start_date"
                placeholder="Input start date"
                onClick={e.onClick}
                defaultValue={e.value}
                disabled
            />
        )
    });

    const CustomDatePickerEnd = forwardRef((e, ref) => {
        return (
            <Input
                ref={ref}
                label="End Date"
                name="end_date"
                placeholder="Input end date"
                onClick={e.onClick}
                defaultValue={e.value}
                disabled
            />
        )
    });

    const _handleChangeStartDate = (date) => {
        const startDate = moment(date).format('YYYY-MM-DD')
        setFormDateRange(currentValue => ({
            ...currentValue,
            startDate: startDate
        }))
        setformDateView(currentValue => ({
            ...currentValue,
            startDate: date
        }))
    };

    const _handleChangeEndDate = (date) => {
        const endDate = moment(date).format('YYYY-MM-DD')
        setFormDateRange(currentValue => ({
            ...currentValue,
            endDate: endDate
        }))
        setformDateView(currentValue => ({
            ...currentValue,
            endDate: date
        }))
    };

    // CETAK ABSENSI ACTION
    const _handleOpenModalCetakAbsensi = () => {
        setIsOpenModalCetakAbsensi(current => !current);
    }

    const _handleCetakAbsensi = async () => {
        console.log(formDateRange, 'cetak absensi');
        
        dispatch(getDataLaporanAbsensi(formDateRange));
    }

    // CETAK LAPORAN GAJI
    const _handleOpenModalCetakGaji = () => {
        setIsOpenModalCetakGaji(current => !current);
    }

    const _handlleDropdownBulanCetakLaporanGaji = (data) => {
        setBulanName(data.name);
    }

    const _handleCetakGaji = async () => {
        console.log(bulanName, 'cetak absensi');
        
        dispatch(getDataLaporanGaji(bulanName));
    }

    return (
        loading ? (
            <Loading />
        ) : (
            <div className="main-view-container">
                <div className="header-dashboard">
                    <Header 
                        title="Laporan"
                        fullName={JSON.parse(Auth.getProfile()).name}
                    />
                </div>
        
                <div>
                    <div onClick={_handleOpenModalCetakAbsensi} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 22px', borderRadius: 10, backgroundColor: '#fff', marginBottom: 20, cursor: 'pointer' }}>
                        <div>
                            <p style={{ fontWeight: 600 }}>Cetak Laporan</p>
                            <p>Absensi</p>
                        </div>
                        <img src={DownIcon} alt="down-ic" style={{ rotate: '-90deg' }} />
                    </div>
                    <div onClick={_handleOpenModalCetakGaji} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 22px', borderRadius: 10, backgroundColor: '#fff', marginBottom: 20, cursor: 'pointer' }}>
                        <div>
                            <p style={{ fontWeight: 600 }}>Cetak Laporan</p>
                            <p>Gaji Guru</p>
                        </div>
                        <img src={DownIcon} alt="down-ic" style={{ rotate: '-90deg' }} />
                    </div>
                </div>

                {/* MODAL LAPORAN ABSENSI */}
                <ModalCreate
                    isOpen={isOpenModalCetakAbsensi}
                    onClick={_handleOpenModalCetakAbsensi}
                    createData={_handleCetakAbsensi}
                    size="lg"
                    isAlign
                    width
                  >
                    <h4 style={{ marginBottom: 20 }}>Cetak Laporan Absensi</h4>
                    <div className="main-form" style={{ display: 'flex', gap: 20 }}>
                        <div style={{ width: '100%' }}>
                            <ReactDatePicker
                                selected={formDateView.startDate}
                                onChange={_handleChangeStartDate}
                                customInput={<CustomDatePickerStart />}
                                dateFormat="yyyy-MM-dd"
                            />
                        </div>
                        <div style={{ width: '100%' }}>
                            <ReactDatePicker
                                selected={formDateView.endDate}
                                onChange={_handleChangeEndDate}
                                customInput={<CustomDatePickerEnd />}
                                dateFormat="yyyy-MM-dd"
                            />
                        </div>
                    </div>
                  </ModalCreate>

                {/* MODAL LAPORAN GAJI */}
                <ModalCreate
                    isOpen={isOpenModalCetakGaji}
                    onClick={_handleOpenModalCetakGaji}
                    createData={_handleCetakGaji}
                    size="md"
                    isAlign
                    width
                >
                    <h4 style={{ marginBottom: 20 }}>Cetak Laporan Gaji</h4>
                    <div className="main-form">
                        <Dropdown data={listBulan} value={bulanName} onChange={_handlleDropdownBulanCetakLaporanGaji} label="Pilih bulan"  />
                    </div>
                </ModalCreate>
            </div>
        )
    )
}

export default Laporan