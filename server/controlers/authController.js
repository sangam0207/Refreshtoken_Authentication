const bcrypt = require("bcrypt");
const { User } = require("../models/userModel");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { name,email, password } = req.body;
    if (!name||!email || !password) {
      return res
        .status(400)
        .json({ message: " email, and password are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  
  const token = jwt.sign({ id: user._id },process.env.Access_Token_Secret, { expiresIn: "1m" });
  const refreshToken=jwt.sign({ id: user._id },process.env.Refresh_Token_Secret, { expiresIn: "2d" });
  
    res.status(200).cookie('access_token',refreshToken,{
      httpOnly:true,
      secure:true,
      sameSite:'None',
      maxAge:2*24*60*60*1000}).send({token,user});
};
// const loginController = async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required.' });
//   }

//   const user = await User.findOne({ email });
//   if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//   }

//   const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
//   const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '2d' });
//   user.refreshToken.push(refreshToken);
//   await user.save();
//   res.cookie('jwt', refreshToken, {
//       httpOnly: true,
//       secure: true,
//       sameSite: 'None',
//       maxAge: 2 * 24 * 60 * 60 * 1000, 
//   });

//   res.status(200).send({ token, user });
// };

const refreshToken = async (req, res) => {
  const cookies=req.cookies;
  if(!cookies?.access_token){
    return res.status(401).json({message:'Unauthorized'})
  }
  const refreshToken=cookies.access_token;
  jwt.verify(
    refreshToken,process.env.Refresh_Token_Secret,
    async(err,decoded)=>{
      if(err) return res.status(403).json({message:"Forbidden error"})
      const existingUser=await User.findOne({_id:decoded.id})
    if(!existingUser) return res.status(401).json({message:"Unauthorized"})
    const newToken=jwt.sign(
  {id:existingUser._id},process.env.Access_Token_Secret,{expiresIn:'1m'})
  res.json({token:newToken,user:{name:existingUser.name,email:existingUser.email}})
    })
};

// const refreshToken  = async (req, res) => {
//   const cookies = req.cookies;
//   if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' });

//   const refreshToken = cookies.jwt;
//   const foundUser = await User.findOne({ refreshToken }).exec();
//   if (!foundUser) return res.status(403).json({ message: 'Forbidden' }); 
//   jwt.verify(
//       refreshToken,
//       process.env.REFRESH_TOKEN_SECRET,
//       (err, decoded) => {
//           if (err || foundUser._id.toString() !== decoded.id) return res.status(403).json({ message: 'Forbidden' });
//           const accessToken = jwt.sign(
//               { id: decoded.id },
//               process.env.ACCESS_TOKEN_SECRET,
//               { expiresIn: '1m' }
//           );

//           res.json({ token: accessToken, user: { name: foundUser.name, email: foundUser.email } });
//       }
//   );
// };
const logout=async(req,res)=>{
  const cookies=req.cookies;
  if(!cookies?.access_token) return res.sendStatus(204)
  res.clearCookie('access_token', {
    httpOnly: true,
    sameSite: 'None', 
    secure: true 
  });
res.status(200).json({message:'Logout Successfully'})
}
module.exports = { registerController, loginController, refreshToken ,logout};
