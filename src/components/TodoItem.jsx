import { useSpring, animated } from "react-spring";
import { Checkbox } from "@nextui-org/react";

function TodoItem({ todo, isTodoComplete, toggleDeleteModal, handleTodoDelete, handleTodoClick }) {
    const customConfig = {
        duration: 500,
    }
    const fade = useSpring({ opacity: 1, from: { opacity: 0 }, config: customConfig });

    return (
        <>
            <animated.div onClick={() => handleTodoClick(todo.title, todo._id, todo.description, todo.priority, todo.complete)}
                className={todo.complete ? "todo is-complete" : "todo"} style={fade}>
                <section className="section-1">
                    <div className="todo-status">
                        <Checkbox isSelected={todo.complete} className="checkbox" onClick={(e) => {
                            e.stopPropagation();
                            isTodoComplete(todo._id)
                        }} />
                        <div className="title">{todo.title}</div>
                    </div>
                    <div className="priority-container">
                        {todo.priority !== "No Priority" && (
                            <div className={`priority priority-${todo.priority.split(" ")[0].toLowerCase()}`}>{todo.priority.split(" ")[0]}</div>
                        )}
                    </div>
                </section>
                <section className="edit-section">
                    <div className="edit-todo">
                        <img src="../images/icons/edit.svg" alt="edit icon" />
                    </div>
                    <div className="delete-todo" onClick={(e) => {
                        e.stopPropagation();
                        handleTodoDelete(todo._id, todo.title)
                        toggleDeleteModal();
                    }}>
                        <img src="../images/icons/delete.svg" alt="delete icon" />
                    </div>
                </section>
            </animated.div>
        </>
    );
}

export default TodoItem