import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link,useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../lib/auth/authSlice';

export default function Header(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state:any)=> state.auth);
    
    const onLogout = () =>{
        dispatch(logout() as any);
        dispatch(reset());
        navigate('/');
    }
    return (
        <header className ='header'>
            <Link className="logo" to = '/'>
                <h1 className="logo-text">Chess</h1>
                <img className="logo-img" alt="" src={'/assets/images/BlackRook.png'}  />
            </Link>

            <ul>
                {user ? (
                    <li>
                    <button className="btn" onClick={onLogout}>
                        <FaSignOutAlt /> Logout
                    </button>
                </li>
                ) :
                (<>
                    <li>
                        <Link to='/login'>
                            <FaSignInAlt /> Login
                        </Link>
                    </li>
                    <li>
                        <Link to='/register'>
                            <FaUser /> Register
                        </Link>
                    </li>
                </>)
                }
            </ul>
        </header>
    )
}