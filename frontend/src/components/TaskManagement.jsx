import React, { useState } from 'react';
import { TextField, Button, List, ListItem, Typography, Paper, IconButton, Checkbox, ListItemSecondaryAction } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete'; // Import the delete icon

// Material 3 Theme (Customize this!)
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#6730D2' },
    secondary: { main: '#FFC107' },
    background: { default: '#F5F5F5' },
  },
  typography: { fontFamily: 'Roboto, sans-serif', h2: { fontWeight: 700 } },
});

function TaskManagement() {
  const [taskTitle, setTaskTitle] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    if (taskTitle.trim() !== '') {
      setTasks([...tasks, { title: taskTitle, completed: false }]);
      setTaskTitle('');
    }
  };

  const handleTaskTitleChange = (event) => {
    setTaskTitle(event.target.value);
  };

  const handleTaskCompletion = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={3} style={{ padding: '20px', borderRadius: '8px' }}>
        <Typography variant="h2" gutterBottom>Task Management</Typography>
        <TextField
          label="Add a task"
          variant="outlined"
          fullWidth
          value={taskTitle}
          onChange={handleTaskTitleChange}
          margin="normal"
        />
        <Button variant="contained" onClick={handleAddTask} style={{ marginTop: '10px' }}>
          Add Task
        </Button>
        <List style={{ marginTop: '20px' }}>
          {tasks.map((task, index) => (
            <ListItem key={index}>
              <Checkbox
                checked={task.completed}
                onChange={() => handleTaskCompletion(index)}
              />
              <Typography style={{marginLeft:"10px", textDecoration: task.completed ? 'line-through' : 'none'}}>{task.title}</Typography>
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(index)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </ThemeProvider>
  );
}

export default TaskManagement;