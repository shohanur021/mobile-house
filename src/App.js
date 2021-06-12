import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NotFound from './Components/NotFound/NoFound'
import Login from './Components//Login/Login'
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import AddProducts from './Components/AddProducts/AddProducts';
import ProductCollection from './Components/ProductsCollection/ProductCollection';
import ManageProduct from './Components/ManageProduct/ManageProduct';
import Header from './Components/Header/Header';
import Review from './Components/Review/Review';
import Order from './Components/Oder/Order';
import About from './Components/About/About';


export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route path="/home">
            <Header></Header>
            <ProductCollection></ProductCollection>
          </Route>
          <Route path="/login">
            <Header></Header>
            <Login></Login>
          </Route>
          <PrivateRoute path="/orders">
            <Header></Header>
            <Order></Order>
          </PrivateRoute>
          <Route path="/about">
            <Header></Header>
            <About></About>
          </Route>
          <Route path="/review/:id">
            <Header></Header>
            <Review></Review>
          </Route>
          <PrivateRoute path="/addProducts">
            <Header></Header>
            <AddProducts></AddProducts>
          </PrivateRoute>
          <PrivateRoute path="/manageProduct">
            <Header></Header>
            <ManageProduct></ManageProduct>
          </PrivateRoute>
          <Route exact path="/">
            <Header></Header>
            <ProductCollection></ProductCollection>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
