<template>
  <div>
    <div class="searchTop">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <input
        type="text"
        placeholder="陈奕迅"
        v-model="searchkey"
        @keydown.enter="enterKey"
      />
    </div>
    <div class="searchHistory">
      <span class="searchSpan">历史</span>
      <span
        v-for="(item, index) in keyWorldList"
        :key="index"
        class="spanKey"
        @click="searchHistory(item)"
      >
        {{ item }}
      </span>
      <svg class="icon" aria-hidden="true" @click="deHistory">
        <use xlink:href="#icon-shanchu"></use>
      </svg>
    </div>
    <div class="itemList">
      <div class="item" v-for="(item, index) in searchList" :key="item.id">
        <div class="itemLeft" @click="updateIndex(item)">
          <span class="leftSpan">{{ index+1 }}</span>
          <div>
            <p>{{ item.name }}</p>
            <span v-for="(item1, index) in item.artists" :key="index">{{
              item1.name
            }}</span>
          </div>
        </div>
        <div class="itemRight">
          <svg class="icon bofang" aria-hidden="true" v-if="item.mvid != 0">
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
import { getSearchMusic } from "@/request/home";
export default {
  name: "Search",
  data() {
    return {
      keyWorldList: [],
      searchkey: "",
      searchList: [],
    };
  },
  mounted() {
    this.keyWorldList = JSON.parse(localStorage.getItem("keyWorldList"))
      ? JSON.parse(localStorage.getItem("keyWorldList"))
      : [];
  },
  methods: {
    async enterKey() {
      if (this.searchkey.trim() !== "") {
        this.keyWorldList.unshift(this.searchkey);
        //去重
        this.keyWorldList = [...new Set(this.keyWorldList)];
        //固定长度
        if (this.keyWorldList.length > 10) {
          this.keyWorldList.splice(this.keyWorldList.length - 1, 1);
        }
        localStorage.setItem("keyWorldList", JSON.stringify(this.keyWorldList));
        let result = await getSearchMusic(this.searchkey);
        if (result.status == 200) {
          this.searchList = result.data.result.songs;
        }
        this.searchkey = "";
      }
    },
    deHistory() {
      localStorage.removeItem("keyWorldList");
      this.keyWorldList = [];
    },
    async searchHistory(item) {
      let result = await getSearchMusic(item);
      if (result.status == 200) {
        this.searchList = result.data.result.songs;
      }
    },
    updateIndex(item){
        item.al=item.album
        item.al.picUrl=item.album.artist.img1v1Url
        this.$store.commit("pushPlayList",item)
        this.$store.commit("updatePlayListIndex",this.$store.state.playList.length-1)

    }
  },
};
</script>

<style lang="less" scoped>
.searchTop {
  width: 100%;
  height: 3rem;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  input {
    margin-left: 0.6rem;
    border: none;
    border-bottom: 1px solid #999;
    width: 90%;
    padding: 0.2rem;
  }
}
.searchHistory {
  width: 100%;
  padding: 0.2rem;
  position: relative;
  .searchSpan {
    font-weight: 700;
    padding: 0 1rem;
  }
  .spanKey {
    padding: 0.1rem 0.2rem;
    background-color: rgb(185, 169, 169);
    border-radius: 0.4rem;
    margin: 0.1rem 0.2rem;
    display: inline-block;
  }
  .icon {
    width: 1.6rem;
    height: 1.6rem;
    position: absolute;
    right: 0.2rem;
  }
}
.itemList {
  margin-top: 1rem;
  width: 100%;
  padding: 0.2rem;
  .item {
    width: 100%;
    height: 3rem;
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
        width: 3rem;
        text-align: center;
      }
      div {
        p {
          width:100%;
          height: 1.4rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 700;
        }
        span {
          font-weight: 400;
          font-size: 0.7rem;
          color: #999;
        }
      }
    }
    .itemRight {
      width: 20%;
      height: 100%;
      display: flex;
      // justify-content: space-between;
      align-items: center;
      position: relative;
      right: 0.5rem;
      .icon {
        fill: #999;
      }
      .bofang {
        position: absolute;
        left: 0;
      }
      .liebiao {
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>