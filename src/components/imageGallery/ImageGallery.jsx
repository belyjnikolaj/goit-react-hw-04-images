

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

