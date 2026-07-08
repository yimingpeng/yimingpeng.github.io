export type PublicationType = 'journal' | 'conference' | 'preprint' | 'thesis';

export interface PublicationLink {
	label: string;
	href: string;
}

export interface Publication {
	title: string;
	authors: string;
	venue: string;
	year?: number;
	type: PublicationType;
	links?: PublicationLink[];
}

export const SCHOLAR_URL = 'https://scholar.google.co.uk/citations?user=bJBbv0EAAAAJ';
export const LINKEDIN_PUBLICATIONS_URL =
	'https://www.linkedin.com/in/yiming-nz/details/publications/';
export const TOTAL_CITATIONS = 165;

const LEGACY_PUBLICATION_BASE = 'https://yimingpeng.github.io/yimingpeng.github.io/publication';

export const publications: Publication[] = [
	{
		title:
			'Proximal evolutionary strategy: improving deep reinforcement learning through evolutionary policy optimization',
		authors: 'Y Peng, G Chen, M Zhang, B Xue',
		venue: 'Memetic Computing',
		year: 2024,
		type: 'journal',
		links: [
			{ label: 'Code', href: 'https://github.com/yimingpeng/cmaes_baselines' },
			{ label: 'DOI', href: 'https://doi.org/10.1007/s12293-024-00419-1' }
		]
	},
	{
		title: 'Effective linear policy gradient search through primal-dual approximation',
		authors: 'Y Peng, G Chen, M Zhang',
		venue: 'Int. Joint Conf. on Neural Networks (IJCNN)',
		year: 2020,
		type: 'conference',
		links: [{ label: 'Code', href: 'https://github.com/yimingpeng/primal_dual_baseline' }]
	},
	{
		title: 'Policy direct search for effective reinforcement learning',
		authors: 'Y Peng',
		venue: 'PhD Thesis, Victoria University of Wellington',
		year: 2019,
		type: 'thesis'
	},
	{
		title: 'Constrained Expectation-Maximization Methods for Effective Reinforcement Learning',
		authors: 'G Chen, Y Peng, M Zhang',
		venue: 'Int. Joint Conf. on Neural Networks (IJCNN)',
		year: 2018,
		type: 'conference',
		links: [
			{
				label: 'Download',
				href: `${LEGACY_PUBLICATION_BASE}/conference/c-paper-9/c-paper-9.pdf`
			},
			{ label: 'Publisher', href: 'https://ieeexplore.ieee.org/document/8488990' }
		]
	},
	{
		title:
			'NEAT for Large-Scale Reinforcement Learning through Evolutionary Feature Learning and Policy Gradient Search',
		authors: 'Y Peng, G Chen, H Singh, M Zhang',
		venue: 'Genetic and Evolutionary Computation Conference (GECCO)',
		year: 2018,
		type: 'conference',
		links: [
			{
				label: 'Download',
				href: `${LEGACY_PUBLICATION_BASE}/conference/c-paper-6/c-paper-6.pdf`
			},
			{ label: 'DOI', href: 'https://doi.org/10.1145/3205455.3205536' }
		]
	},
	{
		title: 'An Adaptive Clipping Approach for Proximal Policy Optimization',
		authors: 'G Chen, Y Peng, M Zhang',
		venue: 'arXiv preprint',
		year: 2018,
		type: 'preprint',
		links: [
			{ label: 'Download', href: 'https://arxiv.org/pdf/1804.06461' },
			{ label: 'arXiv', href: 'https://arxiv.org/abs/1804.06461' }
		]
	},
	{
		title:
			'Effective Exploration for Deep Reinforcement Learning via Bootstrapped Q-Ensembles with Tsallis Entropy Regularization',
		authors: 'G Chen, Y Peng, M Zhang',
		venue: 'arXiv preprint',
		year: 2018,
		type: 'preprint',
		links: [
			{ label: 'Download', href: 'https://arxiv.org/pdf/1809.00403' },
			{ label: 'arXiv', href: 'https://arxiv.org/abs/1809.00403' }
		]
	},
	{
		title:
			'Effective Policy Gradient Search for Reinforcement Learning through NEAT based Feature Extraction',
		authors: 'Y Peng, G Chen, M Zhang, Y Mei',
		venue: 'Simulated Evolution and Learning (SEAL)',
		year: 2017,
		type: 'conference',
		links: [
			{
				label: 'Download',
				href: `${LEGACY_PUBLICATION_BASE}/conference/c-paper-4/c-paper-4.pdf`
			},
			{ label: 'DOI', href: 'https://doi.org/10.1007/978-3-319-68759-9_39' }
		]
	},
	{
		title: 'A Sandpile Model for Reliable Actor-Critic Reinforcement Learning',
		authors: 'Y Peng, G Chen, M Zhang, S Pang',
		venue: 'Int. Joint Conf. on Neural Networks (IJCNN)',
		year: 2017,
		type: 'conference',
		links: [
			{
				label: 'Download',
				href: `${LEGACY_PUBLICATION_BASE}/conference/c-paper-5/c-paper-5.pdf`
			},
			{ label: 'Publisher', href: 'https://ieeexplore.ieee.org/document/7966362' }
		]
	},
	{
		title: 'Automated State Feature Learning for Actor-Critic Reinforcement Learning through NEAT',
		authors: 'Y Peng, G Chen, S Holdaway, Y Mei, M Zhang',
		venue: 'GECCO Companion',
		year: 2017,
		type: 'conference',
		links: [
			{
				label: 'Download',
				href: `${LEGACY_PUBLICATION_BASE}/conference/c-paper-3/c-paper-3.pdf`
			},
			{ label: 'Publisher', href: 'https://dl.acm.org/citation.cfm?id=3076035' }
		]
	},
	{
		title:
			'Evolving Transferable Artificial Neural Networks for Gameplay Tasks via NEAT with Phased Searching',
		authors: 'W Hardwick-Smith, Y Peng, G Chen, Y Mei, M Zhang',
		venue: 'Australasian Joint Conf. on AI (AJCAI)',
		year: 2017,
		type: 'conference',
		links: [
			{
				label: 'Download',
				href: `${LEGACY_PUBLICATION_BASE}/conference/c-paper-8/c-paper-8.pdf`
			},
			{ label: 'DOI', href: 'https://doi.org/10.1007/978-3-319-63004-5_4' }
		]
	},
	{
		title: 'Generalized Compatible Function Approximation for Policy Gradient Search',
		authors: 'Y Peng, G Chen, M Zhang, S Pang',
		venue: 'Int. Conf. on Neural Information Processing (ICONIP)',
		year: 2016,
		type: 'conference'
	},
	{
		title: 'A Federated Online Network Traffic Analysis Engine for Cybersecurity',
		authors: 'S Pang, Y Peng, T Ban, D Inoue, A Sarrafzadeh',
		venue: 'Int. Joint Conf. on Neural Networks (IJCNN)',
		year: 2015,
		type: 'conference'
	},
	{
		title: 'Chunk incremental IDR/QR LDA learning',
		authors: 'Y Peng, S Pang, G Chen, A Sarrafzadeh, T Ban, D Inoue',
		venue: 'Int. Joint Conf. on Neural Networks (IJCNN)',
		year: 2013,
		type: 'conference'
	},
	{
		title: 'Exploring Crude Oil Impacts to Oil Stocks through Graphical Computational Correlation Analysis',
		authors: 'A Lai, L Song, Y Peng, P Zhang, Q Wang, S Pang',
		venue: 'Int. Conf. on Neural Information Processing (ICONIP)',
		year: 2012,
		type: 'conference'
	},
	{
		title: 'Boosting performance of incremental IDR/QR LDA',
		authors: 'Y Peng',
		venue: 'Masters Thesis, Auckland University of Technology',
		year: 2011,
		type: 'thesis'
	}
];

export function getSortedPublications(): Publication[] {
	return [...publications].sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
}
