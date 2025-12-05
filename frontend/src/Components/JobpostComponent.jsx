import '../Sass/JobpostComponent.scss';
import Topbar from '../Components/Common/Topbar/index.jsx';
import PostStatus from './Common/PostUpdate/index.jsx';
import GetUserPosts from './Common/GetUserPosts/index.jsx';

export default function JobpostComponent() {
    return (
        <div>
            <Topbar />
            <PostStatus />
            <GetUserPosts />
        </div>
    );
}