import React, { useEffect, useState } from 'react';
import newApi from '../../apis/newsApi';
import NewsList from './components/NewsList';
import NewSkeleton from './components/NewsSkeleton/NewsSkeleton';

function AllNews(props) {
  const [allNews, setAllNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAllNews = async () => {
      setIsLoading(true);
      const res = await newApi.getAllNews();
      setAllNews(res.articles);
      setIsLoading(false);
    };
    try {
      getAllNews();
    } catch (error) {
      console.log('loi roi ne');
      alert('Get Data failed,please try again');
      setIsLoading(false);
    }
  }, []);
  return isLoading ? <NewSkeleton /> : <NewsList allNews={allNews} />;
}

export default AllNews;
