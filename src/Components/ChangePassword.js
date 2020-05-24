import React, {Component} from "react";
import axios from 'axios';

class ChangePassword extends Component{
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeCurrentPassword = this.onChangeCurrentPassword.bind(this);
        this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
        this.onChangeConfirmNewPassword = this.onChangeConfirmNewPassword.bind(this);

        this.state = {
            user:[],
            curPwd:"",
            newPwd:"",
            conNewPwd:""
        }
    }


    componentDidMount() {
        if(JSON.parse(sessionStorage.getItem('loggedUser')) == null)
            this.props.history.push('/login');
        else {
            axios.get('http://localhost:4000/users/get-user-by-id/' + JSON.parse(sessionStorage.getItem('loggedUser')))
                .then(res => this.setState({user: res.data[0]}))
                .catch(error => console.log(error))
        }
    }

    onChangeCurrentPassword(e) {
        this.setState({curPwd:e.target.value})
    }

    onChangeNewPassword(e) {
        this.setState({newPwd:e.target.value})
    }

    onChangeConfirmNewPassword(e){
        this.setState({conNewPwd:e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();

        const {curPwd,newPwd,conNewPwd} = this.state

        if(curPwd===""||newPwd===""||conNewPwd===""){
            alert('all field are required')
        }else if(curPwd !== this.state.user.pwd){
            alert("Current password is wrong")
        } else if(newPwd.length<8){
            alert('Password minimum length 8')
        } else if(curPwd === newPwd){
            alert('Current Password and New Password cannot be same')
        } else if(newPwd !== conNewPwd){
            alert('New password are does not match')
        } else {
            const pwdObj = {
                pwd: this.state.newPwd
            }

            axios.put('http://localhost:4000/users/update-user/'+JSON.parse(sessionStorage.getItem('loggedUser')), pwdObj)
                .then(res => console.log(res.date));

            alert("Password update successful!!! Please re-login");

            sessionStorage.removeItem('loggedUser')
            window.location.reload();
        }
    }

    render() {
        return <div className={'col-10 mx-auto col-md-5 mt-4'}>
            <div className={'card card-body my-3'}>
                <h3 className={'text-center mb-5'}>Change Password</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Current Password</label>
                        <input type={'password'} className={'form-control'} placeholder={'Current Password'} value={this.state.curPwd} onChange={this.onChangeCurrentPassword}/>
                    </div>
                    <div className="form-group">
                        <label>New Password</label>
                        <input type={'password'} className={'form-control'} placeholder={'New Password'} value={this.state.newPwd} onChange={this.onChangeNewPassword}/>
                    </div>
                    <div className="form-group">
                        <label>Confirm New Password</label>
                        <input type={'password'} className={'form-control'} placeholder={'Confirm New Password'} value={this.state.conNewPwd} onChange={this.onChangeConfirmNewPassword}/>
                    </div>
                    <button type="submit" className="btn btn-primary form-control">Update Password</button>
                </form>
                <button type={'submit'} className={'btn btn-danger form-control my-3'} onClick={()=>{this.props.history.push('/')}}>Cancel</button>
            </div>
        </div>
    }
}

export default ChangePassword;