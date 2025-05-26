import { useReducer, useRef } from 'react'
import { useSetLocation, useLocation } from '../Context/Provider'

const GeoForm = () => {
    const SetLocation=useSetLocation();
    const location = useLocation();
    const processing = useRef(false);
    const initInfo={"latitude": 35.6895, "longitude": 139.6917};
    const [geoinfo, setGeoInfo]=useReducer((prev, action)=>{
        switch(action.type){
            case 'latitude':{
                const newObj={...prev, "latitude": action.value};
                return newObj;
            }
            case 'longitude':{
                const newObj={...prev, "longitude": action.value};
                return newObj;
            }
        }
    },initInfo);
    const getLocation=(e)=>{//値の範囲を日本限定
        e.preventDefault();
        if (processing.current) return;
        processing.current = true;
        const ProcessChange = async()=>{//連続クリックを防ぐための処理
            try{
                await new Promise((resolve)=>{
                    setTimeout(resolve,2000);
                })
                processing.current = false;
            }catch(e){
                console.log(e);
            }
        }
        ProcessChange();
        if (geoinfo.longitude<=154 && geoinfo.longitude>=122 && geoinfo.latitude<=46 && geoinfo.latitude>=20){
            SetLocation([geoinfo.latitude, geoinfo.longitude]);
        }else{
            alert('日本の範囲で値を入力してください。122<=経度<=154, 20<=緯度<=46');
        }
    }
    return (
        <div>
            <h2>Location:緯度{location[0]}　経度{location[1]}</h2>
            <h3>緯度：{geoinfo.latitude}　経度：{geoinfo.longitude}</h3>
            
            <form onSubmit={getLocation}>
                <input type='number' step='0.0001' value={geoinfo.latitude} 
                onChange={(e)=>setGeoInfo({type:"latitude", value: e.target.value})}/>
                <input type='number' step='0.0001' value={geoinfo.longitude}
                onChange={(e)=>setGeoInfo({type:"longitude", value: e.target.value})}/>
                <button type="submit" >
                送信
                </button>
            </form>
        </div>
    )
}

export default GeoForm