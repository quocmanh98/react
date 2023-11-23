import { useState } from 'react';
import Swal from 'sweetalert2';

const AddTask = ({ onSave }) => {
    const [text, setText] = useState('');
    const [day, setDay] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        if (!text && !day) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Fill in your task and date or close the form!',
            });
        } else if (!text && day) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Fill in your task!',
            });
        } else if (text && !day) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Fill in your date!',
            });
        } else {
            onSave({ text, day });
        }

        setText('');
        setDay('');
    };

    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="task">Công việc</label>
                <input
                    type="text"
                    id="task"
                    className="form-control"
                    placeholder="Add task"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="dayTime">Ngày thực hiện</label>
                <input
                    type="date"
                    id="dayTime"
                    className="form-control"
                    placeholder="Add day & time"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
                Lưu
            </button>
        </form>
    );
};

export default AddTask;
