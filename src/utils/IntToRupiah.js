export default function IntToRupiah(angka) {
    // Ubah angka menjadi string
    const angkaStr = angka.toString();
  
    // Pisahkan ribuan dengan menggunakan regular expression
    const formattedAngka = angkaStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
    // Tambahkan "Rp" di depan angka
    return `Rp ${formattedAngka}`;
}