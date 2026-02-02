import synechronIntroImage from '../../img_assets/Syenchron cube intro.png'
import guardianIntroImage from '../../img_assets/gaurdian.png'
import wanderIntroImage from '../../img_assets/Wander_Screen.png'
import commuteIntroImage from '../../img_assets/i_hate_my_commute/image2.png'
import seesawIntroImage from '../../img_assets/Frame 56.png'

export const projects = [
  {
    id: 'synechron-cube',
    number: '01',
    title: 'Synechron Cube',
    image: synechronIntroImage,
    tags: ['3D Interface', 'Interaction Design', 'Three.js'],
    description:
      'Synechron Cube is a 3D presentation interface designed for both laptops and a 32-panel touch wall. I defined the object metaphor, built and iterated the interaction system in Babylon.js, and tuned animations to keep the experience clear, fast, and engaging on a fragmented display. The final system let teams customize faces for their department, surface content quickly, and keep the cube in an ambient state between demos.',
  },
  {
    id: 'seesaw-redesign',
    number: '02',
    title: 'SeeSaw Redesign',
    image: seesawIntroImage,
    tags: ['UX/UI Design', 'Product Redesign'],
    disabled: true,
    description:
      'A focused UX/UI refresh that rethinks the SeeSaw experience with clearer navigation, calmer visual hierarchy, and faster access to key classroom workflows.',
  },
  {
    id: 'guardian-app',
    number: '03',
    title: 'Guardian App',
    image: guardianIntroImage,
    tags: ['AI for Social Good', 'UX Research', 'Caregiving'],
    description:
      'Guardian App is a BRIDEGOOD AI for Social Good hackathon concept built to support elders and caregivers during scam calls. I led UX research and interaction design, translating anxiety and confusion into calm, step-by-step guidance that works in the moment. The product focuses on privacy-safe verification, clear risk summaries, and the ability for caregivers to intervene in calls with the help of AI.',
  },
  {
    id: 'wander-app',
    number: '04',
    title: 'Wander App',
    image: wanderIntroImage,
    tags: ['AI UX', 'Wellness', 'Urban Walks'],
    description:
      'Wander App was an experimental project created in my AI for UX Design class, where I used only AI tools to design and produce an app. The concept is a walking companion that reminds overworked tech professionals to take short breaks, explore their city, and improve both mindset and overall health through quick, AI-powered micro-journeys.',
  },
  {
    id: 'i-hate-my-commute',
    number: '05',
    title: 'I Hate My Commute',
    image: commuteIntroImage,
    tags: ['Creative Coding', 'React Three Fiber', 'Speculative Design'],
    description:
      'A vibe-coded visualization exploring the global commute experience, built with React Three Fiber and custom shaders. This project reflects on how AI coding tools shape creative outcomes and where human intention must push back against algorithmic biases.',
  },
]
