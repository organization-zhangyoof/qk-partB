
//全局model
export default {
  namespace: 'homeModels',
  state: {
      name:'初始值'
  },
  subscriptions: {

  },

  effects: {

    //获取二维码URL
    * setName( {payload} , {call, put, select}){
        yield put({
            type:'setState', 
            payload:{name:'哈哈哈'}
        });
    },

  },
  reducers: {
    setState(state, action) {
      return {
        ...state,
        ...action.payload
      }
    },
  }
}
