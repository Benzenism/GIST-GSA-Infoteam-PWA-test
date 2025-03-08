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

    selectRestaurant(distanceTo1, distanceTo2)
}

// 식사할 장소 대리 선정
function selectRestaurant(dist1, dist2){
    const textElement = document.getElementById('randomResult');

    if (dist1 > 1000 || dist2 > 1000) {
        console.log('Too Far!');
        textElement.innerText = `GIST 밖이라면, 주변 식당에서 식사해보세요.`;
    } else {
        const weight1 = 1 - (dist1 * 0.001) + 0.3; // 락락
        const weight2 = 1 - (dist1 * 0.001) + 0.2; // 1학
        const weight3 = 1 - (dist2 * 0.001) + 0.1; // 2학
        const weightSum = weight1 + weight2 + weight3

        const randomValue = Math.random(); // 소숫점 관련 오류는 무시
        if (randomValue <= weight1 / weightSum) {
            console.log(`선택된 지점: 락락, 거리: ${dist1} m`);
            textElement.innerText = `락락(1학 2층), 거리: ${dist1.toFixed(1)} m`;
        } else if (randomValue <= (weight1 + weight2) / weightSum) {
            console.log(`선택된 지점: 1학, 거리: ${dist1} m`);
            textElement.innerText = `제 1학생회관, 거리: ${dist1.toFixed(1)} m`;
        } else {
            console.log(`선택된 지점: 2학, 거리: ${dist2} m`);
            textElement.innerText = `제 2학생회관, 거리: ${dist2.toFixed(1)} m`;
        }
    }
}