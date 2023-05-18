import React, {Component} from 'react'
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import config from '../../config'

class UploadBook extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            id : "",
            bookname: "",
            author: "",
            category: "",
            price: "",
            description: "",
            fileToUpload: undefined
        };
        this.handleValidation = this.handleValidation.bind(this);
    }
    redirectPage = () => {
        this.props.navigate('/');
    }

    async handleValidation(e) {
        e.preventDefault();

        let formIsValid = true;
        if (!this.state.id || !this.state.bookname || !this.state.author){
            formIsValid = false;
        }

        if (formIsValid){
            try{
                const response = await axios({
                    method: 'post',
                    url: `${config.APP_API_URL}/books`,
                    data: {
                        id : this.state.id,
                        rv_id: 0,
                        name: this.state.bookname,
                        author: this.state.author,
                        price: this.state.price,
                        category: this.state.category,
                        description: this.state.description,
                        image: this.state.fileToUpload 
                    },
                    headers: { "Content-Type": "multipart/form-data" }
                })
                const status = response.status;
                if (status === 200)
                {
                    setTimeout('', 3000);
                    alert("Book upload successfull")
                    this.redirectPage();
                }
                else
                {
                    alert("Error Occured while uploading the book")
                }
            }
            catch{
                alert("Error Occured while uploading the book 1")
            }
        }
        else
        {
            alert("The id, name or author not entered")
        }

    }

    render() {
        return (
            <div className="container p-5 my-5 border">
                <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label">ID</label>
                    <input type="text" className="form-control" onChange={(e) => this.setState({ id: e.target.value })} value={this.state.id} placeholder="ID of book" required></input>
                </div>
                <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label">Name</label>
                    <input type="text" onChange={(e) => this.setState({ bookname: e.target.value })} value={this.state.bookname} className="form-control" placeholder="Book name" required></input>
                </div>
                <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label">Author</label>
                    <input type="text" onChange={(e) => this.setState({ author: e.target.value })} value={this.state.author} className="form-control" placeholder="Author book"></input>
                </div>
                <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label">Category</label>
                    <input type="text" onChange={(e) => this.setState({ category: e.target.value })} value={this.state.category} className="form-control" placeholder="Category"></input>
                </div>
                <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label">Price</label>
                    <input type="text" onChange={(e) => this.setState({ price: e.target.value })} value={this.state.price} className="form-control" placeholder="USD"></input>
                </div>
                <div className="mb-3">
                    <label for="exampleFormControlTextarea1" className="form-label">Description</label>
                    <textarea className="form-control" onChange={(e) => this.setState({ description: e.target.value })} value={this.state.description} rows="3"></textarea>
                </div>
                <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label">Select image:</label>
                    <input className="form-control" type="file" id="img" name="img" accept="image/*,.pdf" onChange={(e) => this.setState({ fileToUpload: e.target.files[0] })}></input>
                </div>
                <div>
                    <input type="checkbox" className="btn-check" id="btn-check-outlined" autocomplete="off" onClick={ this.handleValidation }/>
                    <label className="btn btn-outline-primary" for="btn-check-outlined">Create</label>
                </div>
                
            </div>
        )
    }
}
function WithNavigate(props) {
    let navigate = useNavigate();
    return <UploadBook {...props} navigate={navigate} />
}

export default WithNavigate;

