import React, { useState, useEffect, useRef, useContext } from "react";
import EditModal from "../EditModal";
import NewTodoModal from "../NewTodoModal";
import TodoItem from "../TodoItem";
import useToggleModal from "../../hooks/useToggleModal";
import useOutSideClick from "../../hooks/useOutSideClick";
import DeleteModal from "../DeleteModal";
import * as APIUtils from "../../utils/api";
import TodoContext from "../../contexts/TodoContexts";

function Todo() {
    const {
        todos,
        setTodos,
        isAddTodo,
        toggleAddTodoModal,
        modalRef,
        editFormRef,
        isTodoClick,
        toggleEditModal,
        editedTitle,
        setEditedTitle,
        handleFormSubmission,
        editedId,
        editTodo,
        handleTodoClick,
        customListName,
        foundList,
        priority,
        setPriority,
    } = useContext(TodoContext)
    const [deleteId, setDeleleId] = useState("")
    const [deleteTitle, setDeleteTitle] = useState("")
    const todoFormRef = useRef(null)
    const deleteRef = useRef(null)
    const [newTodo, setNewTodo] = useState("");
    const [todoDescription, setTodoDescription] = useState("")
    const { isOpen: isDeleteClick, toggleModal: toggleDeleteModal } = useToggleModal()
    useOutSideClick(todoFormRef, toggleAddTodoModal)
    useOutSideClick(modalRef, toggleEditModal)
    useOutSideClick(deleteRef, toggleDeleteModal)

    const GetTodos = async () => {
        try {
            const todosData = await APIUtils.getTodos(customListName);
            setTodos(todosData);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    const isTodoComplete = async (id) => {
        let listName;
        if (foundList) {
            listName = foundList;
        } else {
            listName = customListName;
        }
        const updatedTodos = todos.map(todo =>
            todo._id == id ? { ...todo, complete: !todo.complete } : todo
        );
        setTodos(updatedTodos);

        try {
            await APIUtils.markTodoAsComplete(listName, id);
        } catch (error) {
            console.error("Error marking todo as complete:", error);
            setTodos(todos);
        }
    };

    const deleteTodo = async (id) => {
        let listName;
        if (foundList) {
            listName = foundList;
        } else {
            listName = customListName;
        }
        const remainingTodos = todos.filter(todo => todo._id !== id);
        setTodos(remainingTodos);
        toggleDeleteModal();

        try {
            await APIUtils.deleteTodo(listName, id);
        } catch (error) {
            console.error("Error deleting todo:", error);
            setTodos(todos);
        }

    };

    const addTodo = async (event) => {
        event.preventDefault();
        try {
            const newAddedTodo = await APIUtils.addNewTodo(customListName, newTodo, priority, todoDescription);
            setTodos(prevTodos => [...prevTodos, newAddedTodo]);
            setNewTodo("");
            setPriority("No Priority");
            setTodoDescription("")
            toggleAddTodoModal();
            setPriority("")
        } catch (error) {
            console.error("Error adding new todo:", error);
        }
    };

    useEffect(() => {
        GetTodos();
        return () => { }
    }, [customListName]);

    const handleTodoDelete = (id, title) => {
        setDeleteTitle(title)
        setDeleleId(id)
        if (isTodoClick) {
            toggleEditModal()
        }
    }

    return (
        <>
            <hr />
            <div className="todo add-todo-container" onClick={() => toggleAddTodoModal()}>
                <h2>Add new todo</h2>
            </div>

            <div className="todo-container">
                <div className="todos">
                    {todos.length > 0 ? (
                        todos.map((todo) => (
                            <TodoItem
                                key={todo._id}
                                todo={todo}
                                isTodoComplete={isTodoComplete}
                                toggleDeleteModal={toggleDeleteModal}
                                handleTodoDelete={handleTodoDelete}
                                handleTodoClick={handleTodoClick}
                            />
                        ))
                    ) : (
                        <p>You currently have no tasks</p>
                    )}
                </div>
                {isDeleteClick && (
                    <DeleteModal
                        toggleDeleteModal={toggleDeleteModal}
                        deleteTodo={deleteTodo}
                        deleteId={deleteId}
                        deleteTitle={deleteTitle}
                        deleteRef={deleteRef}
                    />
                )}
            </div>
            <EditModal
                modalRef={modalRef}
                editFormRef={editFormRef}
                isOpen={isTodoClick}
                toggleModal={toggleEditModal}
                editedTitle={editedTitle}
                setEditedTitle={setEditedTitle}
                handleFormSubmission={handleFormSubmission}
                editedId={editedId}
                editTodo={editTodo}
                toggleDeleteModal={toggleDeleteModal}
                handleTodoDelete={handleTodoDelete}
                isTodoComplete={isTodoComplete}
            />
            <NewTodoModal
                todoFormRef={todoFormRef}
                isOpen={isAddTodo}
                toggleModal={toggleAddTodoModal}
                newTodo={newTodo}
                setNewTodo={setNewTodo}
                priority={priority}
                setPriority={setPriority}
                setTodoDescription={setTodoDescription}
                addTodo={addTodo}
            />

        </>
    );
}

export default Todo;