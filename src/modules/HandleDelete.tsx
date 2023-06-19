import axios from "axios";
import { useData } from "../Context/Context";

export function HandleDelete (e) {
    
    let {updateList, setUpdateList} = useData();

    axios.delete(`http://localhost:8000/api/products/${e.target.id}`);

    setUpdateList(!updateList);
}