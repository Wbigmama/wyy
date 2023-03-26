<template>
  <div>

    <div class="topActionBar">
      <img class="BarImg1" src="@/assets/img/back.png" alt="" @click="backFn">
      <span>排行榜</span>
      <div class="blockBox"></div>
      <img class="BarImg2" src="@/assets/img/search-white.png" alt="">
      <img class="BarImg3" src="@/assets/img/more-white.png" alt="">
    </div>

    <div class="titleImageBox" v-if="state.bangdanZhaiyaoArr.length >= 1">
      <div class="Box">
        <!-- <img class="titleImg" :src="state.bangdanZhaiyaoArr[0].pic" alt=""> -->
        <span class="title">
          {{ state.bangdanZhaiyaoArr[0].name }}
        </span>
        <span class="des">
          {{ state.bangdanZhaiyaoArr[0].updateTime }}
        </span>
      </div>


      <!-- 歌曲展示栏 -->
      <div class="bottomBox" v-if="state.bangdanlistArr.length >= 1">
        <div class="playAll">
          <img src="@/assets/img/songlistdetail/playButton.png" alt="">
          <span class="span1">播放全部</span>
          <span class="span2">({{ state.bangdanlistArr.length }})</span>

        </div>
        <div class="vanList">
          <div class="vanCell" v-for="(item, index) in state.bangdanlistArr">
            <span class="span1">{{ index + 1 }}</span>
            <div class="nameBox" @click="goPlayMusic(item, index)">
              <span class="title">{{ item.name }}</span>
              <div class="authorBox">
                <!-- 要加上v-if -->
                <img src="@/assets/img/songlistdetail/love.png" alt="">
                <!-- <div v-else class="noMvBox" ></div> -->
                <span class="author">{{ item.singer }}</span>
              </div>

            </div>
            <div class="blockBox"></div>
            <img v-if="item.mv" class="playMVButton" src="@/assets/img/songlistdetail/Youtube.png" alt="">
            <div class="noMvBox" v-else></div>
            <img class="moreButton" src="@/assets/img/songlistdetail/more-bf.png" alt="">

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { showLoadingToast, closeToast } from 'vant'
import { getGedanXiangqingAPI, getGedanXiangqingDongtaiAPI } from '@/utils/api/api.js'
import {usePlayMusicStore, playingListStore} from '@/stores/playMusic.js'

const usePlayMusic = usePlayMusicStore()
const playingList = playingListStore()

const state = reactive({
  bangdanlistArr: [
    // {
    //   id: '',
    //   name: '',
    //   mv: '',
    //   singer: ''
    // }
  ],
  bangdanZhaiyaoArr: [
    // {
    //   updateTime: '',
    //   pic: ''
    // }
  ],
  // commentCount: 0,  //评论数
  // shareCount: 0, //分享数
  // bookedCount: 0  //收藏数

})
const router = useRouter()
const route = useRoute()

onMounted(() => {
  loading()
  Promise.all([getGedanXiangqingFn(route.query.id)]).then(() => {
    closeToast()
    // console.log('PROALL');
  })
  // getGedanXiangqingFn(route.query.id)
})

// watch(usePlayMusic.musicId, () => {

// })

const loading = () => {
  showLoadingToast({
  message: '加载中...',
  forbidClick: true,
});
}
const backFn = () => {
  router.go(-1)
}

const goPlayMusic = (item, index) => {

  usePlayMusic.itemIndex = index
  console.log(index);
  
  usePlayMusic.musicName = item.name
  usePlayMusic.singer = item.singer
  usePlayMusic.musicpicUrl = item.picUrl
  usePlayMusic.musicId = item.id
  // changePlayingMusicIdFn(item.id)
  usePlayMusic.changeIsPausedStatusFn(false)
  playingList.updateCurrentMusicList(state.bangdanlistArr)

}
// console.log('榜单详情接收到的',route.query.id);

// 此歌单详情api也可以用来获取排行榜单详情
const getGedanXiangqingFn = async (id) => {
  const res = await getGedanXiangqingAPI(id)
  // console.log('接收到的榜单详情', res.data);
  const listArr = res.data.playlist.tracks.map((item) => {
    return {
      id: item.id,
      name: item.name,
      mv: item.mv,
      singer: item.ar[0].name,
      picUrl: item.al.picUrl
    }
  })
  state.bangdanlistArr = listArr

  // playingList.currentMusicList = listArr
  // console.log('排行榜歌单列表中传入的', playingList.currentMusicList);
  // console.log('2',state.bangdanlistArr);

  // res.data.playlist.createTime
  const timeMs = res.data.playlist.updateTime
  const date = new Date(timeMs)
  const MM = date.getMonth() + 1
  const DD = date.getDate()

  const bangdanZhaiyaoArr = [
    {
      updateTime: MM + '月' + DD + '日更新',
      name: res.data.playlist.name
    }
  ]
  state.bangdanZhaiyaoArr = bangdanZhaiyaoArr
  // console.log('3', state.bangdanZhaiyaoArr);
  
  

}
// const getGedanXiangqingDongtaiAPIFn = async (id) => {
//   const res = await getGedanXiangqingDongtaiAPI(id)
//   state.bookedCount = res.data.bookedCount
//   state.commentCount = res.data.commentCount
//   state.shareCount = res.data.shareCount

// }

</script>

<style lang="less" scoped>
@marginAuto0: auto 0;

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

.titleImageBox {
  // position: relative;

  .Box {

    width: 100%;
    height: 200px;
    background-color: #ec4141;
    // overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .title {
      font-size: 50px;
      color: white;
      text-align: center;
    }

    .des {
      margin-top: 30px;
      font-size: 10px;
      color: white;
      text-align: center;
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
        width: 10PX;
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
</style>