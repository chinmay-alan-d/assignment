import Navbar from "./Navbar";
import { useAuth0 } from "@auth0/auth0-react";

const center_div = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
}

const NotAuthenticated = () => {
    return (
        <div style={center_div}>
            <h2>Please Login First</h2>
        </div>
    )
}


const LoadScreen = () => {
    return (
        <h2>Hold tight....</h2>
    );
}

const ProfileHeper = () => {
    const { user } = useAuth0();
    return (
        <div style={center_div}>
            <div className="card" style={{ width: '15rem' }}>
                <img className="card-img-top" src={user.picture} alt={user.given_name}/>
                <div className="card-body">
                    <h5 className="card-title">{user.name}</h5>
                    <p className="card-text">{user.email}</p>
                </div>
            </div>
        </div>
    );
}


const Authenticated = () => {
    const { isLoading } = useAuth0();
    return (
        <>
            {
                isLoading ? <LoadScreen /> :
                    <ProfileHeper />
            }
        </>
    );
}

function Profile() {
    const { isAuthenticated } = useAuth0();
    return (
        <div>
            <Navbar />
            {
                !isAuthenticated ? <NotAuthenticated />
                    : <Authenticated />
            }
        </div>
    );
}

export default Profile;