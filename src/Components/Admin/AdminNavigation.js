import React, {Component} from "react";
import {Link,withRouter} from "react-router-dom";

class AdminNavigation extends Component {
    render() {
        return <div className={'collapse navbar-collapse'} id={'navbarSupportedContent'}>
            {(JSON.parse(sessionStorage.getItem('loggedAdmin')) != null)?(
                <ul className={'navbar-nav'}>
                    <li className={'nav-item mx-2'}>
                        <Link to={'/admin/add_store_manager'}>
                            <button type={'button'}
                                    className={'btn btn-text-success btn-outline-success my-2'}>
                                    <i className="fas fa-user-plus"></i> Add Store Manager
                            </button>
                        </Link>
                    </li>
                    <li className={'nav-item mx-2'}>
                        <Link to={'/admin/add_category'}>
                            <button type={'button'}
                                    className={'btn btn-text-success btn-outline-success my-2'}>
                                    <i className="fas fa-plus-circle"></i> Add Category
                            </button>
                        </Link>
                    </li>
                    <li className={'nav-item mx-2'}>
                        <Link to={'/admin/delete_store_manager'}>
                            <button type={'button'}
                                    className={'btn btn-text-success btn-outline-success my-2'}>
                                <i className="fas fa-user-slash"></i> Delete Store Manager
                            </button>
                        </Link>
                    </li>
                    <li className={'nav-item mx-2'}>
                        <Link to={'/admin'}>
                            <button type={'button'}
                                    className={'btn btn-text-success btn-outline-success my-2'}
                                    onClick={()=>sessionStorage.removeItem('loggedAdmin')}>
                                    <i className="fas fa-sign-out-alt"></i> Log out
                            </button>
                        </Link>
                    </li>
                </ul>
            ):null}
        </div>
    }
}

export default withRouter(AdminNavigation);