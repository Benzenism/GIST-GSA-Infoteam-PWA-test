// 사용자의 위치 얻기
function getUserLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            const userLat = position.coords.latitude;
            const userLon = position.coords.longitude;
            calculateDistance(userLat, userLon);
        }, error => {
            console.error("Error occurred while getting location:", error);
        });
    } else {
        console.log("Geolocation API is not supported.");
    }
}

// 사용자의 위치를 얻기 위한 버튼 이벤트 핸들러
document.getElementById('getLocationButton').addEventListener('click', getUserLocation);

// Haversine 공식으로 두 지점 간의 거리 계산
function calculateDistance(userLat, userLon) {
    const point1 = { lat: 35.228798, lon: 126.839371 }; // 제 1 학생회관, 락락
    const point2 = { lat: 35.229750, lon: 126.845983 }; // 제 2 학생회관

    function degreesToRadians(degrees) {
        return degrees * Math.PI / 180;
    }

    function haversineDistance(lat1, lon1, lat2, lon2) {
        const R = 6371000; // 지구 반지름 (미터)
        const dLat = degreesToRadians(lat2 - lat1);
        const dLon = degreesToRadians(lon2 - lon1);
        const lat1Rad = degreesToRadians(lat1);
        const lat2Rad = degreesToRadians(lat2);

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // 미터 단위로 반환
    }

    const distanceTo1 = haversineDistance(userLat, userLon, point1.lat, point1.lon);
    const distanceTo2 = haversineDistance(userLat, userLon, point2.lat, point2.lon);

    console.log(`1학까지의 거리: ${distanceTo1} m`);
    console.log(`2학까지의 거리: ${distanceTo2} m`);
}
