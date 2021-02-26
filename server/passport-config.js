
const LocalStrategy=require('passport-local').Strategy
const bcrypt=require('bcrypt')
function initializePassport(passport,getUserByEmail,getUserById){

    const authenticateUser=async (email,password,done)=>{
        const user=await getUserByEmail(email)
        if (user == null || user[0]==undefined) {
            return done(null, false, { message: 'No user with that email' })
          }
        try{
            if(await bcrypt.compare(password,user[0].password))
            {
                console.log("I am in")
                return done(null,user)
            }
            else{
                return done(null,false,{message:"Password is incorrect"})
            }
        }catch(error){
            return done(error)
        }
    }
    passport.use(new LocalStrategy({usernameField:'email'},authenticateUser))
    passport.serializeUser((user, done) => done(null, user[0]._id))
  passport.deserializeUser(async(id, done) => {
    return done(null,await getUserById(id))
  })
}
module.exports=initializePassport