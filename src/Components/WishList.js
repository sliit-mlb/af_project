import React, {Component} from "react";
import axios from 'axios';

class WishList extends Component{
    constructor() {
        super();

        this.state = {
            wishList:[],
            products:[]
        }
    }

    componentDidMount() {
        if(JSON.parse(sessionStorage.getItem('loggedUser')) == null)
            this.props.history.push('/login');

        axios.get('http://localhost:4000/users/get-user-by-id/'+JSON.parse(sessionStorage.getItem('loggedUser')))
            .then(res => this.setState({wishList:res.data[0].wishList},()=> {
                this.state.wishList.map((obj)=>{
                    axios.get('http://localhost:4000/product/get-unique-product/' + obj.item)
                        .then(res => this.setState({products: this.state.products.concat(res.data)}))
                        .catch(error=> console.log(error))
                })
            }))
            .catch(error => console.log(error))
    }

    onClickDelete(itemId){
        axios.put('http://localhost:4000/users/delete-wishlist/'+JSON.parse(sessionStorage.getItem('loggedUser'))+'/'+itemId)
            .then(res=>console.log(res))

        window.location.reload();
    }

    onClickCart(itemId) {
        axios.put('http://localhost:4000/users/delete-wishlist/'+JSON.parse(sessionStorage.getItem('loggedUser'))+'/'+itemId)
            .then(res=>console.log(res))

        axios.put('http://localhost:4000/users/add-to-shopping-cart/'+JSON.parse(sessionStorage.getItem('loggedUser'))+'/'+itemId)
            .then(res => console.log(res))

        window.location.reload();
    }

    render() {
        return <div className={'container'}>
            <div className={'row'}>
                <div className={'col text-center'}>
                    <h3>WishList</h3>
                </div>
            </div>
            {(this.state.products.length>0)?(
                this.state.products.map((res,id) => {
                    return (<div className={'row my-3'} key={id}>
                        <div className={'col'}>
                            <div className={'card'}>
                                <div className={'row no-gutters'}>
                                    <div className={'col-auto'}>
                                        <img src={'http://localhost:4000/image/get-image/'+res.imgName}
                                             alt={res.imgName}
                                             width={'220px'}
                                             height={'220px'}/>
                                    </div>
                                    <div className={'col'}>
                                        <div className={'row my-2 mx-2'}>
                                            <div className={'col align-self-center'}>
                                                <div className={'row'}>
                                                    <div className={'col font-weight-bold'}>
                                                        {res.title}
                                                    </div>
                                                </div>
                                                <div className={'row'}>
                                                    <div className={'col'}>
                                                        {res.description}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={'col align-self-center'}>
                                                <div className={'row'}>
                                                    <div className={'col'}>
                                                        {(res.discount === 0)?(
                                                            <label>Rs. {res.price}</label>
                                                        ):(
                                                            <div>
                                                                <label
                                                                    className={'text-muted'}>
                                                                    <s>Rs. {res.price}</s>
                                                                </label> <label
                                                                className={'text-primary font-weight-bold'}>
                                                                Rs. {res.price-res.discount}
                                                            </label>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={'col my-3'}>
                                                <div className={'row align-items-center'}>
                                                    <div className={'col'}>
                                                        <button className={'btn btn-success mx-2 my-2'}
                                                            onClick={() => this.onClickCart(res._id)}>
                                                            Add to cart
                                                        </button>
                                                        <button className={'btn btn-success mx-2 my-2'}
                                                            onClick={() => this.onClickDelete(res._id)}>
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)
                })):(
                    <h2 className={'text-center'}>Please wait...</h2>
            )}
        </div>
    }
}

export default WishList;