<template>
  <div class="border">
    <div class="topActionBar">
      <img class="BarImg1" src="@/assets/img/back.png" alt="" @click="backFn">
      <span>歌单</span>
      <div class="blockBox"></div>
      <img class="BarImg2" src="@/assets/img/search-white.png" alt="">
      <img class="BarImg3" src="@/assets/img/more-white.png" alt="">
    </div>
    <div class="topBox" v-if="state.loading === false">
      <!-- <div class="topActionBar">
        <img class="BarImg1" src="@/assets/img/back.png" alt="">
        <span>歌单</span>
        <div class="blockBox"></div>
        <img class="BarImg2" src="@/assets/img/search-white.png" alt="">
        <img class="BarImg3" src="@/assets/img/more-white.png" alt="">
      </div> -->


      <div class="topInfo">
        <div class="leftBox">
          <div class="leftBox-relative">
            <img src="@/assets/img/play.png" alt="">
            <span>{{ state.gedanJieshao.playCount }}</span>
          </div>
          <img class="bigImg" :src="state.gedanJieshao.pic" alt="">
        </div>
        <div class="rightBox">
          <span class="title">{{ state.gedanJieshao.name }}</span>
          <span class="author">创建者:{{ state.gedanJieshao.createrNickName }}</span>
        </div>

      </div>
      <div class="topInfo-actionBar">
        <div class="actionBar1">
          <img src="@/assets/img/songlistdetail/zhuanfa.png" alt="">
          <span>{{ state.shareCount }}</span>
        </div>
        <div class="actionBar2">
          <img src="@/assets/img/songlistdetail/message.png" alt="">
          <span>{{ state.commentCount }}</span>
        </div>
        <div class="actionBar3">
          <img src="@/assets/img/songlistdetail/tianjia.png" alt="">
          <span>{{ state.bookedCount }}</span>
        </div>
      </div>
    </div>
    <!-- 歌曲展示栏 -->
    <div class="bottomBox" v-if="state.loading === false">
      <div class="playAll">
        <img src="@/assets/img/songlistdetail/playButton.png" alt="">
        <span class="span1">播放全部</span>
        <span class="span2">(44)</span>

      </div>
      <div class="vanList">
        <div class="vanCell" v-for="(item, index) in state.gedanDetailList" :key="item.id" >
          <span class="span1">{{ index + 1 }}</span>
          <div class="nameBox" @click="goMusicDetailFn(item, index)">
            <span class="title">{{ item.name }}</span>
            <div class="authorBox">
              <!-- 要加上v-if -->
              <img src="@/assets/img/songlistdetail/love.png" alt="">
              <span class="author">{{ item.singer }}</span>
            </div>

          </div>
          <div class="blockBox">

          </div>
          <img v-if="item.mv" class="playMVButton" src="@/assets/img/songlistdetail/Youtube.png" alt="">
          <div class="noMvBox" v-else></div>
          <img class="moreButton" src="@/assets/img/songlistdetail/more-bf.png" alt="">

        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { showLoadingToast, closeToast } from 'vant';
import { getGedanXiangqingAPI, getMusicUrlAPI, huoqugedanSuoyouGequAPI, getGedanXiangqingDongtaiAPI } from '@/utils/api/api.js'
import {usePlayMusicStore, playingListStore} from '@/stores/playMusic.js'

const route = useRoute()
const router = useRouter()
const PlayMusicStore = usePlayMusicStore()
const playingList = playingListStore()



const state = reactive({
  gedanDetailList: [],
  gedanJieshao: [],
  loading: false,
  commentCount: 0,  //评论数
  shareCount: 0, //分享数
  bookedCount: 0  //收藏数

})

onMounted(() => {
  loadingFn()
  let songListId = route.query.id
  // console.log('route',songid);
  getGedanXiangqingFn(songListId)
  getGedanXiangqingDongtaiAPIFn(songListId)

  
})

const backFn = () => {
  router.go(-1)
}

const getGedanXiangqingDongtaiAPIFn = async (id) => {
  const res = await getGedanXiangqingDongtaiAPI(id)
  // console.log('歌单动态', res);
  state.bookedCount = res.data.bookedCount
  state.commentCount = res.data.commentCount
  state.shareCount = res.data.shareCount
}

const goMusicDetailFn = async (item, index) => {
  // const res = await  getMusicUrlAPI(item.id)
  // console.log('歌曲详情', res);
  // 点击列表中的歌曲后,将列表传给store,然后将当前歌曲的id传给播放组件以及store
  PlayMusicStore.itemIndex = index
  
  PlayMusicStore.musicName = item.name
  PlayMusicStore.singer = item.singer
  PlayMusicStore.musicpicUrl = item.picUrl
  playingList.updateCurrentMusicList(state.gedanDetailList)
  PlayMusicStore.musicId = item.id
}

const loadingFn = () => {
  state.loading = true
  showLoadingToast({
    message: '加载中...',
    forbidClick: true,
  });
}

const getGedanXiangqingFn = async (songListId) => {
  // const AA = await huoqugedanSuoyouGequAPI(songListId)
  // console.log('AA', AA);
  const res = await getGedanXiangqingAPI(songListId)
  console.log('歌单详情', res.data);
  let playCountStr = ''
  if (res.data.playlist.playCount >= 100000000) {
    playCountStr = (res.data.playlist.playCount / 100000000).toFixed(1) + '亿'

  } else if (res.data.playlist.playCount >= 10000) {
    playCountStr = (res.data.playlist.playCount / 10000).toFixed(1) + '万'
  } else {
    playCountStr = res.data.playlist.playCount
  }
  state.gedanJieshao = {
    name: res.data.playlist.name,
    pic: res.data.playlist.coverImgUrl,
    playCount: playCountStr,
    // shareCount: res.data.playlist.shareCount
    createrNickName: res.data.playlist.creator.nickname,

  }
  // console.log('state.gedanJieshao',state.gedanJieshao);
  const songListArr = res.data.playlist.tracks.map((item) => {
    return {
      id: item.id,
      name: item.name,
      mv: item.mv,
      singer: item.ar[0].name,
      picUrl: item.al.picUrl
    }
  })
  state.gedanDetailList = songListArr
  closeToast()
  state.loading = false
  // console.log('songListArr', songListArr);
}



</script>

<style lang="less" scoped>
@marginAuto0: auto 0;

.border {
  background-color: #e7e5e5;

  // height: 500px;
  .topActionBar {
    display: flex;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 10;
    background-color: #e7e5e5;
    // background-color: red;
    padding: 5px;
    height: 30px;

    .BarImg1 {
      width: 30px;
      height: 30px;
      margin: @marginAuto0;
    }

    span {
      font-size: 20px;
      color: white;
      margin: @marginAuto0;
      margin-left: 20px;
    }

    .blockBox {
      flex: 1;
    }

    .BarImg2 {
      width: 30px;
      height: 30px;

      margin: @marginAuto0;
      margin-right: 20px;
    }

    .BarImg3 {
      width: 30px;
      height: 30px;
      margin: @marginAuto0;
    }
  }

  // 

  .topBox {
    padding: 5px;

    // .topActionBar {
    //   display: flex;
    //   justify-content: space-between;
    //   position: sticky;
    //   top: 0;
    //   z-index: 10;
    //   background-color: #e7e5e5;

    //   .BarImg1 {
    //     width: 30px;
    //     height: 30px;
    //     margin: @marginAuto0;
    //   }

    //   span {
    //     font-size: 20px;
    //     color: white;
    //     margin: @marginAuto0;
    //     margin-left: 20px;
    //   }

    //   .blockBox {
    //     flex: 1;
    //   }

    //   .BarImg2 {
    //     width: 30px;
    //     height: 30px;

    //     margin: @marginAuto0;
    //     margin-right: 20px;
    //   }

    //   .BarImg3 {
    //     width: 30px;
    //     height: 30px;
    //     margin: @marginAuto0;
    //   }
    // }

    .topInfo {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;

      .leftBox {
        position: relative;

        .leftBox-relative {
          position: absolute;
          top: 5px;
          display: flex;
          width: 100px;
          justify-content: flex-end;

          img {
            width: 10px;
            height: 10px;
            margin: @marginAuto0;
            margin-right: 5px;
          }

          span {
            font-size: 10px;
            color: white;
            margin: @marginAuto0;
          }


        }

        .bigImg {
          width: 100px;
          height: 100px;
          border-radius: 6px;
        }


      }

      .rightBox {
        display: flex;
        flex-direction: column;
        width: 250px;

        .title {
          font-size: 18px;
          color: white;
        }

        .author {
          font-size: 10px;
          margin-top: 20px;
          color: rgb(185, 183, 183);
        }
      }


    }

    .topInfo-actionBar {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;

      .actionBar1 {
        background-color: #bdbdbd;
        width: 110px;
        height: 30px;
        display: flex;
        justify-content: center;
        border-radius: 15px;

        img {
          width: 25px;
          height: 25px;
          margin: @marginAuto0;
        }

        span {
          color: white;
          font-size: 15px;
          margin: @marginAuto0;
        }
      }

      .actionBar2 {
        background-color: #bdbdbd;
        width: 110px;
        height: 30px;
        display: flex;
        justify-content: center;
        border-radius: 15px;

        img {
          width: 25px;
          height: 25px;
          margin: @marginAuto0;
        }

        span {
          color: white;
          font-size: 15px;
          margin: @marginAuto0;
        }
      }

      .actionBar3 {
        background-color: #bdbdbd;
        width: 110px;
        height: 30px;
        display: flex;
        justify-content: center;
        border-radius: 15px;

        img {
          width: 25px;
          height: 25px;
          margin: @marginAuto0;
        }

        span {
          color: white;
          font-size: 15px;
          margin: @marginAuto0;
        }
      }
    }
  }

  .bottomBox {
    background-color: #f8f9fd;
    padding: 5px;
    border-radius: 20px 20px 0 0;

    .playAll {
      position: sticky;
      // 顶部高度30px + 10px的内边距,等于40px
      top: 40px;
      z-index: 10;
      display: flex;
      height: 40px;
      background-color: #f8f9fd;

      img {
        width: 20px;
        height: 20px;
        margin: @marginAuto0;
      }

      .span1 {
        font-size: 15px;
        color: black;
        font-weight: bold;
        margin: @marginAuto0;
        margin-left: 20px;
      }

      .span2 {
        color: #bdbdbd;
        font-size: 10px;
        margin: @marginAuto0;
        margin-left: 10px;
      }
    }

    .vanList {

      .vanCell {
        display: flex;

        justify-content: space-between;
        height: 50px;

        .span1 {
          font-size: 15px;
          color: #bdbdbd;
          margin: @marginAuto0;
          margin-left: 10px;
        }

        .nameBox {
          flex: 1;
          // background-color: green;
          margin: @marginAuto0;
          margin-left: 20px;

          .title {
            display: inline-block;
            font-size: 15px;
            width: 220px;
            // 超出省略
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .authorBox {
            img {
              width: 10px;
              height: 10px;
            }

            .author {
              margin-left: 5px;
              font-size: 10px;
              width: 220px;
              color: #bdbdbd;
              // 超出省略
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
        .blockBox {
          width: 10px;
        }

        .playMVButton {
          width: 30px;
          height: 30px;
          margin: @marginAuto0;
          margin-right: 20px;
        }

        .noMvBox {
          width: 30px;
          height: 30px;
          margin: @marginAuto0;
          margin-right: 20px;
          // background-color: red;
        }

        .moreButton {
          width: 30px;
          height: 30px;
          margin: @marginAuto0;
        }
      }
    }
  }

}
</style>