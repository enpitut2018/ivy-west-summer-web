window.addEventListener('load', function() {
    map = initMap();
    getUserPosition();
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


//-------現在位置を取得する記述---------//


//現在地にピン刺して移動




function getUserPosition(){
  //lat = 0;
  if (navigator.geolocation)
  {
    //alert("対応！！")
    navigator.geolocation.getCurrentPosition(
      //第一引数
      function(position)
      {
        //取得したデータ
        var data = position.coords;
        //データの中身
        //緯度
        lat = data.latitude;
        //軽度
        lng = data.longitude;

         console.log("new marker");

         var latlng = new google.maps.LatLng( lat , lng ) ;
                // 現在地の緯度経度を中心にマップを生成
          map = new google.maps.Map(document.getElementById('map'), {
          center: latlng,
          zoom: 15
          });

          var marker = new google.maps.Marker({ // マーカーの追加
              position: latlng, // マーカーを立てる位置を指定
              map: map // マーカーを立てる地図を指定
           });

        //alert("現在位置の緯度 軽度 高度：["+lat+","+lng+"]\n.");

      },
      //第二引数
      function(error){
        var errorInfo = [
      				"原因不明のエラーが発生しました…。" ,
      				"位置情報の取得が許可されませんでした…。" ,
      				"電波状況などで位置情報が取得できませんでした…。" ,
      				"位置情報の取得に時間がかかり過ぎてタイムアウトしました…。"
      	] ;
        // エラーメッセージ
  			var errorMessage = "[エラー番号: " + errorNo + "]\n" + errorInfo[ errorNo ] ;

  			// アラート表示
  			alert( errorMessage ) ;
      }
    );

  }else{
    alert("geolocation非対応!!");
  }


}
