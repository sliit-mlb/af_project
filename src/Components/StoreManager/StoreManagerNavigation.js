import React, {Component} from "react";
import {Link} from 'react-router-dom';

class StoreManagerNavigation extends Component {
    render() {
        return <div className={'collapse navbar-collapse'} id={'navbarSupportedContent'}>
            {(JSON.parse(sessionStorage.getItem('loggedStoreManager')) != null)?(
                <ul className={'navbar-nav'}>
                    <li className={'nav-item mx-2'}>
                        <Link to={'/store_manager/add_product'}>
                            <button type={'button'}
                                    className={'btn btn-text-success btn-outline-success my-2'}>
                                    <i className="fas fa-plus-circle"></i> Add Product
                            </button>
                        </Link>
                    </li>
                    <li className={'nav-item mx-2'}>
                        <Link to={'/store_manager/add_discount'}>
                            <button type={'button'}
                                    className={'btn btn-text-success btn-outline-success my-2'}>
                                    <i className="fas fa-tags"></i> Add Discount
                            </button>
                        </Link>
                    </li>
                    <li className={'nav-item mx-2'}>
                        <Link to={'/store_manager/update_product'}>
                            <button type={'button'}
                                    className={'btn btn-text-success btn-outline-success my-2'}>
                                <i className="fas fa-user-edit"></i> Update Product
                            </button>
                        </Link>
                    </li>
                    <li className={'nav-item mx-2'}>
                        <Link to={'/store_manager/edit_discount'}>
                            <button type={'button'}
                                    className={'btn btn-text-success btn-outline-success my-2'}>
                                <i className="fas fa-edit"></i> Edit Discount
                            </button>
                        </Link>
                    </li>
                    <li className={'nav-item mx-2'}>
                        <Link to={'/store_manager'}>
                            <button type={'button'}
                                    className={'btn btn-text-success btn-outline-success my-2'}
                                    onClick={() => sessionStorage.removeItem('loggedStoreManager')}>
                                    <i className="fas fa-sign-out-alt"></i> Log out
                            </button>
                        </Link>
                    </li>
                </ul>
            ):null}
        </div>
    }
}

export default StoreManagerNavigation;