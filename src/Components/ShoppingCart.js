import React, {Component} from "react";
import axios from 'axios';
import {Link} from "react-router-dom";

class ShoppingCart extends Component{
    constructor() {
        super();

        this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
        this.onChangeCount = this.onChangeCount.bind(this);

        this.state ={
            cartItems:[],
            products:[],
            totPrc:0.0,
            totDis:0.0,
            purchaseItems:[]
        }
    }

    componentDidMount() {
        if(JSON.parse(sessionStorage.getItem('loggedUser')) == null)
            this.props.history.push('/login');

        sessionStorage.removeItem('purchaseItem');

        axios.get('http://localhost:4000/users/get-user-by-id/'+JSON.parse(sessionStorage.getItem('loggedUser')))
            .then(res => this.setState({cartItems:res.data[0].shoppingCart},()=> {
                this.state.cartItems.map((obj)=>{
                    axios.get('http://localhost:4000/product/get-unique-product/' + obj.item)
                        .then(res => this.setState({products: this.state.products.concat(res.data)}))
                        .catch(error=> console.log(error))
                })
            }))
            .catch(error => console.log(error))
    }

    onClickDelete(itemId){
        axios.put('http://localhost:4000/users/delete-shopping-cart/'+JSON.parse(sessionStorage.getItem('loggedUser'))+'/'+itemId)
            .then(res=>console.log(res))
        window.location.reload();
    }

    onChangeCheckbox(e) {
        let checkBox = document.getElementById(e.target.id);
        let price = parseFloat(e.currentTarget.dataset.price);
        let discount = parseFloat(e.currentTarget.dataset.discount);
        let productId = e.currentTarget.dataset.prodid;

        let commonId = e.currentTarget.dataset.common;

        let inputBox = document.getElementById(commonId);
        let inputBoxValue = parseInt(inputBox.value);

        let deleteButton = document.getElementById(`delId${commonId}`);

        if(checkBox.checked === true){
            this.setState(prevState=>{
                return {totPrc:prevState.totPrc+(price*inputBoxValue),totDis:prevState.totDis+(discount*inputBoxValue)}
            })
            inputBox.disabled = true;
            deleteButton.disabled = true;
            this.setState({purchaseItems: this.state.purchaseItems.concat(productId)})
        }else {
            this.setState(prevState=>{
                return {totPrc:prevState.totPrc-(price*inputBoxValue),totDis:prevState.totDis-(discount*inputBoxValue)}
            })
            inputBox.disabled = false;
            deleteButton.disabled = false;
            for(let i=0;i<this.state.purchaseItems.length;i++){
                if(productId === this.state.purchaseItems[i]){
                    this.state.purchaseItems.splice(i,1);
                }
            }
        }
    }

    onChangeCount(e){
        let idVal = e.target.id;
        let text = document.getElementById(`text${idVal}`);
        let inputCount = parseInt(document.getElementById(`${idVal}`).value);
        let price = parseFloat(e.currentTarget.dataset.price);
        let discount = parseFloat(e.currentTarget.dataset.discount);

        let fullPrice = (price-discount)*inputCount;

        text.value=fullPrice;
    }

    render() {
        return <div className={'container'}>
            <div className={'row'}>
                <div className={'col text-center'}>
                    <h3>Shopping Cart</h3>
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
                                                <div className={'row my-2'}>
                                                    <div className={'col font-weight-bold'}>
                                                        {res.title}
                                                    </div>
                                                </div>
                                                <div className={'row align-items-center'}>
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
                                            <div className={'col align-self-center'}>
                                                Select count <input type={'number'} className={'form-control my-2'} data-price={res.price} data-discount={res.discount} defaultValue={'1'} min={'1'} id={id} onChange={this.onChangeCount}/>
                                                <br/> <br/>
                                                <div className={'text-center'}>
                                                    Total amount for this product
                                                    <input type={'text'} className={'form-control'} value={parseFloat(res.price)-parseFloat(res.discount)} id={`text${id}`} disabled readOnly/>
                                                </div>
                                            </div>
                                            <div className={'col align-self-center my-3'}>
                                                <div className={'row align-items-center'}>
                                                    <div className={'col'}>
                                                        <button className={'btn btn-success mx-2 my-2 form-control'} id={`delId${id}`}
                                                                onClick={() => this.onClickDelete(res._id)}>
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'col-auto align-self-center text-center'}>
                                            Select <br/>
                                            <input type={'checkbox'} data-prodid={res._id} data-price={res.price} data-discount={res.discount} data-common={id} id={`checkBox${id}`} onChange={this.onChangeCheckbox}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)
                })):(
                <h2 className={'text-center'}>Please wait...</h2>
            )}
            <div className={'card my-3'}>
                <h3 className={'card-title text-center my-3'}>
                    Purchase Summary
                </h3>
                <div className={'row'}>
                    <div className={'col-8 text-right my-3'}>
                        Total Amount : <br/>
                        Discount : <br/>
                        <div className={'font-weight-bold'}> Total Amount to Purchase :</div>
                    </div>
                    <div className={"col-4 my-3"}>
                        Rs. {this.state.totPrc} <br/>
                        Rs. {this.state.totDis} <br/>
                        <div className={'font-weight-bold'}>Rs. {this.state.totPrc-this.state.totDis} </div>
                    </div>
                </div>
                <h4 className={'text-center my-3'}>
                    Select payment method
                </h4>
                <div className={'row my-3'}>
                    <div className={'col text-center'}>
                        Card <input type={'radio'}/> <br/>
                        Cash on Delivery <input type={'radio'}/>
                    </div>
                </div>
                <div className={'row my-2'}>
                    <div className={'col mx-2'}>
                        <Link to={'/rating_comment'}>
                            {sessionStorage.setItem('purchaseItem',JSON.stringify(this.state.purchaseItems))}
                            <button className={'btn btn-primary form-control'}>Confirm Order</button>
                        </Link>
                    </div>
                    <div className={'col mx-2'}>
                        <Link to={'/'}>
                            <button className={'btn btn-danger form-control'}>Cancel</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default ShoppingCart;