import { useEffect } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
//URL servidor
const API_URL_BASE = 'https://playground.4geeks.com/contact';
const API_URL_USER = '/agendas/devsebaksk';

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const obtenerContactos = async () => {
		try {
			const response = await fetch(API_URL_BASE + API_URL_USER);

			if (!response.ok) {
				throw new Error("Ocurrio un error al obtener los contactos");

			}

			const data = await response.json();
			dispatch({ type: "show_contacts", payload: { contacts: data.contacts } })
		} catch (error) {
			console.log(error);
		}
	};

	const deleteContact = async (idContacto) => {
		try{
			const response = await fetch(API_URL_BASE+API_URL_USER+"/contacts/"+idContacto,{
				method: 'DELETE'
			});
			if(!response.ok){
				throw new Error ("Ocurrio un error al obtener los contactos");
			}
			obtenerContactos();
		}
		catch (error){
			console.log(error);
		}
	}
	useEffect(() => {
		obtenerContactos();
	}, []);
	return (
		<div className="container mt-3">
			<div className="d-grid gap-2 d-md-flex justify-content-md-end">
				<Link to="/addcontact"><button type="button" className="btn btn-success">Add new contact </button></Link>
			</div>
			<div className="text-center mt-5">
				<ul className="list-group">
					{store.contacts.map((value, index) => {

						return (
							<div className="container list-group-item">
								<div className="row d-flex align-items-center">
									<div className="col-2 me-5">
										<img className="rounded-circle" src="https://picsum.photos/150/150"></img>
									</div>
									<div className="col-7 d-flex justify-content-start flex-column">
										<div className="d-flex">
											<p key={value.id} className="fs-3">{value.id}{value.name}</p>
										</div>
										<div className="d-flex">
											<i className="fa-solid fa-location-dot pe-2 pt-1"></i>
											<p>{value.address}</p>
										</div>
										<div className="d-flex">
											<i className="fa-solid fa-phone pe-2 pt-1"></i>
											<p>{value.phone}</p>
										</div>
										<div className="d-flex">
											<i className="fa-solid fa-envelope pe-2 pt-1"></i>
											<p>{value.email}</p>
										</div>
									</div>
									<div className="col-1 align-self-start pt-2">
									<Link to={`/editcontact/${value.id}`}><button type="button" className="btn btn-dark" data-bs-toggle="modal"><i className="fa-solid fa-pencil"></i></button></Link>
									</div>
									<div className="col-1 align-self-start pt-2">
										<button type="button" className="btn btn-dark" data-bs-toggle="modal" onClick={()=>deleteContact(value.id)}><i className="fa-solid fa-trash"></i></button>
									</div>
								</div>

								
								<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
									<div className="modal-dialog">
										<div className="modal-content">
											<div className="modal-header">
												<h1 className="modal-title fs-5" id="exampleModalLabel">Are you sure?</h1>
												<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
											</div>
											<div className="modal-body">
												If you delete this thing the entire universe will go down!
											</div>
											<div className="modal-footer">
												<button type="button" className="btn btn-primary" data-bs-dismiss="modal">Oh no!</button>
												<button type="button" className="btn btn-danger" onClick={()=>deleteContact(value.id)} data-bs-dismiss="modal">Yes baby!</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</ul>
			</div>
		</div>
	);
}; 