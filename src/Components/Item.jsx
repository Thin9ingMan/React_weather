import {useState} from 'react'

const Item = ({dailyData}) => {
  const [show, changeShow]=useState(false);
  const hoursData=dailyData.hourList;
  const showHour=()=>{
    changeShow(prev=>!prev);
  }
  return (
    <>
    <h2>{dailyData.Date}</h2>
    <li>最高気温: {dailyData.temperatureMax}℃</li>
    <li>最低気温: {dailyData.temperatureMin}℃</li>
    <li>降水確率: {dailyData.precipitationProbability}%</li>
    <li>日降水量: {dailyData.rainSum}mm</li>
    {show ? 
      <div>
        <button onClick={showHour}>非表示</button>
        {hoursData.map(hourData=>{
          return(
            <>
            <h3>時間：{hourData.hour}</h3>
            <li>気温：{hourData.hour_temperature}℃</li>
            <li>降水確率：{hourData.hour_pro}%</li>
            <li>降水量：{hourData.hour_rainsum}mm</li>       
            </>
          )
        })}
        <button onClick={showHour}>非表示</button>
      </div>
    : <div>
        <button onClick={showHour}>表示</button>
      </div>}
    
    </>
  )
}

export default Item