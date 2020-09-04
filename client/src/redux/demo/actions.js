import { DEMO_ACTION } from './actionTypes'
import * as API from '../../services/api/demo'

export const setData = (payload) => ({
  type: DEMO_ACTION,
  payload
})


export const setDataDemo = (data) => (dispatch) => {
  const _data = API.getCandlesByPeriodAPI(data);
  dispatch(setData(_data));
}