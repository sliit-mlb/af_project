import React, {Component} from "react";
import axios from 'axios';

class AddCategory extends Component{
    constructor(props) {
        super(props);

        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            category:""
        }
    }

    componentDidMount() {
        this.props.changeAdminNavigationStatus(true);

        if(JSON.parse(sessionStorage.getItem('loggedAdmin')) == null){
            this.props.history.push('/admin');
        }
    }

    componentWillUnmount() {
        this.props.changeAdminNavigationStatus(false);
    }

    onChangeCategory(e) {
        this.setState({category: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();

        const object = {
            category: this.state.category
        }

        axios.post('http://localhost:4000/category/create-category', object)
            .then(res => console.log(res.date));

        alert('Successfully added');

        this.setState({category:""})

    }

    render() {
        return <div className={'col-10 mx-auto col-md-5 mt-4'}>
            <div className={'card card-body my-3'}>
                <h3 className={'text-center mb-5'}>Add Category</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Category Name</label>
                        <input type="text" className="form-control" placeholder="Category Name" value={this.state.category} onChange={this.onChangeCategory}/>
                    </div>
                    <button type="submit" className="btn btn-primary form-control">Submit</button>
                </form>
            </div>
        </div>
    }
}

export default AddCategory