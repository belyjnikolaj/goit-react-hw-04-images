import { useState } from 'react';
import css from './App.module.css'
import Searchbar from 'components/searchbar';
import ImageGallery from 'components/imageGallery';

const App = () => {
  const [searchText, setSearchText] = useState('')

  const handleSearch = async (searchText) => {
    setSearchText(searchText);
 
  };
    return (
      <div className={css.App}>
        <Searchbar handleSearch={ handleSearch} />
        <ImageGallery searchText={searchText}/>      
      </div>
    );

}

export default App;
// class App extends Component {
//   state = {
//     searchText:'',
//   };

//   handleSearch = async (searchText) => {
//     this.setState({ searchText });
 
//   };

//   render() {
//     const { searchText } = this.state;

//     return (
//       <div className={css.App}>
//         <Searchbar handleSearch={ this.handleSearch} />
//         <ImageGallery searchText={searchText}/>      
//       </div>
//     );
//   }
// }

// export default App;
