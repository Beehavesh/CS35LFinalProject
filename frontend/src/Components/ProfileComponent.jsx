import linkedoutlogo from '../assets/linkedoutlogo2.png';
import '../Sass/ProfileComponent.scss';
import Topbar from '../Components/Common/Topbar/index.jsx';

export default function ProfileComponent() {
    return (
        <div>
            <Topbar />
            <img src = {linkedoutlogo} className = "linkedoutlogo"/>
            <h1>Profile</h1>
        </div>
    );
}