import CountUp from "react-countup";
import useStatistics from "../Hooks/useStatistics";

const Statistics = () => {
  const [statistics] = useStatistics();
  // console.log(statistics);
  return (
    <div className="bg-gray-800 p-4 my-2 space-y-8">
      <h2 className="font-bold text-center text-4xl text-gray-400">
        User Statics
      </h2>
      <hr />
      <div className="flex justify-around gap-4 font-semibold text-4xl">
        <div className="border-2 border-violet-400 text-violet-400 w-full flex flex-col items-center p-4">
          <CountUp start={0} end={statistics.totalUser} delay={2} duration={5}>
            {({ countUpRef }) => (
              <div>
                <span ref={countUpRef} />
              </div>
            )}
          </CountUp>
          <h2>Total users</h2>
        </div>
        <div className="w-full border-2 border-amber-400 text-amber-400 flex flex-col items-center p-4">
          <CountUp start={0} end={statistics.premiumUser} delay={2} duration={5}>
            {({ countUpRef }) => (
              <div>
                <span ref={countUpRef} />
              </div>
            )}
          </CountUp>
          <h2>Premium Users</h2>
        </div>
        <div className="border-2 border-gray-400 text-gray-400 w-full flex flex-col items-center  p-4">
          <CountUp
            start={0}
            end={statistics.freeUser}
            delay={2}
            duration={5}>
            {({ countUpRef }) => (
              <div>
                <span ref={countUpRef} />
              </div>
            )}
          </CountUp>
          <h2>Free Users</h2>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
