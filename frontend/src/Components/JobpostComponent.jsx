import '../Sass/JobpostComponent.scss';
import Topbar from '../Components/Common/Topbar/index.jsx';
import PostStatus from './Common/PostUpdate/index.jsx';
import GetUserPosts from './Common/GetUserPosts/index.jsx';
import GetAllPosts from './Common/GetAllPosts/index.jsx';

export default function JobpostComponent() {
    return (
        <div>
            <Topbar />
            <h1 className='heading1'> JOB POSTING </h1>
            <h2> Where <span style={{color:"#4E64EB"}}> employers </span> like you can post jobs targeting potential new hires by <span style={{color:"#4E64EB"}}> music taste</span>.</h2>
            <PostStatus />
            <GetAllPosts /> 
        </div>
    );
}
