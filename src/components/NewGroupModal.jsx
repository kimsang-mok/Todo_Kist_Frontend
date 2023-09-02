import React, { useRef } from 'react'
import useOutSideClick from '../hooks/useOutSideClick'

function NewGroupModal({ isOpen, toggleAddGroupModal, addGroup, setNewGroup }) {
    const groupRef = useRef(null)
    useOutSideClick(groupRef, toggleAddGroupModal)
    return (
        isOpen && (
            <div className="modal-background">
                <div className="modal-container" ref={groupRef}>
                    <div className="modal-body">
                        <form onSubmit={addGroup}>
                            <div className="todo-title">
                                <label htmlFor="title">Title</label>
                                <input
                                    className="todo user-input no-outline"
                                    type="text"
                                    placeholder="Add New Title"
                                    name="title"
                                    onChange={(e) => setNewGroup(e.target.value)}
                                    required
                                /></div>

                            <footer>
                                <button type="button" className="button button-dark-outline" onClick={() => toggleAddGroupModal()}>Cancel</button>
                                <button type="submit" className="button button-green">Create Group</button>
                            </footer>

                        </form>
                    </div>
                </div>
            </div>
        )
    )
}

export default NewGroupModal