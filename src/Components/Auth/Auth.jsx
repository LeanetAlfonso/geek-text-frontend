import {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import Notification from '../Cart/UI/Notification';
import './Auth.css';
import axios from 'axios';

// Components

// Page breadcrumb Using the USeStateHook
// const pageRoute = [{title: 'Account', link: '/account'}];

const Auth = () => {
	const [showforgotPassword, setShowForgotPassword] = useState(false);

	const [email_signin, setEmailSignin] = useState('');
	const [password_login, setPasswordLogin] = useState('');

	const [username_signup, setUsernameSignUp] = useState('');
	const [email_signup, setEmailSignup] = useState('');
	const [password_signup, setPasswordSignup] = useState('');
	const [firstname_signup, setFirstNameSignup] = useState('');

	const history = useHistory();

	// Notification
	const [notify, setNotify] = useState({
		isOpen: false,
		message: '',
		type: '',
		typeStyle: '',
	});

	const errorHandler = (message) => {
		setNotify({
			isOpen: true,
			message: message || 'Sorry, there was an error. Plase try again later.',
			type: 'error',
			typeStyle: '',
		});
	};

	const successHandler = (message) => {
		setNotify({
			isOpen: true,
			message: message,
			type: 'success',
			typeStyle: '',
		});
	};

	const handleLoginChange = (e) => {
		switch (e.target.id) {
			case 'email_signin':
				setEmailSignin(e.target.value);
				break;
			case 'password_login':
				setPasswordLogin(e.target.value);
				break;
			default:
				break;
		}
	};

	const handleSignupChange = (e) => {
		switch (e.target.id) {
			case 'username_signup':
				setUsernameSignUp(e.target.value);
				break;
			case 'password_signup':
				setPasswordSignup(e.target.value);
				break;
			case 'email_signup':
				setEmailSignup(e.target.value);
				break;
			case 'firstname_signup':
				setFirstNameSignup(e.target.value);
				break;
			default:
				break;
		}
	};

	const LoginUser = (e) => {
		const baseURL = {
			dev: 'http://localhost:5000/api/signin',
			prod: 'http://lea-geek-text.herokuapp.com/api/signin',
		};
		const url =
			process.env.NODE_ENV === 'production' ? baseURL.prod : baseURL.dev;
		e.preventDefault();
		const form_data = new FormData();
		form_data.append('email', email_signin);
		form_data.append('password', password_login);

		axios
			.post(url, form_data)
			.then((res) => {
				localStorage.setItem('token', res.data.token);
				history.push('/');
				window.location.reload(false);
			})
			.catch((err) => {
				errorHandler(
					err && err.response && err.response.data && err.response.data.msg
						? err.response.data.msg
						: 'Something unexpected happened. Please try again later'
				);
			});
	};

	const SignupUser = (e) => {
		e.preventDefault();
		const baseURL = {
			dev: 'http://localhost:5000/api/signup',
			prod: 'http://lea-geek-text.herokuapp.com/api/signup',
		};
		const url =
			process.env.NODE_ENV === 'production' ? baseURL.prod : baseURL.dev;

		// email, name, nickname, password are required
		// The nickname will be the same as the username
		const form_data = new FormData();
		form_data.append('email', email_signup);
		form_data.append('password', password_signup);
		form_data.append('nickname', username_signup);
		form_data.append('name', firstname_signup);
		axios
			.post(url, form_data)
			.then((res) => {
				successHandler(res.data.msg);
			})
			.catch((err) => {
				errorHandler(
					err && err.response && err.response.data && err.response.data.msg
						? err.response.data.msg
						: 'Something unexpected happened. Please try again later'
				);
			});
	};

	return (
		<div className='account'>
			<div className='customer_container row'>
				<div className='col-1-2'>
					{!showforgotPassword ? (
						<form className='account__form'>
							<h3 className='account__form-header'>Login</h3>
							<p>Sign in to your existing account</p>
							<div className='form-control'>
								<label htmlFor='email_signin'>Email</label>
								<input
									onChange={handleLoginChange}
									id='email_signin'
									type='text'
									required
								/>
							</div>
							<div className='form-control'>
								<label htmlFor='password'>Password</label>
								<input
									type='password'
									required
									id='password_login'
									autoComplete='true'
									onChange={handleLoginChange}
								/>
							</div>
							<div className='account__forgotpassword'>
								<Link to='/'>Return to Store</Link>
								<button
									className='link'
									onClick={() => setShowForgotPassword(true)}
								>
									Forgotten Password?
								</button>
							</div>
							<button
								onClick={LoginUser}
								type='submit'
								className='btn btn-primary auth'
							>
								Login
							</button>
						</form>
					) : (
						<form className='account__form'>
							<h3 className='account__form-header'>Reset Password</h3>
							<p>We will send you an email to reset your password</p>
							<div className='form-control'>
								<label htmlFor='email'>Email Address</label>
								<input type='email' required id='email' />
							</div>
							<div className='account__forgotpassword-buttons'>
								<button type='submit' className='btn btn-primary auth'>
									Submit
								</button>
								<button
									onClick={() => setShowForgotPassword(false)}
									className='btn btn-light auth'
								>
									Cancel
								</button>
							</div>
						</form>
					)}
				</div>
				<div className='col-1-2 form-divider'>
					<form className='account__form'>
						<h3 className='account__form-header'>Sign Up</h3>
						<p>Create a New Account</p>
						<div className='form-control'>
							<label htmlFor='name'>First Name</label>
							<input
								style={{marginBottom: '1rem'}}
								onChange={handleSignupChange}
								id='firstname_signup'
								type='text'
								required
							/>
							<label htmlFor='name'>Username</label>
							<input
								onChange={handleSignupChange}
								id='username_signup'
								type='text'
								required
							/>
						</div>
						<div className='form-control'>
							<label htmlFor='register-email'>Email Address</label>
							<input
								type='email'
								required
								id='email_signup'
								onChange={handleSignupChange}
							/>
						</div>
						<div className='form-control'>
							<label htmlFor='register-password'>Password</label>
							<input
								type='password'
								required
								id='password_signup'
								autoComplete='true'
								onChange={handleSignupChange}
							/>
						</div>
						<button
							onClick={SignupUser}
							type='submit'
							className='btn btn-primary auth'
						>
							Sign Up
						</button>
					</form>
					<link
						rel='stylesheet'
						href='https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css'
					/>

					<div className='account__subtext'>
						<h4>Sign up today and you'll be able to:</h4>
						<p>
							<i className='fa fa-check'></i>
							<span>Speed your way through checkout</span>
						</p>
						<p>
							<i className='fa fa-check'></i>
							<span>Track your orders easily</span>
						</p>
						<p>
							<i className='fa fa-check'></i>
							<span>Keep a record all your purchases</span>
						</p>
					</div>
				</div>
			</div>
			<Notification notify={notify} setNotify={setNotify} />
		</div>
	);
};

export default Auth;
