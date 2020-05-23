import React, {Component} from 'react'
import {Link} from "react-router-dom";

class UserNavigationBar extends Component {

    render() {
        return <div className={'collapse navbar-collapse'} id={'navbarSupportedContent'}>
            <form className="form-inline my-2 my-lg-0 mr-auto">
                <input className="form-control mr-sm-2" type="search" placeholder="Search"
                       aria-label="Search"/>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit"><i className="fas fa-search"></i> Search
                </button>
            </form>

            {(JSON.parse(sessionStorage.getItem('loggedUser')) != null) ? (
                <ul className={"navbar-nav"}>
                    <li className={"nav-item mx-2"}>
                        <div className={'btn-group'}>
                            <button type={'button'}
                                    className={'btn btn-text-success btn-outline-success my-2 dropdown-toggle'}
                                    data-toggle={'dropdown'}
                                    aria-haspopup={'true'}
                                    aria-expanded={'false'}>{"Hi! "+sessionStorage.getItem('loggedUserName')}
                            </button>
                            <div className={'dropdown-menu dropdown-menu-right'}>
                                <Link to={'/shopping_cart'}>
                                    <button className={'dropdown-item'}><i className={"fas fa-shopping-cart"}></i> Shopping Cart</button>
                                </Link>
                                <Link to={'/wish_list'}>
                                    <button className={'dropdown-item'}><i className={"fas fa-star"}></i> Wish List</button>
                                </Link>
                                <Link to={'/'}>
                                    <button className={'dropdown-item'} onClick={()=>{sessionStorage.removeItem('loggedUser');sessionStorage.removeItem('loggedUserName');window.location.reload();}}>
                                        <i className="fas fa-sign-out-alt"></i> Log out</button>
                                </Link>
                            </div>
                        </div>
                    </li>
                </ul>
            ) : (
                <ul className={"navbar-nav"}>
                    <li className={`nav-item mx-2`}>
                        <Link to={'/signup'}>
                            <button type={'button'}
                                    className={`btn btn-text-success btn-outline-success my-2`}
                                    href={"#"}><i className={"fas fa-user-plus"}></i> Sign Up
                            </button>
                        </Link>
                    </li>
                    <li className={'nav-item mx-2'}>
                        <Link to={'/login'}>
                            <button type={'button'}
                                    className={"btn btn-text-success btn-outline-success my-2"}
                                    href={"#"}><i className={"fas fa-sign-in-alt"}></i> Login
                            </button>
                        </Link>
                    </li>
                </ul>)}
        </div>
    }
}

export default UserNavigationBar;