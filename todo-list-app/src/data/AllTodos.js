import { v4 as uuidv4 } from 'uuid';

const AllTodos = [
    {
        name: 'Read a book',
        description: 'Minimum of 25 pages',
        date: 'Wed Jan 4',
        id: uuidv4(),
        priority: 4,
    },
    {
        name: 'Meditate',
        description: 'Use waking up app',
        date: 'Wed Jan 4',
        id: uuidv4(),
        priority: 4,
    },
    {
        name: 'Workout',
        description: 'Push day! lets go!',
        date: 'Wed Jan 4',
        id: uuidv4(),
        priority: 4,
    },
];

export default AllTodos;