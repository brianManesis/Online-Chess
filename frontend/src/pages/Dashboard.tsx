import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

export default function Dashboard(){
    const navigate = useNavigate();

    const {user} = useSelector((state:any) => state.auth);

    useEffect(() =>{
        if(!user){
            navigate('/login')
        }
    },[user,navigate])

    return(
        <div>
            <h1>Welcome {user ? user.name : 'Guest'}</h1>
            <button className="">Create Game</button>
            <button className="">Join Game</button>
        </div>
    )
}