import Piechart from './Piechart'
import { MDBBox } from 'mdbreact';
import CategoryList from '../CategoryList/CategoryList'
import { BrowserRouter as Router, Link } from 'react-router-dom';

const Home = (props) => {
  console.log(props);

  // if (MyFridgeList.length === 0) {
  //   return <div>SPINNER GOES HERE :P</div>
  // }

  const now = new Date();
  const expiredItems = [];

  for (let i = 0; i < props.MyFridgeList.length; i++) {
    const savedDate = new Date(props.MyFridgeList[i].date);
    if (((now - savedDate) / 1000 / 60 / 24 / 52) > 7) {
      expiredItems.push(props.MyFridgeList[i]);
    }
  }

  const soontobeexpired = expiredItems.map(el => {
    return (
      <>
        <div key={el._id}>
          <input type="checkbox"
            onClick={props.clickboxHandler}
            value={el._id.toString()}
          ></input>
          {el.category} {el.name}
        </div>
      </>
    )
  })


  return (
    <div>
      <MDBBox>
        <h1>Home</h1>
        <Link to='/inmyfridge'>
          <div className="piechart">
            <Piechart MyFridgeList={props.MyFridgeList} />
          </div>
        </Link>
        <div className="soon-to-be-expired">
          <h1>Soon to be Expired</h1>
          {soontobeexpired}
        </div>
        <button onClick={() => props.getRecipeHandler()}><Link to='/recipes'>Get Recipes</Link></button>
      </MDBBox>
    </div>
  )
}

export default Home;