import cubeTexturesImage from '../../img_assets/Cube_textures.png';
import frame56Image from '../../img_assets/Frame 56.png';
import frame56AltImage from '../../img_assets/Frame 56-1.png';
import rubixModelImage from '../../img_assets/RUBIX_MODEL.png';
import synechronCubeHeaderImage from '../../img_assets/Synechron Cube  header.png';
import synechronCardMainImage from '../../img_assets/Mockup_Cube_Main.png';
import synechronCardSmallImage from '../../img_assets/Mockup_Cube_Small.png';
import guardianCardImage from '../../img_assets/gaurdian.png';
import guardianCardSmallVideo from '../../img_assets/Screen Recording 2026-01-04 at 7.17.25 PM.mov';
import wanderHeroImage from '../../img_assets/Wander_Screen.png';
import wanderCardSmallVideo from '../../img_assets/Screen Recording 2026-01-12 at 11.33.39 PM.mov';
import introMovie from '../../movies_for_portfolio/Intro.gif';
import secondCubeMovie from '../../movies_for_portfolio/secondcube.gif';
import thirdCubeMovie from '../../movies_for_portfolio/thirdcube.gif';
import fourthCubeMovie from '../../movies_for_portfolio/fourthcube.gif';
import synechronDraftImage from '../../img_assets/synechron_draft-1 1.png';
import sketchImage from '../../img_assets/sketch 1.png';
import frame50Image from '../../img_assets/Frame 50.png';
import introGridImage from '../../img_assets/intro.png';
import cubeSmallImage from '../../img_assets/Screenshot 2025-12-17 at 9.40.00 PM 1.png';
import cubeDetailImageOne from '../../img_assets/IMG_4585.png';
import cubeDetailImageTwo from '../../img_assets/IMG_4586.png';
import commuteHeroImage from '../../img_assets/i_hate_my_commute/image2.png';
import commuteCardSmallGif from '../../img_assets/commute_card_small.gif';

export const projectsData = {
  iHateMyCommute: {
    id: 'i-hate-my-commute',
    metadata: {
      date: 'Jan 2026',
      company: 'Personal Project',
      category: 'Speculative Design'
    },
    title: 'I Hate My Commute',
    heroImage: commuteHeroImage,
    cardFeatureImage: commuteCardSmallGif,
    description: 'A vibe-coded visualization exploring the global commute experience, built with React Three Fiber and custom shaders. This project reflects on how AI coding tools shape creative outcomes and where human intention must push back against algorithmic biases.',
    skills: [
      'React Three Fiber',
      'WebGL/Three.js',
      'Shader Programming',
      'Leva',
      'JavaScript'
    ],
    tags: [
      { label: 'Creative Coding', color: '#a8d7c5' },
      { label: 'Speculative Design', color: '#d7c5a8' }
    ]
  },

  guardianApp: {
    id: 'guardian-app',
    metadata: {
      date: 'November 2025 - December 2025',
      company: 'Guardian',
      category: 'Healthcare'
    },
    title: 'Guardian App',
    heroImage: guardianCardImage,
    description: 'Jonathan Ramesh is a Interdisciplinary Designer focusing on UX Design and Engineering. Jonathan combines his coding experince and design education to create products focused on bringing back human centered design',
    skills: [
      'User Research',
      'Interaction Design',
      'UI Design',
      'React Native',
      'Javascript'
    ],
    tags: [
      { label: 'UX Design', color: '#bad7a8' },
      { label: 'UX Research', color: '#aaa8d7' },
      { label: 'Engineering', color: '#d7cca8' }
    ],
    images: [
      guardianCardSmallVideo,
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
    ]
  },

  wanderApp: {
    id: 'wander-app',
    metadata: {
      date: 'Apr-May 2025',
      company: 'Wander',
      category: 'Travel'
    },
    title: 'Wander App',
    heroImage: wanderHeroImage,
    featureImage: wanderHeroImage,
    cardFeatureImage: wanderCardSmallVideo,
    description: '',
    skills: [
      'User Research',
      'Interaction Design',
      'UI Design',
      'Prototyping',
      'React'
    ],
    tags: [
      { label: 'UX Design', color: '#bad7a8' },
      { label: 'UX Research', color: '#aaa8d7' }
    ],
    images: [
      'https://images.unsplash.com/photo-1692681157014-2f7ee75c0ea0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
    ]
  },

  synechronCube: {
    id: 'synechron-cube',
    metadata: {
      date: '2024',
      company: 'Synechron',
      category: 'Fintech'
    },
    title: 'Synechron Cube',
    heroImage: synechronCubeHeaderImage,
    cardImage: synechronCardMainImage,
    cardFeatureImage: synechronCardSmallImage,
    description: 'Synechron Cube is a 3D presentation interface designed for both laptops and a 32-panel touch wall. I defined the object metaphor, built and iterated the interaction system in Babylon.js, and tuned animations to keep the experience clear, fast, and engaging on a fragmented display. The final system let teams customize faces for their department, surface content quickly, and keep the cube in an ambient state between demos.',
    skills: [
      'Babylon.js',
      'Interaction Design',
      'UI Design',
      '3d Engineering',
      'Javascript'
    ],
    tags: [
      { label: '3D Engineering', color: '#d7a8a8' },
      { label: 'Interaction Design', color: '#d7a8cc' }
    ],
    images: [
      'https://images.unsplash.com/photo-1626705343685-eb1e06c9271f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
    ],

    // Custom fields for Synechron Cube page
    numberGridImage: introGridImage,
    quote: 'In my second internship, I reached a point where the pressure really set in. My job was to design and develop a 3D interface that would allow our clients to discover our products and services in an intuitive way. The challenge was that it needed to work both on a laptop and on a 32-panel touch screen. This was especially difficult because the panels were older, meaning the display wasn’t one continuous flat surface. It was through this project that I grew the most in my problem-solving skills.',
    quotes: [
      'In my second internship, I reached a point where the pressure really set in. My job was to design and develop a 3D interface that would allow our clients to discover our products and services in an intuitive way. The challenge was that it needed to work both on a laptop and on a 32-panel touch screen. This was especially difficult because the panels were older, meaning the display wasn’t one continuous flat surface. It was through this project that I grew the most in my problem-solving skills.',
      'Without the assets ready, we moved into the prototyping phase. This became the ultimate challenge and really helped hone my coding skills. Since iterating in 3D is much harder than iterating in Figma, I had to create different sets of animations on the fly. It was slow at first, but I gained momentum and was able to iterate faster and faster.\n\nWe would occasionally pull in colleagues when we saw them on break and ask them to test the cube. That helped us not only debug the experience, but also improve the code. Over time, we refined the interface into something that captured the innovative and sleek nature of the company. We brought the cube to life through animation, making it feel energetic and engaging.\n\nYou could see this most clearly in the intro animation, which mimicked someone tossing down a Rubik’s Cube and having it slingshot back to the center. Like an impactful opening sentence in an essay, it created excitement for the presentation right out of the gate.'
    ],
    contentModules: [
      {
        layout: 'bento-up-left',
        title: 'Why A Cube?',
        description: "The project was to create a realistic object that would become the interface itself, something like a city block or a stack of credit cards. It also had to make sense to our Fortune 500 executive clients. I took a step back and started watching presentations up close, tracking what clients reacted to and what felt familiar across different rooms.\n\nDuring one brainstorming session, we talked about how a Rubik's Cube could work well because of its multidimensionality, and it clicked immediately. A cube has six sides with nine squares per side, which gives you six groups of information and 54 individual faces in total. When I pitched the idea, my boss loved it, not just for the structure, but for what it signaled. Many of our clients came from engineering backgrounds, and the cube reads as playful intelligence and nostalgia.\n\nThis was also a challenge for me because I was the only person with a 3D background, and I had to learn Babylon.js along the way. Through the process, I built up knowledge not only in 3D techniques, but also in JavaScript to bring the product to life.",
        images: [frame56AltImage, cubeSmallImage],
        overlayText: '8 faces'
      },
      {
        layout: 'bento-up-left',
        title: 'Process Sketches',
        description: "Before I landed on the cube, I had sketched out multiple interface ideas. At the time, I was tasked with creating a general interface, which made it a very open-ended problem. My manager and I first tried a city layout that turned the interface into a city modeled after the company’s core products. While that concept eventually became a product after the cube, we were still looking for something quicker and simpler to iterate on, an MVP we could build fast and show to upper management.\n\nDuring a conversation with my boss, I noticed a cube on his desk. That sparked the idea, and I proposed a cube-based interface because of how customizable each face could be. With 54 faces, it could also house different presentation videos, YouTube clips, and other marketing materials. With his approval, we pushed forward into prototyping.",
        images: [
          synechronDraftImage,
          sketchImage
        ]
      },
      {
        title: 'Model/Texture',
        description: 'The 8 faces allowed for 8 diffrent topics to use when presenting wether that be new tools or 8 diffrent marketing slides',
        layout: 'bento-up-right',
        images: [
          rubixModelImage,
          cubeTexturesImage
        ]
      }
    ],

    // Added sections (keep before Other Projects)
    featureBlock: {
      bigImage: introMovie,
      bentoLeft: {
        layout: 'bento-up-left',
        title: 'Navigation Flow',
        description: 'Navigation centers on rotating the cube and guiding the camera with a soft bounce and brief zoom to confirm focus. We tested whether the camera should orbit or the cube should turn and chose the approach that kept users oriented with the fewest gestures. Lighting shifts to illuminate the active face while keeping adjacent sides visible, so users always understand context and can move confidently to the next side.',
        images: [secondCubeMovie]
      }
    },
    bentoPairImages: [thirdCubeMovie, fourthCubeMovie],
    bentoPairQuote: "There were other behaviors we had to think about as well. Since the cube also acted as decoration, it needed an inactive state where it would slowly rotate on screen and feel ambient.\n\nOn the backend, we developed an application that allowed different employees to customize the cube for their department. Using a provided template, they could create custom graphics and apply them to the cube so it felt like “their” department’s version. They could also customize where the home button was placed.\n\nAnother configurable feature was the “timeout to home” setting. This handled cases where the cube stayed in a clicked (active) state for too long—if someone forgot to exit, it would automatically return to its default, rotating “decoration” state. Presenters could adjust this timeout based on how long each section of the pitch would take.\n\nOne of the biggest benefits of the cube was that clients could walk up and interact with it, rather than just sitting on the couch and listening. It created a more physical, engaging interpretation of the pitches themselves.",
    bentoPairQuoteSecondary: "That project changed how I think about interfaces, and it earned me a contract extension and a part-time role while I finished college. It absolutely blew my mind and reshaped the way I see what interfaces can be. It helped me develop 3D and spatial thinking that let me break away from traditional 2D UI and push forward into something new, experimental, and more immersive.",
   bentoPairImagesSecondary: [cubeDetailImageOne, cubeDetailImageTwo]
  },

  seesawRedesign: {
    id: 'seesaw-redesign',
    metadata: {
      date: 'April 2024 - May 2024',
      company: 'Personal',
      category: 'Product Redesign'
    },
    title: 'SeeSaw Redesign',
    heroImage: frame56Image,
    description: 'A focused UX/UI refresh that rethinks the SeeSaw experience with clearer navigation, calmer visual hierarchy, and faster access to key classroom workflows.',
    skills: [
      'UX/UI Design',
      'Interaction Design',
      'Prototyping'
    ],
    tags: [
      { label: 'UX/UI Design', color: '#bad7a8' },
      { label: 'Product Redesign', color: '#d7cca8' }
    ]
  }
};

// Helper function to get other projects (excludes current project)
export const getOtherProjects = (currentProjectId) => {
  return Object.values(projectsData).filter(
    project => project.id !== currentProjectId
  );
};
