export default function UserHeader(props:{username:string}){
    return (
        <div className="UserHeader">
            <div className="Username">{props.username}</div>
        </div>
    )
}