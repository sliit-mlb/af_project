import React, {Component} from 'react';
import axios from "axios";
import {withRouter} from "react-router-dom";

class AdminHome extends Component{
    constructor(props) {
        super(props);

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            uName:"",
            pwd:""
        }
    }


    componentDidMount() {
        this.props.changeAdminNavigationStatus(true);

        axios.get('http://localhost:4000/admin/')
            .then(res => {
                if(res.data.length===0){
                    const adminObject = {
                        uName:"admin",
                        pwd:"asdf"
                    }

                    axios.post('http://localhost:4000/admin/create-admin', adminObject)
                        .then(res => console.log(res.date));
                }
            })
            .catch(error => console.log(error));

        sessionStorage.removeItem('loggedStoreManager');
        sessionStorage.removeItem('loggedUser');

        if(JSON.parse(sessionStorage.getItem('loggedAdmin'))!=null){
            this.props.history.push('/admin/add_store_manager');
        }
    }

    componentWillUnmount() {
        this.props.changeAdminNavigationStatus(false);
    }

    onChangeUserName(e) {
        this.setState({uName:e.target.value})
    }

    onChangePassword(e) {
        this.setState({pwd:e.target.value})
    }

    onSubmit(e){
        e.preventDefault();

        const {uName,pwd} = this.state;

        axios.get('http://localhost:4000/admin/get-admin/'+uName+'/'+pwd)
            .then(res => {
                if((res.data[0].uName === uName) && (res.data[0].pwd === pwd)){
                    sessionStorage.setItem('loggedAdmin',JSON.stringify(res.data[0]._id));
                    this.props.history.push('/admin/add_store_manager');
                }
            })
            .catch(error => console.log(error))
    }

    render() {
        return <div className={'row'}>
            <div className={'col-10 mx-auto col-md-4'}>
                <div className={'card card-body'}>
                    <h3 className={'text-center mb-5'}>Login</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Username" value={this.state.uName} onChange={this.onChangeUserName}/>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Password" value={this.state.pwd} onChange={this.onChangePassword}/>
                        </div>
                        <button type="submit" className="btn btn-primary form-control">Login</button>
                    </form>
                </div>
            </div>
        </div>
    }
}

export default withRouter(AdminHome);