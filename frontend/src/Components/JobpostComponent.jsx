import '../Sass/JobpostComponent.scss';
import Topbar from '../Components/Common/Topbar/index.jsx';
import PostStatus from './Common/PostUpdate/index.jsx';

export default function JobpostComponent() {
    return (
        <div>
            <Topbar />
            <PostStatus />
            <h1>Jobposting</h1>
        </div>
    );
}