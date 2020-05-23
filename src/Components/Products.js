import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import Rating from '@material-ui/lab/Rating';

export default class Products extends Component {
    constructor() {
        super();

        this.state={
            products:[]
        }
    }

    componentDidMount() {
        sessionStorage.removeItem('loggedAdmin');
        sessionStorage.removeItem('loggedStoreManager');
    }

    render() {
        if(this.props.toDisplayCategory!=="all"){
            axios.get('http://localhost:4000/product/'+this.props.toDisplayCategory)
                .then(res => {
                    this.setState({
                        products: res.data
                    })
                })
                .catch(error => console.log(error))
        } else{
            axios.get('http://localhost:4000/product/')
                .then(res => {
                    this.setState({
                        products: res.data
                    })
                })
                .catch(error => console.log(error))
        }

        return <div className={'row'}>
            <div className={'row align-items-center'}>
                {this.state.products.map((res,i) => {
                    return (
                        <Link to={'/product/'+res._id} key={i}>
                            <div className={'col mb-2 mt-2 text-dark'}>
                                <div className={'card'} style={{width:'18rem'}}>
                                    <img className={'card-image-top'}
                                         src={'http://localhost:4000/image/get-image/'+res.imgName}
                                         alt={res.imgName}
                                         width={'285px'}
                                        height={'285px'}/>
                                    <div className={'card-body'}>
                                        <h5 className={'card-title'}>{res.title}</h5>
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
                                        {(res.rate.length === 0)?null:(
                                            <div>
                                                <Rating name="half-rating-read" defaultValue={parseFloat(res.rate[0].currentRate)} precision={0.2} readOnly />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    }
}