import Fly from 'flyio/dist/npm/wx'
const request = new Fly()
const showToast = (title) => {
  wx.showToast({
    title: title + '',
    icon: 'none'
  })
}

request.config.timeout = 3 * 1000
request.config.baseURL = 'http://localhost:20000/apis/'
request.config.headers = {'content-type': 'application/x-www-form-urlencoded'}
request.interceptors.request.use((request) => {
  wx.showLoading({ title: '加载中...' })
  return request
})

request.interceptors.response.use(
  (response) => {
    wx.hideLoading()
    return response.data
  },
  (err) => {
    wx.hideLoading()
    console.log(err)
    let errCode = err.status
    switch (errCode) {
      case 1:
        showToast('Timeout')
        break
      case 404:
        showToast('404 Not Found')
        break
      default:
        showToast('Unknown error')
        break
    }

    return err.message
  }
)

export default request
