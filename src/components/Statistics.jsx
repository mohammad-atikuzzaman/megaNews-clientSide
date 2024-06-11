import useStatistics from "../Hooks/useStatistics";

const Statistics = () => {
  const [statistics] = useStatistics()
  console.log(statistics)
  return (
    <div>
      <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, delectus.</h2>
    </div>
  );
};

export default Statistics;