import axios from "axios";

export function HandleDelete (id) {
    axios.delete(`http://localhost:8000/api/products/${id}`)
}