import mongoose from 'mongoose';

const Tasks = mongoose.model('Tasks', {
    name:{
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    userId: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date
    },
    updatedAt: {
        type: Date
    },
    expiredAt: {
        type: Date
    }
})

export default Tasks;