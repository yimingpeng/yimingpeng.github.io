export type CommunityEventType =
	| 'talk'
	| 'keynote'
	| 'workshop'
	| 'panel'
	| 'meetup'
	| 'conference'
	| 'social';

export interface CommunityEvent {
	id: string;
	date: string; // ISO-ish for sorting, e.g. "2026-08"
	dateDisplay: string; // Human-readable, e.g. "Aug 2026"
	title: string;
	venue?: string;
	organization?: string;
	type: CommunityEventType;
	description: string; // Short summary — used on index preview
	body?: string; // Longer detail for the community page
	status?: string; // e.g. "recording coming", "slides available"
	recording?: string; // URL
	slides?: string; // URL
	photos?: string[]; // Paths relative to /public
	materials?: 'request' | Array<{ label: string; url: string }>;
}

export const communityEvents: CommunityEvent[] = [
	{
		id: 'wellington-airflow-meetup-oct-2026',
		date: '2026-10',
		dateDisplay: 'Oct 2026',
		title: 'First Wellington Apache Airflow® Meetup',
		venue: 'Te Toki a Rata Building, Victoria University of Wellington',
		organization: 'New Zealand Apache Airflow Meetup',
		type: 'meetup',
		description:
			'Co-hosting the first Apache Airflow meetup in Wellington, with talks from Chorus and Deloitte.',
		body: 'I\'m co-hosting the first Wellington Apache Airflow meetup on 29 October 2026, an evening of talks and networking for Airflow users and data engineers. Kieran Hume (Chorus) will speak on "Why I don\'t think about Airflow," and Yan Dai (Deloitte) will walk through orchestrating a document AI pipeline with Airflow, from raw files to validated knowledge.',
		status: 'upcoming · 29 Oct 2026, 5:00-8:30pm',
		materials: [
			{
				label: 'Meetup page',
				url: 'https://www.meetup.com/new-zealand-apache-airflow-meetup/events/316200984/'
			}
		]
	},
	{
		id: 'ieee-yp-future-of-ai-careers-sept-2026',
		date: '2026-09',
		dateDisplay: 'Sept 2026',
		title: 'The Future of AI Careers: From Technical Skills to Real-World Impact',
		venue: 'Victoria University of Wellington',
		organization: 'IEEE Young Professionals, NZ Central Section',
		type: 'talk',
		description:
			'Talk on "Become Experienced Before Anyone Hires You" at an IEEE Young Professionals seminar on the future of AI careers.',
		body: "I spoke at this IEEE Young Professionals seminar at Victoria University of Wellington, alongside Asad Moin (Bastion Security) and Dr. Kaan Demir (Accenture). I opened with joining Wētā FX as a rookie who knew nothing about VFX: I started small, reading alerts, fixing what I could, and asking a lot of questions. The core message: a job isn't the only place to get experience. Find a real problem, keep asking why until you truly understand it, and put your work where people can see it. Find one thing. Do it well. Do it publicly.",
		photos: [
			'/events/ieee-yp-talk-2026/talk-01.jpg',
			'/events/ieee-yp-talk-2026/talk-02.jpg',
			'/events/ieee-yp-talk-2026/talk-03.jpg',
			'/events/ieee-yp-talk-2026/talk-04.jpg'
		],
		materials: [
			{
				label: 'LinkedIn recap',
				url: 'https://www.linkedin.com/feed/update/urn:li:ugcPost:7513480327382769666/'
			},
			{
				label: 'IEEE YP event post',
				url: 'https://www.linkedin.com/feed/update/urn:li:ugcPost:7513341266575802369/'
			}
		]
	},
	{
		id: 'ieee-yp-study-research-to-industry-may-2026',
		date: '2026-05',
		dateDisplay: 'May 2026',
		title: 'From Study/Research to Industry',
		venue: 'Victoria University of Wellington',
		organization: 'IEEE Young Professionals, NZ Central Section',
		type: 'panel',
		description:
			'IEEE Young Professionals panel on transitioning from study and research into industry careers.',
		body: 'Hosted by IEEE Young Professionals at Victoria University of Wellington, this panel brought together students, researchers, and industry professionals to discuss career pathways, workplace expectations, and the practical skills needed to move from academia into industry. I joined Dr. Harisu Abdullahi Shehu, Dr. Kaan Demir, and Dr. Shima Afzaali as panelists, with support from IEEE NZ Central Section and CDSAI.',
		photos: [
			'/events/ieee-yp-panel-2026/panel-01.jpeg',
			'/events/ieee-yp-panel-2026/panel-02.jpeg',
			'/events/ieee-yp-panel-2026/panel-03.jpeg',
			'/events/ieee-yp-panel-2026/panel-04.jpeg'
		],
		materials: [
			{
				label: 'LinkedIn recap',
				url: 'https://www.linkedin.com/feed/update/urn:li:ugcPost:7462268368436400128/'
			}
		]
	}
];

export function getSortedEvents(): CommunityEvent[] {
	return [...communityEvents].sort((a, b) => b.date.localeCompare(a.date));
}
