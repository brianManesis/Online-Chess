import { useState, useEffect } from "react"
import{ FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import {login, reset} from '../lib/auth/authSlice';
import Spinner from "../components/common/Spinner";

export default function Login(){
    const [formData, setFormData] = useState({
        username:'',
        password:''
    });

    const {username, password} = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user, isLoading,isError, isSuccess, message} = useSelector((state:any)=> state.auth);


    useEffect(() => {
        if(isError){
            toast.error(message)
        }
        if(isSuccess || user){
            navigate('/')
        }
        dispatch(reset());
    },[user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e:React.ChangeEvent<HTMLInputElement>)=> {
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }
    const onSubmit = (e:React.FormEvent)=>{
        e.preventDefault()

        const userData = {
            username,
            password,
        }
        dispatch(login(userData) as any);
    }

    if(isLoading){
        return <Spinner />
    }

    return(
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> LogIn
                </h1>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>

                    <div className="form-group">
                        <input 
                        type="username" 
                        className="form-control" 
                        id ="username"
                        name="username" 
                        value={username} 
                        placeholder="Enter your username" 
                        onChange={onChange}/>
                    </div>

                    <div className="form-group">
                        <input 
                        type="password" 
                        className="form-control" 
                        id ="password"
                        name="password" 
                        value={password} 
                        placeholder="Enter password" 
                        onChange={onChange}/>
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

