import { Tasks, User } from '../model/index.js';
import { createJwtToken } from '../../helpers/createToken.js';
// import moment from 'moment';

const apiRoutes = app => {
    app.get('/test', (req, res) => {
        console.log('req ---- ', req)
        res.send({ status: 200 })
    })
    app.post('/user', async (req, res) => {
        try {
            console.log('checkUser --- ', req.body)

            const checkUser = await User.findOne({ email: req.body.email })
            console.log('checkUser --- ', checkUser)
            if (checkUser) return res.status(400).send("Email is Already Exist");
            const createUser = new User(req.body);
            // const createUser = new User({
            //     name: 'trrt',
            //     email: 'sdd@xv.di',
            //     password: '2345678654'
            // });
            await createUser.save();
            let id = createUser._id.toString();
            let auth = createJwtToken({ id, email: req.body.email });
            res.cookie('auth', auth).status(200).send(createUser)
        } catch (error) {
            console.log('error ---- ', error)
            res.status(400).send(error)
        }
    })

    app.post('/checkUser', async (req, res) => {
        console.log('check ----------', req.body)
        if (req.body && (req.body.email || req.body.password)) return res.status(400).send("Something went wrong!")

        if (req.body) {
            const { email, password } = req.body || {};
            const checkUser = await User.findOne({ email, password })
            console.log('data --- ', checkUser)
            if (checkUser) {
                let id = checkUser._id.toString();
                let token = createJwtToken({ id, email: 'sdd@xv.di' })
                res.cookie('auth', token).status(200).send('Valid User')
            } else {
                res.status(400).send('User not found, Kinldy check the credentials')
            }
        }
    })

    app.get('/logout', (req, res) => {
        if(req.user) res.clearCookie('auth').status(200).send('Done')
    })

    app.post('/task', async (req, res) => {
        // if(!req.user || req.user.id) return res.status(500).send({
        //     status: 500,
        //     errorMessage: 'Please login and continue'
        // })
        const task = req.body;
        console.log(task)
        if(!task) return res.send({

            status: 400,
            errorMessage: "Invalid data"
        });
        if(!task.name || (task.name.toString().trim() === "")) return res.send({
            status:  400,
            errorMessage: "Task name is required."
        });
        if(!task.expiredAt) return res.send({
            status: 400,
            errorMessage: "Task expiry is required."
        });
        if(task.id) {
            try {
                const isTaskUpdated = await Tasks.findByIdAndUpdate(task.id, {
                    $set: {
                        name: task.name,
                        expiredAt: task.expiredAt,
                        updatedAt: new Date()
                    }
                });
                console.log('Update task is id ', isTaskUpdated)
                if(!isTaskUpdated) return res.send({
                    status: 404,
                    errorMessage: "Task not found"
                });
            } catch (error) {
                console.log(error);
                return res.status(400).send(error);
            }
        }
        try {
            const createTasks = new Tasks({
                ...task,
                userId: "61a1e7a73f0fae2df893a899" || req.user.id,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            await createTasks.save();
            res.status(200).send(createTasks)
        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    })

    app.get('/tasks/:id?', async (req, res) => {
        const _id = params && params.id;
        if (!_id) {
            res.send('s')
        }
    })
}

export default apiRoutes;