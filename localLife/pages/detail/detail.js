// 导入fetch
import fetch from '../../utils/fetch'
// 导入regeneratorRuntime，就可以让小程序支持async和await
import regeneratorRuntime from '../../utils/runtime.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '', // 当前商铺的id值
    info: {}, // 存储当前商铺的详细信息
  },
  onLoad (query) {
    this.data.id = query.id
    this.setData(this.data)
  },
  async onShow() {
    // 发送ajax请求
    let res = await fetch(`shops/${this.data.id}`)
    this.data.info = res.data
    this.setData(this.data)
  },
  // 图片的预览
  preview (e) {
    // wx.previewImage即可
    let {current, urls} = e.currentTarget.dataset
    // w.h 还没有做替换  current和urls都要做替换
    // 应该把current和urls中图片的w.h 替换成 1000.1000
    current = current.replace('w.h', '1000.1000')
    urls = urls.map(item => item.replace('w.h', '1000.1000'))
    wx.previewImage({
      urls: urls,
      current: current
    })
  }
})