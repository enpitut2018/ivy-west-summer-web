window.addEventListener('load', function() {
    initMapWithUserPosition();
    // google.maps.event.addListener(map, 'click', function(event) {
    //     console.log(event)
    // });
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

function initMapWithUserPosition() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                //取得したデータ
                var data = position.coords;
                var map = initMap({ lat: data.latitude, lng: data.longitude });
                putEstatePins(map);
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
                console.log('lat' + d.latitude)
                console.log('lng' + d.longitude)
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