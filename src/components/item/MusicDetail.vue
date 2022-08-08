<template>
  <div>
    <img
      :src="musicList.al.picUrl"
      alt=""
      class="bgimg"
      @click="$router.go(-1)"
    />
    <div class="detailTop">
      <div class="detailTopLeft">
        <svg class="icon liebiao" aria-hidden="true" @click="backHome">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <div class="leftMarquee">
          <!-- 走马灯 -->
          <vue-marquee style="height: 30px" :showProgress="false">
            <vue-marquee-slide v-for="i in 20" :key="i">
              <p style="color: #fff">{{ musicList.al.name }}</p>
            </vue-marquee-slide>
          </vue-marquee>
          <span v-for="item in musicList.ar" :key="item.id">
            {{ item.name }}
          </span>
          <svg class="icon liebiao" aria-hidden="true">
            <use xlink:href="#icon-youjiantou"></use>
          </svg>
        </div>
      </div>
      <div class="detailTopRight">
        <svg class="icon liebiao" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
      </div>
    </div>
    <div class="detailContent" v-show="!isLyricShow">
      <img
        src="@/assets/needle-ab.png"
        class="img_needle"
        :class="{ img_needle_active: !isbtnShow }"
      />
      <img src="@/assets/cd.png" alt="" class="img_cd" />
      <img
        :src="musicList.al.picUrl"
        alt=""
        class="img_ar"
        :class="{ img_ar_active: !isbtnShow, img_ar_pauesd: isbtnShow }"
        @click="isLyricShow = true"
      />
    </div>
    <div class="musicLyric" v-show="isLyricShow" ref="musicLyric">
      <p
        v-for="item in lyric"
        :key="item.id"
        :class="{
          active:
            currentTime * 1000 >= item.time && currentTime * 1000 < item.pre,
        }"
      >
        {{ item.lrc }}
      </p>
    </div>
    <div class="detailFooter">
      <div class="footerTop">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-aixin"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yinle"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xinxi"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-hanbaobao"></use>
        </svg>
      </div>
      <div class="footerContent">
        <!-- 进度条 -->
        <input
          type="range"
          class="range"
          min="0"
          :max="duration"
          v-model="currentTime"
          step="0.05"
        />
      </div>
      <div class="footer">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xunhuan"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
          <use xlink:href="#icon-shangyishoushangyige"></use>
        </svg>
        <svg
          class="icon bofang"
          aria-hidden="true"
          @click="play"
          v-if="isbtnShow"
        >
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <svg class="icon bofang" aria-hidden="true" @click="play" v-else>
          <use xlink:href="#icon-zanting"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="goPlay(1)">
          <use xlink:href="#icon-xiayigexiayishou"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-24gl-playlistMusic5"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "MusicDetail",
  data() {
    return {
      isLyricShow: false,
    };
  },
  components: {},
  props: ["musicList", "play", "isbtnShow","addDuration"],
  computed: {
    ...mapState(["lyricList", "currentTime", "playListIndex", "playList","duration"]),
    lyric() {
      let arr;
      if (this.lyricList.lyric) {
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          let min = item.slice(1, 3);
          let sec = item.slice(4, 6);
          let mill = item.slice(7, 10);
          let lrc = item.slice(11, item.length);
          let time =
            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          if (isNaN(Number(mill))) {
            //Number(mill)作用是查看mill是否全部为数字，如果是就不会返回NaN
            mill = item.slice(7, 9);
            lrc = item.slice(10, item.length);
            time =
              parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          }
          return { min, sec, mill, lrc, time };
        });
        arr.forEach((item, i) => {
          if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
            item.pre = 100000;
          } else {
            item.pre = arr[i + 1].time;
          }
        });
      }
      return arr;
    },
  },
  methods: {
    backHome() {
      this.isLyricShow = false;
      this.updateDetailShow();
    },
    goPlay(num) {
      let index = this.playListIndex + num;
      if (index < 0) {
        index = this.playList.length - 1;
      } else if (index == this.playList.length) {
        index = 0;
      }
      this.updatePlayListIndex(index);
    },
    ...mapMutations(["updateDetailShow", "updatePlayListIndex"]),
  },
  watch: {
    currentTime(newValue) {
      let p = document.querySelector("p.active");
      // console.log([p]);
      if (p) {
        if (p.offsetTop > 380) {
          this.$refs.musicLyric.scrollTop = p.offsetTop - 380;
        }
      }

      if(newValue===this.duration){
        if(this.playListIndex===this.playList.length-1){
          this.updatePlayListIndex(0);
          this.play()
        }else{
           this.updatePlayListIndex(this.playListIndex+1);
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.bgimg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(70px); //虚化背景
}
.detailTop {
  width: 100%;
  height: 5rem;
  display: flex;
  padding: 0.5rem;
  justify-content: space-between;
  align-items: center;
  fill: #fff;
  .detailTopLeft {
    display: flex;
    align-items: center;
    .leftMarquee {
      width: 6rem;
      height: 100%;
      margin-left: 2rem;
      span {
        color: #999;
      }
      .icon {
        width: 1rem;
        height: 1rem;
        fill: #999;
      }
    }
  }
  .detailTopRight {
    .icon {
      width: 2rem;
      height: 2rem;
      fill: #fff;
    }
  }
}
.detailContent {
  width: 100%;
  height: 15rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .img_needle {
    width: 7rem;
    height: 9rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-11deg);
    transition: all 1s;
  }
  .img_needle_active {
    width: 7rem;
    height: 10rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(5deg);
    transition: all 1s;
  }

  .img_cd {
    width: 13rem;
    height: 13rem;
    position: absolute;
    bottom: -3.7rem;
    z-index: -1;
  }
  .img_ar {
    width: 8.2rem;
    height: 8.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: -1.3rem;
    animation: rotate_ar 10s linear infinite; //linear匀速 infinite无限循环
  }
  .img_ar_active {
    animation-play-state: running; // 	指定动画是否正在运行或已暂停。
  }
  .img_ar_pauesd {
    animation-play-state: paused;
  }
  @keyframes rotate_ar {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}
.musicLyric {
  width: 100%;
  height: 25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.2rem;
  overflow: scroll;
  p {
    color: rgb(192, 185, 185);
    margin-bottom: 1rem;
  }
  .active {
    color: #fff;
    font-size: 1.5rem;
  }
}
.detailFooter {
  width: 100%;
  height: 10rem;
  position: absolute;
  bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .footerTop {
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 2rem;
      height: 2rem;
      fill: rgb(245, 234, 234);
    }
    .icon {
      width: 2rem;
      height: 2rem;
    }
  }
  .range {
    width: 100%;
    height: 0.06rem;
  }
  .footer {
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      fill: rgb(245, 234, 234);
      width: 2rem;
      height: 2rem;
    }
    .bofang {
      width: 2.5rem;
      height: 2.5rem;
    }
  }
}
</style>