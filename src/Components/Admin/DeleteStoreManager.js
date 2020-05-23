import React, {Component} from "react";
import axios from 'axios';

class DeleteStoreManager extends Component {
    constructor() {
        super();

        this.onChangeStoreManager = this.onChangeStoreManager.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            managers:[],
            selectedManger:""
        }
    }

    componentDidMount() {
        this.props.changeAdminNavigationStatus(true);

        if(JSON.parse(sessionStorage.getItem('loggedAdmin')) == null){
            this.props.history.push('/admin');
        }

        axios.get('http://localhost:4000/store-manager/')
            .then(res=> this.setState({managers:res.data}))
    }

    onChangeStoreManager(e){
        this.setState({selectedManger:e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();

        axios.delete('http://localhost:4000/store-manager/delete-store-manager/'+this.state.selectedManger)
            .then(res=> console.log('successfully deleted'))
            .catch(error=> console.log(error))

        window.location.reload();
    }

    componentWillUnmount() {
        this.props.changeAdminNavigationStatus(false);
    }

    render() {
        return <div className={'col-10 mx-auto col-md-5 mt-4'}>
            <div className={'card card-body my-3'}>
                <h3 className={'text-center mb-5'}>Remove Store Manager</h3>
                {(this.state.managers.length === 0)?(
                    <h5 className={'text-center'}>Data not found</h5>
                ):(
                    (this.state.managers.length>0) ?(
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Select Store Manager</label>
                                <select className={'browser-default custom-select'} value={this.state.selectedManger} onChange={this.onChangeStoreManager}>
                                    {this.state.managers.map((res,id) => {
                                        return <option key={id} value={res._id}>{res.name}&emsp;(UserName: {res.uName})</option>
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
        </div>
    }
}

export default DeleteStoreManager;