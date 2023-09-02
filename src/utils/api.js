const API_BASE = 'http://localhost:3005/todos/';

export const getTodos = async (customListName) => {
    try {
        const response = await fetch(API_BASE + customListName);
        const data = await response.json();
        return data.foundList.items;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const markTodoAsComplete = async (customListName, id) => {
    try {
        await fetch(API_BASE + customListName + '/complete/' + id);
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const deleteTodo = async (customListName, id) => {
    try {
        await fetch(API_BASE + customListName + '/delete/' + id, { method: 'DELETE' });
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const editTodo = async (customListName, id, editedTitle, editedDescription, editedPriority) => {
    try {
        await fetch(API_BASE + customListName + '/edit/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: editedTitle,
                priority: editedPriority,
                description: editedDescription
            }),
        });
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const addNewTodo = async (customListName, newTodo, priority, description) => {
    try {
        const newItem = await fetch(API_BASE + customListName + '/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: newTodo,
                priority: priority,
                description: description
            }),
        });
        return newItem.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const getGroups = async (customListName) => {
    try {
        const response = await fetch(API_BASE + customListName, {
            method: "GET"
        })
        const data = await response.json()
        return data.foundGroup
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const addGroup = async (customListName, newGroup) => {
    try {
        const response = await fetch(API_BASE + customListName, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: newGroup
            })
        })
        const data = await response.json()
        return data.newAddedGroup
    }
    catch (error) {
        console.error(error)
    }
}

export const deleteGroupAndCorrespondingTodos = async (customListName, deleteGroupName) => {
    try {
        console.log(deleteGroupName)
        const response = await fetch(API_BASE + customListName + "/deletegroup/" + deleteGroupName,
            {
                method: "DELETE"
            })
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
