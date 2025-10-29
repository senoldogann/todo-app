import { useEffect, useState } from 'react'
import { useUser } from '../context/useUser'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Row from '../components/Row'
import '../App.css'

const url = import.meta.env.VITE_API_URL || "http://localhost:3001"

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])
  const { user, signOut } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setTasks(response.data)
      })
      .catch(error => {
        alert(error.response?.data ? error.response.data.message : error)
      })
  }, [])

  const addTask = () => {
    const headers = { headers: { Authorization: user.token } }
    const newTask = { description: task }

    axios.post(url + "/create", { task: newTask }, headers)
      .then(response => {
        setTasks([...tasks, response.data])
        setTask('')
      })
      .catch(error => {
        alert(error.response ? error.response.data.error?.message : error)
      })
  }

  const deleteTask = (deleted) => {
    const headers = { headers: { Authorization: user.token } }

    axios.delete(url + "/delete/" + deleted, headers)
      .then(response => {
        setTasks(tasks.filter(item => item.id !== deleted))
      })
      .catch(error => {
        alert(error.response ? error.response.data.error?.message : error)
      })
  }

  const handleLogout = () => {
    signOut()
    navigate('/signin')
  }

  return (
    <div id="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3>Todos</h3>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
      <form>
        <input 
          placeholder='Add new task'
          value={task}
          onChange={e => setTask(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addTask()
            }
          }}
        />
      </form>
      <ul>
        {
          tasks.map(item => (
            <Row item={item} key={item.id} deleteTask={deleteTask} />
          ))
        }
      </ul>
    </div>
  )
}

export default App
