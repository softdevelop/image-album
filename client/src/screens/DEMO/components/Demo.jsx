import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { setDataDemo } from '../../../redux/actions'
import { getDemoData } from '../../../redux/selectors'
import '../assets/css/demo.scss'

const Demo = ({ setDataDemo, demo, ...props }) => {
  useEffect(() => {
    setDataDemo({ market: 'LTC_BTC', time: 'Day' });
  }, [])

  return (
    <div>
      <p>{demo.market}</p>
      DemoPage1
    </div>
  )
}

const mapActionToProps = {
  setDataDemo
}
const mapStateToProps = (state) => ({
  demo: getDemoData(state)
})


export default connect(mapStateToProps, mapActionToProps)(Demo)