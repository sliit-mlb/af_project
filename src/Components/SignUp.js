import React, {Component} from 'react';
import axios from 'axios';

export default class SignUp extends Component {

    constructor(props) {
        super(props);

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state ={
            fName:'',
            lName:'',
            uName:'',
            email: '',
            pwd:'',
            conPwd:''
        }
    }

    componentDidMount() {
        sessionStorage.removeItem('loggedAdmin');
        sessionStorage.removeItem('loggedStoreManager');

        if(JSON.parse(sessionStorage.getItem('loggedUser')) != null)
            this.props.history.push('/');
    }

    onChangeFirstName(e) {
        this.setState({fName: e.target.value})
    }

    onChangeLastName(e) {
        this.setState({lName: e.target.value})
    }

    onChangeUserName(e) {
        this.setState({uName: e.target.value})
    }

    onChangeEmail(e) {
        this.setState({email: e.target.value})
    }

    onChangePassword(e) {
        this.setState({pwd: e.target.value})
    }

    onChangeConfirmPassword(e) {
        this.setState({conPwd: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();

        const {fName,lName,uName,email,pwd,conPwd} = this.state;

        if(fName===""||lName===""||uName===""||email===""||pwd==="") {
            alert("All fields are required");
        }else if(uName.length <8 ) {
            alert("Username characters minimum 8!!!");
        }else if(pwd.length <8 ){
            alert("Password characters minimum 8!!!")
        } else if(pwd !== conPwd){
            alert('Password does not match!!!');
        }else {
            const {uName} = this.state;
            axios.get('http://localhost:4000/users/get-user/' + uName)
                .then(res => {
                    if(res.data[0].uName === uName) {
                        console.log("Username already used")
                    }
                })
                .catch(() => {
                    const userObject = {
                        fName: this.state.fName,
                        lName: this.state.lName,
                        uName: this.state.uName,
                        email: this.state.email,
                        pwd: this.state.pwd,
                        conPwd: this.state.conPwd
                    };

                    axios.post('http://localhost:4000/users/create-user', userObject)
                        .then(res => console.log(res.date));

                    alert("User registration successful!!!");

                    this.setState({fName: '', lName: '', uName: '', email: '', pwd: '', conPwd: ''})
                })
        }
    }

render() {
    return <div className={'col-10 mx-auto col-md-5 mt-4'}>
        <div className={'card card-body my-3'}>
            <h3 className={'text-center mb-5'}>Register</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>First Name</label>
                        <input type="text" className="form-control" placeholder="First Name" value={this.state.fName} onChange={this.onChangeFirstName}/>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Last Name</label>
                        <input type="text" className="form-control" placeholder="Last Name" value={this.state.lName} onChange={this.onChangeLastName}/>
                    </div>
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Username" value={this.state.uName} onChange={this.onChangeUserName}/>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Email" value={this.state.email} onChange={this.onChangeEmail}/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Password" value={this.state.pwd} onChange={this.onChangePassword}/>
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" placeholder="Confirm Password" value={this.state.conPwd} onChange={this.onChangeConfirmPassword}/>
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    </div>
}

}