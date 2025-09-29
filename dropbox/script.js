// Data untuk dropdown
const data = {
    smartphone: {
        xiaomi: ['Redmi Note 13', 'Poco X6 Pro', 'Xiaomi 14', 'Redmi 12'],
        samsung: ['Galaxy S24', 'Galaxy A55', 'Galaxy Z Flip5', 'Galaxy A15'],
        oppo: ['Oppo Reno 11', 'Oppo Find X7', 'Oppo A98', 'Oppo Reno 10'],
        vivo: ['Vivo V30', 'Vivo X100', 'Vivo Y27', 'Vivo T2'],
        realme: ['Realme 12 Pro', 'Realme GT5', 'Realme C55', 'Realme 11']
    },
    tablet: {
        samsung: ['Galaxy Tab S9', 'Galaxy Tab A9', 'Galaxy Tab S8'],
        apple: ['iPad Pro', 'iPad Air', 'iPad Mini', 'iPad 10'],
        xiaomi: ['Xiaomi Pad 6', 'Redmi Pad SE', 'Xiaomi Pad 5'],
        lenovo: ['Lenovo Tab P12', 'Lenovo Tab M10', 'Lenovo Yoga Tab 13']
    },
    laptop: {
        asus: ['ASUS Vivobook 15', 'ASUS TUF Gaming', 'ASUS Zenbook 14'],
        lenovo: ['Lenovo IdeaPad 3', 'Lenovo ThinkPad X1', 'Lenovo Yoga 9i'],
        dell: ['Dell Inspiron 15', 'Dell XPS 13', 'Dell Latitude 5430'],
        hp: ['HP Pavilion 15', 'HP Envy x360', 'HP Victus 16'],
        apple: ['MacBook Air M2', 'MacBook Pro 14"', 'MacBook Pro 16"']
    },
    smartwatch: {
        apple: ['Apple Watch Series 9', 'Apple Watch Ultra 2', 'Apple Watch SE'],
        samsung: ['Galaxy Watch6', 'Galaxy Watch5', 'Galaxy Watch4'],
        xiaomi: ['Xiaomi Watch 2 Pro', 'Xiaomi Watch S3', 'Redmi Watch 4'],
        garmin: ['Garmin Venu 3', 'Garmin Forerunner 265', 'Garmin Instinct 2']
    }
};

// Elemen dropdown
const jenisDropdown = document.getElementById('jenis');
const merkDropdown = document.getElementById('merk');
const modelDropdown = document.getElementById('model');
const resultCard = document.getElementById('resultCard');

// Event listener untuk dropdown jenis
jenisDropdown.addEventListener('change', function() {
    const selectedJenis = this.value;
    
    // Reset dropdown merk dan model
    merkDropdown.innerHTML = '<option value="">Pilih Merk</option>';
    merkDropdown.disabled = !selectedJenis;
    
    modelDropdown.innerHTML = '<option value="">Pilih Model</option>';
    modelDropdown.disabled = true;
    
    // Update hasil
    updateResults();
    
    // Jika jenis dipilih, isi dropdown merk
    if (selectedJenis) {
        const merks = Object.keys(data[selectedJenis]);
        merks.forEach(merk => {
            const option = document.createElement('option');
            option.value = merk;
            option.textContent = merk.charAt(0).toUpperCase() + merk.slice(1);
            merkDropdown.appendChild(option);
        });
        merkDropdown.disabled = false;
    }
});

// Event listener untuk dropdown merk
merkDropdown.addEventListener('change', function() {
    const selectedJenis = jenisDropdown.value;
    const selectedMerk = this.value;
    
    // Reset dropdown model
    modelDropdown.innerHTML = '<option value="">Pilih Model</option>';
    modelDropdown.disabled = !selectedMerk;
    
    // Update hasil
    updateResults();
    
    // Jika merk dipilih, isi dropdown model
    if (selectedJenis && selectedMerk) {
        const models = data[selectedJenis][selectedMerk];
        models.forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            modelDropdown.appendChild(option);
        });
        modelDropdown.disabled = false;
    }
});

// Event listener untuk dropdown model
modelDropdown.addEventListener('change', updateResults);

// Fungsi untuk update hasil
function updateResults() {
    const selectedJenis = jenisDropdown.value;
    const selectedMerk = merkDropdown.value;
    const selectedModel = modelDropdown.value;
    
    let resultHTML = '';
    
    if (!selectedJenis) {
        resultHTML = '<p>Silakan pilih filter di atas untuk melihat hasil</p>';
    } else {
        resultHTML = '<p>Pilihan Anda:</p>';
        
        if (selectedJenis) {
            resultHTML += `<span class="selected-item">Jenis: ${selectedJenis.charAt(0).toUpperCase() + selectedJenis.slice(1)}</span>`;
        }
        
        if (selectedMerk) {
            resultHTML += `<span class="selected-item">Merk: ${selectedMerk.charAt(0).toUpperCase() + selectedMerk.slice(1)}</span>`;
        }
        
        if (selectedModel) {
            resultHTML += `<span class="selected-item">Model: ${selectedModel}</span>`;
        }
        
        if (!selectedMerk && !selectedModel) {
            resultHTML += '<p style="margin-top: 10px;">Pilih merk dan model untuk melihat detail lengkap</p>';
        }
    }
    
    resultCard.innerHTML = resultHTML;
}

// Fungsi untuk kembali ke home
function goBack() {
    // Simulasi kembali ke halaman utama
    if (confirm('Kembali ke halaman utama?')) {
        // Reset semua dropdown
        jenisDropdown.selectedIndex = 0;
        merkDropdown.innerHTML = '<option value="">Pilih Merk</option>';
        merkDropdown.disabled = true;
        modelDropdown.innerHTML = '<option value="">Pilih Model</option>';
        modelDropdown.disabled = true;
        updateResults();
        window.location.href = '../index.html';
    }
}

// Inisialisasi
updateResults();