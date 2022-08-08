import requests from './index';
// 获取歌单详情页数据
export const getMusicList = (id) => requests({url:`/playlist/detail?id=${id}`,method:'GET'})
//获取歌单所有歌曲
export const getMusicAllItem = (id) => requests({url:`/playlist/track/all?id=${id}&limit=20&offset=0`,method:'GET'})
//获取歌词信息
export const getMusicLyric = (id)  => requests({url:`/lyric?id=${id}`,method:'GET'})