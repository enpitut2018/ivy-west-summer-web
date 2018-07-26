window.addEventListener('load', function() {
    drawMapWithCurrentUserPosition();

})


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
                var marker = putPin({ name: d.name, lng: d.longitude, lat: d.latitude, map: map })
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
        icon: { url: "icons/icon-apart.png" },
    });
    console.log(marker)
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
                data.forEach(d) {
                    // ピンを再描画
                    console.log(d);
                }
            }
        })
    })
}