require 'csv'

module NoiseLevel
  def get_noise_level(lat,lon)
    delta = 0.00015
    cnt = 0

    data_list = CSV.read("#{Rails.root}/lib/module/map.csv")
    data_list.each do |data|
      if lat >= (data[1].to_f - delta) && lat <= (data[2].to_f + delta)
        if lon >= (data[1].to_f - delta) && lon <= (data[2].to_f + delta)
          cnt +=1
          # puts data
        end
      end
    end
    level = (cnt / 5000).round
    if level > 10
      level = 10
    end
    level
  end
end