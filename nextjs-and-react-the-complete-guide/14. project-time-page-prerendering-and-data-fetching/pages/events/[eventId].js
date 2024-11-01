import { getEventById, getFeaturedEvents } from '../../helpers/api-util';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';

function EventDetailPage(props) {
	const event = props.selectedEvent;

	if (!event) {
		return (
			<div className='center'>
				<p>Loading...</p>
			</div>
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

export async function getStaticPaths() {
	const events = await getFeaturedEvents();
	const paths = events.map(event => ({ params: { eventId: event.id } }));

	return {
		paths,
		fallback: 'blocking' // blocking - next.js will not serve anything until it's done generating the required page
	};
}

export async function getStaticProps(context) {
	const eventId = context.params.eventId;
	const event = await getEventById(eventId);

	return {
		props: {
			selectedEvent: event
		},
		revalidate: 30
	};
}

export default EventDetailPage;
