import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    score: []
  },
  mutations: {
    onSelected(state,payload){ //페이로드=결과

      state.score.push(payload) //state  뒤에 오는게 push(~)배열마지막에 넣어요
    }
  },
  actions: {
  },
  modules: {
  },
  getters:{
    score:state =>{
      return state.score
    }

  }



  //konponento-------commit------>mutation
  //                                |
  //                                |
  //                                
})
