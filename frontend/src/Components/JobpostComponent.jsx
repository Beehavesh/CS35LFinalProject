import '../Sass/JobpostComponent.scss';
import Topbar from '../Components/Common/Topbar/index.jsx';
import PostStatus from './Common/PostUpdate/index.jsx';
import GetUserPosts from './Common/GetUserPosts/index.jsx';

export default function JobpostComponent() {
    return (
        <div>
            <Topbar />
            <h1 className='heading1'> Job Posting </h1>
            <h2> Where employers like you can post jobs targeting potential new hires by music taste. </h2>
            <PostStatus />
            <GetUserPosts />
        </div>
    );
}