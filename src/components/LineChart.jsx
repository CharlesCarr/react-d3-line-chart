import useMeasure from "react-use-measure";
import ChartInner from "./ChartInner";

const LineChart = () => {
  let [ref, bounds] = useMeasure();

  let data = [
    [0, 10],
    [5, 50],
    [15, 75],
    [55, 100],
    [75, 10],
    [100, 5],
  ];

/*
  actual data is in following shape - 
    data = [{ date: , value: , }, ...];
*/

  return (
    <div className="relative h-full w-full" ref={ref} >
      {bounds.width > 0 && (
        <ChartInner data={data} width={bounds.width} height={bounds.height} />
      )}
    </div>
  );
};

export default LineChart;
