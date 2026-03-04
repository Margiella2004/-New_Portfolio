import synechronIntroImage from '../../img_assets/Syenchron cube intro.png'
import guardianIntroImage from '../../img_assets/gaurdian.png'
import commuteIntroImage from '../../img_assets/i_hate_my_commute/image2.png'
import wanderIntroImage from '../../img_assets/Wander_Screen.png'

export const projects = [
  {
    id: 'synechron-cube',
    number: '01',
    title: 'Synechron Cube',
    image: synechronIntroImage,
    tags: ['3D Design', 'Interaction Design'],
    description:
      'A 3D presentation interface designed for laptops and a 32-panel touch wall. Built the interaction system in Babylon.js and tuned animations to keep the experience clear and engaging on a fragmented display.',
  },
  {
    id: 'wander-app',
    number: '02',
    title: 'Wander App',
    image: wanderIntroImage,
    tags: ['UX Design', 'UI Design'],
    description:
      'Wander is an AI-powered walking companion for busy city workers, combining guided prompts and route personalization to make short, restorative micro-journeys easier to start and sustain.',
  },
  {
    id: 'guardian-app',
    number: '03',
    title: 'Guardian App',
    image: guardianIntroImage,
    tags: ['UX Research', 'UI Design'],
    description:
      'A hackathon concept supporting elders and caregivers during scam calls. Led UX research and interaction design, translating anxiety into calm, step-by-step guidance with AI-assisted caregiver intervention.',
  },
  {
    id: 'i-hate-my-commute',
    number: '04',
    title: 'I Hate My Commute',
    image: commuteIntroImage,
    tags: ['Creative Coding', '3D Design'],
    description:
      'A vibe-coded visualization exploring the global commute experience, built with React Three Fiber and custom shaders. This project reflects on how AI coding tools shape creative outcomes and where human intention must push back against algorithmic biases.',
  },
]
