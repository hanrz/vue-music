<template>
  <transition name="slide">
    <music-list :songs="songs" :bg-image="bgImage" :title="title"></music-list>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from 'api/singer'
import { ERR_OK } from 'api/config.js'
import { createSong } from 'common/js/song.js'
// import { getSongUrl } from 'api/song'
import musicList from 'components/music-list/music-list'

export default {
  data() {
    return {
      songs: []
    }
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
    ...mapGetters([
      'singer'
    ])// 对应store/getter.js内的singer
  },
  created() {
    // console.log(this.singer)
    this._getDetail()
  },
  methods: {
    _getDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.data.list)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((item) => {
        let { musicData } = item
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
          // getSongUrl(musicData.songmid).then((res) => {
          // if (res.code === ERR_OK) {
          // const purl = `http://27.221.84.17/amobile.music.tc.qq.com/${res.req_0.data.midurlinfo[0].purl}`

          // }
          // })
        }
      })
      return ret
    }
  },
  components: {
    musicList
  }
}
</script>
<style lang="stylus">
@import '~common/stylus/variable'

.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
</style>
