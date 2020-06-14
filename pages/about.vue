<template>
  <div class="about container">
    <div class="about__title">
      <p>關於本站</p>
    </div>
    <div class="about__content">
      <collapse-menu
        :title="first.title"
        :content="first.content"
      />
      <collapse-menu
        :title="second.title"
        :content="second.content"
      />
    </div>
  </div>
</template>

<script>
import CollapseMenu from 'components/CollapseMenu'
export default {
  layout: 'custom',
  components: {
    CollapseMenu
  },
  data () {
    return {
      first: {
        title: '這個網站的資料是哪邊來的？',
        content: '使用爬蟲技術從PTT GAMESALE 版獲取。'
      },
      second: {
        title: '這個網站的資料正確嗎？',
        content: `
          很遺憾的，目前由於作者太廢，爬取到的資料不是百分之百正確，特定的
          內容會被排除，如徵求遊戲，或是一次販售多個遊戲的文章不再爬取範圍
          ，再強調一次，爬取到的資料不是百分之百正確，僅供版眾參考！
        `
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.about {

  .about__title {
    color:$white;
    text-align: center;
    font-size: $font-xl;
  }
}
</style>
