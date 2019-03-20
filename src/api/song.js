import {commonParams} from './config'
import axios from 'axios'

export function getLyric(mid) {
  const url = '/api/lyric'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSongUrl(songmid) {
  const url = '/api/getSongUrl'

  const data = Object.assign({}, commonParams, {
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    data: {'req_0': {'module': 'vkey.GetVkeyServer', 'method': 'CgiGetVkey', 'param': {'guid': '360117955', 'songmid': [songmid], 'songtype': [0], 'uin': '0', 'loginflag': 1, 'platform': '20'}}, 'comm': {'uin': 0, 'format': 'json', 'ct': 20, 'cv': 0}}
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}