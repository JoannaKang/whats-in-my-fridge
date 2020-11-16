import React from "react";
import { Pie } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

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
            "#4D5360",
            "#AC64AD"
          ],
          hoverBackgroundColor: [
            "#FF5A5E",
            "#5AD3D1",
            "#FFC870",
            "#A8B3C5",
            "#616774",
            "#DA92DB"
          ]
        }
      ]
    }
  }

  render() {
    const category = this.props.MyFridgeList.map(el => el.category)

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

    return (
      <MDBContainer>
        <h3 className="mt-5">In my Fridge</h3>
        <Pie data={this.state.dataPie} options={{ responsive: true }} />
      </MDBContainer>
    );
  }
}

export default Piechart;