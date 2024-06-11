import Carocel from '../components/Carocel';
import Publishers from '../components/Publishers';
import Statistics from '../components/Statistics';

const Home = () => {
  return (
    <div className="container mx-auto">
      <div>
        <div className=" bg-gray-800 p-4 my-2 flex items-center text-gray-400">
          <div className="w-[50%] border-r">
            <h2 className="text-4xl font-bold">Mega News</h2>
            <p>All trending news here</p>
          </div>
          <div className="font-medium text-xl">
            <marquee direction="left">
              Discover and share trending articles with ease on our platform.
              Stay updated with the latest news, viral stories, and hot topics
              from around the globe. Engage with a community of readers, share
              your insights, and explore diverse perspectives all in one place.
              Join now and start the conversation!
            </marquee>
          </div>
        </div>
        <div className="flex flex-col md:flex-row text-gray-400">
          <div className="md:w-[20%] bg-gray-800 md:mr-2">
            <h2 className="text-3xl p-4 ">
              To sharing knowledge and collaborating the next genration Join us.
            </h2>
            <p className="p-4">
              Discover and share trending articles with ease on our platform.
              Stay updated with the latest news, viral stories, and hot topics
              from around the globe. Engage with a community of readers, share
              your insights, and explore diverse perspectives all in one place.
              Join now and start the conversation!
            </p>
          </div>
          <Carocel></Carocel>
        </div>
        <Publishers></Publishers>
        <Statistics></Statistics>
      </div>
    </div>
  );
};

export default Home;