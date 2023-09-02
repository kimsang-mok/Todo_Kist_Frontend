import "../styles/NavigationBar.scss"
import { Link } from "react-router-dom"
import SearchBar from "./SearchBar"
import { useContext } from "react"
import TodoContext from "../contexts/TodoContexts"

function NavigationBar({ setIsSidebarOpen, toggleRef }) {
    const { toggleAddTodoModal } = useContext(TodoContext)

    return (
        <>
            <nav className="navigation-bar" >
                <div className="toggle" ref={toggleRef} onClick={() => {
                    setIsSidebarOpen(prev => !prev)
                }}  ><img src="../images/icons/menu.png" alt="" /></div>
                <Link to="/todos/today" className="logo"><img src="../images/icons/home.png" alt="" /></Link>
                <div className="search-bar">
                    <SearchBar />
                </div>
                <div onClick={toggleAddTodoModal} className="add-button"><img src="../images/icons/more.png" alt="" /></div>
                <Link to="/todos/important" className="star"><img src="../images/icons/favorites.png" alt="" /></Link>
            </nav >
        </>

    )
}
export default NavigationBar