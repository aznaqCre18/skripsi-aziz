const BASE_URL = 'http://localhost:5000';

export const SERVICES = {
  LOGIN: `${BASE_URL}/login`,
  REGISTER: `${BASE_URL}/register`,

  //USER
  GET_USER: `${BASE_URL}/users`,


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //JURUSAN
  GET_JURUSAN: `${BASE_URL}/api/jurusan/get-jurusan`,
  ADD_JURUSAN: `${BASE_URL}/api/jurusan/add-jurusan`,
  EDIT_JURUSAN: `${BASE_URL}/api/jurusan/edit-jurusan`,
  DELETE_JURUSAN: `${BASE_URL}/api/jurusan/delete-jurusan`,

  //GURU
  GET_GURU: `${BASE_URL}/api/guru/get-all-guru`,
  ADD_GURU: `${BASE_URL}/api/guru/add-guru`,
  EDIT_GURU: `${BASE_URL}/api/guru/edit-guru`,
  DELETE_GURU: `${BASE_URL}/api/guru/delete-guru`,

  //MAPEL
  GET_MAPEL: `${BASE_URL}/api/mapel/get-mapel`,
  GET_MAPEL_ID: `${BASE_URL}/api/mapel/get-mapel`,
  ADD_MAPEL: `${BASE_URL}/api/mapel/add-mapel`,
  EDIT_MAPEL: `${BASE_URL}/api/mapel/edit-mapel`,
  DELETE_MAPEL: `${BASE_URL}/api/mapel/delete-mapel`,

  //KELAS
  GET_KELAS: `${BASE_URL}/api/kelas/get-kelas`,
  GET_KELAS_ID: `${BASE_URL}/api/kelas/get-kelas`,
  ADD_KELAS: `${BASE_URL}/api/kelas/add-kelas`,
  EDIT_KELAS: `${BASE_URL}/api/kelas/edit-kelas`,
  DELETE_KELAS: `${BASE_URL}/api/kelas/delete-kelas`,

  //TAHUN AJARAN
  GET_TAHUN_AJARAN: `${BASE_URL}/api/tahun-ajaran/get-all`,
  ADD_TAHUN_AJARAN: `${BASE_URL}/api/tahun-ajaran/add-tahun`,
  DELETE_TAHUN_AJARAN: `${BASE_URL}/api/tahun-ajaran/delete-tahun`,

  //SISWA
  GET_SISWA: `${BASE_URL}/api/siswa/get-siswa`,
  GET_SISWA_BY_ID_KELAS: `${BASE_URL}/api/siswa/get-siswa/kelas`,
  ADD_SISWA: `${BASE_URL}/api/siswa/add-siswa`,
  EDIT_SISWA: `${BASE_URL}/api/siswa/edit-siswa`,
  DELETE_SISWA: `${BASE_URL}/api/siswa/delete-siswa`,

  //WAKTU MENGAJAR
  GET_WAKTU_MENGAJAR: `${BASE_URL}/api/waktu-mengajar/get-waktu-mengajar`,
  ADD_WAKTU_MENGAJAR: `${BASE_URL}/api/waktu-mengajar/add-waktu-mengajar`,
  EDIT_WAKTU_MENGAJAR: `${BASE_URL}/api/waktu-mengajar/edit-waktu-mengajar`,
  DELETE_WAKTU_MENGAJAR: `${BASE_URL}/api/waktu-mengajar/delete-waktu-mengajar`,

  //JADWAL PELAJARAN
  GET_ALL_JADWAL_PELAJARAN: `${BASE_URL}/api/jadwal-mapel/get-jadwal-mapel`,
  GET_JADWAL_PELAJARAN_BY_ID: `${BASE_URL}/api/jadwal-mapel/get-jadwal-mapel`,
  GET_JADWAL_PELAJARAN_BY_ID_KELAS: `${BASE_URL}/api/jadwal-mapel/get-jadwal-mapel/kelas`,
  GET_JADWAL_PELAJARAN_BY_ID_GURU: `${BASE_URL}/api/jadwal-mapel/get-jadwal-mapel/guru`,
  ADD_JADWAL_PELAJARAN: `${BASE_URL}/api/jadwal-mapel/add-jadwal-mapel`,
  EDIT_JADWAL_PELAJARAN: `${BASE_URL}/api/jadwal-mapel/edit-jadwal-mapel`,
  DELETE_JADWAL_PELAJARAN: `${BASE_URL}/api/jadwal-mapel/delete-jadwal-mapel`,

  //IDENTITAS SEKOLAH
  GET_IDENTITAS_SEKOLAH: `${BASE_URL}/api/general/identitas-sekolah`,
  CREATE_IDENTITAS_SEKOLAH: `${BASE_URL}/api/general/add-identitas-sekolah`,
  UPDATE_IDENTITAS_SEKOLAH: `${BASE_URL}/api/general/edit-identitas-sekolah`,
  GET_DATA_DASHBOARD: `${BASE_URL}/api/general/data-dashboard`,

  //PERTEMUAN
  GET_PERTEMUAN_BY_ID_JADWAL: `${BASE_URL}/api/pertemuan/get-pertemuan`,
  ADD_PERTEMUAN: `${BASE_URL}/api/pertemuan/add-pertemuan`,
  GET_ALL_PERTEMUAN: `${BASE_URL}/api/pertemuan/get-pertemuan`,
  GET_ALL_PERTEMUAN_BY_ID_MAPEL: `${BASE_URL}/api/pertemuan/get-pertemuan/mapel`,

  //ABSENSI
  GET_ABSENSI_SISWA_BY_PERTEMUAN: `${BASE_URL}/api/absen/get-absen/pertemuan`,
  ADD_ABSENSI_SISWA: `${BASE_URL}/api/absen/add-absen`,
  EDIT_ABSENSI_SISWA: `${BASE_URL}/api/absen/edit-absen`,
  GET_ALL_ABSENSI_SISWA: `${BASE_URL}/api/absen/get-absen`,
  GET_ALL_ABSEN_FOR_SISWA: `${BASE_URL}/api/absen/get-absen/siswa`,

  //NILAI
  GET_DATA_NILAI_ADMIN: `${BASE_URL}/api/nilai/get-nilai`,
  GET_DATA_NILAI_BY_ID_KELAS: `${BASE_URL}/api/nilai/get-nilai/kelas`,
  GET_DATA_NILAI_BY_ID_SISWA: `${BASE_URL}/api/nilai/get-nilai/siswa`,
  ADD_DATA_NILAI: `${BASE_URL}/api/nilai/add-nilai`,
  EDIT_DATA_NILAI: `${BASE_URL}/api/nilai/edit-nilai`,


  // =======================================================================
  // SKRIPSI

  // DATA USERS
  GET_DATA_USERS: `${BASE_URL}/users`,
  CREATE_DATA_USERS: `${BASE_URL}/register`,

  //DATA JABATAN
  GET_DATA_JABATAN: `${BASE_URL}/jabatan`,

  // DATA GURU
  GET_DATA_GURU: `${BASE_URL}/guru`,
  
  // DATA MAPEL
  GET_DATA_MAPEL: `${BASE_URL}/mapel`,

  // DATA HONOR
  GET_DATA_HONOR: `${BASE_URL}/honor`,

  // DATA ABSENSI
  GET_DATA_ABSENSI: `${BASE_URL}/absensi`,
  SEARCH_ABSENSI: `${BASE_URL}/absensi-search`,
  GET_DATA_ABSENSI_BY_DATE_RANGE: `${BASE_URL}/absensi-filter`,

  //DATA GAJI
  GET_DATA_GAJI: `${BASE_URL}/gaji`,
  GET_DATA_GAJI_BY_ID_GURU: `${BASE_URL}/gaji-guru`,

  // LAPORAN
  GET_DATA_ABSEN_LAPORAN: `${BASE_URL}/absensi-report`,
  GET_DATA_GAJI_LAPORAN: `${BASE_URL}/gaji-bulan`,
};