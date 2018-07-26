// ピンの保存用配列
var MarkerArray = new Array();

// windowがloadされたら呼び出す。
window.addEventListener('load', function() {
    drawMapWithCurrentUserPosition();
})

function drawMapWithCurrentUserPostion() {
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

function putEstatePin(args) {
    var marker = putPin({ name: args.name, lng: args.lng, lat: args.lat, map: args.map, icon: args.icon });
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
                console.log(data);
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
                    icon: { url: selectIcon({peace:1})}
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

    console.log(marker);
    return marker
};


function redrawPinsFromSearchForm() {
    // search-formをサブミットしたら発火
    $('serch-form').submit(function(event) {
        $.ajax({
            url: '/search',
            type: 'get',
            data: $form.serialize(),
            success: function(data) {
                //ピンを全て消す。
                MarkerArray.forEach(function(marker, idx) { marker.setMap(null) })
                data.forEach(function(d) {
                    // ピンを再描画
                    putPin()
                    console.log(d);
                });
            }
        })
    })
}