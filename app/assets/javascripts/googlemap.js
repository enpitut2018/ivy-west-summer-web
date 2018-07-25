window.addEventListener('load', function() {
    initMapWithUserPosition();
});

// mapを描画し、mapオブジェクトを返す。
function initMap(args) {
    var map = new google.maps.Map(
        document.getElementById('map'), {
            center: { lat: args.lat, lng: args.lng },
            zoom: 14
        });
    return map
}

function getClickLatLng() {
    return { lat: event.latLng.lat(), lng: event.latLng.lng() }
}

function initMapWithUserPosition() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                //取得したデータ
                var data = position.coords;
                var map = initMap({ lat: data.latitude, lng: data.longitude });
                // 不動産データからピンを立つ。
                putEstatePins(map);
                google.maps.event.addListener(map, 'click', function(event) {
                    $('.ui.modal').modal('show');
                    $('#form-latitude').find('input').val(Number(event.latLng.lat()).toFixed(5));
                    $('#form-longitude').find('input').val(Number(event.latLng.lng()).toFixed(5));
                });
            },
            function(error) {
                console.log('geolocation error');
            }
        );
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

function putPin(args) {
    var marker = new google.maps.Marker({
        map: args.map,
        position: new google.maps.LatLng(args.lng, args.lat)
    });
};