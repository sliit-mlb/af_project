import React, {Component} from "react";
import axios from 'axios';

class EditDiscount extends Component {
    constructor() {
        super();

        this.onChangeProduct = this.onChangeProduct.bind(this);
        this.onChangeDiscount = this.onChangeDiscount.bind(this);

        this.state = {
            discountProducts:[],
            selectedProductID:"",
            dis:[],
            discountAmt:""
        }
    }

    componentDidMount() {
        this.props.changeStoreManagerNavigationStatus(true);

        if (JSON.parse(sessionStorage.getItem('loggedStoreManager')) == null) {
            this.props.history.push('/store_manager');
        }

        axios.get('http://localhost:4000/product/')
            .then(response => {
                response.data.map((res) => {
                    let discount = parseFloat(res.discount);

                    if(discount>0)
                        this.setState({discountProducts:this.state.discountProducts.concat(res)})
                })
            })
            .catch(error => console.log(error))
    }

    componentWillUnmount() {
        this.props.changeStoreManagerNavigationStatus(false);
    }

    onChangeProduct(e) {
        this.setState({selectedProductID:e.target.value},() => {
            axios.get('http://localhost:4000/product/get-unique-product/'+this.state.selectedProductID)
                .then(res => this.setState({discountAmt:res.data[0].discount}))
                .catch(error => console.log(error))
        })
    }

    onChangeDiscount(e) {
        this.setState({discountAmt:e.target.value})
    }

    onClickUpdate(e){
        axios.put('http://localhost:4000/product/edit-discount/'+this.state.selectedProductID+'/'+this.state.discountAmt)
            .then(res=> console.log('Discount updated'))
            .catch(error => console.log(error))
    }

    onClickDelete(e){
        axios.put('http://localhost:4000/product/edit-discount/'+this.state.selectedProductID+'/0')
            .then(res=> console.log('Discount deleted'))
            .catch(error => console.log(error))
    }

    render() {
        return <div className={'col-10 mx-auto col-md-5 mt-4'}>
            <div className={'card card-body my-3'}>
                <h3 className={'text-center mb-5'}>Edit Discount</h3>
                {(this.state.discountProducts.length === 0)?(
                    <h5 className={'text-center'}>No Data</h5>
                ):(
                    (this.state.discountProducts.length>0)?(
                        <form>
                            <div className="form-group">
                                <label>Product Title</label>
                                <select className={'browser-default custom-select text-capitalize'} value={this.state.selectedProductID} onChange={this.onChangeProduct}>
                                    <option value={""}>Select one</option>
                                    {this.state.discountProducts.map((res,id) => {
                                        return <option value={res._id} key={id}>{res.title}</option>
                                    })}
                                </select>
                            </div>
                            {(this.state.selectedProductID !== "" && this.state.discountAmt !== "")?(
                                <div>
                                    <div className={'form-group'}>
                                        <label>Change Amount</label>
                                        <input type={'text'} className={'form-control'} placeholder={'Discount Amount'} value={this.state.discountAmt} onChange={this.onChangeDiscount}/>
                                    </div>
                                    <button type={'submit'} className={'btn btn-primary form-control my-2'} onClick={()=>this.onClickUpdate()}>Update Discount</button>
                                </div>
                            ):null}
                            <button type="submit" className="btn btn-danger form-control" onClick={()=>this.onClickDelete()}>Delete Discount</button>
                        </form>
                    ):(
                        <h5 className={'text-center'}>Please wait...</h5>
                    )
                )}
            </div>
        </div>
    }
}

export default EditDiscount;