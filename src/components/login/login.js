import './login.css'

export default function Login(){

    return(
<div className="login">
<h3>Login</h3>
        <div class="user">
            <label for="username">USERNAME</label>
            <input type="text" name="username" id="user" placeholder="Username"/><br></br>
            
        </div>
        <div class="pass">
            <label for="password"> PASSWORD</label>
            <input type="password" name="password" placeholder="PASSWORD" id="pass"/><br></br>
        
        </div>
        <div>
            <input class="button" type="submit" name="Login" value="Login" id="user"/>
        </div>
        
</div>
    )
    
    }
