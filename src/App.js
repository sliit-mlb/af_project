import React, {Component} from 'react';
import {Link,Switch,Route} from 'react-router-dom';

import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import AdminHome from "./Components/Admin/AdminHome";
import Products from "./Components/Products";
import Category from "./Components/Category";
import UserNavigationBar from "./Components/UserNavigationBar";
import AdminNavigation from "./Components/Admin/AdminNavigation";
import StoreManagerNavigation from "./Components/StoreManager/StoreManagerNavigation";
import StoreManagerHome from "./Components/StoreManager/StoreManagerHome";
import AddStoreManager from "./Components/Admin/AddStoreManager";
import AddCategory from "./Components/Admin/AddCategory";
import AddProduct from "./Components/StoreManager/AddProduct";
import AddDiscount from "./Components/StoreManager/AddDiscount";
import UniqueProduct from './Components/UniqueProduct';
import WishList from './Components/WishList'
import ShoppingCart from './Components/ShoppingCart'
import RatingAndComment from "./Components/RatingAndComment";
import DeleteStoreManager from "./Components/Admin/DeleteStoreManager";
import UpdateProduct from "./Components/StoreManager/UpdateProduct";
import EditDiscount from "./Components/StoreManager/EditDiscount";
import ChangePassword from "./Components/ChangePassword";

class App extends Component{
    constructor() {
        super();

        this.state = {
            adminNavigationStatus:false,
            storeManagerNavigationStatus:false,
            toDisplayCategory:"all"
        }

        this.changeAdminNavigationStatus = this.changeAdminNavigationStatus.bind(this);
        this.changeStoreManagerNavigationStatus = this.changeStoreManagerNavigationStatus.bind(this);
        this.changeDisplayCategory = this.changeDisplayCategory.bind(this);
    }

    changeAdminNavigationStatus(status) {
        this.setState({
            adminNavigationStatus:status
        })
    }

    changeStoreManagerNavigationStatus(status) {
        this.setState({
            storeManagerNavigationStatus:status
        })
    }

    changeDisplayCategory(category){
        this.setState({
            toDisplayCategory:category
        })
    }

    render() {
        return (
            <div className="App">
                <div className={'container-fluid'}>
                    <div className="row my-4">
                        <div className="col">
                            <div className={'navbar navbar-expand-lg navbar-light bg-light'}>
                                <Link to={'/'}>
                                    <div className="navbar-brand text-success">Online Shopping</div>
                                </Link>
                                <button className="navbar-toggler" type="button" data-toggle="collapse"
                                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                        aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                {(this.state.adminNavigationStatus)?(
                                    <AdminNavigation/>
                                ):(
                                    (this.state.storeManagerNavigationStatus)?(
                                        <StoreManagerNavigation/>
                                    ):(
                                        <UserNavigationBar/>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                    <Switch>
                        <Route path={'/'} exact strict render={
                            () => {
                                return (<div className={`row my-2`}>
                                    <div className="col col-md-auto">
                                        <Category changeDisplayCategory={this.changeDisplayCategory}/>
                                    </div>
                                    <div className="col col-md-auto">
                                        <Products toDisplayCategory={this.state.toDisplayCategory}/>
                                    </div>
                                </div>)
                            }
                        }/>
                        <Route path={'/signup'} exact strict component={SignUp}/>
                        <Route path={'/login'} exact strict render={props=><Login {...props}/>}/>
                        <Route path={'/admin'} exact strict render={props=><AdminHome {...props} changeAdminNavigationStatus={this.changeAdminNavigationStatus}/>}/>
                        <Route path={'/store_manager'} exact strict render={props=><StoreManagerHome {...props} changeStoreManagerNavigationStatus={this.changeStoreManagerNavigationStatus}/>}/>
                        <Route path={'/admin/add_store_manager'} exact strict render={props => <AddStoreManager {...props} changeAdminNavigationStatus={this.changeAdminNavigationStatus}/>}/>
                        <Route path={'/admin/add_category'} exact strict render={props=> <AddCategory {...props} changeAdminNavigationStatus={this.changeAdminNavigationStatus}/>}/>
                        <Route path={'/admin/delete_store_manager'} exact strict render={props=> <DeleteStoreManager {...props} changeAdminNavigationStatus={this.changeAdminNavigationStatus}/>}/>
                        <Route path={'/store_manager/add_product'} exact strict render={props=> <AddProduct {...props} changeStoreManagerNavigationStatus={this.changeStoreManagerNavigationStatus}/>}/>
                        <Route path={'/store_manager/add_discount'} exact strict render={props=> <AddDiscount {...props} changeStoreManagerNavigationStatus={this.changeStoreManagerNavigationStatus}/>}/>
                        <Route path={'/store_manager/update_product'} exact strict render={props=> <UpdateProduct {...props} changeStoreManagerNavigationStatus={this.changeStoreManagerNavigationStatus}/>}/>
                        <Route path={'/store_manager/edit_discount'} exact strict render={props=> <EditDiscount {...props} changeStoreManagerNavigationStatus={this.changeStoreManagerNavigationStatus}/>}/>
                        <Route path={'/product/:id'} render={props => <UniqueProduct {...props}/>}/>
                        <Route path={'/wish_list'} render={props => <WishList {...props}/>}/>
                        <Route path={'/shopping_cart'} render={props => <ShoppingCart {...props}/>}/>
                        <Route path={'/rating_comment'} component={RatingAndComment}/>
                        <Route path={'/change_password'} component={ChangePassword}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
