import React, {Component} from "react";
import axios from 'axios';

class UpdateProduct extends Component {
    constructor() {
        super();

        this.onChangeProduct = this.onChangeProduct.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitUpdate = this.onSubmitUpdate.bind(this);
        this.onChangeProductTitle = this.onChangeProductTitle.bind(this);
        this.onChangeProductDescription = this.onChangeProductDescription.bind(this);
        this.onChangeProductPrice = this.onChangeProductPrice.bind(this);
        this.onChangeProductStockAmount = this.onChangeProductStockAmount.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);

        this.state = {
            products: [],
            selectProductId:"",
            categories:[],
            title:"",
            description:"",
            category:"",
            price:"",
            inStock:""
        }
    }

    componentDidMount() {
        this.props.changeStoreManagerNavigationStatus(true);

        if (JSON.parse(sessionStorage.getItem('loggedStoreManager')) == null) {
            this.props.history.push('/store_manager');
        }

        axios.get('http://localhost:4000/product/')
            .then(res => this.setState({products: res.data}))
            .catch(error => console.log(error))

        axios.get('http://localhost:4000/category/')
            .then(res => {
                this.setState({
                    categories:res.data
                });
            })
            .catch(error=> console.log(error))
    }

    componentWillUnmount() {
        this.props.changeStoreManagerNavigationStatus(false);
    }

    onChangeProduct(e) {
        this.setState({selectProductId:e.target.value},()=>{
            axios.get('http://localhost:4000/product/get-unique-product/'+this.state.selectProductId)
                .then(res => this.setState({
                    title:res.data[0].title,
                    description:res.data[0].description,
                    category:res.data[0].category,
                    price:res.data[0].price,
                    inStock:res.data[0].inStock
                }))
                .catch(error=>console.log(error))
        })
    }

    onChangeProductTitle(e) {
        this.setState({title:e.target.value});
    }

    onChangeProductDescription(e) {
        this.setState({description:e.target.value});
    }

    onChangeProductPrice(e) {
        this.setState({price:e.target.value});
    }

    onChangeProductStockAmount(e) {
        this.setState({inStock:e.target.value});
    }

    onChangeCategory(e) {
        this.setState({category:e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        axios.delete('http://localhost:4000/product/delete-product/'+this.state.selectProductId)
            .then(res => console.log('Product deleted successfully'))
            .catch(error => console.log(error))

        window.location.reload();
    }

    onSubmitUpdate(e) {
        const productObject = {
            title:this.state.title,
            description: this.state.description,
            price: this.state.price,
            category: this.state.category,
            inStock:this.state.inStock
        }

        axios.put('http://localhost:4000/product/update-product/'+this.state.selectProductId,productObject)
            .then(res => console.log("Product update successfully"))
            .catch(error => console.log(error))
    }

    render() {
        return <div className={'col-10 mx-auto col-md-5 mt-4'}>
            <div className={'card card-body my-3'}>
                <h3 className={'text-center mb-5'}>Update Product</h3>
                {(this.state.products.length === 0)?(
                    <h5 className={'text-center'}>Data not found</h5>
                ):(
                    (this.state.products.length>0) ?(
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Select Product</label>
                                <select className={'browser-default custom-select'} value={this.state.selectProductId} onChange={this.onChangeProduct}>
                                    {this.state.products.map((res,id) => {
                                        return <option key={id} value={res._id}>{res.title}</option>
                                    })}
                                </select>
                            </div>
                            <button type="submit" className="btn btn-danger form-control">Delete</button>
                        </form>
                    ):(
                        <h5 className={'text-center'}>Please wait...</h5>
                    )
                )}
            </div>
            {(this.state.selectProductId !== "" && this.state.inStock !== "")?(
                <div className={'card card-body my-3'}>
                    <h3 className={'text-center mb-5'}>Edit Product</h3>
                    <form onSubmit={this.onSubmitUpdate}>
                        <div className="form-group">
                            <label>Product Title</label>
                            <input type="text" className="form-control" placeholder="Product Title" value={this.state.title} onChange={this.onChangeProductTitle}/>
                        </div>
                        <div className="form-group">
                            <label>Product Description</label>
                            <textarea className="form-control" placeholder="Product Description" value={this.state.description} onChange={this.onChangeProductDescription}/>
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <select className={'browser-default custom-select text-capitalize'} value={this.state.category} onChange={this.onChangeCategory}>
                                {this.state.categories.map((res) => {
                                    return <option key={res._id} value={res.category}>{res.category}</option>
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Price in LKR</label>
                            <input type="number" className="form-control" placeholder="Price in LKR" value={this.state.price} onChange={this.onChangeProductPrice}/>
                        </div>
                        <div className="form-group">
                            <label>Stock Amount</label>
                            <input type="number" className="form-control" placeholder="Count" value={this.state.inStock} onChange={this.onChangeProductStockAmount}/>
                        </div>
                        <button type="submit" className="btn btn-primary form-control">Update Product</button>
                    </form>
                </div>
            ):null}
        </div>
    }
}


export default UpdateProduct;