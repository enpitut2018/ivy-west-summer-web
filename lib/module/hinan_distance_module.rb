require 'csv'

module HinanDistance
  @hinan_list = CSV.read("hinan.csv")
  @hinan_dis_list = []

  def get_distance(lat1, lon1, lat2, lon2)
    Math.sqrt((lat1 - lat2) ** 2 + (lon1 - lon2) ** 2) * 110.9
  end

  def get_hinan_distance(lat, lon)
    get_hinan_distances(lat, lon)
    # get_hinan_posi() 今後の検討。最寄りの避難所の緯度経度も返す機能
    @hinan_dis_list.sort()[0]

  end

  def get_hinan_distances(lat, lon)
    @hinan_list.each do |hinan|
      @hinan_dis_list[@hinan_dis_list.length] = get_distance(lat, lon, hinan[1].to_f, hinan[2].to_f)
    end
  end
end
