import {ADD_NOTE, DELETE_NOTE, EDIT_NOTE} from './types'

const initialNotes = {
    notes: [
        {
            id: 6346,
            name: 'Alex',
            created: '12.01.2022',
            category: 'Quote',
            status: 'Active',
            content: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum v Lorem Ipsum v v v ',
            dates: '3/5/2021, 5/6/2020',
            isEditing: false
        },
        {
            id: 2874,
            name: 'Volodya',
            created: '12.01.2022',
            category: 'Task',
            status: 'Archived',
            content: 'Lorem Ipsum',
            dates: '3/5/2021, 5/6/2020',
            isEditing: false
        },
        {
            id: 2903,
            name: 'Volodya',
            created: '12.01.2022',
            category: 'Idea',
            status: 'Active',
            content: 'Lorem Ipsum',
            dates: '3/5/2021, 5/6/2020',
            isEditing: false
        },
        {
            id: 5691,
            name: 'Alex',
            created: '12.01.2022',
            category: 'Task',
            status: 'Active',
            content: 'Lorem Ipsum',
            dates: '3/5/2021, 5/6/2020',
            isEditing: false
        },
        {
            id: 3512,
            name: 'Viktor',
            created: '12.01.2022',
            category: 'Random',
            status: 'Archived',
            content: 'Lorem Ipsum',
            dates: '3/5/2021, 5/6/2020',
            isEditing: false
        },
        {
            id: 7490,
            name: 'Marek',
            created: '12.01.2022',
            category: 'Idea',
            status: 'Active',
            content: 'Lorem Ipsum',
            dates: '3/5/2021, 5/6/2020',
            isEditing: false
        },
        {
            id: 2396,
            name: 'Alex',
            created: '12.01.2022',
            category: 'Quote',
            status: 'Active',
            content: 'Lorem Ipsum',
            dates: '3/5/2021, 5/6/2020',
            isEditing: false
        },
        {
            id: 5191,
            name: 'Marek',
            created: '12.01.2022',
            category: 'Random',
            status: 'Active',
            content: 'Lorem Ipsum',
            dates: '3/5/2021, 5/6/2020',
            isEditing: false
        }
    ]
}

export function notes(state = initialNotes, action) {
    if (action.type === ADD_NOTE) {
        return {...state, notes: [...state.notes, action.payload]};
    } else if (action.type === EDIT_NOTE) {
        const newNotes = state.notes.map((elem) => {
            if (elem.id === action.payload.id) {
                return {...state.notes, ...action.payload};
            }
            return elem;
        });
        return {...state, notes: newNotes};
    } else if(action.type === DELETE_NOTE){
        const filteredNotes = state.notes.filter((elem) => elem.id !== action.payload);
        return { ...state, notes: filteredNotes };
    }

    return state
}
