const express = require('express')

const User = require('../models/User')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const  { registerValidation, loginValidation } = require('../validation')


const router = express()

router.post('/register', async (req, res) => {

    const  {error}  = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const emailExists = await User.findOne({ email: req.body.email });
      if(emailExists) return res.status(400).send('Email exists')

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
      const savedUser = await user.save();
      res.send({user: user._id});
    } catch (err) {
      res.status(400).send(err);
    }

});


router.post('/login', async (req, res) => {

  const  {error}  = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  const userExists = await User.findOne({ email: req.body.email });
    if(!userExists) return res.status(400).send('User Not found')

    const validPass = await bcrypt.compare(req.body.password, userExists.password)
    if(!validPass) return res.status(400).send('User Not found')
      const token = jwt.sign({ _id: userExists._id}, process.env.MYTOKEN)
      res.header('auth-token', token).send(token)
 

})





module.exports = router;