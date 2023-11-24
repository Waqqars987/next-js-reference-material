import Link from 'next/link';

import classes from './button.module.css';

function Button(props) {
	if (props.link) {
		//  To Apply "Custom Styling" to Link, we have to add our own Anchor Tag which is detected
		//  by the Link Component. It will no longer render its own anchor tag but instead use our
		//  custom anchor tag with the Custom styles and exhibit the same functionality.
		//  WE MUST NOT SET the href on our own Anchor Tag

		//	Above behavior is only true for Next.js below v13

		return (
			<Link href={props.link} className={classes.btn}>
				<a className={classes.btn}>{props.children}</a>
			</Link>
		);
	}

	return (
		<button className={classes.btn} onClick={props.onClick}>
			{props.children}
		</button>
	);
}

export default Button;
