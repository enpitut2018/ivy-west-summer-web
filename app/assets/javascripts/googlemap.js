// ピンの保存用配列
var MarkerArray = new Array();

// DOMがロードされた時点で実行(loadよりも少し早い。)
document.addEventListener("DOMContentLoaded", function() {
    console.log('init... ');
    drawMapWithCurrentUserPosition();
    redrawPinsFromSearchForm();
    $('div#sidebar-button').find('button').click(function(e) {
        $('.ui.sidebar.top').sidebar('setting', 'transition', 'overlay').sidebar('toggle');
    });
    $('.ui.sidebar.top').find('button').click(function(e) {
        $('.ui.sidebar.top').find('button').text('... 検索中です。').prop("disabled", true);
    })
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
                putPin({ lat: data.latitude, lng: data.longitude, map: map, title: "user", icon: { url: "icons/icon-user.png" } });
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
    var marker = putPin({ name: args.name, lng: args.lng, lat: args.lat, map: args.map, icon: args.icon });
    // pinを消す時のためにmarkerを保存して置く。
    MarkerArray.push(marker);
    // 一回しか発火しない
    var listener = google.maps.event.addListener(marker, "click", function(params) {
        $.ajax({
            url: 'api/v1/estates/' + marker.title,
            type: 'get',
            success: function(data) {
                $('.ui.modal').modal('show');
                var years_text = data.years ? '築' + data.years + '年' : '-';
                var height_text = data.height ? data.height + '階建' : '-';
                var administration_fee_text = data.administration_fee ? data.administration_fee + '円' : '-';
                var deposit_text = data.deposit ? data.deposit + '万円' : '-';
                var gratuity_fee_text = data.gratuity_fee ? data.gratuity_fee + '万円' : '-';
                $('#estate-name').text(data.name);
                $('#estate-latitude').text(data.latitude);
                $('#estate-longitude').text(data.longitude);
                $('#estate-price').text(data.price + '万円');
                $('#estate-address').text(data.address);
                $('#estate-years').text(years_text);
                $('#estate-floor_plan').text(data.floor_plan);
                $('#estate-location1').text(data.location1);
                $('#estate-height').text(height_text);
                $('#estate-floor').text(data.floor + '階');
                $('#estate-administration_fee').text(administration_fee_text);
                $('#estate-deposit').text(deposit_text);
                $('#estate-gratuity_fee').text(gratuity_fee_text);
                $('#estate-occupied_area').html('<div>' + data.occupied_area + 'm<sup>2</sup></div>');
                $('#estate-url').text(data.url);
                $('#estate-url').attr('href', data.url);
                $('#estate-noise').text(data.noise);
                $('#estate-izakaya').text(data.izakaya);
                $('#estate-crime').text(data.crime);
                $('#estate-safe_level').text(data.safe_level);
                console.log(data)
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
                    icon: { url: selectIcon({ peace: d.safe_level }) }
                });
            });
        }
    });
}

function putPin(args) {
    var marker = new google.maps.Marker({
        map: args.map,
        position: new google.maps.LatLng(args.lat, args.lng),
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
                putEstatePin({
                    name: d.name,
                    lat: d.latitude,
                    lng: d.longitude,
                    map: map,
                    icon: { url: selectIcon({ peace: d.safe_level }) }
                })
            });
        }).then(function() {
            $('.ui.sidebar.top').find('button').text('絞り込み').prop("disabled", false);
        });
    });
}

function selectIcon(args) {
    var label = args.label
    var peace = args.peace
        //var peace = args.peace
        //var price = args.price
    if (label == "user") return "icons/icon-user.png";
    else if (peace == 1) return "icons/icon-home-blue.png";
    else if (peace == 2) return "icons/icon-home-orange.png";
    else if (peace == 3) return "icons/icon-home-red.png";
    else return "icons/icon-apart.png"
}