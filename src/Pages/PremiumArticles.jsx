import ArticleCard from "../SharedComponents/ArticleCard";
import usePremiumArticle from "../Hooks/usePremiumArticle";

const PremiumArticles = () => {
  const [premiumArticles] = usePremiumArticle()

  return (
    <div>
      <h2 className="font-bold text-3xl text-center my-6">All of the premium content is here</h2>
      <div className="container mx-auto grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {
          premiumArticles.map(article => <ArticleCard key={article._id} article={article}></ArticleCard>)
        }
      </div>
    </div>
  );
};

export default PremiumArticles;
