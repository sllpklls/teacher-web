const students = [
    { id: 1, name: "Lê Thị Quỳnh Anh", class: "Lớp 10", address: "Hà Nội" },
    { id: 2, name: "Vũ Bảo Ngọc", class: "Lớp 4", address: "Ninh Bình" },
    { id: 3, name: "Đặng Minh Quân", class: "Lớp 7", address: "Quảng Nam" },
    { id: 4, name: "Mạc Bảo Hân", class: "Lớp 1", address: "Thái Bình" },
    { id: 5, name: "Phạm Nguyễn Tú Cẩm", class: "Lớp 1", address: "Bến Tre" },
    { id: 6, name: "Nguyễn Phúc Lâm", class: "Lớp 5", address: "Hà Nội" },
    { id: 7, name: "Nguyễn Thị Thu Trang", class: "Lớp 11", address: "Hà Nội" },
    { id: 8, name: "Vũ Trúc Diễm", class: "Lớp 3", address: "Thái Bình" },
    { id: 9, name: "Trần Gia Hân", class: "Lớp 5", address: "Vĩnh Phúc" },
    { id: 10, name: "Nguyễn Bích Ngọc", class: "", address: "Vĩnh Phúc" },
    { id: 11, name: "Hoàng Ngọc Thái", class: "Lớp 6", address: "Vĩnh Phúc" },
    { id: 12, name: "Mai Việt Anh", class: "Lớp 4", address: "Bắc Giang" },
    { id: 13, name: "Trương Hạ Diệp Anh", class: "Lớp 9", address: "Thanh Hoá" },
    { id: 14, name: "Dương Minh Đức", class: "Lớp 7", address: "Hà Tĩnh" },
    { id: 15, name: "Nguyễn Hồng Bích Ngọc", class: "Lớp 8", address: "Hà Tĩnh" },
    { id: 16, name: "Hà Hải Phong", class: "Lớp 2", address: "Thanh Hoá" },
    { id: 17, name: "Lâm Khánh Vy", class: "Lớp 5", address: "Hải Dương" },
    { id: 18, name: "HEILY Tran", class: "Lớp 1", address: "Mỹ" },
    ];

    let currentData = [...students];
    let map;
    let marker;
    
    // Initialize map when page loads
    function initMap() {
        // Default coordinates for Hanoi, Vietnam
        const defaultLat = 21.0285;
        const defaultLng = 105.8542;
        
        // Create map
        map = L.map('map').setView([defaultLat, defaultLng], 13);
        
        // Add tile layer (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        
        // Add marker
        marker = L.marker([defaultLat, defaultLng])
            .addTo(map)
            .bindPopup('<b>MS NGOC</b><br>Trường học tại Hà Nội')
            .openPopup();
    }
    
    function updateMapLocation() {
        const lat = parseFloat(document.getElementById('latitude').value);
        const lng = parseFloat(document.getElementById('longitude').value);
        
        if (isNaN(lat) || isNaN(lng)) {
            alert('Vui lòng nhập tọa độ hợp lệ!');
            return;
        }
        
        // Update map view
        map.setView([lat, lng], 13);
        
        // Remove old marker
        if (marker) {
            map.removeLayer(marker);
        }
        
        // Add new marker
        marker = L.marker([lat, lng])
            .addTo(map)
            .bindPopup(`<b>Vị trí mới</b><br>Lat: ${lat}<br>Lng: ${lng}`)
            .openPopup();
    }
    
    function renderTable(data = currentData) {
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = '';
    
        data.forEach((student, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="stt">${student.id}</td>
                <td>
                    <div class="student-info">
                        <div class="avatar">${getInitials(student.name)}</div>
                        <div class="student-name">${student.name}</div>
                    </div>
                </td>
                <td><span class="student-class">${student.class}</span></td>
                <td class="address">${student.address}</td>
            `;
            tableBody.appendChild(row);
        });
    }
    
    function getInitials(name) {
        return name.split(' ').map(word => word[0]).join('').toUpperCase().substring(0, 2);
    }
    
    function sortByName() {
        currentData.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
        renderTable();
    }
    
    function sortByClass() {
        currentData.sort((a, b) => a.class.localeCompare(b.class));
        renderTable();
    }
    
    function sortById() {
        currentData.sort((a, b) => a.id - b.id);
        renderTable();
    }
    
    function searchStudent() {
        const searchTerm = event.target.value.toLowerCase();
        const filteredData = students.filter(student => 
            student.name.toLowerCase().includes(searchTerm) ||
            student.class.toLowerCase().includes(searchTerm) ||
            student.address.toLowerCase().includes(searchTerm)
        );
        currentData = filteredData;
        renderTable(filteredData);
    }
    
    // Initialize table and map when page loads
    document.addEventListener('DOMContentLoaded', function() {
        renderTable();
        initMap();
    });