import { defineStore } from 'pinia'

import {getSongGeciAPI} from '@/utils/api/api.js'
import { inject } from 'vue'

export const usePlayMusicStore = defineStore('playing', {
  state: () => {
    return {
      itemIndex: -1,
      musicId: '',
      musicpicUrl: '',
      musicName: '',
      singer: '',
      isPaused: true,
      isDetailShow: false,
      // 设置随机播放，单曲循环和顺序播放，1为随机，2为单曲，3为顺序
      playStyle: 1,
      lyric: '',
      playedSongId: [
        // {
        //   musicId: '',
        //   musicpicUrl: '',
        //   musicName: '',
        //   singer: ''
        // }
      ],
      autoPlay: false,
      currentTime: 0,  //当前时间
      duration: 0,   //歌曲总时长
      isLogin: false, //判断是否登录
      cookie: ''
    }
  },

  actions: {
    changeIsPausedStatusFn(value) {
      this.isPaused = value
      // console.log('状态改变成功');
      // console.log('改变状态成功', playingListStore.currentMusicList);
    },
    changePlayingMusicIdFn(value) {
      this.musicId
    },
    changeDetailShowStatusFn(value) {
      this.isDetailShow = value
    },
    changePlayStyleStatus() {
      if(this.playStyle < 3) {
        this.playStyle += 1
      } else {
        this.playStyle = 1
      }
    },
    async getLyric(id) {
      const res = await getSongGeciAPI(id)
      console.log('歌词', res);
    },
    pushPlayedSongId(valueObj) {
      this.playedSongId.push(valueObj)
      console.log('push数组',this.playedSongId);
    },
    updateCurrentTime(value) {
      this.currentTime = value
    },
    updateDuration(value) {
      this.duration = value
    },
    updateCookie(value) {
      this.cookie = value
      // VueCookies.set('wyyLoginCookie', value)
      
    }

  }
})

export const playingListStore = defineStore('playingList', {
  state: () => {
    return {
       currentMusicList: [
        {
          
        }
       ] 
    }
  },
  actions: {
    updateCurrentMusicList(array) {
      this.currentMusicList = array
      // console.log('当前列表',this.currentMusicList.currentMusicList);
    }
  }
})