import React, {useState, useEffect} from "react";
import { Pie } from "react-chartjs-2";
import './Piechart.css';
import { Myfridgelist } from '../../Interfaces';

interface PiechartProps {
  MyFridgeList: Array<Myfridgelist>;
}

interface DataPair {
  category: string;
  quantity: number;
}


function PieChart (props: PiechartProps) {

  const [chartData, setChartData] = useState({});
  const [summary, setSummary] = useState<number>(0);


  const piechart = (localPieData:Array<number>, localLabelData:Array<string>) => {
    setChartData ({
      labels: localLabelData,
      datasets: [
        {
          data: localPieData,
          backgroundColor: [
            "#F7464A",
            "#46BFBD",
            "#FDB45C",
            "#949FB1",
            "#5e75a8",
            "#AC64AD",
            "#f38181",
            "#fce38a",
            "#eaffd0",
            "#95e1d3"
          ],
          hoverBackgroundColor: [
            "#FF5A5E",
            "#5AD3D1",
            "#FFC870",
            "#A8B3C5",
            "#616774",
            "#DA92DB"
          ],
          borderWidth: 0.5
        }
      ]
    })
  };

  const options = {
      maintainAspectRatio: false,
      responsive: false,
      legend: {
        position: 'right',
        labels: {
          boxWidth: 10,
          fontSize: 11,
          padding: 5
        }
      }
  };

  useEffect(() => {

    //**Chart data */
    const dataPair: DataPair[] = props.MyFridgeList
      .map((el) => ({ category: el.category, quantity: el.quantity }));

    const chartDictionery:{[category: string]: number} = {};
    for (let i = 0; i < dataPair.length; i++) {
      const category = dataPair[i].category;
      if (category in chartDictionery) {
        chartDictionery[category] += dataPair[i].quantity;
      } else {
        chartDictionery[category] = dataPair[i].quantity;
      }
    }

    const newLabelData = Object.keys(chartDictionery);
    const newPieData = Object.values(chartDictionery);

    //**Summary */
    const totalnoItems = Object.values(chartDictionery).reduce(function (acc, curr) {
      return acc + curr
    }, 0)
    setSummary(totalnoItems);

    piechart(newPieData, newLabelData);
  }, [props]);

  return (
    <>
        <h1 className="mt-5" >You have {summary} Items in your fridge</h1>
        <div className='graph-container'>
      <Pie data = {chartData} options = {options} />
      </div>
    </>
  )
}


export default PieChart;