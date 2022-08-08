<template>
  <div>
    <div class="itemTop">
      <img :src="playlist.coverImgUrl" class="bgimg" />
      <div class="itemleft">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <span>歌单</span>
      </div>
      <div class="itemright">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo1"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-hanbaobao"></use>
        </svg>
      </div>
    </div>
    <div class="itemTopContent">
      <div class="contentLeft">
        <img :src="playlist.coverImgUrl" />
        <div class="palyCount">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bofang"></use>
          </svg>
          <span>{{ computeplayCount(playlist.playCount) }}</span>
        </div>
      </div>
      <div class="contentRight">
        <p class="rightP_one">{{ playlist.name }}</p>
        <div class="right_img">
          <img :src="playlist2.creator.backgroundUrl" />
          <span>{{ playlist2.creator.nickname }}</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youjiantou"></use>
          </svg>
        </div>
        <p class="rightP_two">
          <span>{{ playlist.description }}</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youjiantou"></use>
          </svg>
        </p>
      </div>
    </div>
    <div class="itemTopFooter">
      <div class="footerItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xinxi"></use>
        </svg>
        <span>{{ playlist.commentCount }}</span>
      </div>
      <div class="footerItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
        <span>{{ playlist.shareCount }}</span>
      </div>
      <div class="footerItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai"></use>
        </svg>
        <span>下载</span>
      </div>
      <div class="footerItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-duoxuan"></use>
        </svg>
        <span>多选</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemMusicTop",
  data(){
    return{
      playlist2:{}

    }
  },
  props: ["playlist"],
  beforeMount(){
  //   if((playlist.creator = '')){
  //     this.playlist2 = JSON.parse(sessionStorage.getItem())
  //   }
  // console.log(JSON.parse(sessionStorage.getItem('itemDetail')))
  this.getplaylist()

  },
  methods: {
    computeplayCount(num) {
      if (num >= 100000000) {
        return (num / 1000000).toFixed(1) + "亿";
      } else if (num >= 10000) return (num / 10000).toFixed(1) + "万";
    },
    getplaylist(){
      this.playlist2 = JSON.parse(sessionStorage.getItem('itemDetail'))

    }
  },
};
</script>

<style lang="less" scoped>
.itemTop {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.8rem;
  position: relative;
  .icon {
    fill: #fff;
  }
  .bgimg {
    width: 100%;
    height: 500px;
    position: fixed;
    z-index: -1;
    filter: blur(30px); //背景虚化
  }
  .itemleft {
    width: 25%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 0.3rem;
    span {
      color: #fff;
    }
  }
  .itemright {
    width: 25%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 0.3rem;
  }
}
.itemTopContent {
  width: 100%;
  height: 12rem;
  padding: 1rem;
  margin-top: 0.4rem;
  display: flex;
  justify-content: space-between;
  .contentLeft {
    width: 50%;
    height: 10rem;
    position: relative;

    img {
      width: 10rem;
      height: 10rem;
      border-radius: 0.5rem;
      position: absolute;
      z-index: -1;
    }
    .palyCount {
      position: absolute;
      right: 1rem;
      margin-top: 0.5rem;
      .icon {
        width: 1.2rem;
        height: 1.2rem;
        margin-top: -0.09rem;
        margin-right: 0.4rem;
        vertical-align: middle;
      }
      span {
        font-size: 0.8rem;
        color: #fff;
      }
    }
  }
  .contentRight {
    width: 50%;
    height: 10rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .rightP_one {
      font-size: 0.9rem;
      font-weight: 900;
      color: #fff;
      font-family: "微软雅黑";
    }
    .right_img {
      width: 100%;
      height: 2rem;
      line-height: 0.6rem;
      color: #ccc;
      img {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        vertical-align: middle;
      }
      span {
        margin-left: 0.1rem;
      }
      .icon {
        width: 1rem;
        height: 1rem;
        margin-top: -0.08rem;
        vertical-align: middle;
      }
    }
    .rightP_two {
      width: 100%;
      height: 3.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        display: inline-block;
        width: 95%;
        height: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 0.8rem;
        color: #ccc;
      }
      .icon {
        width: 1rem;
        height: 1rem;
      }
    }
  }
}
.itemTopFooter{
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: space-around;
  margin-top: .2rem;
  .footerItem{
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    .icon{
      fill: #fff;
    }
    span{
      margin-top: .1rem;
    }
  }

}
</style>