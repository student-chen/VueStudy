<template>
  <div class="daily">
    <div class="daily-menu">
      <div
        class="daily-menu-item"
        @click="handleToRecommend"
        :class="{ on: type === 'recommend' }"
      >
        每日推荐
      </div>
      <div>
        <el-date-picker
          v-model="dailyTime"
          placeholder="选择日期"
          type="date"
          format="yyyy-MM-dd"
          value-format="timestamp"
          @change="getSTime"
        >
        </el-date-picker>
      </div>
    </div>
    <div class="daily-list" ref="list">
      <template v-if="type === 'recommend'">
        <!-- 记住一定要加key -->
        <div v-for="(list, index) in recommendList" :key="index">
          <div class="daily-date">{{ formatDay(list.date) }}</div>
          <Item
            v-for="item in list.stories"
            :data="item"
            :key="item.id"
            @click.native="handleClick(item.id)"
          >
          </Item>
        </div>
      </template>
    </div>
    <daily-article :id="articleId"></daily-article>
    <!-- <daily-article></daily-article> -->
  </div>
</template>
<script>
import Item from './components/item'
import dailyArticle from './components/daily-article'
import $ from './../libs/util.js'
export default {
  name: 'App',
  components: { Item, dailyArticle },
  data () {
    return {
      pickerOptions1: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      value1: '',
      // 日期控件
      type: 'recommend',
      recommendList: [],
      // dailyTime: $.getTodayTime(),
      dailyTime: '',
      isLoading: false,
      articleId: 0,
      list: []
    }
  },
  methods: {
    handleToRecommend () {
      this.type = 'recommend'
      this.recommendList = []
      this.dailyTime = $.getTodayTime()
      this.getRecommendList()
    },
    getRecommendList () {
      // 代表加载
      this.isLoading = true
      const prevDay = $.prevDay(this.dailyTime + 86400000)
      // 获取前一天的推荐内容
      $.ajax.get('news/before/' + prevDay).then(res => {
        this.recommendList.push(res)
        this.isLoading = false
      })
    },
    // 时间戳转中文日期
    formatDay (date) {
      let month = date.substr(4, 2)
      let day = date.substr(6, 2)
      if (month.substr(0, 1) === '0') month = month.substr(1, 1)
      if (day.substr(0, 1) === '0') day = day.substr(1, 1)
      return `${month} 月 ${day} 日`
    },
    handleClick (id) {
      this.articleId = id
    },
    getSTime (val) {
      this.dailyTime = val
      this.getRecommendList()
    }
  },
  mounted () {
    this.getRecommendList()
    // debugger
    // 获取dom
    const $list = this.$refs.list
    // 监听滚动
    $list.addEventListener('scroll', () => {
      if (this.isLoading) return
      if
      (
        // 滚动超过一定距离
        $list.scrollTop +
        document.body.clientHeight >=
        $list.scrollHeight
      ) {
        // 时间减一天
        this.dailyTime -= 86400000
        this.getRecommendList()
      }
    })
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  color: #657180;
  font-size: 16px;
}
.daily-menu {
  width: 150px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  background: #f5f7f9;
}
.daily-menu-item {
  font-size: 18px;
  text-align: center;
  margin: 5px 0;
  padding: 10px 0;
  cursor: pointer;
  border-right: 2px solid transparent;
  transition: all 0.3s ease-in-out;
}
.daily-menu-item:hover {
  background: #e3e8ee;
}
.daily-menu-item.on {
  border-right: 2px solid #3399ff;
}

/* .daily-menu ul {
  list-style: none;
}
.daily-menu ul li a {
  display: block;
  color: inherit;
  text-decoration: none;
  padding: 5px 0;
  margin: 5px 0;
  cursor: pointer;
}
.daily-menu ul li a:hover,
.daily-menu ul li a.on {
  color: #3399ff;
} */

.daily-list {
  width: 300px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 150px;
  overflow: auto;
  border-right: 1px solid #d7dde4;
}
.daily-date {
  text-align: center;
  margin: 10px 0;
}
.daily-item {
  display: block;
  color: inherit;
  text-decoration: none;
  padding: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
.daily-item:hover {
  background: #e3e8ee;
}
.daily-img {
  width: 80px;
  height: 80px;
  float: left;
}
.daily-img img {
  width: 100%;
  height: 100%;
  border-radius: 3px;
}
.daily-title {
  padding: 10px 5px 10px 90px;
}
.daily-title.noImg {
  padding-left: 5px;
}
.daily-article {
  margin-left: 450px;
  padding: 20px;
}
.daily-article-title {
  font-size: 28px;
  font-weight: bold;
  color: #222;
  padding: 10px 0;
}

.view-more a {
  display: block;
  cursor: pointer;
  background: #f5f7f9;
  text-align: center;
  color: inherit;
  text-decoration: none;
  padding: 4px 0;
  border-radius: 3px;
}

.daily-comments {
  margin: 10px 0;
}
.daily-comments span {
  display: block;
  margin: 10px 0;
  font-size: 20px;
}
.daily-comment {
  overflow: hidden;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px dashed #e3e8ee;
}
.daily-comment-avatar {
  width: 50px;
  height: 50px;
  float: left;
}
.daily-comment-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 3px;
}
.daily-comment-content {
  margin-left: 65px;
}
.daily-comment-time {
  color: #9ea7b4;
  font-size: 14px;
  margin-top: 5px;
}
.daily-comment-text {
  margin-top: 10px;
}
</style>
