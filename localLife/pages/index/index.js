// 导入fetch
import fetch from '../../utils/fetch'
// 导入regeneratorRuntime，就可以让小程序支持async和await
import regeneratorRuntime from '../../utils/runtime.js'

Page({
  /*
    动态的获取轮播图的数据
  */
  
  data: {
    imgList: [], // 用于存储轮播图的数据
    categoryList: [], // 用于存储分类的列表数据
  },

  onShow () {
    // 用于获取轮播图数据
    this.getImgList()

    // 发送ajax请求，用于获取分类列表数据
    this.getCategoryList()
  },
  async getImgList () {
    // 发送ajax请求，获取轮播图数据
    let res = await fetch('slides')
    // 把获取到的轮播图的数据保存到imgList中
    this.data.imgList = res.data
    // 同步
    this.setData(this.data)
  },
  async getCategoryList() {
    let res = await fetch('categories')
    this.data.categoryList = res.data
    this.setData(this.data) 
  }
})