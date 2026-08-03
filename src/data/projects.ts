export interface ProjectWriteup {
	url: string;
	label?: string; // defaults to 'Read the write-up'
}

export interface ProjectLink {
	label: string;
	href: string;
}

export interface Project {
	id: string; // slug, also the /archive anchor
	year: number;
	name: string;
	madeAt: string;
	tech: string[];
	summary: string; // one/two lines — archive row + fallback description
	featured?: boolean; // surfaces on the homepage
	impact?: string; // bold one-liner on featured homepage cards
	narrative?: string; // longer body for featured homepage cards
	links?: ProjectLink[];
	writeup?: ProjectWriteup; // absent -> "deep dive coming"
}

export const projects: Project[] = [
	// Wētā FX
	{
		id: 'dataops-platform',
		year: 2024,
		name: 'DataOps Platform',
		madeAt: 'Wētā FX',
		tech: ['Python', 'Airflow', 'ClickHouse', 'Ansible'],
		summary:
			'Built and owns 25+ ETL pipelines on-prem; eliminated recurring data failures and ' +
			'made the platform production-critical for BI and ML teams.',
		featured: true,
		impact:
			'Eliminated recurring pipeline failures; stakeholder teams now rely on it as ' +
			'production-critical infrastructure.',
		narrative:
			'Production on-premises data platform powering BI and ML workflows across Wētā FX. ' +
			'Built and maintains 25+ ETL pipelines ingesting from disparate sources — solving the ' +
			'persistent problem of unreliable, undocumented data hand-offs between departments.'
	},
	{
		id: 'apache-airflow-oss-contributions',
		year: 2024,
		name: 'Apache Airflow OSS Contributions',
		madeAt: 'Apache Airflow Community',
		tech: ['Python', 'Open Source', 'Apache Airflow'],
		summary:
			'Contributed production-informed fixes and enhancements to Airflow operators and ' +
			'platform stability, improving reliability and usability for wider community adoption.',
		featured: true,
		impact: 'Open source work focused on practical, production-informed improvements.',
		narrative:
			'Contributor to Apache Airflow — the de facto standard for data pipeline orchestration ' +
			'used by thousands of organizations worldwide. Contributions focus on stability, ' +
			'usability, and operator improvements drawn from real production experience.',
		links: [{ label: 'GitHub', href: 'https://github.com/apache/airflow' }]
	},
	{
		id: 'data-quality-observability-system',
		year: 2024,
		name: 'Data Quality & Observability System',
		madeAt: 'Wētā FX',
		tech: ['Great Expectations', 'Python', 'GitLab CI'],
		summary:
			'Designed platform-wide quality framework from scratch; moved the team from ' +
			'reactive firefighting to proactive anomaly detection.',
		featured: true,
		impact:
			'Dramatically reduced data incidents; stakeholders gained confidence to act on data ' +
			'without manual verification.',
		narrative:
			'Designed and built a platform-wide data quality framework from the ground up using ' +
			'Great Expectations — moving the team from reactive fire-fighting to proactive anomaly ' +
			'detection. Integrated into the CI/CD pipeline so quality checks run automatically on ' +
			'every deploy.'
	},
	{
		id: 'resource-planning-crew-scheduling-tool',
		year: 2024,
		name: 'Resource Planning & Crew Scheduling Tool',
		madeAt: 'Wētā FX',
		tech: ['Python', 'ReactJS', 'PostgreSQL'],
		summary:
			'Built the first in-house capacity planning tool for managing and optimising ' +
			'crew workload scheduling across the studio.'
	},
	{
		id: 'rto-compliance-analytics',
		year: 2023,
		name: 'RTO Compliance Analytics',
		madeAt: 'Wētā FX',
		tech: ['Python', 'SQL', 'Tableau'],
		summary:
			'Delivered real-time dashboards enabling Talent & Culture to track Return to ' +
			'Office policy implementation and measure organisational compliance.'
	},
	// MBIE / Emergence
	{
		id: 'etl-cloud-migration-docker-openshift',
		year: 2023,
		name: 'ETL Cloud Migration (Docker → OpenShift)',
		madeAt: 'MBIE',
		tech: ['Airflow', 'DBT', 'OpenShift', 'Azure Pipelines'],
		summary:
			'Migrated 8 production pipelines from Docker-compose to OpenShift with zero ' +
			'downtime; improved observability via Dynatrace and dbt-elementary.'
	},
	{
		id: 'modern-dataops-platform-design',
		year: 2022,
		name: 'Modern DataOps Platform Design',
		madeAt: 'MBIE',
		tech: ['Airflow', 'DBT', 'Dynatrace'],
		summary:
			'Architected a comprehensive platform design covering observability, data catalog, ' +
			'lineage, governance, and strategy — forming the foundation for future data work.'
	},
	// IHC New Zealand
	{
		id: 'aws-ecs-data-platform',
		year: 2022,
		name: 'AWS ECS Data Platform',
		madeAt: 'IHC New Zealand',
		tech: ['AWS CloudFormation', 'Docker', 'Airflow'],
		summary:
			'Stood up a containerised data tooling environment (Retool, N8N, Airflow) on AWS ' +
			'ECS; gave analysts self-service access to data for the first time.'
	},
	{
		id: 'enterprise-etl-pipeline-suite-snowflake',
		year: 2022,
		name: 'Enterprise ETL Pipeline Suite (→ Snowflake)',
		madeAt: 'IHC New Zealand',
		tech: ['Airflow', 'DBT', 'Snowflake', 'Python'],
		summary:
			'Built 9 Snowflake pipelines from 5 source systems; powered 33 Power BI reports ' +
			'used org-wide for workforce and financial analytics.'
	},
	{
		id: 'user-provisioning-automation',
		year: 2021,
		name: 'User Provisioning Automation',
		madeAt: 'IHC New Zealand',
		tech: ['Python', 'Airflow', 'Snowflake', 'Azure AD'],
		summary:
			'Automated ServiceNow/Payglobal → Azure AD user provisioning via Airflow; ' +
			'eliminated manual IT overhead and onboarding errors.'
	},
	// Chorus New Zealand
	{
		id: 'kubernetes-mlops-platform',
		year: 2021,
		name: 'Kubernetes MLOps Platform',
		madeAt: 'Chorus NZ',
		tech: ['Kubernetes', 'Kubeflow', 'AWS EKS'],
		summary:
			`Co-built the organisation's first ML infrastructure on EKS with Kubeflow; ` +
			'made model deployment a repeatable, automated operation.',
		featured: true,
		impact:
			'First production ML infrastructure at the organisation — made model deployment a ' +
			'routine operation rather than a heroic effort.',
		narrative:
			'Co-designed and built a Kubernetes-based MLOps platform at Chorus NZ to close the gap ' +
			'between data science experimentation and production deployment. Enabled model ' +
			'training, versioning, and serving pipelines within a unified, reproducible ' +
			'infrastructure.'
	},
	{
		id: 'oracle-dw-aws-redshift-migration',
		year: 2020,
		name: 'Oracle DW → AWS Redshift Migration',
		madeAt: 'Chorus NZ',
		tech: ['Python', 'PySpark', 'Airflow', 'Redshift'],
		summary:
			'Designed and built a replication system migrating the legacy Oracle DW to AWS ' +
			'Redshift via PySpark; unblocked cloud-native analytics adoption.'
	},
	{
		id: 'financial-data-analytics-system',
		year: 2020,
		name: 'Financial Data Analytics System',
		madeAt: 'Chorus NZ',
		tech: ['Python', 'SAP Hana', 'Tableau'],
		summary:
			'Built an internal financial analytics system integrating SAP Hana data; ' +
			'delivered Tableau dashboards for the finance team.'
	},
	// KPMG
	{
		id: 'azure-national-data-platform',
		year: 2019,
		name: 'Azure National Data Platform',
		madeAt: 'KPMG NZ',
		tech: ['Azure', 'NodeJS', 'SQL'],
		summary:
			'Co-built a high-profile national-scale Azure analytics platform for a government ' +
			'agency; deployed for ongoing operations across the country.'
	},
	{
		id: 'suspicious-transaction-geo-location-analysis',
		year: 2019,
		name: 'Suspicious Transaction & Geo-Location Analysis',
		madeAt: 'KPMG NZ',
		tech: ['Python', 'R', 'SQL'],
		summary:
			'Delivered transaction monitoring and geo-location analysis systems across ' +
			'four government and private sector clients.'
	},
	// VUW / Research
	{
		id: 'cec-2019-conference-website',
		year: 2019,
		name: 'CEC 2019 Conference Website',
		madeAt: 'Victoria University',
		tech: ['Bootstrap', 'HTML', 'CSS', 'JavaScript'],
		summary:
			'Built the IEEE Congress on Evolutionary Computation 2019 website and managed ' +
			'four social media channels for international conference publicity.'
	},
	{
		id: 'ai-2018-conference-website',
		year: 2018,
		name: 'AI 2018 Conference Website',
		madeAt: 'Victoria University',
		tech: ['Bootstrap', 'HTML', 'CSS', 'JavaScript'],
		summary:
			'Developed the full conference website for the 31st Australasian Joint ' +
			'Conference on Artificial Intelligence.'
	},
	{
		id: 'reinforcement-learning-systems-15',
		year: 2018,
		name: 'Reinforcement Learning Systems (15+)',
		madeAt: 'Victoria University',
		tech: ['Python', 'TensorFlow', 'PyTorch', 'Theano'],
		summary:
			'Implemented 15+ novel deep RL systems (100k+ lines) as the core research ' +
			'contribution of a PhD in Machine Learning.'
	},
	{
		id: 'cnn-ensemble-image-classification-system',
		year: 2017,
		name: 'CNN Ensemble Image Classification System',
		madeAt: 'Victoria University',
		tech: ['Python', 'TensorFlow', 'Keras', 'Scikit-Learn'],
		summary:
			'Built a deep learning ensemble for image classification published as a ' +
			'conference paper in evolutionary computation.'
	},
	// Unitec
	{
		id: 'decentralised-network-traffic-monitoring-system',
		year: 2014,
		name: 'Decentralised Network Traffic Monitoring System',
		madeAt: 'Unitec',
		tech: ['Java', 'JADE', 'Unity3D', 'MySQL'],
		summary:
			'Led a team to build a real-time decentralised monitoring system (150k+ lines) ' +
			'still in use at Unitec; contributed to a $10.6M MBIE-funded cyber-security project.'
	},
	{
		id: 'financial-forecast-systems-stock-crude-oil',
		year: 2013,
		name: 'Financial Forecast Systems (Stock & Crude Oil)',
		madeAt: 'Unitec',
		tech: ['MATLAB'],
		summary:
			'Implemented stock market and crude oil price trend prediction systems ' +
			'using neural network approaches in MATLAB.'
	}
];

export function getSortedProjects(): Project[] {
	return [...projects].sort((a, b) => b.year - a.year);
}

export function getFeaturedProjects(limit = 4): Project[] {
	return getSortedProjects()
		.filter(p => p.featured)
		.slice(0, limit);
}

export function hasWriteup(project: Project): project is Project & { writeup: ProjectWriteup } {
	return project.writeup != null;
}
