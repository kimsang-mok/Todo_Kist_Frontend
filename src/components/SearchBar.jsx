import React, { useState, useRef, useEffect, useContext } from 'react';
import "../styles/SearchBar.scss"
import TodoContext from '../contexts/TodoContexts';
import axios from 'axios';
import useOutSideClick from '../hooks/useOutSideClick';
const API_BASE = import.meta.env.VITE_API_BASE

const SearchBar = (props) => {
    const BASE_API = API_BASE + props.listName;
    const searchRef = useRef(null)
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [searchFocus, setSearchFocus] = useState(false);
    const searchResultRef = useRef(null);
    const {
        handleTodoClick,
        getListName
    } = useContext(TodoContext)
    useOutSideClick(searchResultRef, setSearchFocus)

    useEffect(() => {
        setSearchTerm("")
    }, [handleTodoClick])

    useEffect(() => {
        // Debounce function
        // clear previous timeout if there is any
        if (searchRef.current) {
            clearTimeout(searchRef.current);
        }

        // all the search API after 300ms have passed
        searchRef.current = setTimeout(async () => {
            try {
                if (searchTerm.trim() !== '') {
                    const response = await axios.get(BASE_API + `/search?q=${searchTerm}`);
                    setResults(response.data);
                } else {
                    setResults([]);  // Clear results if the search term is empty
                }
            } catch (err) {
                console.error('Error searching:', err);
            }
        }, 300);
        return () => {
            if (searchRef.current) {
                clearTimeout(searchRef.current);
            }
        };
    }, [searchTerm]);

    return (
        <>
            <div className="search-container" ref={searchResultRef}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setSearchFocus(true)}
                    placeholder="Search todo..."
                    className="search-field no-outline"
                />
            </div >

            {searchFocus && (
                <div className="search-results" ref={searchResultRef}>
                    {results.map(list => (
                        <div key={list._id}>
                            {list.items.map(item => (
                                <div key={item._id} className="result" onClick={() => {
                                    handleTodoClick(item.title, item._id, item.description, item.priority, item.complete)
                                    getListName(list.name)
                                }}>
                                    <p>{item.title}</p>
                                    <div className="info">
                                        <div className="priority-container">
                                            {item.priority !== "No Priority" && (
                                                <div className={`priority priority-${item.priority.split(" ")[0].toLowerCase()}`}>{item.priority.split(" ")[0]}</div>
                                            )}
                                        </div>
                                        <p>{list.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )
            }
        </>
    );
}


export default SearchBar;