import axios from "axios";
import { useData } from "../Context/Context";

export function HandleEditRows(Edits){
    
    Edits.map((Edit) => {
        if (Edit.price){
            axios.patch(`http://localhost:8000/api/products/${Edit._id}`, {price: Edit.price});
        } else {
            axios.patch(`http://localhost:8000/api/products/${Edit._id}`, {quantity: Edit.quantity});
        }
    })
}