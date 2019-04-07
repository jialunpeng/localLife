import fetch from '../../utils/fetch.js'
import regeneratorRuntime from '../../utils/runtime.js'
Page({

  /*
    1. 获取到地址栏中传递过来的id值
    2. 根据地址栏中传递过来的id值发送ajax请求，查询到对应的店铺列表
    3. 当页面触底的时候，需要让页码+1, 继续发送ajax请求
    4. 判断是否还有更多的数据
      获取到总的条数/pageSize  总的页数  current: 当前的页数
      如果当前的页数 >= 总的页数，  hasMore就应该是flase
  */
 
  data: {
    id: '', // 当前页面参数中的id值
    current: 1, // 表示当前页
    pageSize: 10, // 表示每页的条数
    shopList: [], // 商品列表
    hasMore: false // 是否还有更多的数据
  },
  // 页面加载的时候，获取到的id值
  onLoad(query) {
    this.data.id = query.id
    this.setData(this.data)
  },
  onShow() {
    this.getShopList()  
  },
  async onReady() {
    // 发送ajax请求，获取到当前页标题
    let res = await fetch(`categories/${this.data.id}`)
    // 动态的设置当前页标题
    wx.setNavigationBarTitle({
      title: res.data.name
    })
  },
  // 页面触底的回调函数
  onReachBottom () {
    // 如果没有更多数据了，不应该让current+1并且发送ajax
    if (!this.data.hasMore) return
    // 让当前页+1
    this.data.current++
    this.setData(this.data)
    // 继续发送ajax请求
    this.getShopList()
  },
  async getShopList() {
    let {id, current, pageSize, shopList} = this.data
    let res = await fetch(`categories/${id}/shops?_page=${current}&_limit=${pageSize}`)
    // 有问题： 我们不能把原来的数据给丢了，应该是往数组中添加即可
    // 展开了原来的数组中的数据， 加上了res.data请求回来的数据
    this.data.shopList = [...shopList, ...res.data]

    // 判断是否还有更多的数据
    let total = res.header['X-Total-Count']
    this.data.hasMore = this.data.current < Math.ceil(total/this.data.pageSize) 
    this.setData(this.data)
  },
  onPullDownRefresh() {
    // 把当前页变成1
    this.data.current = 1
    // 把shopList清空
    this.data.shopList = []
    this.setData(this.data)
    this.getShopList()
  }
})