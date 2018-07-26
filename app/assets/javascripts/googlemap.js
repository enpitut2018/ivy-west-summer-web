window.addEventListener('load', function() {
    drawMapWithCurrentUserPosition();
})

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
//
// function putPin(args) {
//     var marker = new google.maps.Marker({
//         map: args.map,
//         position: new google.maps.LatLng(args.lng, args.lat)
//     });
// };

//ピンの保存用配列
var MarkerArray = new Array();


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
                putPin({ lng: data.latitude, lat: data.longitude, map: map, title:"user", icon: {url: "icons/icon-user.png"} })
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
                var marker = putPin({ name: d.name, lng: d.longitude, lat: d.latitude, map: map, icon:{url:"icons/icon-apart.png"}})
                    // 一回しか発火しない
                var listener = google.maps.event.addListenerOnce(marker, "click", function(params) {
                    $('.ui.modal').modal('show');
                    $.ajax({
                        url: 'api/v1/estates/' + marker.title,
                        type: 'get',
                        success: function(data) {
                            $('#form-name').val(data.name);
                            $('#form-longitude').val(data.longitude);
                            $('#form-latitude').val(data.latitude);
                            $('#form-price').val(data.price);
                            $('#form-address').val(data.address);
                            console.log(data)
                        }
                    })
                    console.log(marker.title)
                });
                console.log('lat' + d.latitude)
                console.log('lng' + d.longitude)
            });
        },
    });
}

function putPin(args) {
    var marker = new google.maps.Marker({
        map: args.map,
        position: new google.maps.LatLng(args.lng, args.lat),
        title: args.name,
        icon: args.icon,
    });

    MarkerArray.push(marker);
    console.log(marker)
    return marker
};

// function putUserPin(args) {
//     var marker = new google.maps.Marker({
//         map: args.map,
//         position: new google.maps.LatLng(args.lng, args.lat),
//         icon: args.icon
//     });
//
//     MarkerArray.push(marker);
//     console.log(marker)
//     return marker
// };

//ピンをクリア
function ClearAllPins(){
  MarkerArray.forEach(function(marker,idx){marker.setMap(null)})
}
