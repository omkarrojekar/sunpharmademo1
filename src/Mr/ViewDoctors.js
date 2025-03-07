import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Redirect
} from "react-router-dom";
import Header from './Layout/MrHeader';
import Leftbar from './Layout/MrLeftBar';
import Footer from '../layout/Footer';

class ViewDoctors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            products: [],
        };
    }
    componentDidMount() {
        let data = {
            getMrId: localStorage.getItem("userid")
        };
        const apiUrl = 'http://rrcgvir.com/register/Register/alldoctorsofmr/';
        const myheader = new Headers();
        myheader.append('Content-Type', 'application/json');
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            myheader
        };
        fetch(apiUrl,options)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        products: result
                    })
                    //console.log(result)
                },
                (error) => {
                    this.setState({ error })
                }
            )
    }
    render () {
        if (localStorage.getItem("userid") != null) {
            const { error, products } = this.state;
            if (error) {
                return (
                    <div>Error: {error.message}</div>
                )
            }
            else {
                return (

                    <React.Fragment>
                         <div id="wrapper" class="enlarged forced">
                            <Header />
                            <div className="left side-menu">
                                <Leftbar />
                            </div>

                            <div className="content-page">
                                <div className="content">
                                    <div className="row">
                                        <div className="col-sm-12">

                                            <h4 className="page-title">Welcome {localStorage.getItem("username")}</h4>
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item"><a href="#">Marketing Reprentative</a></li>
                                                <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
                                                <li className="breadcrumb-item active">Doctors</li>
                                            </ol>

                                        </div>
                                    </div>

                                    <div className="container mt-5">
                                        <hr />
                                        <div className="row">
                                            <div className="col-md-9">
                                                <div className="card-box table-responsive">
                                                    <h4 className="m-t-0  text-center"><h2>Doctors for {localStorage.getItem("username")}</h2></h4>
                                                    <table id="datatable-buttons" className="table table-bordered" cellspacing="0" width="100%">
                                                        <thead>
                                                            <tr>
                                                                <th>ID</th>
                                                                <th>NAME</th>
                                                                <th>EMAIL</th>
                                                                <th>CONTACT</th>
                                                                <th>ACTION</th>
                                                            </tr>
                                                        </thead>


                                                        <tbody>
                                                            {products.map(item => (
                                                                <tr>
                                                                    <td>{item.id}</td>
                                                                    <td>{item.name}</td>
                                                                    <td>{item.email}</td>
                                                                    <td>{item.contact}</td>
                                                                    <td><a href={"/mr/doctor/view/"+item.id} ><button className="btn btn-info">View</button></a></td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Footer />
                            </div>
                        </div>
                    </React.Fragment>

                )
            }
        }
        else {
            return (<React.Fragment>
                <Redirect to="/user/login" />
            </React.Fragment>)
        }
    }
}

export default ViewDoctors;