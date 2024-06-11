import Carocel from '../components/Carocel';

const Home = () => {
  return (
    <div className="container mx-auto">
      <div className=" bg-gray-800 p-4 my-2 flex items-center">
        <div className='w-[50%] border-r'>
          <h2 className="text-4xl font-bold">Mega News</h2>
          <p>All trending news here</p>
        </div>
        <div className='font-medium text-xl'>
          <marquee direction="left">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste nisi autem reiciendis explicabo deleniti placeat esse culpa blanditiis necessitatibus molestiae, sit, consequuntur officia cum amet vitae inventore molestias minima nam. </marquee>
        </div>
      </div>
      <div className="flex">
        <div className="w-[20%] bg-gray-800 mr-2">
          <h2 className="text-3xl p-4 ">
            To sharing knowledge and collaborating the next genration Join us.
          </h2>
          <p className="p-4">
            Discover and share trending articles with ease on our platform. Stay
            updated with the latest news, viral stories, and hot topics from
            around the globe. Engage with a community of readers, share your
            insights, and explore diverse perspectives all in one place. Join
            now and start the conversation!
          </p>
        </div>
        <Carocel></Carocel>
      </div>
    </div>
  );
};

export default Home;