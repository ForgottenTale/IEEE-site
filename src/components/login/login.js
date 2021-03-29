import './login.css'

export default function Login() {

    return (
        <div className="login">
            
            <h2>Login</h2>
            <b>Login to your account</b><br></br>
            
            <div className="user">
                <label for="username">Username</label><br></br>
                <input type="text" name="" placeholder="Email or Phone number" size="30"/><br></br>
                
            </div>
            <div className="pass">
                <label for="password"> Password</label>
                <input type="password" name="password" placeholder="Password" id="pass" size="30" /><br></br>
                 
            </div>
        
            <div className="check">
                    <input type="checkbox"></input>
                    <label for="Rem">Remember me</label>
            </div>
            <div>
                <input className="button"  type="submit" name="Login" value="Sign In" id="user" size="0" />
            </div>
            
            </div>
            
        
    )
    
}
   
