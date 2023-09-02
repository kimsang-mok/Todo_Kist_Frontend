import "../styles/Priority.scss"
import useOutSideClick from "../hooks/useOutSideClick"


function Priority(props) {
    useOutSideClick(props.priorityRef, props.setIsPriorityClick)

    const priorities = ["High Priority", "Medium Priority", "Low Priority", "No Priority"]
    return (
        <section className="select-priority">
            <ul>
                {priorities.map((item) => (
                    <li key={item} onClick={props.priorityChangeHandler}>{item}</li>
                ))}
            </ul>
        </section >
    )
};

export default Priority