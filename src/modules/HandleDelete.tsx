import axios from "axios";

export function HandleDelete (e) {
    axios.delete(`http://localhost:8000/api/products/${e.target.id}`)
}