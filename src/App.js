import React, { useEffect, useState } from 'react'
import Amplify, {API, graphqlOperation} from 'aws-amplify'
import {listTodos} from './graphql/queries'
import awsExports from "./aws-exports";

Amplify.configure(awsExports);

const App = () => {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        fetchTodos()
    }, [])

    async function fetchTodos() {
        try {
            const todoData = await API.graphql(graphqlOperation(listTodos))
            const todos = todoData.data.listTodos.items
            setTodos(todos)
        } catch (err) {
            console.log('error fetching todos')
        }
    }

    return (
        <div className="App">
            <h1>hello yusuke5</h1>
            {
                todos.map((todo, index) => (
                    <div key={todo.id ? todo.id : index} >
                        <p >{todo.name}</p>
                        <p >{todo.description}</p>
                    </div>
                ))
            }
        </div>
    );
}

export default App;
