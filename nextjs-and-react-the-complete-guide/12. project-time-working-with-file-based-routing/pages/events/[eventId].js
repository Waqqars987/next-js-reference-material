import { useRouter } from 'next/router';

import EventContent from '../../components/event-detail/event-content';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventSummary from '../../components/event-detail/event-summary';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import { getEventById } from '../../dummy-data';

function EventDetailPage() {
	const router = useRouter();
	const eventId = router.query.eventId;
	const event = getEventById(eventId);

	if (!event) {
		return (
			<>
				<ErrorAlert>
					<p>No Event Found</p>
				</ErrorAlert>
				<div className='center'>
					<Button link='/events'>Show All Events</Button>
				</div>
			</>
		);
	}

	return (
		<>
			<EventSummary title={event.title} />
			<EventLogistics
				date={event.date}
				address={event.location}
				image={event.image}
				imageAlt={event.title}
			/>
			<EventContent>
				<p>{event.description}</p>
			</EventContent>
		</>
	);
}

export default EventDetailPage;
