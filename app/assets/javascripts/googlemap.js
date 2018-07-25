window.addEventListener('load', function() {
    map = initMap();
});

// mapを描画し、mapオブジェクトを返す。
function initMap() {
    var map = new google.maps.Map(
        document.getElementById('map'), {
            center: { lat: -25.363, lng: 131.044 },
            zoom: 4
        });
    return map
}

// 不動産apiからdataを取得し、Pinをさす。
function putEstatePins() {
    $.ajax({
        url: '/api/v1/estates',
        type: 'get',
        success: function(data) {
            data.forEach(function(d) {
                putPin(d.latitude, d.longitude, map)
                console.log('lat' + d.latitude)
                console.log('lng' + d.longitude)
            });
        },
    });
}

function putPin(lat, lng, map) {
    var marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(lat, lng)
    });
};