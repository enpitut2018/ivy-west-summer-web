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

// 不動産apiからdataを取得し、[{position: LatLng.obj}, ...]として返す。
function getEstatePositions() {
    $.ajax({
        url: 'url',
        type: 'get'
    }).done(function(data, textStatus, jqXHR) {
        data.forEach(function(d) {
            features.push({ position: new google.maps.LatLng(d.lat, d.lng) })
        });
    }).fail(function(data, textStatus, jqXHR) {});
    return features
}

function setPin(lat, lng, map) {
    var marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(lat, lng)
    });
};