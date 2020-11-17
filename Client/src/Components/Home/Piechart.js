import React from "react";
import { Pie } from "react-chartjs-2";
// import { MDBContainer } from "mdbreact";
import './Piechart.css';

class Piechart extends React.Component {

  state = {
    dataPie: {
      labels: ["Red", "Green", "Yellow", "Grey", "Dark Grey"],
      datasets: [
        {
          data: [300, 50, 100, 40, 120],
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
    }
  }

  render() {
    const category = this.props.MyFridgeList.map(el => el.category)

    this.state.dataPie.options = {
      legend: {
        position: 'right'
      }
    }

    let labels = [];
    category.filter(el => {
      labels.push(category[category.indexOf(el)])
    })

    let data = {};
    for (let i = 0; i < labels.length; i++) {
      let num = labels[i];
      data[num] = data[num] ? data[num] + 1 : 1
    }

    this.state.dataPie.labels = Object.keys(data);
    this.state.dataPie.datasets[0].data = Object.values(data);

    const totalnoItems = Object.values(data).reduce(function (acc, curr) {
      return acc + curr
    }, 0)

    return (
      <>
        <h1 className="mt-5" >You have {totalnoItems} Items in your fridge</h1>
        <div className='graph-container'>
          <Pie data={this.state.dataPie} options={{ labels: { boxWidth: 10 } }} />
        </div>
      </>
    );
  }
}

export default Piechart;