import AdminDashboard from './pages/auth/Dashboard/AdminDashboard';
import DataGuru from './pages/auth/DataGuru';
import DataSiswa from './pages/auth/DataSiswa';
import DataMapel from './pages/auth/JadwalMengajar';
import IdentitasSekolah from './pages/auth/IdentitasSekolah';
import Jurusan from './pages/auth/Jurusan';
import Kelas from './pages/auth/Kelas';
import MataPelajaran from './pages/auth/MataPelajaran';
import TahunAjaran from './pages/auth/TahunAjaran';
import JadwalMengajar from './pages/auth/JadwalMengajar';
import WaktuMengajar from './pages/auth/WaktuMengajar';
import Dashboard from './pages/auth/Dashboard';
import JadwalPresensi from './pages/auth/JadwalPresensi';
import PresensiSiswa from './pages/auth/PresensiSiswa';
import JadwalPresensiSiswa from './pages/auth/JadwalPresensiSiswa';
import NilaiSiswaAdmin from './pages/auth/NilaiSiswaAdmin';
import FormPenilaian from './pages/auth/PageFormPenilaian';
import NilaiSiswa from './pages/auth/NilaiSiswa';
import AbsenSiswaAdmin from './pages/auth/AbsenSiswaAdmin';
import KelolaUser from './pages/auth/Skripsi/KelolaUser';
import KelolaJabatan from './pages/auth/Skripsi/KelolaJabatan';
import KelolaGuru from './pages/auth/Skripsi/KelolaGuru';
import KelolaMapel from './pages/auth/Skripsi/KelolaMapel';
import KelolaHonor from './pages/auth/Skripsi/KelolaHonor';
import KelolaAbsensi from './pages/auth/Skripsi/KelolaAbsensi';
import KelolaGaji from './pages/auth/Skripsi/KelolaGaji';
import Laporan from './pages/auth/Skripsi/Laporan';
import DetailGajiGuru from './pages/auth/Skripsi/KelolaGaji/component/DetailGaji';

const routes = [
    {
        path: '/dashboard',
        exact: true,
        name: 'Dashboard',
        component: Dashboard,
    },
    {
        path: '/guru',
        exact: true,
        name: 'Data Guru',
        component: DataGuru,
    },
    {
        path: '/siswa',
        exact: true,
        name: 'Data Siswa',
        component: DataSiswa,
    },
    {
        path: '/nilai',
        exact: true,
        name: 'Data Nilai Siswa',
        component: NilaiSiswaAdmin,
    },
    {
        path: '/jadwal',
        exact: true,
        name: 'Data Jadwal Pelajaran',
        component: DataMapel,
    },
    {
        path: '/identitas-sekolah',
        exact: true,
        name: 'Identitas Sekolah',
        component: IdentitasSekolah,
    },
    {
        path: '/mata-pelajaran',
        exact: true,
        name: 'Mata Pelajaran',
        component: MataPelajaran,
    },
    {
        path: '/jurusan',
        exact: true,
        name: 'Jurusan',
        component: Jurusan,
    },
    {
        path: '/kelas',
        exact: true,
        name: 'Kelas',
        component: Kelas,
    },
    {
        path: '/tahun-ajaran',
        exact: true,
        name: 'Tahun Ajaran',
        component: TahunAjaran,
    },
    {
        path: '/mata-pelajaran',
        exact: true,
        name: 'Mata Pelajaran',
        component: MataPelajaran,
    },
    {
        path: '/waktu-mengajar',
        exact: true,
        name: 'Waktu Mengajar',
        component: WaktuMengajar,
    },
    {
        path: '/jadwal-mengajar',
        exact: true,
        name: 'Jadwal Pelajaran',
        component: JadwalMengajar,
    },
    {
        path: '/jadwal-penilaian',
        exact: true,
        name: 'Jadwal Penilaian',
        component: JadwalPresensi,
    },
    {
        path: '/jadwal-penilaian/presensi-siswa',
        exact: true,
        name: 'Presensi Siswa',
        component: PresensiSiswa,
    },
    {
        path: '/presensi-siswa',
        exact: true,
        name: 'Presensi User Siswa',
        component: JadwalPresensiSiswa,
    },
    {
        path: '/jadwal-penilaian/penilaian',
        exact: true,
        name: 'Penilaian Mapel',
        component: FormPenilaian,
    },
    {
        path: '/nilai-siswa',
        exact: true,
        name: 'Lihat Nilai Siswa',
        component: NilaiSiswa,
    },
    {
        path: '/absen-siswa',
        exact: true,
        name: 'Absensi Siswa',
        component: AbsenSiswaAdmin,
    },

    //SKRIPSI
    {
        path: '/kelola-user',
        exact: true,
        name: 'Kelola User',
        component: KelolaUser,
    },
    {
        path: '/master-data/kelola-jabatan',
        exact: true,
        name: 'Kelola Jabatan',
        component: KelolaJabatan,
    },
    {
        path: '/master-data/kelola-guru',
        exact: true,
        name: 'Kelola Guru',
        component: KelolaGuru,
    },
    {
        path: '/master-data/kelola-mapel',
        exact: true,
        name: 'Kelola Mapel',
        component: KelolaMapel,
    },
    {
        path: '/master-data/kelola-honor',
        exact: true,
        name: 'Kelola Mapel',
        component: KelolaHonor,
    },
    {
        path: '/kelola-absensi',
        exact: true,
        name: 'Kelola Absensi',
        component: KelolaAbsensi,
    },
    {
        path: '/kelola-gaji',
        exact: true,
        name: 'Kelola Gaji',
        component: KelolaGaji,
    },
    {
        path: '/kelola-gaji/detail/:id',
        exact: true,
        name: 'Detail Gaji',
        component: DetailGajiGuru,
    },
    {
        path: '/laporan',
        exact: true,
        name: 'Laporan',
        component: Laporan,
    },
]

export default routes;