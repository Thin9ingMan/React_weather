import React from 'react'

const Item = ({dailyData}) => {
  return (
    <>
    <h2>{dailyData.Date}</h2>
    <li>最高気温: {dailyData.temperatureMax}℃</li>
    <li>最低気温: {dailyData.temperatureMin}℃</li>
    <li>降水確率: {dailyData.precipitationProbability}%</li>
    <li>日降水量: {dailyData.rainSum}mm</li>
    </>
  )
}

export default Item