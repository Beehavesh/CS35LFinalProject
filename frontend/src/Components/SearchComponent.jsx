import '../Sass/SearchComponent.scss';
import Topbar from '../Components/Common/Topbar/index.jsx';
import Search from '../Components/Common/Search/index.jsx';

export default function SearchComponent() {
    return (
        <div>
            <Topbar />
            <h1>Search</h1>
            <Search />
        </div>
    );
}