// // 登録ボタンを押したら、ピンを立てる。
// $('#submit').find('input').on('click', function() {
//     // 入力したデータを送る。
//     $.ajax({
//         url: '/estates/',
//         type: 'get',
//         success: function() {
//             // ピンを立てる。
//             lat = $('#form-latitude').find('input').val();
//             lng = $('#form-longitude').find('input').val();
//             console.log('lat: ' + lat)
//             console.log('lng: ' + lng)
//             putPin({ lat: lat, lng: lng, map, map });
//             // formを自動で閉じる。
//         }
//     })
// });

function putPin(args) {
    var marker = new google.maps.Marker({
        map: args.map,
        position: new google.maps.LatLng(args.lng, args.lat)
    });
};

function drawMapWithCurrentUserPostion() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                var data = position.coords;
                console.log(data.latitude, data.longitude)
                map = new google.maps.Map(
                    document.getElementById('map'), {
                        center: { lat: data.latitude, lng: data.longitude },
                        zoom: 14
                    });
                putEstatePins(map);
                google.maps.event.addListener(map, 'click', function(event) {
                    $('.ui.modal').modal('show');
                    // latとlngが逆だが、なぜか動く。
                    $('#form-latitude').val(Number(event.latLng.lng()).toFixed(5));
                    $('#form-longitude').val(Number(event.latLng.lat()).toFixed(5));
                });
            },
            function(error) {
                console.log('geolocation error');
            });
    } else {
        alert("geolocation非対応!!");
    }

}

// 不動産apiからdataを取得し、Pinをさす。
function putEstatePins(map) {
    $.ajax({
        url: '/api/v1/estates',
        type: 'get',
        success: function(data) {
            data.forEach(function(d) {
                putPin({ lng: d.longitude, lat: d.latitude, map: map })
            });
        },
    });
}