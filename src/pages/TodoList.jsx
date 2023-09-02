import React, { useContext, useState, useRef } from "react";
import Todo from "../components/TodoWrapper/Todo";
import SideBar from "../components/Sidebar";
import NavigationBar from "../components/NavigationBar";
import TodoContext from "../contexts/TodoContexts";
import "../styles/TodoList.scss"


function TodoList() {
    const { customListName } = useContext(TodoContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const toggleRef = useRef(null)

    return (
        <div className="todo-list">
            <nav className="navbar">
                <NavigationBar setIsSidebarOpen={setIsSidebarOpen}
                    toggleRef={toggleRef}
                />
            </nav>
            <div className={isSidebarOpen ? "main-content sidebar-show" : "main-content"}>
                <aside className="sidebar-container">
                    <SideBar
                        isSidebarOpen={isSidebarOpen}
                        setIsSidebarOpen={setIsSidebarOpen}
                        toggleRef={toggleRef} />
                </aside>

                <main className="contents">
                    <div className="todo-header">
                        <h2 className="group">{customListName}</h2>
                    </div>
                    <Todo />
                </main>
            </div>

        </div>
    );
}

export default TodoList;