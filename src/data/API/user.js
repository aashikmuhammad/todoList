import express from 'express';

const routes = express.Router();

routes.post('/user', async (req, res) => {
    try {
        const checkUser = await User.findOne({ email: req.body.email })
        if (checkUser) return res.status(400).send("Email is Already Exist");
        const createUser = new User(req.body);
        // const createUser = new User({
        //     name: 'trrt',
        //     email: 'sdd@xv.di',
        //     password: '2345678654'
        // });
        await createUser.save();
        let id = createUser._id.toString();
        let auth = createJwtToken({ id, email });
        res.cookie('auth', auth).status(200).send(createUser)
    } catch (error) {
        console.log('error ---- ', error)
        res.status(400).send(error)
    }
})

export default routes;