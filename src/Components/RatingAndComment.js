import React, {Component} from "react";
import axios from 'axios';
import {Link} from "react-router-dom";

class RatingAndComment extends Component{
    constructor() {
        super();

        this.state = {
            purchaseItems:[],
            ratingValue:0
        }
    }

    componentDidMount() {
        if(JSON.parse(sessionStorage.getItem('loggedUser')) == null)
            this.props.history.push('/login');

        let items = JSON.parse(sessionStorage.getItem('purchaseItem'));

        if(items.length === 0)
            this.props.history.push('/shopping_cart');

        items.map((response) => {
            axios.get('http://localhost:4000/product/get-unique-product/'+response)
                .then(res => this.setState({purchaseItems:this.state.purchaseItems.concat(res.data)}))
                .catch(error => console.log(error));
        })
    }

    render() {
        return <div className={'container'}>
            <div className={'row'}>
                <div className={'col text-center'}>
                    <h3 className={'my-3'}>Rating and Comments</h3>
                </div>
            </div>
            <div className={'row'}>
                <div className={'col'}>
                    <Link to={'/'}>
                        <button className={'btn btn-danger my-3 form-control'}>Leave from feedback</button>
                    </Link>
                </div>
            </div>
            {(this.state.purchaseItems.length>0)?(
                this.state.purchaseItems.map((res,id) => {
                    return <div className={'card my-3'} key={id}>
                        <div className={'row'}>
                            <div className={'col-auto'}>
                                <img src={'http://localhost:4000/image/get-image/'+res.imgName}
                                     alt={res.imgName}
                                     width={'220px'}
                                     height={'220px'}/>
                            </div>
                            <div className={'col align-self-center'}>
                                <div className={'font-weight-bold'}>
                                    {res.title}
                                </div>
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
                            <div className={'col align-self-center'}>
                                <form>
                                    <div className={'form-group'}>
                                        <textarea className={'form-control my-3'} placeholder={'Enter the comment'} id={`comment${id}`} rows={6}/>
                                    </div>
                                </form>
                            </div>
                            <div className={'col align-self-center'}>
                                <div className={'text-center'}>
                                    Give the product rate <br/>
                                    <input type={'number'} className={'form-control'} id={`rating${id}`} defaultValue={0} min={0} max={5}/>
                                </div>
                            </div>
                            <div className={'col-auto align-self-center'}>
                                <button className={'btn btn-primary mx-2'} onClick={() => {
                                    let comment = document.getElementById(`comment${id}`).value;
                                    let rate = document.getElementById(`rating${id}`).value;

                                    if(comment === "" || rate < 0.1){
                                        alert("Comment and Rate fields cannot be null");
                                    } else{
                                        let rateArray = res.rate;
                                        let rateValue = res.rate[0];

                                        if(rateArray.length === 0){
                                            axios.put('http://localhost:4000/product/add-comment-rating/'+res._id+'/'+comment+'/'+rate+'/1')
                                                .then(res => console.log('Comment and Rating successfully added'))
                                                .catch(error => console.log(error))
                                        }else{
                                            let preRate = parseFloat(rateValue.currentRate);
                                            let preCount = parseInt(rateValue.count);

                                            let newCount = preCount+1;
                                            let newRate = (((preRate * preCount)+parseFloat(rate))/newCount)

                                            axios.put('http://localhost:4000/product/delete-previous-rate/'+res._id+'/'+rateValue.currentRate+'/'+rateValue.count)
                                                .then(response=> {
                                                    console.log('Previous rate is deleted')
                                                    axios.put('http://localhost:4000/product/add-comment-rating/'+res._id+'/'+comment+'/'+newRate+'/'+newCount)
                                                        .then(res=>console.log("comment and rating successfully added"))
                                                        .catch(error => console.log(error))
                                                })
                                                .catch(error=> console.log(error))
                                        }
                                    }
                                }}>Submit</button>
                                <button className={'btn btn-danger mx-2'}>Cancel</button>
                            </div>
                        </div>
                    </div>
                })
            ):(
                <h3 className={'text-center my-3'}>Please wait...</h3>
            )}
        </div>
    }
}

export default RatingAndComment;