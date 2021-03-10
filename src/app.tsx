import * as React from 'react'
import './app.css'
import {UserItem} from './components/UserItem';
import {AddUser} from './components/AddUser';

const database = {
    tasks: [
        { taskId: 1, title: 'first', description: 'this is the first task' },
        { taskId: 2, title: 'second', description: 'this is the second task' },
    ],

    users: [
        { userId: 1, firstName: 'mark', lastName: 'twain' },
        { userId: 2, firstName: 'tom', lastName: 'sawyer' },
    ],
}

interface AppState {
    tasks?: any[]
    users?: any[]
    newUser?: any
    newTask?: any
}

interface User {
    firstName?: string
    lastName?: string
}

export class App extends React.Component<any, AppState> {
    state: AppState = {
        tasks: [],
        users: [],
        newUser: {} as User,
        newTask: {}
    }

    async componentDidMount() {
        // choose one of the methods below for a data source

        // 1. use the data from above
        const { tasks, users } = database

        // 2. use the real api / database - you must start one of the api services and the mssql server docker container
        // const [tasks, users] = await Promise.all([
        //   (await fetch('http://localhost:5000/tasks')).json(),
        //   (await fetch('http://localhost:5000/users')).json(),
        // ]);

        this.setState({
            tasks,
            users
        })
    }

    handleUserSubmit = user => {
        this.setState((prevState) => ({
            users: [...(prevState.users ?? []), user]
        }));
    }

    handleUserRemove = user => {
        this.setState((prevState) => ({
            users: prevState.users?.filter(u => u !== user)
        }));
    }

    render() {
        return (
            <div className='app'>
                <h1>inMotionNow Developer Challenge</h1>
                <h2>Users</h2>
                <ul>
                    {this.state.users?.map(user =>
                        <UserItem user={user} key={user.userId} onUserRemove={() => this.handleUserRemove(user)}/>)
                    }
                </ul>
                <AddUser onUserSubmit={this.handleUserSubmit}/>
                <h2>Tasks</h2>
                <ul>
                    {this.state.tasks?.map(task => <li key={task.taskId}>{task.title} - {task.description}</li>)}
                </ul>
            </div>
        )
    }
}