import React from 'react';
import "../styles/EditModal.scss"
import { useContext, useEffect } from 'react';
import TodoContext from '../contexts/TodoContexts';
import Priority from './Priority';

function EditModal({ modalRef, editFormRef, isOpen, toggleModal, editedTitle, setEditedTitle, handleFormSubmission, editedId, editTodo, toggleDeleteModal, handleTodoDelete, isTodoComplete }) {
    const { editedDescription, setEditedDescription, handlePriorityClick, priorityRef, priority, setPriority, isPriorityClick, setIsPriorityClick, priorityChangeHandler, isComplete, setIsComplete } = useContext(TodoContext)
    useEffect(() => {
        if (!isOpen) {
            setPriority("No Priority")
            setIsPriorityClick(false)
        }
    }, [isOpen])

    return (
        isOpen && (
            <div className="modal-background">
                <div className="modal-container" ref={modalRef}>
                    <div className="modal-body">
                        <form onSubmit={(event) => editTodo(event, editedId)} ref={editFormRef}>
                            <div className="todo-title">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    className="todo no-outline"
                                    placeholder="Edit title"
                                    value={editedTitle}
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                />
                            </div>
                            <button type="button" onClick={() => {
                                isTodoComplete(editedId)
                                setIsComplete(prev => !prev)
                            }
                            } className={isComplete ? "button button-green" : "button button-dark-outline"}>
                                {isComplete ? "Completed" : "Complete"}
                            </button>
                            <div className="description">
                                <label htmlFor="description">Description</label>
                                <textarea onChange={(e) => setEditedDescription(e.target.value)} type="text" placeholder="Edit description..." name="description" value={editedDescription} />
                            </div>
                            <div>
                                <div className="priority button button-dark-outline" ref={priorityRef} onClick={handlePriorityClick}>{priority}
                                    {isPriorityClick && (
                                        <Priority
                                            priorityRef={priorityRef}
                                            isPriorityClick={isPriorityClick}
                                            priorityChangeHandler={priorityChangeHandler}
                                            setIsPriorityClick={setIsPriorityClick} />)}
                                </div>
                            </div>
                        </form>
                    </div>
                    <footer className="modal-footer">
                        <button className="button button-dark-outline" onClick={toggleModal}>Cancel</button>
                        <button className="button button-green" onClick={handleFormSubmission}>Save</button>
                        <div className="delete-button">
                            <button onClick={() => {
                                handleTodoDelete(editedId, editedTitle)
                                toggleDeleteModal()
                            }} className="button button-red ">Delete</button>
                        </div>
                    </footer>
                </div>
            </div>
        )
    );
}

export default EditModal;
