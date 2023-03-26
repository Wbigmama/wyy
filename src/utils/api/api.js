import instance from "../axios";


export const getBannerAPI = () => {
  return instance({
    url: '/banner?type=1'
  })
}

export const getRecommendSongListAPI = () => {
  return instance({
    url: '/personalized?limit=6'
  })
}

export const getPaiHangBangZhaiYaoAPI = () => {
  return instance({
    url: '/toplist/detail'
  })
}

export const getSongDetailAPI = (id) => {
  return instance({
    url: `/song/detail?ids=${id}`
  })
}

export const getSongListDetailAPI = (id) => {
  return instance({
    url: `/playlist/detail?id=${id}`
  })
}

export const getGedanXiangqingAPI = (id) => {
  return instance({
    url: `/playlist/detail?id=${id}`
  })
}

export const getMusicUrlAPI = (id) => {
  return instance({
    url: `/song/url/v1?id=${id}&level=exhigh`
    // 设置码率
    // 
  })
}

export const huoqugedanSuoyouGequAPI = (recommendListID) => {
  return instance({
    url: `/playlist/track/all?id=${recommendListID}&limit=10&offset=0`
  })
}

export const getSongGeciAPI = (id) => {
  return instance({
    url: `/lyric?id=${id}`
  })
}

export const searchMusicAPI = (value) => {
  return instance({
    url: `/cloudsearch?keywords=${value}`
  })
}

export const createCodeKeyAPI = () => {
  return instance({
    url: '/login/qr/key'
  })
}

export const createCodePicAPI = (createdKey) => {
  return instance({
    url: `/login/qr/create?key=${createdKey}&qrimg=${createdKey}`
  })
}

export const testCodeStatusAPI = (createdKey) => {
  return instance({
    url: `/login/qr/check?key=${createdKey}`
  })
}

export const getGedanXiangqingDongtaiAPI = (id) => {
  return instance({
    url: `/playlist/detail/dynamic?id=${id}`
  })
}