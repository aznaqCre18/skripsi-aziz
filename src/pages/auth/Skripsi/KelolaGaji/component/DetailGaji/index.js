import React from 'react';
import AuthService from '../../../../../../utils/authService';
import Header from '../../../../../../components/Header';
import Dropdown from '../../../../../../components/Dropdown';
import Input from '../../../../../../components/Input';
import Button from '../../../../../../components/Button';
import Table from '../../../../../../components/Table';
import { DELETE_DATA_BTN, EDIT_DATA_BTN, INFO_DATA_BTN, PRINT_DATA_BTN } from '../../../../../../constants/buttonType';
import { DeleteIcon, EditIcon, InfoIcon, PrintIcon } from '../../../../../../configs/icons';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addDataGajiGuru, deleteDataGajiGuru, getDataGaji, getDataGajiByIdGuru } from '../../action';
import ModalDelete from '../../../../../../components/Modal/ModalDelete/component';
import ModalPrint from '../../../../../../components/Modal/ModalPrint';
import { KopImageSlip } from '../../../../../../configs/images';
import jsPDF from 'jspdf';
import { useParams } from 'react-router-dom';
import { getDetailGuru } from '../../../KelolaGuru/action';
import { listBulan } from '../../../../../../utils/constant';
import { getAllDataAbsenByDateRangeAndIdGuru } from '../../../KelolaAbsensi/action';
import IntToRupiah from '../../../../../../utils/IntToRupiah';

const Auth = new AuthService();
const currentDate = new Date();

const firstDateOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
const lastDateOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

const fieldTabel = [
    {
      fieldName: 'NO.',
      fieldApi: ''
    },
    {
      fieldName: 'BULAN',
      fieldApi: 'bulan_tahun'
    },
    {
      fieldName: 'Tahun',
      fieldApi: 'tahun'
    },
    {
      fieldName: 'Take Home Pay',
      fieldApi: 'thp',
      type: 'rupiah',
    },
    {
      fieldName: 'action',
      fieldApi: ''
    },
];

const customIconAction = [
    {value: PRINT_DATA_BTN, icon: PrintIcon},
    {value: DELETE_DATA_BTN, icon: DeleteIcon},
]

const DetailGajiGuru = () => {
    const [isModalCreate, setIsModalCreate] = useState(false);
    const [isModalPrint, setIsModalPrint] = useState(false);
    const [isModalDelete, setIsModalDelete] = useState(false);
    const [valueDropdownBulan, setValueDropdownBulan] = useState("");
    const [bulanCode, setBulanCode] = useState(null);
    const [potonganTambahan, setPotonganTambahan] = useState(0);
    const [alasanPemotongan, setAlasanPemotongan] = useState("");
    const [detailGajiGuru, setDetailGajiGuru] = useState(null);
    // const [tglDibuatLaporan, setTglDibuatLaporan] = useState("");

    const dispatch = useDispatch();
    const { id } = useParams();

    const { dataGaji } = useSelector(state => state.GajiRed);
    const { detailGuru } = useSelector(state => state.GuruSkripsiRed);
    const { dataAbsensi } = useSelector(state => state.AbsensiRed);

    const _handleClickBtnAction = async (type, dataApi) => {
        setDetailGajiGuru(dataApi);
        
        if (type === DELETE_DATA_BTN) {
            _handleOpenModalDelete();
        } else if (type === PRINT_DATA_BTN) {
            _handleOpenModalPrint();
        }
    }

    const formatDate = date => {
        const year = date.getFullYear();
        const month = bulanCode;
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        dispatch(getDetailGuru(id))
        dispatch(getDataGajiByIdGuru(id));
    }, []);

    useEffect(() => {
        const payload = {
            idGuru: id,
            startDate: formatDate(firstDateOfMonth),
            endDate: formatDate(lastDateOfMonth),
        }
        
        dispatch(getAllDataAbsenByDateRangeAndIdGuru(payload));
    }, [bulanCode]);

    // FUNCTION DELETE
    const _handleOpenModalDelete = () => {
        setIsModalDelete(current => !current);
    }

    const _handleDeleteGaji = () => {
        dispatch(deleteDataGajiGuru(detailGajiGuru.id));

        setTimeout(() => {
            dispatch(getDetailGuru(id))
            dispatch(getDataGajiByIdGuru(id));
            _handleOpenModalDelete();
        }, 300)
    }

    // FUNCTION PRINT
    const _handleOpenModalPrint = (a) => {
        setIsModalPrint(current => !current);
    }

    const _handlePrintSlipGaji = () => {
        generatePdf();
    }

    const generatePdf = () => {
        const doc = new jsPDF("p", "px", [552, 670]);
        doc.html(document.querySelector('#slip-gaji'), {
            callback: function(pdf) {
                pdf.save('slip-gaji.pdf')
            }
        })
    }

    // HITUNG GAJI
    const _renderPtkpKatergori = (status, tanggungan) => {
        let ptkpCategory = "";
        let ptkpNominal = 0;

        const setPtkpCategory = (jmlTanggungan) => {
            if (status === "1") {
                if (jmlTanggungan === 0) {
                    ptkpCategory = "TK/0";
                    ptkpNominal = 54000000;
                } else if (jmlTanggungan === 1) {
                    ptkpCategory = "TK/1";
                    ptkpNominal = 58500000;
                } else if (jmlTanggungan === 2) {
                    ptkpCategory = "TK/2";
                    ptkpNominal = 63000000;
                } else if (jmlTanggungan >= 3) {
                    ptkpCategory = "TK/3";
                    ptkpNominal = 67500000;
                }
            } else if (status === "2") {
                if (jmlTanggungan === 0) {
                    ptkpCategory = "K/0";
                    ptkpNominal = 58500000;
                } else if (jmlTanggungan === 1) {
                    ptkpCategory = "K/1";
                    ptkpNominal = 63000000;
                } else if (jmlTanggungan === 2) {
                    ptkpCategory = "K/2";
                    ptkpNominal = 67500000;
                } else if (jmlTanggungan >= 3) {
                    ptkpCategory = "K/3";
                    ptkpNominal = 72000000;
                }
            }

            return { cat: ptkpCategory, ptkpNom: ptkpNominal }
        }
        
        const ptkpNominalCat = setPtkpCategory(tanggungan);
        return ptkpNominalCat;
    }

    const _renderStatusGuru = (status) => {
        if (status === "1") {
            return "Tidak Kawin";
        } else if (status === "2") {
            return "Kawin";
        }
    }

    const handleChangeBulanGajian = (data) => {
        setValueDropdownBulan(data.name);
        setBulanCode(data.value);
    }

    const _hitungPph21 = (pkp) => {
        let pph21 = 0;

        if (pkp <= 60000000) {
            pph21 = pkp * 0.05;
        } else if (pkp > 60000000 && pkp <= 250000000) {
            pph21 = (60000000 * 0.05) + ((pkp - 60000000) * 0.15);
        } else if (pkp > 250000000 && pkp <= 500000000) {
            pph21 = (60000000 * 0.05) + (250000000 * 0.15) + ((pkp - 250000000) * 0.25);
        } else if (pkp > 500000000 && pkp <= 5000000000) {
            pph21 = (60000000 * 0.05) + (250000000 * 0.15) + ((500000000) * 0.25) + ((pkp - 5000000000) * 0.30);
        } else if (pkp >= 5000000000) {
            pph21 = pkp * 0.35;
        }

        return pph21;
    }

    const _handleHitungGajiGuru = () => {
        let jumlahHonor = 0;
        dataAbsensi.lenght > 0 && dataAbsensi.map(item => {
            let honor = item.mapel.honor.honor;
            let jmlJam = item.mapel.jumlah_jam;
            
            jumlahHonor += honor * jmlJam;
        });
        
        const tunjangan = detailGuru.jabatan.tunjangan;
        const gajiPokok = detailGuru.gaji_pokok;
        const gajiKotorSebulan = gajiPokok + jumlahHonor + tunjangan;
        const gajiKotorSetahun = gajiKotorSebulan * 12;
        let biayaJabatan = gajiKotorSebulan * 0.05;
        let gajiBersihSebulan = 0, gajiBersihSetahun = 0, jenisPtkp = '-', ptkp = 0, pkp = 0, pph21Setahun = 0, pph21Sebulan = 0, thp = 0;

        if (biayaJabatan > 500000) {
            biayaJabatan = 500000;
        };

        if (gajiKotorSetahun >= 60000000) {
            gajiBersihSebulan = gajiKotorSebulan - biayaJabatan - potonganTambahan;
            gajiBersihSetahun = gajiBersihSebulan * 12;
            jenisPtkp = _renderPtkpKatergori(detailGuru.status, detailGuru.tanggungan).cat;
            ptkp = _renderPtkpKatergori(detailGuru.status, detailGuru.tanggungan).ptkpNom;
            pkp = gajiBersihSetahun - ptkp;
            pph21Setahun = _hitungPph21(pkp);
            pph21Sebulan = pph21Setahun / 12;
            thp = gajiKotorSebulan - pph21Sebulan - potonganTambahan;
        } else {
            gajiBersihSebulan = 0;
            gajiBersihSetahun = 0;
            jenisPtkp = 0;
            ptkp = 0;
            pkp = 0;
            pph21Setahun = 0;
            pph21Sebulan = 0;
            thp= gajiKotorSebulan;
        }


        const payload = {
            id_guru: detailGuru.id,
            bulan_tahun: valueDropdownBulan,
            tahun: new Date().getFullYear(),
            gaji_pokok: detailGuru.gaji_pokok,
            total_honor: jumlahHonor,
            potongan: potonganTambahan,
            alasan_potongan: alasanPemotongan,
            total_gaji_kotor: gajiKotorSetahun,
            total_gaji_nett: gajiBersihSetahun, 
            total_gaji_nett_perbulan: gajiBersihSebulan,
            ptkp_kategori: jenisPtkp,
            ptkp: ptkp,
            pkp: pkp,
            pph21: pph21Setahun,
            pph21_perbulan: pph21Sebulan,
            thp: thp,
        }

        dispatch(addDataGajiGuru(payload));

        setTimeout(() => {
            dispatch(getDataGajiByIdGuru(id));
        }, 300)
    }

    const _formatTanggalIndonesia = () => {
        const date = new Date();
        // Array nama hari dalam bahasa Indonesia
        var daysOfWeek = [
          "Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"
        ];
      
        // Array nama bulan dalam bahasa Indonesia
        var monthsOfYear = [
          "Januari", "Februari", "Maret", "April", "Mei", "Juni",
          "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ];
      
        // Membuat format output yang diinginkan
        var formattedDate = daysOfWeek[date.getDay()] + ' ' +
                           date.getDate() + ' ' +
                           monthsOfYear[date.getMonth()] + ' ' +
                           date.getFullYear();
      
        return formattedDate;
      }
    
    return (
        <div className="main-view-container">
            <div className="header-dashboard">
                <Header 
                    title="Kelola Gaji"
                    fullName={JSON.parse(Auth.getProfile()).name}
                />
            </div>
            <div className="informasi-guru" style={{ backgroundColor: 'white', padding: '28px 34px', borderRadius: 10, marginBottom: 24 }}>
                <h4 style={{ marginBottom: 32 }}>Informasi Guru</h4>
                <div style={{ display: 'flex', marginBottom: 32 }}>
                    <div className="row">
                        <div style={{ display: 'flex', marginBottom: 20 }}>
                            <p style={{ fontWeight: '600', width: 172 }}>NIP</p>
                            <p>{detailGuru.nip}</p>
                        </div>
                        <div style={{ display: 'flex', marginBottom: 20 }}>
                            <p style={{ fontWeight: '600', width: 172 }}>Nama</p>
                            <p>{detailGuru.nama}</p>
                        </div>
                        <div style={{ display: 'flex', marginBottom: 20 }}>
                            <p style={{ fontWeight: '600', width: 172 }}>Jabatan</p>
                            <p>{detailGuru.jabatan ? detailGuru.jabatan.nama_jabatan : '-'}</p>
                        </div>
                        <div style={{ display: 'flex', marginBottom: 20 }}>
                            <p style={{ fontWeight: '600', width: 172 }}>No Telp</p>
                            <p>{detailGuru.no_telp}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div style={{ display: 'flex', marginBottom: 20 }}>
                            <p style={{ fontWeight: '600', width: 172 }}>Status</p>
                            <p>{_renderStatusGuru(detailGuru.status)}</p>
                        </div>
                        <div style={{ display: 'flex', marginBottom: 20 }}>
                            <p style={{ fontWeight: '600', width: 172 }}>Tanggungan</p>
                            <p>{detailGuru.tanggungan} Orang</p>
                        </div>
                        <div style={{ display: 'flex', marginBottom: 20 }}>
                            <p style={{ fontWeight: '600', width: 172 }}>PTKP Kategori</p>
                            <p>{_renderPtkpKatergori(detailGuru.status, detailGuru.tanggungan).cat}</p>
                        </div>
                        <div style={{ display: 'flex', marginBottom: 20 }}>
                            <p style={{ fontWeight: '600', width: 172 }}>Gaji Pokok</p>
                            <p>{detailGuru.gaji_pokok}</p>
                        </div>
                    </div>
                </div>
                <div className="hitung-gaji">
                    <h4 style={{ marginBottom: 24 }}>Hitung Gaji</h4>
                    <div style={{ display: 'flex', width: '100%', gap: 20 }}>
                        <div style={{ width: 245 }}>
                            <Dropdown label="Gaji Bulan" data={listBulan} onChange={handleChangeBulanGajian} value={valueDropdownBulan} />
                        </div>
                        <div style={{ width: 300 }}>
                            <Input label="Potongan Tambahan (Isi jika ada)" placeholder="Masukan jumlah potongan" type="number" onChange={(e) => setPotonganTambahan(e.target.value)} />
                        </div>
                        <div style={{ width: '50%' }}>
                            <Input label="Alasan Pemotongan" placeholder="Masukan alasannya" disabled={potonganTambahan === 0} onChange={(e) => setAlasanPemotongan(e.target.value)} />
                        </div>
                    </div>
                    <Button disable={bulanCode ? false : true} label="Hitung Gaji Guru" width="100%" color="#34BE82" onClick={_handleHitungGajiGuru} /> 
                </div>
            </div>
            <div className="main-content-view">
                <div style={{ padding: '30px 28px' }}>
                    <h4>Riwayat Gaji Guru</h4>
                </div>
                <div className="table-section">
                    <Table tableField={fieldTabel} datasets={dataGaji} customIconAction={customIconAction} onClickAction={_handleClickBtnAction} />
                </div>
            </div>

            {/* MODAL PRINT */}
            {
                detailGajiGuru && (
                    <ModalPrint
                        isOpen={isModalPrint}
                        onClick={_handleOpenModalPrint}
                        printData={_handlePrintSlipGaji}
                        size="lg"
                        isAlign
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', width: 552, alignItems: 'center' }}>
                            <div id="slip-gaji" style={{ border: '1px solid #000' }}>
                                <img src={KopImageSlip} alt="kop-slip" width={550} />
                                <div style={{padding: '32px 32px'}}>
                                    <div className="title" style={{ marginBottom: 12 }}>
                                        <p style={{fontSize: 14, fontWeight: 'bold'}}>SLIP GAJI GURU</p>
                                        <p style={{fontSize: 12 }}>Depok, {_formatTanggalIndonesia()}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: 46 }}>
                                        <div className="left-side">
                                            <div style={{ display: 'flex' }}>
                                                <p style={{fontSize: 12, fontWeight: 'bold', width: 50}}>ID</p>
                                                <p style={{fontSize: 12 }}>: {detailGajiGuru.id_guru}</p>
                                            </div>
                                            <div style={{ display: 'flex', marginBottom: 12, }}>
                                                <p style={{fontSize: 12, fontWeight: 'bold', width: 50}}>NAMA</p>
                                                <p style={{fontSize: 12 }}>: {detailGajiGuru.guru.nama}</p>
                                            </div>
                                            <div className="rincian-penghasilan">
                                                <p style={{ fontSize: 14, fontWeight: 'bold', textDecoration: 'underline' }}>PENGHASILAN</p>
                                                <div className="detail" style={{ marginTop: 12 }}>
                                                    <div className="title" style={{ display: 'flex', marginBottom: 6 }}>
                                                        <p style={{fontSize: 12, fontWeight: 'bold', width: 132}}>Gaji Pokok</p>
                                                        <p style={{fontSize: 12 }}>: {IntToRupiah(detailGajiGuru.gaji_pokok)}</p>
                                                    </div>
                                                    <div className="title" style={{ display: 'flex', marginBottom: 6 }}>
                                                        <p style={{fontSize: 12, fontWeight: 'bold', width: 132}}>Total Honor</p>
                                                        <p style={{fontSize: 12 }}>: {IntToRupiah(detailGajiGuru.total_honor)}</p>
                                                    </div>
                                                    <div className="title" style={{ display: 'flex', marginBottom: 6 }}>
                                                        <p style={{fontSize: 12, fontWeight: 'bold', width: 132}}>Tunjangan</p>
                                                        <p style={{fontSize: 12 }}>: {IntToRupiah(detailGajiGuru.guru.jabatan.tunjangan)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="right-side">
                                            <div style={{ display: 'flex' }}>
                                                <p style={{fontSize: 12, fontWeight: 'bold', width: 70}}>JABATAN</p>
                                                <p style={{fontSize: 12 }}>: {detailGajiGuru.guru.jabatan.nama_jabatan}</p>
                                            </div>
                                            <div style={{ display: 'flex', marginBottom: 12 }}>
                                                <p style={{fontSize: 12, fontWeight: 'bold', width: 70}}>STATUS</p>
                                                <p style={{fontSize: 12 }}>: {_renderStatusGuru(detailGajiGuru.guru.status)}</p>
                                            </div>
                                            <div className="rincian-penghasilan">
                                                <p style={{ fontSize: 14, fontWeight: 'bold', textDecoration: 'underline' }}>POTONGAN</p>
                                                <div className="detail" style={{ marginTop: 12 }}>
                                                    <div className="title" style={{ display: 'flex', marginBottom: 6 }}>
                                                        <p style={{fontSize: 12, fontWeight: 'bold', width: 132}}>PPh 21</p>
                                                        <p style={{fontSize: 12 }}>: {IntToRupiah(detailGajiGuru.pph21_perbulan)}</p>
                                                    </div>
                                                    <div className="title" style={{ display: 'flex', marginBottom: 6 }}>
                                                        <p style={{fontSize: 12, fontWeight: 'bold', width: 132}}>Potongan Lain</p>
                                                        <p style={{fontSize: 12 }}>: {IntToRupiah(detailGajiGuru.potongan)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: 46, marginTop: 12 }}>
                                        <div className="title" style={{ display: 'flex', marginBottom: 6 }}>
                                            <p style={{fontSize: 12, fontWeight: 'bold', width: 132}}>Total (A)</p>
                                            <p style={{fontSize: 12 }}>: {IntToRupiah(+detailGajiGuru.total_gaji_kotor / 12)}</p>
                                        </div>
                                        <div className="title" style={{ display: 'flex', marginBottom: 6 }}>
                                            <p style={{fontSize: 12, fontWeight: 'bold', width: 132}}>Total (B)</p>
                                            <p style={{fontSize: 12 }}>: {IntToRupiah(+detailGajiGuru.pph21_perbulan + +detailGajiGuru.potongan)}</p>
                                        </div>
                                    </div>
                                    <div style={{ margin: '28px 0' }}>
                                        <div className="title" style={{ display: 'flex', marginBottom: 6 }}>
                                            <p style={{fontSize: 12, fontWeight: 'bold', width: 180}}>Take Home Pay (THP)</p>
                                            <p style={{fontSize: 12 }}>: <span style={{ textDecoration: 'underline' }}>{IntToRupiah(detailGajiGuru.thp)}</span></p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', textAlign: 'right', justifyContent: 'flex-end', flexDirection: 'column' }}>
                                        <p style={{fontSize: 12}}>Depok, {_formatTanggalIndonesia()}</p><br /><br /><br />
                                        <b style={{fontSize: 12 }}>Tri Hadi Sulaksono,  ST.MM</b>
                                        <p style={{fontSize: 12 }}>Kepala Sekolah</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalPrint>
                )
            }

            {/* MODAL DELETE */}
            <ModalDelete
                isOpen={isModalDelete}
                onClick={_handleOpenModalDelete}
                deleteData={_handleDeleteGaji}
                size="md"
                isAlign
            >
                <h4 style={{ marginBottom: 20 }}>Hapus Data Gaji</h4>
                <p>Anda yakin akan menghapus data gaji ini? Klik hapus jika iya</p>
            </ModalDelete>
        </div>
    )
}

export default DetailGajiGuru