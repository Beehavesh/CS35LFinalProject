import linkedoutlogo from '../Assets/linkedoutlogo2.png';
import '../Sass/ProfileComponent.scss';

export default function RegisterComponent() {
    return (
        <div>
            <img src = {linkedoutlogo} className = "linkedoutlogo"/>
            <h1>Profile</h1>
        </div>
    );
}