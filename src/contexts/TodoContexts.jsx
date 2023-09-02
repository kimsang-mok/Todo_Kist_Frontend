import { createContext, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import useToggleModal from '../hooks/useToggleModal';
import * as APIUtils from '../utils/api';

const TodoContext = createContext();

function Provider({ children }) {
    const [todos, setTodos] = useState([])
    const [editedTitle, setEditedTitle] = useState("");
    const [editedId, setEditedId] = useState("");
    const modalRef = useRef(null);
    const editFormRef = useRef(null);
    const [editedDescription, setEditedDescription] = useState("")
    const { isOpen: isTodoClick, toggleModal: toggleEditModal } = useToggleModal();
    const { customListName } = useParams();
    const [foundList, setFoundList] = useState("")
    const [isComplete, setIsComplete] = useState()

    let listName;
    const editTodo = async (event, id) => {
        event.preventDefault();
        toggleEditModal();
        if (foundList) {
            listName = foundList;
        } else {
            listName = customListName;
        }

        if (editedTitle) {
            const updatedTodos = todos.map(todo =>
                todo._id === id ? { ...todo, title: editedTitle, description: editedDescription, priority: priority } : todo
            );
            setTodos(updatedTodos);

            try {
                await APIUtils.editTodo(listName, id, editedTitle, editedDescription, priority);
            } catch (error) {
                console.error("Error editing todo:", error);
                setTodos(todos);
            }
        }
        else {
            alert("Input field cannot be empty")
        }

    };
    const handleFormSubmission = () => {
        editTodo({ preventDefault: () => { } }, editedId)
    }

    const handleTodoClick = (title, id, description, cur_priority, complete) => {
        toggleEditModal()
        setEditedTitle(title)
        setEditedDescription(description)
        setPriority(cur_priority)
        setEditedId(id)
        setIsComplete(complete)
    };

    const getListName = (listName) => {
        setFoundList(listName)
    }
    const { isOpen: isAddTodo, toggleModal: toggleAddTodoModal } = useToggleModal();

    const priorityRef = useRef(null)
    const [priority, setPriority] = useState("No Priority")
    const [isPriorityClick, setIsPriorityClick] = useState(false)

    const priorityChangeHandler = (event) => {
        setPriority(event.target.textContent);
    };

    const handlePriorityClick = () => {
        setIsPriorityClick(prevState => !prevState)
    }


    return (
        <TodoContext.Provider value={{
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
            editedDescription,
            setEditedDescription,
            handleFormSubmission,
            editedId,
            editTodo,
            handleTodoClick,
            customListName,
            foundList,
            getListName,
            priorityRef,
            priority,
            setPriority,
            isPriorityClick,
            setIsPriorityClick,
            priorityChangeHandler,
            handlePriorityClick,
            isComplete,
            setIsComplete
        }}>{children}</TodoContext.Provider>
    )
}

export { Provider }
export default TodoContext