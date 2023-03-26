<template>
  <div class="container">
    <img class="bgcMusicPic" :src="usePlayMusic.musicpicUrl" alt="">
    <div class="topActionBar">

      <img @click="hidePopup" class="backButton" src="@/assets/img/musicDetail/down.png" alt="">
      <div class="nameBox">
        <!-- bgcolor="#ffffff" -->
        <div class="title">
          <Vue3Marquee>
            {{ usePlayMusic.musicName }} </Vue3Marquee>
        </div>



        <!-- <Vue3Marquee class="title">{{ usePlayMusic.musicName }}</Vue3Marquee> -->
        <span class="singer">{{ usePlayMusic.singer }}</span>
      </div>
      <img class="shareButton" src="@/assets/img/musicDetail/share.png" alt="">
    </div>
    <!-- 中间图片 -->
    <div class="musicPicBox">
      <img class="cizhen" :class="{ active: !usePlayMusic.isPaused }" src="@/assets/img/musicDetail/wyycizhen.png" alt="">
      <img class="cipan" src="@/assets/img/musicDetail/wyycipan.png" alt="">
      <img class="musicPic" :class="{ active: !usePlayMusic.isPaused }" :src="usePlayMusic.musicpicUrl" alt="">
    </div>
    <!-- 底部按钮组件部分 -->
    <div class="bottom">
      <div class="firstBox">
        <img class="addLove" src="@/assets/img/musicDetail/love1.png" alt="">
        <!-- <img class="addLove" src="@/assets/img/musicDetail/love-active.png" alt=""> -->
        <img class="pinglun" src="@/assets/img/musicDetail/pinglun.png" alt="">
      </div>
      <div class="secondBox">
        <!-- <van-progress class="jindutiao" :percentage="50" stroke-width="5" :show-pivot="false"/> -->
        <input type="range" class="range" min="0" :max="usePlayMusic.duration" v-model="usePlayMusic.currentTime"
          step="0.01">
      </div>
      <div class="thirdBox">
        <div class="playStyle">
          <!-- v-show -->
          <img @click="usePlayMusic.changePlayStyleStatus" v-if="usePlayMusic.playStyle === 1"
            src="@/assets/img/musicDetail/suijipofang.png" alt="">
          <img @click="usePlayMusic.changePlayStyleStatus" v-else-if="usePlayMusic.playStyle === 2"
            src="@/assets/img/musicDetail/danquxunhuan.png" alt="">
          <img @click="usePlayMusic.changePlayStyleStatus" v-else="usePlayMusic.playStyle === 3"
            src="@/assets/img/musicDetail/shunxubofang.png" alt="">
        </div>
        <div class="main">
          <img class="next_last" @click="lastOne" src="@/assets/img/musicDetail/back.png" alt="">
          <!-- v-if -->
          <img @click="usePlayMusic.changeIsPausedStatusFn(false)" v-show="usePlayMusic.isPaused == true"
            class="play_pause" src="@/assets/img/musicDetail/play.png" alt="">
          <img @click="usePlayMusic.changeIsPausedStatusFn(true)" v-show="usePlayMusic.isPaused == false"
            class="play_pause" src="@/assets/img/musicDetail/pause.png" alt="">

          <img class="next_last" @click="nextOne" src="@/assets/img/musicDetail/next.png" alt="">
        </div>
        <div class="nowPlayingList">
          <img class="playinglist" src="@/assets/img/musicDetail/playlist.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 跑马灯
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import { reactive, computed, onMounted } from 'vue'
import { usePlayMusicStore, playingListStore } from '@/stores/playMusic.js'
const usePlayMusic = usePlayMusicStore()
const playingList = playingListStore()

const state = reactive({
  currentTime: 0
})

onMounted(() => {

})
computed(() => {

})



const hidePopup = () => {
  usePlayMusic.changeDetailShowStatusFn(false)
}

const lastOne = () => {
  // usePlayMusic.saveplayedSongId = false
  // 先去除数组最后一项（当前播放的音乐id）
  usePlayMusic.playedSongId.pop()
  let lastSongIdOBJ = usePlayMusic.playedSongId.pop()
  // console.log('去好的',lastSongIdOBJ);
  if (lastSongIdOBJ) {
    usePlayMusic.musicpicUrl = lastSongIdOBJ.musicpicUrl
    usePlayMusic.musicName = lastSongIdOBJ.musicName
    usePlayMusic.singer = lastSongIdOBJ.singer
    usePlayMusic.musicId = lastSongIdOBJ.musicId
  }

  // playingList.currentMusicList.filter((item) => {
  //   if(item.id = lastSongId) {
  //     usePlayMusic.musicId = item.id
  //   }
  // })
  // usePlayMusic.saveplayedSongId = true

}

const nextOne = () => {
  if (usePlayMusic.playStyle === 3) {
    let newIndex = usePlayMusic.itemIndex += 1
    // 判断是否到歌单最后一个
    if ((newIndex) === playingList.currentMusicList.length) {
      newIndex = 0
      usePlayMusic.itemIndex = 0
    }
    usePlayMusic.musicpicUrl = playingList.currentMusicList[newIndex].picUrl
    usePlayMusic.musicName = playingList.currentMusicList[newIndex].name
    usePlayMusic.singer = playingList.currentMusicList[newIndex].singer
    usePlayMusic.musicId = playingList.currentMusicList[newIndex].id
  } else {
    const num = Math.round(Math.random() * playingList.currentMusicList.length)
    // console.log(num);
    usePlayMusic.itemIndex = num - 1
    // usePlayMusic.musicId = playingList.currentMusicList[num - 1].id

    usePlayMusic.musicpicUrl = playingList.currentMusicList[num - 1].picUrl
    usePlayMusic.musicName = playingList.currentMusicList[num - 1].name
    usePlayMusic.singer = playingList.currentMusicList[num - 1].singer
    usePlayMusic.musicId = playingList.currentMusicList[num - 1].id
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  // background-color: #b8b8b8;
  background-color: rgba(0, 0, 0, 0.3);

  .bgcMusicPic {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    filter: blur(30px);

  }

  .topActionBar {
    // background-color: red;
    padding: 5px;
    display: flex;
    justify-content: space-between;
    height: 50px;

    .backButton {
      width: 40px;
      height: 40px;
      margin: auto 0;
    }

    .nameBox {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      // background-color: green;
      width: 250px;
      height: 40px;
      margin: auto 0;

      // Vue3Marquee {
      //   font-size: 20px;
      //   color: white;
      // }

      .title {
        color: white;
        text-align: center;
        font-size: 20px;
        // 超出省略
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .singer {
        color: #aaaaaa;
        text-align: center;
        font-size: 15px;
        // 超出省略
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .shareButton {
      width: 30px;
      height: 30px;
      margin: auto 0;
    }
  }

  .musicPicBox {
    display: flex;
    flex-direction: column;
    width: 100%;
    // height: 450px;
    // background-color: yellow;
    align-items: center;
    position: relative;

    .cizhen {
      position: absolute;
      width: 100px;
      height: 180px;
      transform-origin: 0 0;
      z-index: 1;
      transform: rotate(-20deg);

      &.active {
        transform: rotate(0deg);
      }
    }

    .cipan {
      position: absolute;
      top: 120px;
      width: 300px;
      height: 300px;
    }

    .musicPic {
      position: absolute;
      top: 175px;
      width: 190px;
      height: 190px;
      border-radius: 50%;

      &.active {
        animation: rotate 6s linear infinite;

        @keyframes rotate {
          0% {
            -webkit-transform: rotate(0deg);
          }

          10% {
            -webkit-transform: rotate(36deg);
          }

          20% {
            -webkit-transform: rotate(72deg);
          }

          30% {
            -webkit-transform: rotate(108deg);
          }

          40% {
            -webkit-transform: rotate(144deg);
          }

          50% {
            -webkit-transform: rotate(180deg);
          }

          60% {
            -webkit-transform: rotate(216deg);
          }

          70% {
            -webkit-transform: rotate(252deg);
          }

          80% {
            -webkit-transform: rotate(288deg);
          }

          90% {
            -webkit-transform: rotate(324deg);
          }

          100% {
            -webkit-transform: rotate(360deg);
          }


        }

      }
    }
  }

  .bottom {
    position: fixed;
    bottom: 0;
    // background-color: red;
    height: 150px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .firstBox {
      display: flex;
      justify-content: space-around;

      .addLove {
        width: 30px;
        height: 30px;
      }

      .pinglun {
        width: 30px;
        height: 30px;
      }
    }

    .secondBox {
      width: 100%;
      height: 50px;
      display: flex;

      // .jindutiao {
      //   margin-top: 20px;
      // }
      // background-color: green;
      .range {
        margin: auto 0;
        width: 100%;
        height: 3px;

        // &::-webkit-slider-runnable-track {
        //   background: yellow;
        // }

        // &::-moz-range-track {
        //   background: yellow;
        // }

        // &::-moz-range-thumb {
        //   background: blue;
        // }

        // &::-webkit-slider-thumb {
        //   background: blue;
        // }
        &:before {
          content: '';
          width: 10px;
          height: 3px;
          background-color: blue;
        }

        &::-webkit-slider-thumb {
          position: relative;
          -webkit-appearance: none;
          background-color: #e74c3c;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          // border: 2px solid white;
          cursor: pointer;
          // transition: 0.3s ease-in-out;
          // -webkit-box-shadow: 0 1px 1px black inset;
        }
      }
    }

    .thirdBox {
      padding: 0 40px 0 40px;
      height: 50px;
      display: flex;
      justify-content: space-between;

      .playStyle {
        margin: auto 0;

        img {
          width: 20px;
        }
      }

      .main {
        // background-color: green;
        display: flex;
        justify-content: space-between;
        margin: auto 0;
        width: 150px;

        .next_last {
          width: 20px;
          margin: auto 0;
        }

        .play_pause {
          width: 40px;
          margin: auto 0;
        }
      }

      .nowPlayingList {
        margin: auto 0;

        .playinglist {
          width: 20px;
        }
      }
    }
  }
}
</style>