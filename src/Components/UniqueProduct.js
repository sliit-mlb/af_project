import React, {Component} from "react";
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';

class UniqueProduct extends Component {
    constructor() {
        super();

        this.state = {
            product:[]
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/product/get-unique-product/'+this.props.match.params.id)
            .then(res => this.setState({product:res.data}))
            .catch(error=> console.log(error))
    }

    wishlistHandler() {
        if(JSON.parse(sessionStorage.getItem('loggedUser')) == null) {
            this.props.history.push('/login');
        } else{
            axios.put('http://localhost:4000/users/add-to-wishlist/'+JSON.parse(sessionStorage.getItem('loggedUser'))+'/'+this.props.match.params.id)
                .then(()=> alert('Product added to Wishlist'))
                .catch(error=> console.log(error))
        }
    }

    shoppingCartHandler() {
        if(JSON.parse(sessionStorage.getItem('loggedUser')) == null) {
            this.props.history.push('/login');
        } else {
            axios.put('http://localhost:4000/users/add-to-shopping-cart/'+JSON.parse(sessionStorage.getItem(`loggedUser`))+'/'+this.props.match.params.id)
                .then(()=> alert('Product added to Wishlist'))
                .catch(error=> console.log(error))
        }
    }

    render() {
        return <div className={'container'}>
            {(this.state.product.length>0)?(
                this.state.product.map((res,id) => {
                    return <div key={id}>
                        <div className={'card my-3'}>
                            <div className={'row'}>
                                <div className={'col-md-5 ml-auto'}>
                                    <button type={'button'}
                                            className={`btn btn-text-success btn-outline-success my-2 mx-2`}
                                            onClick={()=> this.wishlistHandler()}>
                                        <i className="fas fa-plus-circle"></i> Add to Wishlist
                                    </button>
                                    <button type={'button'}
                                            className={`btn btn-text-success btn-outline-success my-2 mx-2`}
                                            onClick={()=> this.shoppingCartHandler()}>
                                        <i className="fas fa-cart-plus"></i> Add to Shopping Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={'card my-3'}>
                            <div className={'row'}>
                                <div className={'col-auto'}>
                                    <img src={'http://localhost:4000/image/get-image/'+res.imgName}
                                         alt={res.imgName}
                                         width={'400px'}
                                         height={'400px'}/>
                                </div>
                                <div className={'col'}>
                                    <h2 className={'card-title text-center my-3'}>
                                        {res.title}
                                    </h2>
                                    <p className={'card-text my-2'}>
                                        {res.description}
                                    </p>
                                    {(res.discount === 0)?(
                                        <label className={'font-weight-bold'}>
                                            Rs.{res.price}
                                        </label>
                                    ):(
                                        <div>
                                            <label
                                                className={'text-muted'}>
                                                <s>Rs.{res.price}</s>
                                            </label> <label
                                            className={'text-primary font-weight-bold'}>
                                            Rs.{res.price-res.discount}
                                        </label>
                                        </div>
                                    )}
                                    <p className={'my-3'}>
                                        Available: {res.inStock}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={'card my-3'}>
                            <div className={'container'}>
                                <div className={'row my-2'}>
                                    <div className={'col text-center'}>
                                        <h5>Rate</h5>
                                    </div>
                                </div>
                                {(res.rate[0]==null)?(
                                    <h6 className={'text-center'}>Rating not found</h6>
                                ):(
                                    <div className={'row justify-content-center'}>
                                        <div className={'col-md-auto'}>
                                            Product average Rate:
                                        </div>
                                        <div className={'col-md-auto'}>
                                            <Rating name="half-rating-read" defaultValue={parseFloat(res.rate[0].currentRate)} precision={0.2} readOnly />
                                        </div>
                                    </div>)}
                                <div className={'row my-2 mt-3'}>
                                    <div className={'col text-center'}>
                                        <h5>Comments</h5>
                                    </div>
                                </div>
                                {(res.comments.length === 0)?(
                                    <h6 className={'text-center'}>Comments not found</h6>
                                ):(
                                    <div className={'row justify-content-center'}>
                                        {res.comments.map((res,id)=>{
                                            return <div className={'container'} key={id}>
                                                <div className={'card my-3'}>
                                                    <p className={'card-text my-2 mx-2'}>
                                                        {res.comment}
                                                    </p>
                                                </div>
                                            </div>
                                        })}
                                    </div>)}
                            </div>
                        </div>
                    </div>
                })
            ):(
                <h3>Please wait...</h3>
            )}
        </div>
        /*return <div className={'container'}>
            <div className={'card my-3'}>
                <div className={'row'}>
                    <div className={'col-md-5 ml-auto'}>
                        <button type={'button'}
                                className={`btn btn-text-success btn-outline-success my-2 mx-2`}
                                onClick={()=> this.wishlistHandler()}>
                                <i className="fas fa-plus-circle"></i> Add to Wishlist
                        </button>
                        <button type={'button'}
                                className={`btn btn-text-success btn-outline-success my-2 mx-2`}
                                onClick={()=> this.shoppingCartHandler()}>
                                <i className="fas fa-cart-plus"></i> Add to Shopping Cart
                        </button>
                    </div>
                </div>
            </div>
            <div className={'card my-3'}>
                <div className={'row'}>
                    <div className={'col text-center'}>
                        {this.state.product.title}
                    </div>
                </div>
            </div>
            <div className={'card my-3'}>
                <div className={'container'}>
                    <div className={'row my-2'}>
                        <div className={'col text-center'}>
                            <h5>Rate</h5>
                        </div>
                    </div>
                    <div className={'row justify-content-center'}>
                        <div className={'col-md-auto'}>
                            Product Rate:
                        </div>
                        <div className={'col-md-auto'}>
                            {(this.state.product.length>0)?(
                                (this.state.product.rate[0] == null)?null:(
                                    <Rating name="half-rating-read" defaultValue={parseFloat(this.product.rate[0].currentRate)} precision={0.2} readOnly />
                                )
                            ):(
                                <label>Please wait...</label>
                            )}
                        </div>
                    </div>
                    <div className={'row my-2 mt-3'}>
                        <div className={'col text-center'}>
                            <h5>Comments</h5>
                        </div>
                    </div>
                    <div className={'row justify-content-center'}>
                        <div className={'col-md-auto'}>
                            Product Rate:
                        </div>
                        <div className={'col-md-auto'}>
                        </div>
                    </div>
                </div>
            </div>
        </div>*/
    }
}

export default UniqueProduct;