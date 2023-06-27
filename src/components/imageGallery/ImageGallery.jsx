

import React, { useState, useEffect } from 'react';
import { animateScroll } from 'react-scroll';
import Notiflix from 'notiflix';
import fetchImages from "services/fetchImages.js";
import Loader from 'components/loader';
import Button from "components/button";
import ImageGalleryItem from "components/imageGalleryItem";
import css from './ImageGallery.module.css';

const ImageGallery = ({ searchText }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    const savedPage = localStorage.getItem("currentPage");
    if (savedPage) {
      setPage(parseInt(savedPage));
    }
  }, []);

  useEffect(() => {
    if (searchText !== '') {
      setIsLoading(true);
      setError(null);
      setPage(1);
      fetchImages(searchText, 1)
        .then(data => {
          if (!data.hits || data.hits.length === 0) {
            throw new Error('No results found.');
          }
          setData(data.hits);
          setTotalHits(data.totalHits);
          setIsLoading(false);
          animateScroll.scrollToBottom({
            duration: 500,
            delay: 0,
            smooth: 'easeInOutQuart'
          });
        })
        .catch(error => {
          console.error(error);
          Notiflix.Notify.failure('An error occurred while fetching images. Please try again later.');
          setError('An error occurred while fetching images.');
          setIsLoading(false);
        });
    }
  }, [searchText]);

  const handlePageChange = () => {
    const nextPage = page + 1;
    setIsLoading(true);
    fetchImages(searchText, nextPage)
      .then(data => {
        setData(prevData => [...prevData, ...data.hits]);
        setIsLoading(false);
        setPage(nextPage);
        animateScroll.scrollToBottom({
          duration: 500,
          delay: 0,
          smooth: 'easeInOutQuart'
        });
      })
      .catch(error => {
        console.error(error);
        Notiflix.Notify.failure('An error occurred while fetching images. Please try again later.');
        setError('An error occurred while fetching images.');
        setIsLoading(false);
      });
  };

  useEffect(() => {
    localStorage.setItem("currentPage", page);
  }, [page]);

  return (
    <>
      <ul className={css.gallery}>
        {data.map(el => (
          <ImageGalleryItem
            key={el.id}
            imageUrl={el.webformatURL}
            alt={el.tags}
            largeImageURL={el.largeImageURL}
          />
        ))}
      </ul>
      <div className={css['container-center']}>
        {isLoading && <Loader />}
        {data.length > 0 && data.length !== totalHits && (
          <Button handlePageChange={handlePageChange} />
        )}
      </div>
    </>
  );
}

export default ImageGallery;





// ________________________________________________
// import { useEffect, useState } from 'react';
// import { animateScroll } from 'react-scroll';
// import Notiflix from 'notiflix';
// import fetchImagesService from 'services/fetchImages.js';
// import Loader from 'components/loader';
// import Button from 'components/button';
// import ImageGalleryItem from 'components/imageGalleryItem';
// import css from './ImageGallery.module.css';

// const ImageGallery = ({ searchText }) => {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(1);
//   const [totalHits, setTotalHits] = useState(0);

//   useEffect(() => {
//     const savedPage = localStorage.getItem('currentPage');
//     if (savedPage) {
//       setPage(parseInt(savedPage));
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [searchText, page, fetchData]);

//   useEffect(() => {
//     localStorage.removeItem('currentPage');
//   }, [page]);

//   const fetchData = async () => {
//     try {
//       setIsLoading(true);
//       const fetchedData = await fetchImagesService(searchText, page);

//       if (!fetchedData.hits || fetchedData.hits.length === 0) {
//         throw new Error('No results found.');
//       }

//       setData(prevData =>
//         page === 1 ? fetchedData.hits : [...prevData, ...fetchedData.hits]
//       );
//       setTotalHits(fetchedData.totalHits);
//       setIsLoading(false);

//       animateScroll.scrollToBottom({
//         duration: 500,
//         delay: 0,
//         smooth: 'easeInOutQuart',
//       });
//     } catch (error) {
//       console.error(error);
//       Notiflix.Notify.failure(
//         'An error occurred while fetching images. Please try again later.'
//       );
//       setError('An error occurred while fetching images.');
//       setIsLoading(false);
//     }
//   };

//   const handlePageChange = () => {
//     const nextPage = page + 1;
//     setIsLoading(true);
//     fetchData(searchText, nextPage);
//     setPage(nextPage);
//   };

//   return (
//     <>
//       <ul className={css.gallery}>
//         {data.map(el => (
//           <ImageGalleryItem
//             key={el.id}
//             imageUrl={el.webformatURL}
//             alt={el.tags}
//             largeImageURL={el.largeImageURL}
//           />
//         ))}
//       </ul>
//       <div className={css['container-center']}>
//         {isLoading && <Loader />}
//         {data.length > 0 && data.length !== totalHits && (
//           <Button handlePageChange={handlePageChange} />
//         )}
//       </div>
//     </>
//   );
// };

// export default ImageGallery;


// _________________________________________________






// class ImageGallery extends Component {
//   state = {
//     data: [],
//     isLoading: false,
//     error: null,
//     page: 1,
//     searchText: '',
//     totalHits: 0 
//   };

//   componentDidMount() {
//     const savedPage = localStorage.getItem("currentPage");
//     if (savedPage) {
//       this.setState({ page: parseInt(savedPage) });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (prevProps.searchText !== this.props.searchText) {
//       const { searchText } = this.props;
//       this.setState({ searchText, isLoading: true, error: null, page: 1 }, () => {
//         this.fetchImages(searchText, 1);
//       });
//     }

//     if (prevState.page !== this.state.page) {
//       localStorage.setItem("currentPage", this.state.page);
//     }
//   }

//   componentWillUnmount() {
//     localStorage.removeItem("currentPage");
//   }

//   fetchImages = async (searchText, page) => {
//     try {
//       const data = await fetchImages(searchText, page);

//       if (!data.hits || data.hits.length === 0) {
//         throw new Error('No results found.');
//       }

//       this.setState(prevState => ({
//         data: prevState.page === 1 ? data.hits : [...prevState.data, ...data.hits],
//         totalHits: data.totalHits, // Оновлення значення totalHits
//         isLoading: false
//       }));

//       animateScroll.scrollToBottom({
//         duration: 500,
//         delay: 0,
//         smooth: 'easeInOutQuart'
//       });
//     } catch (error) {
//       console.error(error);
//       Notiflix.Notify.failure(
//         'An error occurred while fetching images. Please try again later.'
//       );
//       this.setState({ error: 'An error occurred while fetching images.', isLoading: false });
//     }
//   };

//   handlePageChange = () => {
//     const { searchText, page } = this.state;
//     const nextPage = page + 1;

//     this.setState({ isLoading: true }, () => {
//       this.fetchImages(searchText, nextPage);
//       this.setState({ page: nextPage });
//     });
//   };

//   render() {
//     const { data, isLoading, totalHits } = this.state;

//     return (
//       <>
//         <ul className={css.gallery}>
//           {data.map(el => (
//             <ImageGalleryItem
//               key={el.id}
//               imageUrl={el.webformatURL}
//               alt={el.tags}
//               largeImageURL={el.largeImageURL}
//             />
//           ))}
//         </ul>
//         <div className={css['container-center']}>
//           {isLoading && <Loader />}
//           {data.length > 0 && data.length !== totalHits && ( 
//             <Button handlePageChange={this.handlePageChange} />
//           )}
//         </div>
//       </>
//     );
//   }
// }

// export default ImageGallery;
