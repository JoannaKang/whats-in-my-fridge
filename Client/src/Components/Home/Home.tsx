import Piechart from './Piechart'
import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import '../Home/Home.css'


interface Myfridgelist {
  __v: string;
  _id: string;
  category: string;
  date: string;
  name: string;
  quantity: number;
  saved: string;
}

interface HomeProps {
  MyFridgeList: Array<Myfridgelist>;
  checkedItems: Array<string>;
  clickboxHandler: () => React.FormEventHandler;
  getRecipeHandler: () => React.MouseEventHandler;
}

const Home = (props:HomeProps) => {
  console.log(props);


  const now:number = new Date().getTime();
  const expiredItems:Array<Myfridgelist> = [];

  for (let i = 0; i < props.MyFridgeList.length; i++) {
    const savedDate:number = new Date(props.MyFridgeList[i].date).getTime();
    if (((now - savedDate) / 1000 / 60 / 24 / 52) > 7) {
      expiredItems.push(props.MyFridgeList[i]);
    }
  }

  const soontobeexpired:JSX.Element[] = expiredItems.map(el => {
    console.log(el)
    return (
      <>
        {/* FIXME: 왜때무네 망가졌지;?ㅠㅠㅠ */}
        <button className="item-selectbox" key={el._id} onClick={() => props.clickboxHandler()}
          value={el._id}>
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
      <h1 className="title">Soon to be Expired</h1>
      <div className="soon-to-be-expired">
        {soontobeexpired}
      </div>
      <button className="getRecipes" onClick={() => props.getRecipeHandler()}><Link to='/recipes'>Get Recipes</Link></button>
    </div>
  )
}

export default Home;