import React, {Component} from "react";
import axios from 'axios';

class AddProduct extends Component {
    constructor() {
        super();

        this.onChangeProductTitle = this.onChangeProductTitle.bind(this);
        this.onChangeProductDescription = this.onChangeProductDescription.bind(this);
        this.onChangeProductPrice = this.onChangeProductPrice.bind(this);
        this.onChangeProductStockAmount = this.onChangeProductStockAmount.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title:"",
            description:"",
            price:"",
            stockAmount:"",
            discount:0.0,
            category:"N/A",
            categories:[],
            imgName:"",
            img:[]
        }
    }

    componentDidMount() {
        this.props.changeStoreManagerNavigationStatus(true);

        if(JSON.parse(sessionStorage.getItem('loggedStoreManager')) == null){
            this.props.history.push('/store_manager');
        }

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
        this.setState({stockAmount:e.target.value});
    }

    onChangeCategory(e) {
        this.setState({category:e.target.value});
    }

    onChangeImage(e) {
        const file = e.target.files[0];
        this.setState({
            img: URL.createObjectURL(file),
            imgName: file.name
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const file = document.getElementById('inputFile').files;

        this.setState({imgName:file[0].name});

        const productObject = {
            title:this.state.title,
            description: this.state.description,
            price: this.state.price,
            category: this.state.category,
            discount:this.state.discount,
            inStock:this.state.stockAmount,
            imgName: this.state.imgName
        }

        axios.post('http://localhost:4000/product/create-product', productObject)
            .then(res => console.log(res.data))

        const formData = new FormData();
        formData.append("img",file[0]);

        fetch('http://localhost:4000/image/upload-image/',{
            method: "POST",
            body: formData
        }).then(res => console.log(res));

        alert("Product added successful");

        this.setState({title:"",description:"",price:"",category:"N/A",stockAmount:"",imgName:"",img:[]});
    }

    render() {
        return <div className={'col-10 mx-auto col-md-5 mt-4'}>
            <div className={'card card-body my-3'}>
                <h3 className={'text-center mb-5'}>Add Product</h3>
                <form onSubmit={this.onSubmit}>
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
                            <option disabled value={"N/A"}>Select one category</option>
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
                        <input type="number" className="form-control" placeholder="Count" value={this.state.stockAmount} onChange={this.onChangeProductStockAmount}/>
                    </div>
                    <div className="form-group">
                        <label>Upload the image</label>
                        <div className={'custom-file'}>
                            <input type="file" ref={'file'} name={'user[image]'} className="custom-file-input" id={'inputFile'} accept={'image/x-png,image/jpeg'} onChange={this.onChangeImage}/>
                            <label className={'custom-file-label'} htmlFor={'inputFile'}>Choose file</label>
                        </div>
                    </div>
                    {(this.state.imgName!=="")?(
                        <div className={'form-group'}>
                            <label>Preview</label>
                            <img src={this.state.img} width={'100%'} alt={this.state.imgName}/>
                        </div>
                    ):null}
                    <button type="submit" className="btn btn-primary">Add Product</button>
                </form>
            </div>
        </div>
    }
}

export default AddProduct;