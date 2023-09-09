import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:44388/api/",
});

api.interceptors.request.use((o) => {
  const token = localStorage.getItem("user_token");
  o.headers.Authorization = token ? `Bearer ${token}` : "";
  return o;
});

export const getStatus = (id)=>{
  if(id === 1) return <span className="text-green-400">Open</span>
  if(id === 2) return <span className="text-red-400">Close</span>
  if(id === 3) return <span className="text-red-600">Canceled</span>


}
export default api;

export const checkDates = (date1)=>
{
  const d1= new Date(date1);
  const d2 = new Date();
  if(d1.getDay() !== d2.getDay()) return false;
  if(d1.getMonth() !== d2.getMonth()) return false;
  if(d1.getFullYear() !== d2.getFullYear()) return false;

  return true;
}