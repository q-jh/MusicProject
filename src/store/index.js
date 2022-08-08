//仓库
import Vuex from 'vuex';
import Vue from 'vue';
import { getMusicLyric } from '@/request/item'
import { getPhoneLogin } from '@/request/home'

//安装插件
Vue.use(Vuex);

let state = {
    playList: [{ //播放列表
        al: {
            id: 89039055,
            name: "雨爱抖音版",
            pic: 109951164966568500,
            picUrl: "https://p1.music.126.net/2f6UgY8Jc0Dy6jufMdIZeQ==/109951164966568495.jpg",
            pic_str: "109951164966568495"
        },
        id: 1446137141,
        name: "雨爱（抖音版）",
        ar: [{ name: "灏灏灏仔" }]
    }],
    playListIndex: 0, //默认下标为0
    isbtnShow: true, //暂停按钮的显示
    detailShow: false, //歌曲详情页的显示
    lyricList: {},//歌词
    currentTime: 0,//当前时间
    duration: 0,//歌曲总时长
    isLogin: false,//判断是否登录
    token: "",
    user: {},//用户信息

};
let mutations = {
    updateIsbtnShow(state, value) {
        state.isbtnShow = value
    },
    pushPlayList: function (state, value) {
        state.playList.push(value)
    },
    updatePlayList: function (state, value) {
        state.playList = value
    },
    updatePlayListIndex: function (state, value) {
        state.playListIndex = value
    },
    updateDetailShow: function (state) {
        state.detailShow = !state.detailShow
    },
    updateLyricList(state, value) {
        state.lyricList = value
    },
    updateCurrentTime: function (state, value) {
        state.currentTime = value
    },
    updateDuration: function (state, value) {
        state.duration = value
    },
    updateIsLogin: function (state, value) {
        state.isLogin = true
    },
    updateToken: function (state, value) {
        state.token = value
        localStorage.setItem('token', state.token)
    },
    updateUser: function (state, value) {
        state.user = value
    }

};
let actions = {
    async getLyric({ commit }, id) {
        let result = await getMusicLyric(id)
        if (result.status == 200) {
            commit("updateLyricList", result.data.lrc)
        } else {
            return Promise.reject();
        }
    },
    getLogin:async function(context,value){
        let res=await getPhoneLogin(value);
        // console.log(res);
        return res
      }

};

//创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state,
})


