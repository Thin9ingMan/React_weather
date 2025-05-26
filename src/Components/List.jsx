import { useDateWeather } from "../Context/Provider"
import Item from "./Item";

const List = () => {
    const DailyDataSets=useDateWeather();
    return (
        <div>
            {DailyDataSets ?
            DailyDataSets.map(dailyData=>{
                return(
                    <Item dailyData={dailyData} key={dailyData.Date}/>
                )
            }
            ) : 'Loading...'}
        </div>
    )
}

export default List