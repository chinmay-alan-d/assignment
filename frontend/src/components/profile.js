import Navbar from "./Navbar";
import { useAuth0 } from "@auth0/auth0-react";

const NotAuthenticated = () => {
    return (
        <>
            <h1>Please Login to view Profile</h1>
        </>
    )
}

const LoadScreen = () => {
    return (
        <h2>Hold tight....</h2>
    );
}

const ProfileHeper = () => {
    const {user} = useAuth0();
    return (
        <>
            <img src={user.picture} alt="user.name"></img>
            <h3>{user.email}</h3>
            <h3>{user.name}</h3>
        </>
    );
}

const Authenticated = () => {
    const {isLoading} = useAuth0();
    return (
        <>
            {
                isLoading ? <LoadScreen/> :
                <ProfileHeper/>
            }
        </>
    );
}

function Profile() {
    const {isAuthenticated} = useAuth0();
    return (
        <div>
            <Navbar/>
            {
                !isAuthenticated ? <NotAuthenticated/> 
                : <Authenticated/>
            }
        </div>
    );
}

export default Profile;