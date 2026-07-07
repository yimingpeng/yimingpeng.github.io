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
		id: 'academia-to-industry-aug-2026',
		date: '2026-08',
		dateDisplay: 'Aug 2026',
		title: 'From Academia to Industry',
		type: 'talk',
		description:
			'Career transition talk for graduates — sharing experience moving from academia to industry.',
		body: 'A talk aimed at PhD students and recent graduates navigating the transition from academic research to industry roles. Covered practical advice on translating research skills, navigating job searches, and building a professional identity beyond academia.',
		status: 'recording coming',
		materials: 'request'
	},
	{
		id: 'ieee-nz-panel-may-2026',
		date: '2026-05',
		dateDisplay: 'May 2026',
		title: 'Industry Panel',
		organization: 'IEEE NZ Young Professionals Society',
		type: 'panel',
		description: 'Industry panel — IEEE NZ Young Professionals Society.',
		body: 'Panelist at the IEEE NZ Young Professionals Society event, discussing career paths in data engineering and AI, the evolving role of data infrastructure, and advice for early-career engineers.',
		status: 'recording coming',
		materials: 'request'
	}
];

export function getSortedEvents(): CommunityEvent[] {
	return [...communityEvents].sort((a, b) => b.date.localeCompare(a.date));
}
