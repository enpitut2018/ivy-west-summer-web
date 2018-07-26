// ピンの保存用配列
var MarkerArray = new Array();

// DOMがロードされた時点で実行(loadよりも少し早い。)
document.addEventListener("DOMContentLoaded", function() {
    console.log('init... ');
    drawMapWithCurrentUserPosition();
    redrawPinsFromSearchForm();
    console.log('init done!');
});

// 現在地を取得し、mapを表示し、DBから全てのピンを追加する。
function drawMapWithCurrentUserPosition() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                var data = position.coords;
                map = new google.maps.Map(
                    document.getElementById('map'), {
                        center: { lat: data.latitude, lng: data.longitude },
                        zoom: 14
                    });
                // Userのピンを追加
                putPin({ lng: data.latitude, lat: data.longitude, map: map, title: "user", icon: { url: "icons/icon-user.png" } });
                // 不動産DBから全てのピンを追加。
                putAllEstatePins(map);
            },
            function(error) {
                console.log('geolocation error');
            });
    } else {
        alert("geolocation非対応!!");
    }
}

// 不動産のPinを立てる関数
function putEstatePin(args) {
    var marker = putPin({ name: args.name, lng: args.lng, lat: args.lat, map: args.map, icon: { url: "icons/icon-apart.png" } });
    // pinを消す時のためにmarkerを保存して置く。
    MarkerArray.push(marker);
    // 一回しか発火しない
    var listener = google.maps.event.addListenerOnce(marker, "click", function(params) {
        $.ajax({
            url: 'api/v1/estates/' + marker.title,
            type: 'get',
            success: function(data) {
                $('.ui.modal').modal('show');
                $('#form-name').val(data.name);
                $('#form-longitude').val(data.longitude);
                $('#form-latitude').val(data.latitude);
                $('#form-price').val(data.price);
                $('#form-address').val(data.address);
            }
        })
    })
}

// 不動産apiからdataを取得し、Pinをさす。
function putAllEstatePins(map) {
    $.ajax({
        url: '/api/v1/estates',
        type: 'get',
        success: function(data) {
            data.forEach(function(d) {
                putEstatePin({
                    name: d.name,
                    lng: d.longitude,
                    lat: d.latitude,
                    map: map,
                    icon: { url: "icons/icon-apart.png" }
                });
            });
        }
    });
}

function putPin(args) {
    var marker = new google.maps.Marker({
        map: args.map,
        position: new google.maps.LatLng(args.lng, args.lat),
        title: args.name,
        icon: args.icon,
    });
    return marker
};

function redrawPinsFromSearchForm() {
    // search-formをサブミットしたら発火
    $('#submit-button').click(function(event) {
        // eventの中にformが
        event.preventDefault();
        $.ajax({
            url: 'api/v1/estates?' + $('form#search-form').serialize(),
            type: 'get'
        }).done(function(data) {
            //ピンを全て消す。
            MarkerArray.forEach(function(marker, idx) { marker.setMap(null) });
            console.log(data);
            data.forEach(function(d) {
                // ピンを再描画
                putEstatePin({
                    name: d.name,
                    lng: d.longitude,
                    lat: d.latitude,
                    map: map,
                    icon: { url: "icons/icon-apart.png" }
                });
            });
        });
    })
}