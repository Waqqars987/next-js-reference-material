import { getTrainings } from '@/lib/training';
import Image from 'next/image';

export default async function TrainingPage() {
	const trainingSessions = getTrainings();

	return (
		<main>
			<h1>Find your favorite activity</h1>
			<ul id='training-sessions'>
				{trainingSessions.map(training => (
					<li key={training.id}>
						<Image
							src={`/trainings${training.image}`}
							alt={training.title}
							width={202}
							height={202}
							priority
							style={{
								height: 'auto'
							}}
						/>
						<div>
							<h2>{training.title}</h2>
							<p>{training.description}</p>
						</div>
					</li>
				))}
			</ul>
		</main>
	);
}
