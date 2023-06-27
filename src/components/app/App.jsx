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
