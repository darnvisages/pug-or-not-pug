import React from 'react';

class Register extends React.Component {
	constructor(props) {
		super();
		this.state = {
			email: '',
			password: '',
			name: '',
			registerFailed: false
		}
	}

	onNameChange = (event) => {
		this.setState({name: event.target.value});
	}

	onEmailChange = (event) => {
		this.setState({email: event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({password: event.target.value});
	}

	onSubmitSignIn = () => {
		fetch('https://thawing-depths-15865.herokuapp.com/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
				name: this.state.name
			})
		})
			.then(response => response.json())
			.then(user => {
				if (user.id) {
					this.setState({registerFailed: false});
					this.props.loadUser(user);
					this.props.onRouteChange('home');			
				} else {
					this.setState({registerFailed: true});
				}
			})
			.catch(err => {
				this.setState({registerFailed: true});
			})
	}

	keyPressed = (event) => {
	    if (event.key === "Enter") {
	      this.onSubmitSignIn()
	    }
	  }

	render () {
		return (
			<article className="br3 ba dark-gray b--black-10 mv4 w-90 w-75-m w-75-l mw6 center shadow-5">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
				        <input 
				        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	type="text"
				        	name="name"  
				        	id="name" 
				        	onChange={this.onNameChange}
				        	onKeyPress={this.keyPressed}
				        />
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input 
				        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	type="email" 
				        	name="email-address"  
				        	id="email-address" 
				        	onChange={this.onEmailChange}
				        	onKeyPress={this.keyPressed}
				        />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input 
				        	className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	type="password" 
				        	name="password"  
				        	id="password" 
				        	onChange={this.onPasswordChange}
				        	onKeyPress={this.keyPressed}
				        />
				      </div>
				    </fieldset>
				    <div className="lh-copy mt3">
				      {this.state.registerFailed 
				      	? <p className="f6 link red db">Registration failed.</p>
				      	: ''
					   }
				    </div>
				    <div className="">
				      <input 
				      	onClick={this.onSubmitSignIn}
				      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      	type="submit" 
				      	value="Register"
				      />
				    </div>
				  </div>
				</main>
			</article>
		)
	}
}

export default Register;