// Fungsi pencarian kode pos dengan limit
function searchKodepos(query) {
    if (!query.trim()) {
        return {
            displayedResults: [],
            totalFound: 0
        };
    }
    
    const searchTerm = query.toLowerCase().trim();
    const displayedResults = [];
    let totalFound = 0;
    
    // Hitung semua hasil yang cocok
    for (let i = 0; i < kodeposData.length; i++) {
        const item = kodeposData[i];
        
        if (
            item.village.toLowerCase().includes(searchTerm) ||
            item.district.toLowerCase().includes(searchTerm) ||
            item.regency.toLowerCase().includes(searchTerm) ||
            item.province.toLowerCase().includes(searchTerm) ||
            item.code.toString().includes(searchTerm)
        ) {
            totalFound++;
            
            // Simpan maksimal 100 hasil untuk ditampilkan
            if (displayedResults.length < 100) {
                displayedResults.push(item);
            }
        }
    }
    
    return {
        displayedResults,
        totalFound
    };
}

// Fungsi untuk menampilkan hasil pencarian
function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    
    if (results.totalFound === 0) {
        resultsContainer.innerHTML = '<div class="no-results">Tidak ada hasil ditemukan</div>';
        return;
    }
    
    let html = `<div class="results-count">Ditemukan ${results.totalFound} hasil`;
    
    // Tampilkan pesan jika hasil lebih dari 100
    if (results.totalFound > 100) {
        html += ` (ditampilkan 100 hasil pertama)`;
    }
    html += `</div>`;
    
    // Tampilkan hasil yang akan ditampilkan
    for (let i = 0; i < results.displayedResults.length; i++) {
        const item = results.displayedResults[i];
        html += `
            <div class="result-item" 
                onclick="selectItem(this)" 
                oncontextmenu="copyWithRightClick(this, event)">
                <div class="code">📮 ${item.code}</div>
                <div class="village">🏠 ${item.village}</div>
                <div class="district">📍 Kec. ${item.district}</div>
                <div class="regency">🏛️ Kab. ${item.regency}</div>
                <div class="province">🌏 Prov. ${item.province}</div>
                <div class="coordinates">📡 Lat: ${item.latitude}, Long: ${item.longitude}</div>
            </div>
        `;
    }
    
    resultsContainer.innerHTML = html;
}

// Fungsi untuk memilih item (klik kiri)
function selectItem(element) {
    // Hapus class active dari semua item
    const allItems = document.querySelectorAll('.result-item');
    for (let i = 0; i < allItems.length; i++) {
        allItems[i].classList.remove('active');
    }
    
    // Tambah class active ke item yang dipilih
    element.classList.add('active');
}

// Fungsi untuk menyalin dengan klik kanan
function copyWithRightClick(element, event) {
    event.preventDefault(); // Mencegah menu konteks default
    
    // Pilih item terlebih dahulu (sama seperti klik kiri)
    selectItem(element);
    
    // Ambil teks kode pos dari item yang dipilih
    const codeElement = element.querySelector('.code');
    const kodepos = codeElement.textContent.replace('📮 ', '').trim();
    
    // Salin ke clipboard
    navigator.clipboard.writeText(kodepos).then(() => {
        showCopyFeedback(codeElement, '✅ Disalin!');
    }).catch(() => {
        // Fallback untuk browser yang tidak support clipboard API
        fallbackCopy(kodepos, codeElement);
    });
    
    return false;
}

// Fungsi untuk menampilkan feedback salinan
function showCopyFeedback(codeElement, message) {
    const originalText = codeElement.textContent;
    const originalHTML = codeElement.innerHTML;
    
    codeElement.textContent = message;
    codeElement.style.color = '#28a745';
    
    setTimeout(() => {
        codeElement.innerHTML = originalHTML;
        codeElement.style.color = '';
    }, 2000);
}

// Fallback copy untuk browser lama
function fallbackCopy(kodepos, codeElement) {
    const textArea = document.createElement('textarea');
    textArea.value = kodepos;
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopyFeedback(codeElement, '✅ Disalin!');
    } catch (err) {
        showCopyFeedback(codeElement, '❌ Gagal menyalin');
    }
    
    document.body.removeChild(textArea);
}

// Debounce function untuk optimasi performa
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Event listener dengan debounce untuk optimasi
const debouncedSearch = debounce(function(e) {
    const query = e.target.value;
    const results = searchKodepos(query);
    displayResults(results);
}, 300);

document.getElementById('searchInput').addEventListener('input', debouncedSearch);

// Event listener untuk keyboard navigation
document.getElementById('searchInput').addEventListener('keydown', function(e) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        
        const items = document.querySelectorAll('.result-item');
        if (items.length === 0) return;
        
        const currentActive = document.querySelector('.result-item.active');
        let currentIndex = currentActive ? Array.from(items).indexOf(currentActive) : -1;
        
        if (e.key === 'ArrowDown') {
            currentIndex = (currentIndex + 1) % items.length;
        } else if (e.key === 'ArrowUp') {
            currentIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
        }
        
        selectItem(items[currentIndex]);
        items[currentIndex].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    } else if (e.key === 'Enter') {
        const activeItem = document.querySelector('.result-item.active');
        if (activeItem) {
            // Enter untuk menyalin (sama seperti klik kanan)
            const codeElement = activeItem.querySelector('.code');
            const kodepos = codeElement.textContent.replace('📮 ', '').trim();
            
            navigator.clipboard.writeText(kodepos).then(() => {
                showCopyFeedback(codeElement, '✅ Disalin! (Enter)');
            });
        }
    }
});

function goBack() {
    if (confirm('Kembali ke halaman utama?')) {
        window.location.href = '../index.html';
    }
}


// Fokus ke input search saat page load
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('searchInput').focus();
});