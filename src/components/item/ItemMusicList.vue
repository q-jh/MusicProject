<template>
  <div class="itemMusicList">
    <div class="itemListTop">
      <div class="listLeft">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <span
          >播放全部<span>(共{{ musicallitems.length }}首)</span></span
        >
      </div>
      <div class="listRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jiahao1"></use>
        </svg>
        <span>收藏({{ subscribedCount }})</span>
      </div>
    </div>
    <div class="itemList">
      <div class="item" v-for="(item, i) in musicallitems" :key="i">
        <div class="itemLeft"  @click="playMusic(i)">
          <span class="leftSpan">{{ i + 1 }}</span>
          <div>
            <p>{{ item.name }}</p>
            <span v-for="(item1, index) in item.ar" :key="index">{{
              item1.name
            }}</span>
          </div>
        </div>
        <div class="itemRight">
          <svg class="icon bofang" aria-hidden="true" v-if='item.mv !=0'>
            <use xlink:href="#icon-shipin"></use>
          </svg>
          <svg class="icon liebiao" aria-hidden="true">
            <use xlink:href="#icon-hanbaobao"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    name:'ItemMusicList',
    props:['musicallitems','subscribedCount'],
    methods:{
      playMusic(i){
        this.updatePlayList(this.musicallitems)
        this.updatePlayListIndex(i)
      },
      ...mapMutations(['updatePlayList','updatePlayListIndex'])
    }

}
</script>

<style lang="less" scoped>
.itemMusicList {
  width: 100%;
  height: 30rem;
  background-color: #fff;
  padding: 0 0.6rem;
//   margin-top: 0.2rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  .itemListTop {
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .listLeft {
      width: 10rem;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .icon {
          width: 2rem;
        stroke: #333333;
        stroke-width: 20;
      }
      span {
        font-weight: 700;
        span {
          font-weight: 400;
          font-size: 0.8rem;
          color: #999;
        }
      }
    }
    .listRight {
      display: flex;
      align-items: center;
      background-color: red;
      padding: 0.2rem;
      border-radius: 0.4rem;
      color: #fff;
      .icon {
        width: 0.8rem;
        height: 0.8rem;
        fill: #fff;
        margin-right: 0.1rem;
        stroke: #fff;  //Stroke属性定义一条线，文本或元素轮廓颜色：
        stroke-width: 50;
      }
    }
  }
  .itemList {
    width: 100%;
    .item {
      width: 100%;
      height: 4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .itemLeft {
        width: 85%;
        height: 100%;
        display: flex;
        align-items: center;
        .leftSpan {
          display: inline-block;
          width: 1rem;
          text-align: center;
        }
        div {
            width: 100%;
          p {
            width: 100%;
            height: 2rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 700;
          }
          span{
            font-weight: 400;
            font-size: .7rem;
            color: #999;
          }
          margin-left: 0.4rem;
        }
      }
      .itemRight{
        width: 20%;
        height: 100%;
        display: flex;
        // justify-content: space-between;
        align-items: center;
        position: relative;
        .icon{
          fill: #999;
        }
         .bofang{
            position: absolute;
            left: 0;
          }
         .liebiao{
            position: absolute;
            right: 0;
          }
      }
    }
  }
}
</style>