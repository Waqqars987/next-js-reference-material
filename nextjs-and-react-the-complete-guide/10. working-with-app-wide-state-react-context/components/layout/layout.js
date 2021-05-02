import { useContext } from 'react';

import MainHeader from './main-header';
import Notification from '../ui/notification';
import NotificationContext from '../../store/notification-context';

function Layout(props) {
	const notificationCtx = useContext(NotificationContext);

	const activeNotification = notificationCtx.notification;

	return (
		<>
			<MainHeader />
			<main>{props.children}</main>
			{activeNotification && <Notification {...activeNotification} />}
		</>
	);
}

export default Layout;
