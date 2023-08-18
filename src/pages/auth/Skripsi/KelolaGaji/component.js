import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import Loading from '../../../../components/Loading/component';
import AuthService from '../../../../utils/authService';
import Header from '../../../../components/Header';
import SearchField from '../../../../components/SearchField';
import { DownIcon, RightIcon } from '../../../../configs/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getDataGuru } from '../KelolaGuru/action';

const Auth = new AuthService();

const KelolaGaji = () => {
    const [loading, setLoading] = useState(false);

    const { dataGuru } = useSelector(state => state.GuruSkripsiRed);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDataGuru());

        setTimeout(() => {
            setLoading(false);
        }, 500)
    }, []);

    return (
        loading ? (
            <Loading />
        ) : (
            <div className="main-view-container">
                <div className="header-dashboard">
                    <Header 
                        title="Kelola Gaji"
                        fullName={JSON.parse(Auth.getProfile()).name}
                    />
                </div>
        
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 52, marginBottom: 32 }}>
                        <h5>Pilih Guru</h5>
                        <div 
                            style={{
                                backgroundColor: "#fff",
                                borderRadius: 8,
                                padding: 12,
                                width: 355
                            }}
                        >
                            <SearchField placeholder="Cari berdsarkan nama guru" />
                        </div>
                    </div>
                </div>
                <div className="list-guru" style={{ display: 'grid', gridTemplateColumns: 'auto auto auto', gap: 24, cursor: 'pointer' }}>
                    {
                        dataGuru.map((data, idx) => (
                            <Link to={`/kelola-gaji/detail/${data.id}`} style={{ textDecoration: 'none', color: '#000' }}>
                                <div className="card-guru" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 22px', backgroundColor: '#fff', borderRadius: 8 }}>
                                    <div>
                                        <p style={{ fontWeight: '600' }}>{data.nama}</p>
                                        <p>{data.nama_jabatan}</p>
                                    </div>
                                    <img src={DownIcon} alt="-ic-arrow" style={{ rotate: '-90deg' }} />
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        )
    )
}

export default KelolaGaji