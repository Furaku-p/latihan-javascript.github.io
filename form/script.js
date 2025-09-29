document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('studentForm');
    const backButton = document.getElementById('backButton');
    
    // Validasi form
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error messages
        clearErrorMessages();
        
        // Validasi field
        let isValid = true;
        
        // Validasi Nama Lengkap
        const namaLengkap = document.getElementById('naleng').value.trim();
        if (!namaLengkap) {
            showError('naleng-error', 'Nama lengkap harus diisi');
            isValid = false;
        }
        
        // Validasi NRP
        const nrp = document.getElementById('nrp').value.trim();
        if (!nrp) {
            showError('nrp-error', 'NRP harus diisi');
            isValid = false;
        } else if (!/^\d{10}$/.test(nrp)) {
            showError('nrp-error', 'NRP harus terdiri dari 10 digit angka');
            isValid = false;
        }
        
        // Validasi No. Telepon
        const noTelp = document.getElementById('notelp').value.trim();
        if (!noTelp) {
            showError('notelp-error', 'No. Telepon harus diisi');
            isValid = false;
        } else if (!/^\d{10,13}$/.test(noTelp)) {
            showError('notelp-error', 'No. Telepon harus terdiri dari 10-13 digit angka');
            isValid = false;
        }
        
        // Validasi Jurusan (Radio Buttons)
        const jurusanSelected = document.querySelector('input[name="jurusan"]:checked');
        if (!jurusanSelected) {
            showError('jurusan-error', 'Pilih salah satu jurusan');
            isValid = false;
        }
        
        // Jika valid, tampilkan konfirmasi dan submit form
        if (isValid) {
            // Tampilkan konfirmasi
            if (confirm('Apakah Anda yakin data yang dimasukkan sudah benar?')) {
                // Simulasi submit form
                alert('Data berhasil disimpan!');
                // form.submit(); // Uncomment jika ingin submit ke server
            }
        }
    });
    
    // Tombol back
    backButton.addEventListener('click', function() {
        if (confirm('Apakah Anda yakin ingin kembali? Data yang belum disimpan akan hilang.')) {
            window.history.back();
        }
    });
    
    // Fungsi untuk menampilkan pesan error
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
    }
    
    // Fungsi untuk menghapus semua pesan error
    function clearErrorMessages() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
        });
    }
    
    // Validasi real-time untuk NRP
    document.getElementById('nrp').addEventListener('input', function() {
        const nrpValue = this.value.trim();
        const errorElement = document.getElementById('nrp-error');
        
        if (nrpValue && !/^\d+$/.test(nrpValue)) {
            errorElement.textContent = 'NRP hanya boleh berisi angka';
        } else {
            errorElement.textContent = '';
        }
    });
    
    // Validasi real-time untuk No. Telepon
    document.getElementById('notelp').addEventListener('input', function() {
        const telpValue = this.value.trim();
        const errorElement = document.getElementById('notelp-error');
        
        if (telpValue && !/^\d+$/.test(telpValue)) {
            errorElement.textContent = 'No. Telepon hanya boleh berisi angka';
        } else {
            errorElement.textContent = '';
        }
    });
    
    // Hapus error jurusan ketika salah satu radio button dipilih
    const radioButtons = document.querySelectorAll('input[name="jurusan"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            document.getElementById('jurusan-error').textContent = '';
        });
    });
});