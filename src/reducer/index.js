import { combineReducers } from 'redux';

import TodoListRed from '../pages/PagePersistTodo/reducer';
import JurusanRed from '../pages/auth/Jurusan/reducer';
import GuruRed from './../pages/auth/DataGuru/reducer';
import MapelRed from './../pages/auth/MataPelajaran/reducer';
import KelasRed from './../pages/auth/Kelas/reducer';
import TahunAjaranRed from './../pages/auth/TahunAjaran/reducer';
import SiswaRed from './../pages/auth/DataSiswa/reducer';
import WaktuMengajarRed from './../pages/auth/WaktuMengajar/reducer';
import JadwalMapelRed from './../pages/auth/JadwalMengajar/reducer';
import IdentitasSekolahRed from './../pages/auth/IdentitasSekolah/reducer';
import JadwalPresensiRed from './../pages/auth/JadwalPresensi/reducer';
import PertemuanJadwalRed from './../pages/auth/PresensiSiswa/reducer';
import GeneralRed from './../pages/auth/Dashboard/AdminDashboard/reducer';
import FormPenilaianRed from './../pages/auth/PageFormPenilaian/reducer';

//SKRIPSI
import UsersRed from './../pages/auth/Skripsi/KelolaUser/reducer';
import JabatanRed from './../pages/auth/Skripsi/KelolaJabatan/reducer';
import GuruSkripsiRed from './../pages/auth/Skripsi/KelolaGuru/reducer';
import MapelSkripsiRed from './../pages/auth/Skripsi/KelolaMapel/reducer';
import HonorRed from './../pages/auth/Skripsi/KelolaHonor/reducer';
import AbsensiRed from './../pages/auth/Skripsi/KelolaAbsensi/reducer';
import GajiRed from './../pages/auth/Skripsi/KelolaGaji/reducer';
import LaporanRed from './../pages/auth/Skripsi/Laporan/reducer';

const rootReducer = combineReducers({
  TodoListRed,
  JurusanRed,
  GuruRed,
  MapelRed,
  KelasRed,
  TahunAjaranRed,
  SiswaRed,
  WaktuMengajarRed,
  JadwalMapelRed,
  IdentitasSekolahRed,
  JadwalPresensiRed,
  PertemuanJadwalRed,
  GeneralRed,
  FormPenilaianRed,

  // SKRIPSI

  UsersRed,
  JabatanRed,
  GuruSkripsiRed,
  MapelSkripsiRed,
  HonorRed,
  AbsensiRed,
  GajiRed,
  LaporanRed,
});

export default rootReducer;