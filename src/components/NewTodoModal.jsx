import { useEffect } from "react";
import Priority from "./Priority";
import { useContext } from "react";
import TodoContext from "../contexts/TodoContexts";

function NewTodoModal({ todoFormRef, isOpen, toggleModal, newTodo, setNewTodo, setTodoDescription, addTodo }) {
    const {
        priorityRef,
        priority,
        setPriority,
        isPriorityClick,
        setIsPriorityClick,
        priorityChangeHandler,
        handlePriorityClick } = useContext(TodoContext)

    const titleChangeHandler = (event) => {
        setNewTodo(event.target.value);
    };

    const descriptionChangeHandler = (event) => {
        setTodoDescription(event.target.value)
    }

    useEffect(() => {
        if (!isOpen) {
            setNewTodo("")
            setPriority("No Priority")
            setIsPriorityClick(false)
        }
    }, [isOpen])

    return (
        isOpen && (
            <div className="modal-background">
                <div className="modal-container" ref={todoFormRef}>
                    <div className="modal-body">
                        <form onSubmit={addTodo}>
                            <button type="submit" className="hidden"></button>
                            <div className="todo-title">
                                <label htmlFor="title">Title</label>
                                <input
                                    className="todo user-input no-outline"
                                    type="text"
                                    placeholder="Add New Title"
                                    name="title"
                                    onChange={titleChangeHandler}
                                    value={newTodo}
                                    required
                                /></div>
                            <div className="description">
                                <label htmlFor="description">Description</label>
                                <textarea onChange={descriptionChangeHandler} type="text" placeholder="Add description" name="description" />
                            </div>
                            <div >
                                <div className="priority button button-dark-outline" ref={priorityRef} onClick={handlePriorityClick}>{priority}
                                    {isPriorityClick && <Priority
                                        priorityRef={priorityRef}
                                        isPriorityClick={isPriorityClick}
                                        priorityChangeHandler={priorityChangeHandler}
                                        setIsPriorityClick={setIsPriorityClick} />}
                                </div>
                            </div>

                            <footer>
                                <button className="button button-dark-outline" onClick={toggleModal}>Cancel</button>
                                <button className="button button-green">Create Task</button>
                            </footer>

                        </form>
                    </div>
                </div>
            </div>
        )
    );
}

export default NewTodoModal;

