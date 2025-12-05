import '../Sass/SearchComponent.scss';
import Topbar from '../Components/Common/Topbar/index.jsx';
import Search from '../Components/Common/Search/index.jsx';

export default function SearchComponent() {
    return (
        <div>
            <Topbar />
            <h1 className="heading2">SEARCH!</h1>
            <h3> Looking for something? Enter a search query. </h3>
            <Search />
        </div>
    );
}