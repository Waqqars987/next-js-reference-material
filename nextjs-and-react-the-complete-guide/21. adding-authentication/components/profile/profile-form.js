import classes from './profile-form.module.css';

function ProfileForm(props) {
	function submitHandler(event) {
		event.preventDefault();
		const payload = Object.fromEntries(new FormData(event.target).entries());
		props.onChangePassword(payload);
	}

	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<div className={classes.control}>
				<label htmlFor='new-password'>New Password</label>
				<input type='password' id='new-password' name='newPassword' />
			</div>
			<div className={classes.control}>
				<label htmlFor='old-password'>Old Password</label>
				<input type='password' id='old-password' name='oldPassword' />
			</div>
			<div className={classes.action}>
				<button>Change Password</button>
			</div>
		</form>
	);
}

export default ProfileForm;
