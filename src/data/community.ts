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
		id: 'ieee-yp-future-of-ai-careers-sept-2026',
		date: '2026-09',
		dateDisplay: 'Sept 2026',
		title: 'The Future of AI Careers: From Technical Skills to Real-World Impact',
		venue: 'Victoria University of Wellington',
		organization: 'IEEE Young Professionals, NZ Central Section',
		type: 'talk',
		description:
			'Speaking on "Become Experienced Before Anyone Hires You" at an IEEE Young Professionals seminar on the future of AI careers.',
		body: 'IEEE Young Professionals seminar on 24 September 2026, bringing together AI professionals from different industries to share how AI roles are evolving, the skills becoming important, and how AI is applied in real-world settings. Yiming\'s talk, "Become Experienced Before Anyone Hires You: How to build real industry experience before you have an industry job," draws on his experience at Wētā FX, KPMG, and other industry roles. Format: 20-minute talks from invited speakers, 5-minute Q&A, and networking over refreshments.',
		status: 'upcoming · photos & slides to follow after the event'
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
		body: 'Hosted by IEEE Young Professionals at Victoria University of Wellington, this panel brought together students, researchers, and industry professionals to discuss career pathways, workplace expectations, and the practical skills needed to move from academia into industry. Yiming joined Dr. Harisu Abdullahi Shehu, Dr. Kaan Demir, and Dr. Shima Afzaali as panelists, with support from IEEE NZ Central Section and CDSAI.',
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
