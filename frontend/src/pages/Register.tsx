import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import{ FaUser } from 'react-icons/fa';
import {toast} from 'react-toastify';
import {register, reset} from '../lib/auth/authSlice';
import Spinner from "../components/common/Spinner";

export default function Register(){
    const [formData, setFormData] = useState({
        name:'',
        username:'',
        password:'',
        password2:''
    });

    const {name, username, password, password2} = formData;

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

        if(password !== password2){
            toast.error("Passwords do not match")
        }else{
            const userData = {
                name,
                username,
                password,
            }

            dispatch(register(userData) as any);
        }
    }
    if(isLoading){
        return <Spinner />
    }

    return(
        <>
            <section className="heading">
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Please create an account</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input 
                        type="text" 
                        className="form-control" 
                        id ="name"
                        name="name" 
                        value={name} 
                        placeholder="Enter your name" 
                        onChange={onChange}/>
                    </div>

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
                        <input 
                        type="password" 
                        className="form-control" 
                        id ="password2"
                        name="password2" 
                        value={password2} 
                        placeholder="Confirm password" 
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
