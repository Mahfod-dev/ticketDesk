import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'

const Register = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password1: '',
		password2: '',
	})

	const { name, email, password1, password2 } = formData

	const onChange = (e) => {
		setFormData((prevState) => {
			const { value, name } = e.target
			return { ...prevState, [name]: value }
		})
		console.log(formData)
	}

	const onSubmit = (e) => {
		e.preventDefault()

		if (password1 !== password2) {
			toast.error('Password do not match ')
		}
	}

	return (
		<>
			<section className='heading'>
				<h1>
					<FaUser /> Register
				</h1>
				<p>Please create a new account</p>
				<section className='form'>
					<form onSubmit={onSubmit}>
						<div className='form-group'>
							<input
								type='text'
								className='form-control'
								id='name'
								name='name'
								value={name}
								onChange={onChange}
								placeholder='Enter your name'
								required
							/>
						</div>
						<div className='form-group'>
							<input
								type='email'
								className='form-control'
								id='email'
								name='email'
								value={email}
								onChange={onChange}
								placeholder='Enter your email'
								required
							/>
						</div>
						<div className='form-group'>
							<input
								type='password'
								className='form-control'
								id='password1'
								name='password1'
								value={password1}
								onChange={onChange}
								placeholder='Enter password'
								required
							/>
						</div>{' '}
						<div className='form-group'>
							<input
								type='password'
								className='form-control'
								id='password2'
								name='password2'
								value={password2}
								onChange={onChange}
								placeholder='Confirm password'
								required
							/>
						</div>
						<div className='form-group'>
							<button className='btn btn-block'>Submit</button>
						</div>
					</form>
				</section>
			</section>
		</>
	)
}

export default Register
