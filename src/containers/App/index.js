import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import styles from './styles';
import TaskBoard from './Taskboard';

function App() {
  return (
    <div className="App">
     <TaskBoard/>
    </div>
  );
}

export default withStyles(styles)(App);
