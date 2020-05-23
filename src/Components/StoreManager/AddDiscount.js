import React, {Component} from "react";
import axios from 'axios';

class AddDiscount extends Component {
    constructor() {
        super();

        this.onChangeProduct = this.onChangeProduct.bind(this);
        this.onChangeDiscount = this.onChangeDiscount.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            category:"",
            product:"",
            discount:"",
            categories:[],
            products:[]
        }
    }

    componentDidMount() {
        this.props.changeStoreManagerNavigationStatus(true);

        if(JSON.parse(sessionStorage.getItem('loggedStoreManager')) == null){
            this.props.history.push('/store_manager');
        }

        axios.get('http://localhost:4000/product/')
            .then(res=> this.setState({products:res.data}))
            .catch(error => console.log(error))

        axios.get('http://localhost:4000/category/')
            .then(res=> this.setState({categories:res.data}))
            .catch(error => console.log(error))
    }

    componentWillUnmount() {
        this.props.changeStoreManagerNavigationStatus(false);
    }

    onChangeProduct(e) {
        this.setState({
            product:e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const {product,discount} = this.state;

        axios.put('http://localhost:4000/product/update-discount/'+product+'/'+discount)
            .then(()=>console.log("Update Successfully"))
    }

    onChangeDiscount(e){
        this.setState({
            discount:e.target.value
        })
    }

    render() {
        return <div className={'col-10 mx-auto col-md-5 mt-4'}>
            <div className={'card card-body my-3'}>
                <h3 className={'text-center mb-5'}>Add Discount</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Product Title</label>
                        <select className={'browser-default custom-select text-capitalize'} value={this.state.product} onChange={this.onChangeProduct}>
                            <option value={"AllProduct"}>All Product</option>
                            {this.state.products.map((res) => {
                                return <option key={res._id} value={res.title}>{res.title}</option>
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Discount Amount</label>
                        <input type={'text'} className={'form-control'} placeholder={'Discount Amount'} value={this.state.discount} onChange={this.onChangeDiscount}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Add Discount</button>
                </form>
            </div>
        </div>
    }
}

export default AddDiscount;