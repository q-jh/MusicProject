<template>
  <div class="banner">
    <van-swipe :autoplay="3000" class="Swiper">
      <van-swipe-item v-for="(item,index) in images" :key="index" >
       <img :src="item.pic">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import {getSwiper} from '@/request/home'
export default {
  name: "Swiper",
  data() {
    return {
      images: [],
    };
  },
  mounted(){
      this.getBanner()
  },
  methods:{
      async getBanner(){
          let result = await getSwiper()
          if(result.status == 200){
              this.images = result.data.banners
          }
      }
  }
};
</script>

<style lang="less" scoped>
.banner{
    width:100%;
    padding: 0 0.6rem;
}
.Swiper {
  width: 100%;
}
img {
    width: 100%;
    height: 11rem;
    
  }
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
</style>