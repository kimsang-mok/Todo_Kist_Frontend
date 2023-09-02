import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom";
import "../styles/SideBar.scss";
import * as APIUtils from "../utils/api"
import useToggleModal from "../hooks/useToggleModal";
import DeleteModal from "./DeleteModal";
import useOutSideClick from "../hooks/useOutSideClick";
import NewGroupModal from "./NewGroupModal";


function SideBar({ isSidebarOpen, setIsSidebarOpen, toggleRef }) {
    const navigate = useNavigate();
    const sidebarRef = useRef(null)
    const [groups, setGroups] = useState([]);
    const [newGroup, setNewGroup] = useState("")
    const { customListName } = useParams();
    const [deleteGroupName, setDeleteGroupName] = useState("");
    const deleteGroupRef = useRef(null)
    const { isOpen: isDeleteGroup, toggleModal: toggleDeleteGroupModal } = useToggleModal();
    const { isOpen: isAddGroup, toggleModal: toggleAddGroupModal } = useToggleModal();
    useOutSideClick(deleteGroupRef, toggleDeleteGroupModal)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const sidebarOutsideClick = (event) => {
        if (windowWidth <= 768) {
            if (!sidebarRef.current.contains(event.target) && !toggleRef.current.contains(event.target)) {
                event.stopPropagation();
                setIsSidebarOpen(prev => !prev);
            }
        }

    }
    useEffect(() => {
        scrollToTop()
        if (isSidebarOpen && (windowWidth <= 768)) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
            if (isDeleteGroup) {
                toggleDeleteGroupModal()
            }
            else if (isAddGroup) {
                toggleAddGroupModal()
            }
        }
    }, [isSidebarOpen]);


    useEffect(() => {
        if (isSidebarOpen) {
            setIsSidebarOpen(prev => !prev)
        }
    }, [customListName, windowWidth])

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Add smooth scrolling animation
        });
    }



    useEffect(() => {
        if (isSidebarOpen === true && isDeleteGroup === false && isAddGroup === false) {
            document.addEventListener("mousedown", sidebarOutsideClick);
            return () => {
                document.removeEventListener("mousedown", sidebarOutsideClick)
            };
        }
    }, [isSidebarOpen, isDeleteGroup, isAddGroup]);

    const getGroups = async () => {
        try {
            const data = await APIUtils.getGroups(customListName)
            setGroups(data)
        }
        catch (err) {
            console.log(err)
        }
    }

    const addGroup = async (event) => {
        event.preventDefault()
        if (groups.some(group => group.name === newGroup)) {
            alert("This group already exists!")
        } else {
            const newAddedGroup = await APIUtils.addGroup(customListName, newGroup)
            setGroups(prev => [...prev, newAddedGroup])
            setNewGroup("")
            toggleAddGroupModal()
        }
    }

    const handleDeleteGroup = (name) => {
        setDeleteGroupName(name)
        toggleDeleteGroupModal()

    }

    const deleteGroup = async (groupName) => {
        toggleDeleteGroupModal()
        const remainingGroups = groups.filter(group => group.name !== groupName);
        setGroups(remainingGroups);
        if (groupName === customListName) {
            navigate("/todos/today")
        }

        try {
            await APIUtils.deleteGroupAndCorrespondingTodos(customListName, groupName)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getGroups()
    }, [deleteGroupName])

    return (
        <>
            <div className="sidebar" ref={sidebarRef}>
                <div className="todo-groups">
                    <div className="add-group-button">
                        <button onClick={() => toggleAddGroupModal()}>
                            <img src="../images/icons/add2.png" alt="" /><span>Add New Group</span>
                        </button>
                    </div>


                    {groups
                        .filter(group => ["Today", "Important", "Task"].includes(group.name))
                        .map(group => (
                            <div key={group._id} className="group">
                                <div className="group-link"
                                    key={group._id}
                                    onClick={() => navigate("/todos/" + group.name)} // navigate on click
                                >
                                    <p>{group.name}</p>
                                </div>
                            </div>
                        ))
                    }
                    {(groups.length > 3) && (
                        <h4>Other Groups</h4>
                    )}
                    {groups
                        .filter(group => !["Today", "Important", "Task"].includes(group.name))
                        .map(group => (
                            <div key={group._id} className="group">
                                <div className="group-link"
                                    key={group._id}
                                    onClick={() => navigate("/todos/" + group.name)} // navigate on click
                                >
                                    <p>{group.name} </p>
                                    <div onClick={(event) => {
                                        event.stopPropagation()
                                        handleDeleteGroup(group.name)

                                    }}>
                                        <img src="../images/icons/delete.svg" alt="delete icon" />
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div >
            <div className="add-new-group">
                <NewGroupModal
                    isOpen={isAddGroup}
                    toggleAddGroupModal={toggleAddGroupModal}
                    addGroup={addGroup}
                    setNewGroup={setNewGroup}
                />
            </div>
            {
                isDeleteGroup && (
                    <DeleteModal
                        toggleDeleteModal={toggleDeleteGroupModal}
                        deleteTodo={deleteGroup}
                        deleteId={deleteGroupName}
                        deleteTitle={deleteGroupName}
                        deleteRef={deleteGroupRef}
                    />
                )
            }
        </>
    )
}

export default SideBar