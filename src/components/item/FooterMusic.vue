<template>
  <div class="FooterMusic">
    <div class="footerLeft" @click="updateDetailShow">
      <img :src="playList[playListIndex].al.picUrl" alt="" />
      <div class="footerText">
        <p>{{ playList[playListIndex].name }}</p>
        <span>横滑切换上下首哦</span>
      </div>
    </div>
    <div class="footerRight">
      <svg
        class="icon liebiao"
        aria-hidden="true"
        @click="play"
        v-if="isbtnShow">
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true" @click="play" v-else>
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-24gl-playlistMusic5"></use>
      </svg>
    </div>
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
    ></audio>
    <van-popup v-model="detailShow" position="right" :style="{width:'100%' ,height: '100%' }">
      <MusicDetail  :musicList="playList[playListIndex]" :play="play" :isbtnShow="isbtnShow" :addDuration="addDuration"></MusicDetail>
    </van-popup>
  </div>
</template>

<script>
import MusicDetail from '@/components/item/MusicDetail'
import { mapState,mapMutations } from "vuex";
export default {
  name: "FooterMusic",
  data() {
    return {
      interVal: 0,
    };
  },
  components:{MusicDetail},
  computed: {
    ...mapState(["playList", "playListIndex", "isbtnShow", "detailShow"]),
  },
  mounted() {
      this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
      this.updateTime()
  },
   updated() {
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
    this.addDuration()
  },
  methods: {
    play() {
      // 判断音乐是否播放
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.updateIsbtnShow(false);
        this.updateTime() //播放就调用函数进行传值
      } else {
        this.$refs.audio.pause();
        this.updateIsbtnShow(true);
        clearInterval(this.interVal); //暂停清除定时器
      }
    },
    updateTime(){
      this.interVal = setInterval(() => {
        this.updateCurrentTime(this.$refs.audio.currentTime);
      }, 1000);
    },
    addDuration(){
      this.updateDuration(this.$refs.audio.duration)
    },
    ...mapMutations(['updateIsbtnShow','updateDetailShow','updateCurrentTime',"updateDuration"])
  },
  watch:{
    playListIndex(){
      //监听如果下标发生了改变，就自动播放音乐
      this.$refs.audio.autoplay = true;
      if (this.$refs.audio.paused) {
        //如果是暂停状态，改变图标
        this.updateIsbtnShow(false);
      }
    },
    playList(){
      if(this.isbtnShow){
        this.$refs.audio.autoplay = true;
        this.updateIsbtnShow(false);
      }
    }

  }
};
</script>

<style lang="less" scoped>
.FooterMusic {
  width: 100%;
  height: 4rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #999;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  .footerLeft {
    width: 75%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    p{
      font-weight: 600;
      width: 9rem;
      height: 2rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

    }
    span{
      font-size: 1rem;
      color: #999;
    }
    img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      margin-left: -2rem;
    }
    .footerText{
      margin-left: -5rem;
    }
  }
  .footerRight {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 0.5rem;
    }
  }
}
</style>