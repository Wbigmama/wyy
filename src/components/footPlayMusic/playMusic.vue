<template>
  <div class="footMusicBox" v-show="playMusic.musicId">
    <div class="musicPlay" :class="{ navisShow: props.navBarisShow === false }">
      <div class="imgBox">
        <img  class="playImg" :src="playMusic.musicpicUrl" alt="">
        
      </div>
      <div class="titleBox" @click="playMusic.changeDetailShowStatusFn(true)">
        <span class="title">{{ playMusic.musicName }}</span>
        <span class="singer"> - {{ playMusic.singer }}</span>
      </div>
      <div class="buttonBox">
        <img class="button1" v-if="playMusic.isPaused" @click="playButtonFn" src="@/assets/img/playMusicBar/play.png"
          alt="">
        <img class="button1" v-else @click="playButtonFn" src="@/assets/img/playMusicBar/pause.png" alt="">
        <img class="button2" src="@/assets/img/playMusicBar/playlist.png" alt="">
      </div>
      <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playMusic.musicId}.mp3`"></audio>
    </div>
  </div>
  <!-- 底部弹出 -->
  <van-popup v-model:show="playMusic.isDetailShow" position="bottom" :style="{ height: '100%' }">
    <detailPopup></detailPopup>
  </van-popup>
</template>

<script setup>
import { reactive, onMounted, getCurrentInstance, watch, onUpdated, nextTick, ref } from 'vue'
import { getMusicUrlAPI, getSongGeciAPI } from '@/utils/api/api.js'
import { usePlayMusicStore, playingListStore } from '@/stores/playMusic.js'
// import {playingListStore} from '@/stores/playingMusicList.js'

import detailPopup from '@/components/musicDetailPopup/popup.vue'

const playMusic = usePlayMusicStore()
const playingList = playingListStore()
const audio = ref()
const state = reactive({
  // isPause: true
  currentTime: 0,
  duration: 0
})

const props = defineProps(['navBarisShow'])

let updateCurrentTimeInterval = ''
onMounted(() => {
  console.log('ref.value', audio.value);
  // updateDurationFn()
  updateCurrentTimeFn()
  
  // console.log(1);
  // getMusicUrlFn()
  // console.log('ref', getCurrentInstance());
  // currentInstance = getCurrentInstance()
  // console.log('ref',currentInstance);
  // console.log('ref',audio.value);
})

onUpdated(() => {
  
  //   currentInstance = getCurrentInstance()
  // console.log('ref',currentInstance);
  // updateDurationFn(currentInstance.ctx.$refs.audio.duration)
})

// const showDetail = () => {
//   playMusic.changeDetailShowStatusFn()
// }

watch(() => playMusic.currentTime, () => {
  if (playMusic.currentTime === playMusic.duration) {
  // if (audio.value.ended === true) {
    // 复制pop组件的切换歌曲方法
    if (playMusic.playStyle === 3) {
      let newIndex = playMusic.itemIndex += 1
      // 判断是否到歌单最后一个
      if(newIndex === playingList.currentMusicList.length) {
        newIndex = 0
        playMusic.itemIndex = 0
      }
      playMusic.musicpicUrl = playingList.currentMusicList[newIndex].picUrl
      playMusic.musicName = playingList.currentMusicList[newIndex].name
      playMusic.singer = playingList.currentMusicList[newIndex].singer
      playMusic.musicId = playingList.currentMusicList[newIndex].id
    } else {
      const num = Math.round(Math.random() * playingList.currentMusicList.length)
      console.log(num);
      usePlayMusic.itemIndex = num - 1
      // usePlayMusic.musicId = playingList.currentMusicList[num - 1].id

      playMusic.musicpicUrl = playingList.currentMusicList[num - 1].picUrl
      playMusic.musicName = playingList.currentMusicList[num - 1].name
      playMusic.singer = playingList.currentMusicList[num - 1].singer
      playMusic.musicId = playingList.currentMusicList[num - 1].id
    }
  }
})

watch(() => playMusic.musicId, (count, precount) => {

  // console.log(`from ${precount} to ${count}`);
  // r如果正在播放的歌曲id发生改变则自动播放音乐
  playMusic.autoPlay = true
  playMusic.changeIsPausedStatusFn(false)

  playMusic.autoPlay = false

  let pushPlayedSongIdOBJ = {
    musicId: playMusic.musicId,
    musicpicUrl: playMusic.musicpicUrl,
    musicName: playMusic.musicName,
    singer: playMusic.singer
  }
  // getMusicUrlFn(pushPlayedSongIdOBJ)  
  // if (playMusic.saveplayedSongId) {
  playMusic.pushPlayedSongId(pushPlayedSongIdOBJ)
  // }

  // playingList
  // playMusic.getLyric(playMusic.musicId)


  // updateDurationFn(currentInstance.ctx.$refs.audio.duration)
  // updateCurrentTimeFn(currentInstance.ctx.$refs.audio.currentTime)
  // nowTime()
  // nextTick()
  // console.log('ref',currentInstance);
  // currentInstance.ctx.$refs.audio.autoplay = true
  audio.value.autoplay = true
  // updateDurationFn(currentInstance.ctx.$refs.audio.duration)
  
  // updateCurrentTimeFn(currentInstance.ctx.$refs.audio.currentTime)
  // updateCurrentTimeFn(audio.value.currentTime)
})

watch(() => playMusic.isPaused, () => {
  if (playMusic.autoPlay === false) {
    if (playMusic.isPaused) {
      // currentInstance.ctx.$refs.audio.pause()
      audio.value.pause()
      // clearInterval(updateCurrentTimeInterval)
    } else {
      // currentInstance.ctx.$refs.audio.play()
      audio.value.play()
      // updateCurrentTimeFn(audio.value.currentTime)
    }
  }

})


watch(() => playingList.currentMusicList, () => {
  console.log('加入播放组件的列表', playingList.currentMusicList);
  { deep: true }
})

const updateCurrentTimeFn = () => {
  updateCurrentTimeInterval = setInterval(() => {
    playMusic.updateCurrentTime(audio.value.currentTime)
    console.log('正在输出时间');
    updateDurationFn(audio.value.duration)
  }, 500)

}
const updateDurationFn = () => {
  playMusic.updateDuration(audio.value.duration)
}
const getMusicUrlFn = async (musicId) => {
  const res = await getMusicUrlAPI(musicId)
  console.log('musicUrl', res);
}








const playButtonFn = () => {
  playMusic.autoPlay = false
  // 判断音乐是否播放
  if (audio.value.paused) {
    // console.log('pinia状态1', playMusic.isPaused);
    playMusic.changeIsPausedStatusFn(false)
    // console.log('pinia状态2',playMusic.isPaused);
    // state.isPause = false
    // currentInstance.ctx.$refs.audio.play()
    audio.value.play()
  } else {
    // state.isPause = true
    playMusic.changeIsPausedStatusFn(true)
    // currentInstance.ctx.$refs.audio.pause()
    audio.value.pause()
  }

}
const toPlay = () => {
  state.isPause = false
  // console.log('play');
  // currentInstance.ctx.$refs.audio.play()
}

const toPause = () => {
  state.isPause = true
  // currentInstance.ctx.$refs.audio.pause()
}

</script>

<style lang="less" scoped>
.footMusicBox {
  // position: sticky;
  // bottom: 0;
  // background-color: red;
  height: 50px;
  // border-top: 1PX solid #b6b7b8;

  .musicPlay {
    border-top: 1PX solid #ececee;
    background-color: #f8f9fd;
    position: fixed;
    bottom: 50px;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;

    &.navisShow {
      bottom: 0px;
    }

    .imgBox {
      margin: auto 0;
      margin-left: 10px;

      .playImg {
        width: 40px;
        height: 40px;
        border-radius: 50%;

      }
    }

    .titleBox {
      // background-color: #fff;
      flex: 1;
      margin: auto 10px auto 10px;

      // 
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      .title {
        font-size: 15px;
        color: #2c2c2c;
      }

      .singer {
        font-size: 15px;
        color: #8a8a8a;
      }
    }

    .buttonBox {
      margin: auto 0;
      margin-right: 10px;

      .button1 {
        width: 25px;
        margin-right: 20px;
      }

      .button2 {
        width: 25px;
      }
    }
  }

}
</style>