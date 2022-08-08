<template>
  <div class="musiclist">
    <div class="musictop">
      <div class="title">发现好歌单</div>
      <div class="more"><span>查看更多</span></div>
    </div>
    <div class="musiccontent">
      <van-swipe
        :loop="false"
        :width="120"
        class="myswiper"
        :show-indicators="false"
      >
        <van-swipe-item v-for="(item, index) in musiccomment" :key="item.id">
          <router-link :to="{path:'/ItemMusic',query:{id:item.id}}"><img :src="item.picUrl" /></router-link>
          <span class="count">
              <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-bofang"></use>
            </svg>
             {{ computeplayCount(item.playCount) }}
            
          </span>
          <span class="textname">{{ item.name }}</span>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { getMusicContent } from "@/request/home";
export default {
  name: "MusicList",
  data() {
    return {
      musiccomment: [],
    };
  },
  mounted() {
    this.getmuscilist();
  },
  methods: {
    async getmuscilist() {
      let result = await getMusicContent();
      if (result.status == 200) this.musiccomment = result.data.result;
    },
    computeplayCount(num){
        if(num>=100000000){
            return (num/1000000).toFixed(1)+'亿'
        }else if(num>=10000)
        return (num/10000).toFixed(1)+'万'
    }
  },
};
</script>

<style lang="less" scoped>
.musiclist {
  width: 100%;
  height: 5rem;
  margin-top: 1rem;
  padding: 0.5rem;

  .musictop {
    width: 100%;
    height: 1.5rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .title {
      font-size: 1rem;
      font-weight: 600;
    }
    .more {
      width: 23%;
      border: 1px solid #ccc;
      text-align: center;
      line-height: 1rem;
      border-radius: 0.4rem;
      font-size: 0.9rem;
      span{
        margin: 2px auto;
        display: block;
      }
    }
  }
  .musiccontent {
    height: 10rem;
    .van-swipe-item{
      margin-right: 5px;
    }
    .myswiper {
      height: 100%;
      img {
      width: 100%;
      height: 70%;
      position: absolute;
      }
      svg{
          position: relative;
          top: 2px;
          left: 5px;
      }
      .count{
          position: relative;
          left: 22px;
          top: 5px;
          font-weight: 400;
      }
      .textname{
          display: block;
          font-size: 0.8rem;
          position: relative;
          top: 90px;
      }
    }
    
  }
}
</style>