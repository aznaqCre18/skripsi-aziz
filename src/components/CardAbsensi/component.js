import React from 'react';
import ModalCreate from '../Modal/ModalCreate/component';

const CardAbsensi = ({ dataJadwal, openSetKehadiran }) => {
    return (
        <div className="card-wrapper">
            <div className="info-jadwal">
                <div className="top-section">
                    <div className="info">
                        <p className="mapel">{dataJadwal.nama_mapel}</p>
                        <p className="nama-guru">{dataJadwal.guru.nama}</p>
                    </div>
                    <div className="btn-set-absen">
                        <button onClick={openSetKehadiran}>Ubah Kehadiran</button>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="bottom-section">
                    <p className="time-range">{dataJadwal.jam_mapel}</p>
                    <div className="status-absen">
                        <p>Status Kehadiran</p>
                        <div className="label">Tidak Hadir - Sakit</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardAbsensi