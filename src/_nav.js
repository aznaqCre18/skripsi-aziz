import { AbsenSiswaIcon, DashboardIcon, DownIcon, GuruIcon, JadwalIcon, JadwalPresensiIcon, LaporanIcon, MasterDataIcon, NilaiIcon, SchoolIcon, SiswaIcon } from "./configs/icons";
import AuthService from "./utils/authService";

const Auth = new AuthService();

const menuAdmin = [
    { name: 'Dashboard', value: 'dashboard', icon: DashboardIcon, path: '/dashboard', permission: Auth.getUserType() },
    { 
        name: 'Master Data', 
        value: 'master-data', 
        icon: MasterDataIcon, 
        path: '/master-data', 
        add: DownIcon,
        subMenu: [
            { name: 'Mata Pelajaran', value: 'mapel', path: '/mata-pelajaran' },        
            { name: 'Jurusan', value: 'jurusan', path: '/jurusan' },        
            { name: 'Kelas', value: 'kelas', path: '/kelas' },        
            { name: 'Tahun Ajaran', value: 'tahun-ajaran', path: '/tahun-ajaran' },        
        ],
        permission: "admin",
    },
    { name: 'Data Guru', value: 'guru', icon: GuruIcon, path: '/guru', permission: "admin", },
    { name: 'Data Siswa', value: 'siswa', icon: SiswaIcon, path: '/siswa', permission: "admin", },
    { name: 'Data Nilai Siswa', value: 'nilai', icon: NilaiIcon, path: '/nilai', permission: "admin", },
    { name: 'Absensi Siswa', value: 'absen-siswa', icon: JadwalPresensiIcon, path: '/absen-siswa', permission: "admin" },
    { 
        name: 'Jadwal Pelajaran', 
        value: 'jadwal-pelajaran', 
        icon: JadwalIcon, 
        path: '/laporan', 
        add: DownIcon,
        subMenu: [
            { name: 'Waktu Mengajar', value: 'waktu-mengajar', path: '/waktu-mengajar' },        
            { name: 'Jadwal Mengajar', value: 'jadwal-mengajar', path: '/jadwal-mengajar' },    
        ],
        permission: "admin",
    },
    // { name: 'Identitas Sekolah', value: 'identitas-sekolah', icon: SchoolIcon, path: '/identitas-sekolah', permission: "admin", },
    { 
        name: 'Laporan', 
        value: 'laporan', 
        icon: LaporanIcon, 
        path: '/laporan', 
        add: DownIcon,
        subMenu: [
            { name: 'Lap. Data Guru', value: 'lap-data-guru', path: '#' },        
            { name: 'Lap. Data Siswa', value: 'lap-data-siswa', path: '#' },
            { name: 'Leadger Nilai', value: 'leadger-nilai', path: '#' },      
        ],
        permission: "admin",
    },
    { name: 'Jadwal & Penilaian', value: 'jadwal-penilaian', icon: JadwalPresensiIcon, path: '/jadwal-penilaian', permission: "guru" },
    { name: 'Presensi Siswa', value: 'presensi-siswa', icon: JadwalPresensiIcon, path: '/presensi-siswa', permission: "siswa", },
    { name: 'Nilai Siswa', value: 'nilai-siswa', icon: NilaiIcon, path: '/nilai-siswa', permission: "siswa", },

    // SKRIPSI
    { name: 'Dashboard', value: 'dashboard', icon: DashboardIcon, path: '/dashboard', permission: "", },
    { name: 'Kelola User', value: 'kelola-user', icon: NilaiIcon, path: '/kelola-user', permission: "", },
    { 
        name: 'Master Data', 
        value: 'master-data', 
        icon: MasterDataIcon, 
        path: '/master-data', 
        add: DownIcon,
        subMenu: [
            { name: 'Kelola Jabatan', value: 'kelola-jabatan', path: '/kelola-jabatan' },        
            { name: 'Kelola Guru', value: 'kelola-guru', path: '/kelola-guru' },
            { name: 'Kelola Honor', value: 'kelola-honor', path: '/kelola-honor' },      
            { name: 'Kelola Jadwal Mapel', value: 'kelola-mapel', path: '/kelola-mapel' },      
        ],
        permission: "",
    },
    { name: 'Kelola Absensi', value: 'kelola-absensi', icon: SiswaIcon, path: '/kelola-absensi', permission: "", },
    { name: 'Kelola Gaji', value: 'kelola-gaji', icon: GuruIcon, path: '/kelola-gaji', permission: "", },
    { name: 'Laporan', value: 'laporan', icon: LaporanIcon, path: '/laporan', permission: "", },
]

export default menuAdmin;