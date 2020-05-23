import React, {Component} from 'react';
import axios from 'axios';

export default class Category extends Component{
    constructor() {
        super();

        this.state = {
            category: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/category/')
            .then(res => {
                this.setState({
                    category:res.data
                })
            })
            .catch((error) => {
                console.log(error);
            })

        sessionStorage.removeItem('loggedAdmin');
        sessionStorage.removeItem('loggedStoreManager');
    }

    onClick(type){
        this.props.changeDisplayCategory(type);
    }

    render() {
        return <div className={'btn-group-vertical'}>
            <button className={'btn active bg-success btn-outline-success'} onClick={()=>this.onClick("all")}>All</button>
            {this.state.category.map((res,i)=>
                <button className={'btn btn-outline-success text-capitalize'} key={i} onClick={()=>this.onClick(res.category)}>{res.category}</button>
            )}
        </div>
    }

}