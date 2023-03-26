import { defineStore } from 'pinia'

export const playingListStore = defineStore('playingList', {
  state: () => {
    return {
       currentMusicList: [
        {
          id: '1',
          name: '2'
        }
       ] 
    }
  },
})