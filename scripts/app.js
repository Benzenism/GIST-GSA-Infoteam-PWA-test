window.addEventListener('load', () => {
    //serviceWorker.register();

// 오늘과 내일의 근무 형태를 출력할 엘리먼트
    var label2 = document.getElementById('la2');
    var label4 = document.getElementById('la4');
// 요일을 출력할 엘리먼트
    var l0 = document.getElementById('l0');
    var l1 = document.getElementById('l1');
    var l2 = document.getElementById('l2');
    var l3 = document.getElementById('l3');
    var l4 = document.getElementById('l4');
    var l5 = document.getElementById('l5');
    var l6 = document.getElementById('l6');
// 근무 형태를 출력할 엘리먼트
    var d0 = document.getElementById('d0');
    var d1 = document.getElementById('d1');
    var d2 = document.getElementById('d2');
    var d3 = document.getElementById('d3');
    var d4 = document.getElementById('d4');
    var d5 = document.getElementById('d5');
    var d6 = document.getElementById('d6');

// 특정 요일을 기준으로 오늘의 근무형태를 알아냅니다.
    let day = new Date(2020, 5, 13);
    let today = new Date();

    console.log("to: " + moment(today).format('YYYY MM DD HH:mm:ss'));
    console.log("day: " + moment(day).format('YYYY MM DD HH:mm:ss'));

    var cDay = 24 * 60 * 60 * 1000; // 시 * 분 * 초 * 밀리세컨
    var cMonth = cDay * 30; // 월 만듬
    var cYear = cMonth * 12; // 년 만듬

// 특정 날짜와 오늘의 일수 차이를 계산
    var dif1 = today - day;
    var dif = parseInt(dif1 / cDay)

// 나머지를 저장할 변수
    var namu = dif;
    var text, text2;
    console.log("일차이: " + parseInt(dif1 / cDay));

    namu = dif % 6;

// 텍스트 뿌려줌
    label2.innerText = swit(namu);
    label4.innerText = swit((namu + 1) % 6);
    l0.innerText = swit(namu);
    l1.innerText = swit((namu + 1) % 6);
    l2.innerText = swit((namu + 2) % 6);
    l3.innerText = swit((namu + 3) % 6);
    l4.innerText = swit((namu + 4) % 6);
    l5.innerText = swit((namu + 5) % 6);
    l6.innerText = swit((namu + 6) % 6);
    
    d0.innerText = getTodayLabel(today.getDay());
    d1.innerText = getTodayLabel(today.getDay() + 1);
    d2.innerText = getTodayLabel(today.getDay() + 2);
    d3.innerText = getTodayLabel(today.getDay() + 3);
    d4.innerText = getTodayLabel(today.getDay() + 4);
    d5.innerText = getTodayLabel(today.getDay() + 5);
    d6.innerText = getTodayLabel(today.getDay() + 6);
});

// 나머지에 따라 오늘의 근무 형태 출력하는 함수
function swit(namu) {
    switch (namu) {
        case 0:
        case 1:
            text = "오전";
            break;
        case 2:
        case 3:
            text = "야간";
            break;
        case 5:
        case 4:
            text = "휴일";
            break;
        default:
            text = "??";
            break;
    }
    return text;
}

//요일 구하기
function getTodayLabel(today) {

    var week = new Array('일', '월', '화', '수', '목', '금', '토');
    today = today % 7;
    var todayLabel = week[today];

    return todayLabel;
}