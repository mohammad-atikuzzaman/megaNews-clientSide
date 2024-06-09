import { useEffect, useState } from 'react';
import useAxiosPrivet from '../Hooks/useAxiosPrivet';
import ArticleCard from '../SharedComponents/ArticleCard';

const AllArticle = () => {
  const axiosSecure = useAxiosPrivet()
  const [articles, setArticles]= useState([])
  useEffect(()=>{
    axiosSecure.get("/all-articles")
    .then(res =>{
      setArticles(res.data)
    })
  },[axiosSecure])
  console.log(articles)
  return (
    <div>
      <h2 className='font-bold text-3xl text-center my-6'>All article</h2>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {
          articles.map(article => <ArticleCard key={article._id} article={article}></ArticleCard>)
        }
      </div>
    </div>
  );
};

export default AllArticle;