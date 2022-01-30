# Explanation

## Theme
1. Menggunakan basic css Tailwind, alasannya lebih fleksibel untuk kustomisasi
2. Menggunakan warna biru muda sebagai warna dasar + header terkesan lebih kalem tidak jenuh dimata
3. Menggunakan fontsize poppins

## Page
1. Page terdiri dari 5 halaman, halaman home, list, edit, add, search. dimana halaman home indentik dengan halaman list.
2. Page menggunakan 2 layout yaitu dekstop dan mobile (responsive design), menggunakan bantuan window resize untuk deteksi ukuran layar, dari ukuran layar itu ditentukan layout mana yang dipakai
3. Layout desktop menggunakan navigasi samping menurut saya lebih mudah untuk user dekstop
4. Layout mobile dimana navigasi diletakkan pada bottom dari layar
5. Halaman Home / List terdiri dari input untuk pencarian komoditas, tabel menampilkan harga + aksi untuk edit / delete.
- Pencarian komoditas ini langsung call api server "steinhq", sedangkan input pada tabel hanya filter array local
- Terdapat sorting berdasarkan komoditas, ukuran, dan harga. Hanya sebatas sorting array local karena pada data "steinhq" saya tidak menemukan fungsi sorting
- Terdapat pagination langsung call api server "steinhq"
- Update menu halaman List-Update, bisa diubah data pada halaman tersebut
- Delete menu ditekan akan memunculkan dialog untuk menghapus data
6. Halaman Pencarian sebenarnya untuk memfasilitasi pencarian yang lebih advanced dari Halaman home, kelemahan pencarian data harus sesuai / case sensitive
7. Halaman Tambah data mirip seperti Edit data, hanya saja data yang ditambahkan merupakan data baru