import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Redirect
} from "react-router-dom";

class DeleteDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drId: this.props.match.params.id,
        };
    }
    componentDidMount() {
        let data = {
            getDrId: this.state.drId
        };
        const url = 'http://rrcgvir.com/register/Register/deletedoctor';
        const myheader = new Headers();
        myheader.append('Content-Type', 'application/json');
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            myheader
        };
        //const apiUrl = 'http://rrcgvir.com/register/Register/';
        fetch(url, options)
            .then(res => res.json())
            .then(
                (result) => {
                    //console.log(result[0].id)
                },
                (error) => {
                    this.setState({ error })
                }
            )
    }
    render () {
        return (
            <div>
                <Redirect to="/doctor/manage" />
            </div>
        )
    }
}

export default DeleteDoctor;