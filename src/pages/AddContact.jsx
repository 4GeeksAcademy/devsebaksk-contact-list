import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

const API_URL_BASE = 'https://playground.4geeks.com/contact';
const API_URL_USER = '/agendas/devsebaksk/contacts';

export const AddContact = () => {


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");


    const agregarcontacto = async () => {
        let newContact = {
            name:name,
            email:email,
            phone:phone,
            address:address
        }
        try {
            const response = await fetch(API_URL_BASE + API_URL_USER, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newContact) // body data type must match "Content-Type" header
                // parses JSON response into native JavaScript objects

            });
            if (!response.ok) {
                throw new Error("Error");
            }
            setName("");
            setEmail("");
            setPhone("");
            setAddress("");
        }
        catch (error) {
            console.log(error);
        };
        
    }

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-center mb-4">
                <h1>Add a new contact</h1>
            </div>
            <div>
                <form className="row g-3">
                    <div className="col-md-11">
                        <label for="inputFullName" className="form-label">Full Name</label>
                        <input
                            value={name}
                            onChange={(e) =>{setName(e.target.value)}}
                            type="name" className="form-control" id="inputFullName" 
                            />
                    </div>
                    <div className="col-md-11">
                        <label for="inputEmail" className="form-label">Email</label>
                        <input
                        value={email}
                         onChange={(e) =>{setEmail(e.target.value)}}
                        type="email" className="form-control" id="inputEmail" />
                    </div>
                    <div className="col-md-11">
                        <label for="inputPhone" className="form-label">Phone</label>
                        <input
                        value={phone}
                        onChange={(e) =>{setPhone(e.target.value)}} 
                        type="phone" className="form-control" id="inputPhone" />
                    </div>
                    <div className="col-md-11">
                        <label for="inputAddress" className="form-label">Address</label>
                        <input
                        value={address}
                        onChange={(e) =>{setAddress(e.target.value)}} 
                        type="address" className="form-control" id="inputAddress" />
                    </div>
                    <div className="row mt-5 d-flex">
                        <div className="col-2">
                            <Link to="/"><button type="submit" className="btn btn-warning">Get back</button></Link>
                        </div>
                        <div className="col-1">
                            <button type="button" onClick={() => agregarcontacto()} className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

