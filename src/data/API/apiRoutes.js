import { Tasks, User } from '../model/index.js';
import { createJwtToken } from '../../helpers/createToken.js';

const apiRoutes = app => {

    app.post('/signup', async (req, res) => {
        try {
            const checkUser = await User.findOne({ email: req.body.email })
            if (checkUser) return res.status(400).send({
                status: 400,
                errorMessage: "Email is Already Exist"
            });
            const createUser = new User(req.body);
            await createUser.save();
            let id = createUser._id.toString();
            let auth = createJwtToken({ id, email: req.body.email });
            res.cookie('auth', auth).status(200).send({
                status: 200,
                result: createUser
            })
        } catch (error) {
            res.status(400).send({
                status: 400,
                errorMessage: error
            })
        }
    })

    app.post('/login', async (req, res) => {
        if (req.body && (!req.body.email || !req.body.password)) return res.status(400).send({
            status: 400,
            errorMessage: "Please provide valid data"
        })
        if (req.body) {
            const { email, password } = req.body || {};
            const checkUser = await User.findOne({ email, password })
            if (checkUser) {
                let id = checkUser._id.toString();
                let token = createJwtToken({ id, email: req.body.email })
                res.cookie('auth', token).status(200).send({
                    status:200,
                    result: checkUser
                })
            } else {
                res.status(400).send({
                    status: 400,
                    errorMessage: 'User not found, Kinldy check the credentials'
                })
            }
        }
    })

    app.post('/logout', (req, res) => {
        if (req.user) return res.clearCookie('auth').status(200).send({
            status: 200
        });

        res.status(500).send({
            status: 500,
            errorMessage: "You are not logged In"
        })
    })

    app.post('/task', async (req, res) => {
        if (!req.user && req.user.id) return res.status(500).send({
            status: 500,
            errorMessage: 'Please login and continue'
        })
        const task = req.body;
        if (!task) return res.send({
            status: 400,
            errorMessage: "Invalid data"
        });

        if (task.id) {
            let updateData = { updatedAt: new Date() };
            if (task.name) updateData['name'] = task.name;
            if (task.expiredAt) updateData['expiredAt'] = task.expiredAt;
            if ([true, false].includes(task.isCompleted)) updateData['isCompleted'] = task.isCompleted;
            try {
                if (!task.name && !task.expiredAt && ![true, false].includes(task.isCompleted)) {
                    res.send({
                        status: 400,
                        errorMessage: "Nothing to update."
                    });
                }
                const isTaskUpdated = await Tasks.findByIdAndUpdate(task.id, {
                    $set: updateData
                });
                if (!isTaskUpdated) return res.send({
                    status: 404,
                    errorMessage: "Task not found"
                });
                res.status(200).send({
                    status: 200
                })
            } catch (error) {
                console.log(error);
                return res.status(400).send({
                    status: 400,
                    errorMessage: error
                });
            }
        } else {
            if (!task.name || (task.name && task.name.toString().trim() === "")) return res.send({
                status: 400,
                errorMessage: "Task name is required."
            });
            if (!task.expiredAt) return res.send({
                status: 400,
                errorMessage: "Task expiry is required."
            });
            try {
                const createTasks = new Tasks({
                    ...task,
                    userId: req.user.id,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
                await createTasks.save();
                res.status(200).send({
                    status: 200,
                    result: createTasks
                })
            } catch (error) {
                console.log(error)
                res.status(400).send({
                    status: 400,
                    errorMessage: error
                })
            }
        }
    })

    app.get('/tasks/:id?', async (req, res) => {
        try {
            if (!req?.user?.id) {
                return res.status(500).send({
                    status: 500,
                    errorMessage: "Please login to continue."
                })
            }
            const id = req?.params?.id;
            if (!id) {
                const getOwnTasks = await Tasks.find({
                    userId: req.user.id
                })
                res.status(200).send(getOwnTasks)
            } else {
                if (id == 'all') {
                    const getOthersTasks = await Tasks.find({
                        userId: { $ne: req.user.id }
                    })
                    if (!getOthersTasks) return res.status(400).send("No Tasks found")
                    res.status(200).send(getOthersTasks)
                } else {
                    const getTask = await Tasks.findById(id);
                    if (!getTask) return res.status(400).send('No Tasks Found');
                    res.status(200).send(getTask)
                }
            }
        } catch (error) {
            console.log('error -- ', error);
            res.status(400).send({
                error
            })
        }
    })
}

export default apiRoutes;