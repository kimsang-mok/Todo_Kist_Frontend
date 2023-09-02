import "../styles/DeleteModal.scss"

import React from 'react'

function DeleteModal({ toggleDeleteModal, deleteTodo, deleteId, deleteTitle, deleteRef }) {
    return (
        <div className="modal-delete">
            <div className="modal-background">
                <div className="modal-container" ref={deleteRef}>
                    <article className="modal-body">
                        <p>Are you sure you want to delete "{deleteTitle}"</p>
                    </article>
                    <footer className="modal-footer">
                        <button className="button button-dark-outline" onClick={toggleDeleteModal}>Cancel</button>
                        <button className="button button-red" onClick={() => deleteTodo(deleteId)}>Delete</button>
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal