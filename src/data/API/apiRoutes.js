import { Tasks, User } from '../model/index.js';
import { createJwtToken } from '../../helpers/createToken.js';

const apiRoutes = (app, io) => {

    app.post('/signup', async (req, res) => {
        try {
            const checkUser = await User.findOne({ email: req.body.email })
            if (checkUser) return res.send({
                status: 400,
                errorMessage: "Email is Already Exist"
            });
            const createUser = new User(req.body);
            await createUser.save();
            let id = createUser._id.toString();
            let auth = createJwtToken({ id, email: req.body.email });
            res.cookie('auth', auth).send({
                status: 200,
                result: createUser
            })
        } catch (error) {
            res.send({
                status: 400,
                errorMessage: error
            })
        }
    })

    app.post('/login', async (req, res) => {
        try {
            if (req.user) {
                const checkUser = await User.findById(req?.user?.id);
                if (checkUser) {
                    let token = createJwtToken({ id: req?.user?.id, email: req?.user?.email })
                    return res.cookie('auth', token).send({
                        status: 200,
                        result: req?.user
                    })
                }
                return res.clearCookie('auth')
            }
            if (req.body && (!req.body.email || !req.body.password)) return res.send({
                status: 400,
                errorMessage: "Please provide valid data"
            })
            if (req.body) {
                const { email, password } = req.body || {};
                const checkUser = await User.findOne({ email, password });
                if (checkUser) {
                    let id = checkUser._id.toString();
                    let token = createJwtToken({ id, email: req.body.email })
                    res.cookie('auth', token).send({
                        status: 200,
                        result: checkUser
                    })
                } else {
                    res.send({
                        status: 400,
                        errorMessage: 'User not found, Kinldy check the credentials'
                    })
                }
            }
        } catch (error) {
            res.send({
                status: 400,
                errorMessage: error
            })
        }
    })

    app.get('/logout', (req, res) => {
        if (req.user) return res.clearCookie('auth').redirect('/');
        res.send({
            status: 500,
            errorMessage: "You are not logged In"
        })
    })

    app.post('/task', async (req, res) => {
        if (!req.user && req?.user?.id) return res.send({
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
                    return res.send({
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
                io?.emit('changes')
                res.send({
                    status: 200
                })
            } catch (error) {
                console.log(error);
                return res.send({
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
                io?.emit('changes')
                res.send({
                    status: 200,
                    result: createTasks
                })
            } catch (error) {
                console.log(error)
                res.send({
                    status: 400,
                    errorMessage: error
                })
            }
        }
    })

    app.get('/tasks/:id?', async (req, res) => {
        try {
            if (!req?.user?.id) {
                return res.send({
                    status: 500,
                    errorMessage: "Please login to continue."
                })
            }
            const id = req?.params?.id;
            if (!id) {
                const getOwnTasks = await Tasks.find({
                    userId: req?.user?.id
                }).sort('-updatedAt')
                let result = getOwnTasks
                if (getOwnTasks?.length > 0) {
                    result = [];
                    for (let i of getOwnTasks) {
                        if (i?.userId) {
                            const getUser = await User.findById(i?.userId, 'name')
                            result.push({
                                userId: i?.userId,
                                name: i?.name,
                                isCompleted: i?.isCompleted,
                                _id: i?._id,
                                createdAt: i?.createdAt,
                                updatedAt: i?.updatedAt,
                                expiredAt: i?.expiredAt,
                                userName: getUser?.name
                            })
                        }
                    }
                }
                res.send({
                    status: 200,
                    result
                })
            } else {
                if (id == 'all') {
                    const getOthersTasks = await Tasks.find({
                        userId: { $ne: req.user.id }
                    }).sort('-updatedAt')
                    if (!getOthersTasks) return res.send("No Tasks found")

                    let result = getOthersTasks
                    if (getOthersTasks?.length > 0) {
                        result = [];
                        for (let i of getOthersTasks) {
                            if (i?.userId) {
                                const getUser = await User.findById(i?.userId, 'name')
                                result.push({
                                    userId: i?.userId,
                                    name: i?.name,
                                    isCompleted: i?.isCompleted,
                                    _id: i?._id,
                                    createdAt: i?.createdAt,
                                    updatedAt: i?.updatedAt,
                                    expiredAt: i?.expiredAt,
                                    userName: getUser?.name
                                })
                            }
                        }
                    }
                    res.send({
                        status: 200,
                        result
                    })
                } else {
                    const getTask = await Tasks.findById(id);
                    if (!getTask) return res.send('No Tasks Found');
                    let result = [];
                    if (getTask?.userId) {
                        const getUser = await User.findById(getTask?.userId, 'name')
                        result.push({
                            userId: getTask?.userId,
                            name: getTask?.name,
                            isCompleted: getTask?.isCompleted,
                            _id: getTask?._id,
                            createdAt: getTask?.createdAt,
                            updatedAt: getTask?.updatedAt,
                            expiredAt: getTask?.expiredAt,
                            userName: getUser?.name
                        })
                    }
                    res.send({
                        status: 200,
                        result
                    })
                }
            }
        } catch (error) {
            console.log('error -- ', error);
            res.send({
                status: 400,
                errorMessage: error
            })
        }
    })

    app.delete('/task/:id', async (req, res) => {
        try {
            if (!req?.user?.id) {
                return res.send({
                    status: 500,
                    errorMessage: "Please login to continue."
                })
            }
            const id = req?.params?.id;
            if (!id) {
                return res.send({
                    status: 400,
                    errorMessage: "Nothing to delete."
                })
            }
            const deleteTask = await Tasks.findByIdAndDelete(id);
            if (!deleteTask) return res.send({
                status: 400,
                errorMessage: 'No Task found'
            });
            io?.emit('changes')
            res.send({
                status: 200
            })

        } catch (error) {
            console.log('error -- ', error);
            res.send({
                status: 400,
                errorMessage: error
            })
        }
    })
}

export default apiRoutes;