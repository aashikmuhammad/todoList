import express from 'express';

const routes = express.Router();

routes.get('/:id?', async (req, res) => {
    const _id = params && params.id;
    if (!_id) {
        res.send('s')
    }
});

routes.post('/', async (req, res) => {
    // const createTasks = new Tasks();
    if(!req.user || req.user.id) return {
        status: 500,
        errorMessage: 'Please login and continue'
    }
    const task = req.body;
    if(!task) return {
        status: 400,
        errorMessage: "Invalid data"
    }
    try {
        await createTasks.save();
        res.status(200).send(createTasks)
    } catch (error) {
        res.status(400).send(error)
    }
})

export default routes;