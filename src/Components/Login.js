import React, {Component} from 'react';
import axios from 'axios';
import {Link, withRouter} from 'react-router-dom';

class Login extends Component {
    loginData;

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
        sessionStorage.removeItem('loggedAdmin');
        sessionStorage.removeItem('loggedStoreManager');

        if(JSON.parse(sessionStorage.getItem('loggedUser')) != null)
            this.props.history.push('/');
    }

    onChangeUserName(e) {
        this.setState({uName:e.target.value})
    }

    onChangePassword(e) {
        this.setState({pwd:e.target.value})
    }


    onSubmit(e) {
        e.preventDefault();

        const {uName, pwd} = this.state;

        axios.get('http://localhost:4000/users/get-user/' + uName + '/' + pwd)
            .then(res => {
                if(res.data[0].uName === uName) {
                    alert("Login Successful");
                    sessionStorage.setItem('loggedUser',JSON.stringify(res.data[0]._id));
                    sessionStorage.setItem('loggedUserName',JSON.stringify(res.data[0].fName+" "+res.data[0].lName));
                    this.props.history.push('/');
                    window.location.reload();
                }
                else {
                    console.log("Login failed")
                }
            })
            .catch((error) => {
                console.log(error);
            })
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
                        <div className={'form-group'}>
                            <button type="submit" className="btn btn-primary form-control">Login</button>
                        </div>
                        <div className="form-group text-center">
                            <Link to={'/signup'}>
                                Create an account!!!
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    }
}

export default withRouter(Login);