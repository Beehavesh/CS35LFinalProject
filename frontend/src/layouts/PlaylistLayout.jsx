import Playlist from '../Pages/Playlist.jsx';
import Topbar from '../Components/Common/Topbar/index.jsx';

export default function PlaylistLayout() {
    return (
        <div>
            <Topbar />
             <Playlist />
        </div>
    );
}