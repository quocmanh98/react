// Importing Components
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
// Importing React Hooks
import { useState, useEffect } from 'react';
// Importing Packages
import { v4 as uuidv4 } from 'uuid';
import Swal from "sweetalert2";


function App() {
  // All States
  const [loading, setloading] = useState(true); // Pre-loader before page renders
  const [tasks, setTasks] = useState([]); // Task State
  const [showAddTask, setShowAddTask] = useState(false); // To reveal add task form
  const [editedTask, setEditedTask] = useState({ id: '', text: '', day: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pre-loader
  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 3500);
  }, [])

  // Fetching from Local Storage
  const getTasks = JSON.parse(localStorage.getItem("taskAdded"));

  useEffect(() => {
    if (getTasks == null) {
      setTasks([])
    } else {
      setTasks(getTasks);
    }
    // eslint-disable-next-line
  }, [])

  // Add Task
  const addTask = (task) => {
    const id = uuidv4();
    const newTask = { id, ...task }

    setTasks([...tasks, newTask]);

    Swal.fire({
      icon: 'success',
      title: 'Yay...',
      text: 'You have successfully added a new task!'
    })

    localStorage.setItem("taskAdded", JSON.stringify([...tasks, newTask]));
  }

  // Delete Task
  const deleteTask = (id) => {
    const deleteTask = tasks.filter((task) => task.id !== id);

    setTasks(deleteTask);

    Swal.fire({
      icon: 'success',
      title: 'Oops...',
      text: 'You have successfully deleted a task!'
    })

    localStorage.setItem("taskAdded", JSON.stringify(deleteTask));
  }

  // Edit Task
  const editTask = (id) => {
    const taskToEdit = tasks.find(task => task.id === id);
    setEditedTask(taskToEdit);
    setIsModalOpen(true);
  }

  const saveEditedTask = () => {
    const updatedTasks = tasks.map(task =>
      task.id === editedTask.id ? { ...task, text: editedTask.text, day: editedTask.day } : task
    );

    setTasks(updatedTasks);

    Swal.fire({
      icon: 'success',
      title: 'Yay...',
      text: 'You have successfully edited an existing task!'
    })

    localStorage.setItem("taskAdded", JSON.stringify(updatedTasks));
    setIsModalOpen(false);
  }

  // Modal Close Function
  const closeEditModal = () => {
    setIsModalOpen(false);
  }

  const modal = (
    <div className="modal" tabIndex="-1" role="dialog" style={{ display: isModalOpen ? 'block' : 'none' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Chỉnh sửa công việc</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={closeEditModal}></button>

          </div>
          <div className="modal-body">
            <label htmlFor="taskName">Tên công việc :</label>
            <input
              type="text"
              id="taskName"
              className="form-control"
              value={editedTask.text}
              onChange={(e) => setEditedTask({ ...editedTask, text: e.target.value })}
            />
            <label htmlFor="dayAndTime">Ngày và Giờ:</label>
            <input
              type="date"
              id="dayAndTime"
              className="form-control"
              value={editedTask.day}
              onChange={(e) => setEditedTask({ ...editedTask, day: e.target.value })}
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={saveEditedTask}>
              Lưu
            </button>
            <button type="button" className="btn btn-secondary" onClick={closeEditModal}>
              Thoát
            </button>
          </div>
        </div>
      </div>
    </div>
  );


  return (
    <>
      {
        loading
          ?
          <div className="spinnerContainer">
            <div className="spinner-grow text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-secondary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
          :
          <div className="container">
            <div className="row">
              <div className="col ">
                {/* App Header */}
                <Header showForm={() => setShowAddTask(!showAddTask)} changeTextAndColor={showAddTask} />

                {/* Revealing of Add Task Form */}
                {showAddTask && <AddTask onSave={addTask} />}

                <div className="alert alert-info">
                  {/* Task Counter */}
                  <h3>Số lượng Task: {tasks.length}</h3>

                  {/* Displaying of Tasks */}
                  {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onEdit={editTask} /> : 'Không có Task nào được tìm thấy!'}
                </div>

              </div>
            </div>
          </div>

      }

      {modal}
    </>
  )
}

export default App;