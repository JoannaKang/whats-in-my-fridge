import Piechart from './Piechart'
import { BrowserRouter as Router, Link } from 'react-router-dom';
import '../Home/Home.css'

const Home = (props) => {
  // console.log(props);


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
        <button className="item-selectbox" key={el._id} onClick={props.clickboxHandler}
          value={el._id.toString()}>
          {el.category.slice(0, 2)} {el.name}
        </button>
      </>
    )
  })


  return (
    <div className="home-container">
      <Link to='/inmyfridge' style={{ textDecoration: 'none' }}>
        <div className="piechart">
          <Piechart MyFridgeList={props.MyFridgeList} />
        </div>
      </Link>
      <h1>Soon to be Expired</h1>
      <div className="soon-to-be-expired">
        {soontobeexpired}
      </div>
      <button className="getRecipes" onClick={() => props.getRecipeHandler()}><Link to='/recipes'>Get Recipes</Link></button>
    </div>
  )
}

export default Home;