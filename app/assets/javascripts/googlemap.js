// ピンの保存用配列
var MarkerArray = new Array();

// DOMがロードされた時点で実行(loadよりも少し早い。)
document.addEventListener("DOMContentLoaded", function() {
    console.log('init... ');
    drawMapWithCurrentUserPosition();
    redrawPinsFromSearchForm();
    // $('.ui.sidebar.bottom').sidebar('setting', 'transition', 'overlay');
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



                var sview = map.getStreetView();
                var is_sview = false;

                google.maps.event.addListener(sview,'visible_changed',function(){
                    if(!(is_sview)){

                      MarkerArray.forEach(function(marker, idx) {
                        console.log(marker.icon.scaledSize)
                        //marker.icon.scaledSize = new google.maps.Size(500, 500)
                        marker.setMap(null)
                      });

                      putAllEstatePins({map: map, scaledSize: new google.maps.Size(500, 500)});
                      console.log('zoom')
                      is_sview = true;
                    }else{
                      MarkerArray.forEach(function(marker, idx) { marker.setMap(null) });
                      putAllEstatePins({map: map, scaledSize: new google.maps.Size(40, 40)});
                      console.log('backback')
                      is_sview = false;
                    }      //console.log(marker.scaledSize)
                });

                // google.maps.event.addListener(sview,'visible_changed',function(){
                //     MarkerArray.forEach(function(marker, idx) { marker.setMap(null) });
                //     putAllEstatePins({map: map, scaledSize: new google.maps.Size(40, 40)});
                //     console.log('backback')
                //     //console.log(marker.scaledSize)
                // });

            //});

                // Userのピンを追加
                putPin({ lat: data.latitude, lng: data.longitude, map: map, title: "user", icon: { url: "icons/icon-user.png" } });
                // 不動産DBから全てのピンを追加。
                putAllEstatePins({map: map, scaledSize: new google.maps.Size(30, 36)});
            },
            function(error) {
                console.log('geolocation error');sjs
                sjjisl
            });
    } else {
        alert("geolocation非対応!!");
    }
}

// 不動産のPinを立てる関数
function putEstatePin(args) {
    var marker = putPin({ name: args.name, lng: args.lng, lat: args.lat, map: args.map, icon: args.icon, scaledSize: args.scaledSize });
    // pinを消す時のためにmarkerを保存して置く。
    MarkerArray.push(marker);
    // 一回しか発火しない
    var listener = google.maps.event.addListener(marker, "click", function(params) {
        $.ajax({
            url: 'api/v1/estates/' + marker.title,
            type: 'get',
            success: function(data) {
                //bug
                uimodal = $('.ui.modal');
                //bug
                $('.ui.modal').modal('show');
                $('#estate-name').text(data.name);
                $('#estate-latitude').text(data.latitude);
                $('#estate-longitude').text(data.longitude);
                $('#estate-longitude').text(data.longitude);
                $('#estate-price').text(data.price + '万円');
                $('#estate-address').text(data.address);
                $('#estate-years').text('築' + data.years + '年');
                $('#estate-floor_plan').text(data.floor_plan);
                $('#estate-location1').text(data.location1);
                $('#estate-height').text(data.height + '階建');
                $('#estate-floor').text(data.floor + '階');
                $('#estate-administration_fee').text(data.administration_fee + '円');
                $('#estate-deposit').text(data.deposit + '万円');
                $('#estate-gratuity_fee').text(data.gratuity_fee + '万円');
                $('#estate-occupied_area').html('<div>' + data.occupied_area + 'm<sup>2</sup></div>');
                console.log(data)
            }
        })
    })
}

// 不動産apiからdataを取得し、Pinをさす。
function putAllEstatePins(args) {
    $.ajax({
        url: '/api/v1/estates',
        type: 'get',
        success: function(data) {
            data.forEach(function(d) {
                putEstatePin({
                    name: d.name,
                    lng: d.longitude,
                    lat: d.latitude,
                    map: args.map,
                    icon: { url: selectIcon({ peace: 3 }),
                    scaledSize: args.scaledSize }
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
        scaledSize: args.scaledSize
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
                    icon: { url: selectIcon({ peace: 3 }) }
                })
            });
        });
    });
}

function selectIcon(args) {
    var label = args.label
    var peace = args.peace
        //var peace = args.peace
        //var price = args.price
    if (label == "user") return "icons/icon-user.png";
    else if (peace == 1) return "icons/icon-home-green.png";
    else if (peace == 2) return "icons/icon-home-yellow.png";
    else if (peace == 3) return "icons/icon-home-red.png";
    else return "icons/icon-apart.png"
}
