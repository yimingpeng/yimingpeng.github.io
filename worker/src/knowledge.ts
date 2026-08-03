import { getFeaturedProjects, getSortedProjects } from '../../src/data/projects';

export const sourceLabels = ['portfolio', 'publications', 'community', 'cv-summary'] as const;

const featuredProjectsSection = getFeaturedProjects()
	.map(p => `- ${p.name} (${p.madeAt}): ${p.tech.join(', ')}. ${p.narrative ?? p.summary}`)
	.join('\n');

const archivedProjectNames = getSortedProjects()
	.filter(p => !p.featured)
	.map(p => p.name)
	.join(', ');

export const portfolioKnowledge = `
PROFILE
- Name: Yiming Peng.
- Pronunciation hint on site: /i' ming/.
- Public positioning: Senior Data Engineer; PhD in Reinforcement Learning.
- Current role: Senior Software Engineer - Data at Weta FX, Oct 2023 to present.
- Core summary: designs data systems and fixes unreliable data pipelines.
- Experience: 10+ years building DataOps and MLOps platforms across New Zealand and global
  production environments.
- Open source: contributor to Apache Airflow with production-informed fixes and improvements.
- Community: volunteers in the tech community through meetups, talks, panels, and
  experience-sharing events.
- Contact links: email yimingpengjojo@gmail.com, GitHub https://github.com/yimingpeng,
  LinkedIn https://www.linkedin.com/in/yiming-nz/, Google Scholar
  https://scholar.google.co.uk/citations?user=bJBbv0EAAAAJ, Medium
  https://medium.com/@yimingpeng.

EXPERIENCE
- Weta FX: Senior Software Engineer - Data, Oct 2023 to present.
- MBIE via Emergence CLI: Data Architect, Jul 2022 to Jul 2023.
- IHC New Zealand: Principal Data & Integration Architect, Jul 2021 to Jul 2022.
- Chorus New Zealand: Senior Data Engineer, Dec 2019 to Jun 2021.
- KPMG New Zealand: Data Engineer, Mar 2019 to Nov 2019.
- Victoria University of Wellington: Research Scientist & Research Assistant,
  Sep 2015 to Mar 2019.
- Unitec: Research & Teaching Assistant, Jun 2012 to Jun 2015.

FEATURED PROJECTS
${featuredProjectsSection}
- Other archived work includes: ${archivedProjectNames}.

PUBLICATIONS
- Total citations shown on the site: 165.
- Latest journal paper: "Proximal evolutionary strategy: improving deep reinforcement learning
  through evolutionary policy optimization", Memetic Computing, 2024.
- PhD thesis: "Policy direct search for effective reinforcement learning", Victoria University of
  Wellington, 2019.
- Research themes: reinforcement learning, evolutionary policy optimization, policy gradient
  search, NEAT-based feature extraction, actor-critic methods, neural networks, cybersecurity, and
  financial forecasting.
- Selected venues: Memetic Computing, IJCNN, GECCO, SEAL, ICONIP, AJCAI.

COMMUNITY
- May 2026: "From Study/Research to Industry" panel at Victoria University of Wellington.
- Organization: IEEE Young Professionals, NZ Central Section.
- Topic: transitioning from study and research into industry careers, workplace expectations, and
  practical skills for academia-to-industry movement.

CERTIFICATIONS
- CKS - Certified Kubernetes Security Specialist, Linux Foundation, Jun 2026.
- CKA - Certified Kubernetes Administrator, Linux Foundation, Oct 2025.
- CKAD - Certified Kubernetes Application Developer, Linux Foundation, 2025.
- Tableau Server Admin.
- Astronomer certifications for Apache Airflow 2 fundamentals and DAG authoring.
- KCNA is listed as in progress with target Aug 2026.

CV SUMMARY
- The downloadable CV is available at /yiming_cv.pdf.
- The site describes Yiming as a senior data engineer with a PhD in reinforcement learning,
  strong data platform, MLOps, Kubernetes, Airflow, Python, SQL, cloud, and observability
  experience.
`;
