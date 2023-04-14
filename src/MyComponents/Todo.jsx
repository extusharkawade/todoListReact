import React from "react";
import { useState } from "react";
import 'reactjs-popup/dist/index.css';
import { Modal, ModalHeader } from "reactstrap";
export const TodoItem = (props) => {
    const [editModal, seteditModal] = useState(false);
    const [deleteModel, setdeleteModel] = useState(false);
    const [newTitle, setnewTitle] = useState("");
    const [newDesc, setnewDesc] = useState("");
    const [newTitleError, setnewTitleError] = useState(false);
    const [newDescError, setnewDescError] = useState(false);

    const editTitleValidation = (val) => {
        var editedTitle = val.target.value;
        console.log("This is new Title", editedTitle);
        if (editedTitle.length >= 3) {
            setnewTitleError(false);
        }
        else {
            setnewTitleError(true);
        }
        setnewTitle(editedTitle);
    }

    const editDescValidation = (val) => {
        var editedDesc = val.target.value;
        console.log("This is new Title", editedDesc)
        if (editedDesc.length >= 5) {
            setnewDescError(false);
        }
        else {
            setnewDescError(true);
        }
        setnewDesc(val.target.value);

    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("onSubmit", newTitle);
        console.log("onSubmit", newDesc);

        if ((!(newTitle === null) && !(newDesc === null)) && (!(newTitle === "") && !(newDesc === ""))) {
            if (!(newTitleError && newDescError)) {
                props.onEdit(newTitle, newDesc, props.todo);
                seteditModal(!editModal)
            }
        }
    }
    return (
        <>
            <div>

                <Modal
                    isOpen={editModal}
                    toggle={() => {
                        seteditModal(!editModal)
                    }}>
                    <ModalHeader toggle={() => seteditModal(!editModal)}>
                        <span> Edit Form</span>
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <label htmlFor="newTitle">Title</label>
                                <input type="text" className="form-control" id="newTitle" aria-describedby="emailHelp" placeholder="Enter new title" onChange={editTitleValidation} />
                                {newTitleError ? <span className="fw-light text-danger">Enter valid Title</span> : <span></span>}
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label htmlFor="newDesc">Description</label>
                                <input type="text" className="form-control" id="newDesc" placeholder="Type new description" onChange={editDescValidation} />
                                {newDescError ? <span className="fw-light text-danger">Enter valid description</span> : <span></span>}

                            </div>
                            <br></br>

                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </ModalHeader>
                </Modal>


                <Modal
                    isOpen={deleteModel}
                    toggle={() => {
                        setdeleteModel(!deleteModel)
                    }}>
                    <ModalHeader toggle={() => setdeleteModel(!deleteModel)}>

                        <span class="text-primary"></span>
                        <div class="display-7" >Are you sure you wanna delete '{props.todo.title}'? </div>
                        <br></br>
                        <span>
                            <button type="button" class="btn btn-sm btn-danger me-1" onClick={() => {
                                props.onDelete(props.todo)
                                setdeleteModel(!deleteModel)
                            }}>Delete </button>
                            <button type="button" class="btn btn-sm btn-primary" onClick={() => {
                                setdeleteModel(!deleteModel)
                            }}>Cancel </button>
                        </span>


                    </ModalHeader>
                </Modal>

                <h4>{props.todo.title} </h4>
                <p>{props.todo.desc} </p>





                <button type="button" className="btn btn-sm btn-danger me-1" onClick={() => {
                    setdeleteModel(true);


                }} > Delete  </button>


                <button type="button" className="btn btn-sm btn-primary" onClick={() => {

                    seteditModal(true);

                    console.log("newTitle", newTitle);
                    console.log("newDesc", newDesc);



                }} > Edit </button>


            </div>
            <hr></hr>
        </>
    )

}