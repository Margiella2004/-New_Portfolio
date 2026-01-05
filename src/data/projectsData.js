import cubeTexturesImage from '../../img_assets/Cube_textures.png';
import frame56Image from '../../img_assets/Frame 56.png';
import frame56AltImage from '../../img_assets/Frame 56-1.png';
import rubixModelImage from '../../img_assets/RUBIX_MODEL.png';
import synechronCubeHeaderImage from '../../img_assets/Synechron Cube  header.png';
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

export const projectsData = {
  guardianApp: {
    id: 'guardian-app',
    metadata: {
      date: 'Jan-Mar 2025',
      company: 'Guardian',
      category: 'Healthcare'
    },
    title: 'Guardian App',
    heroImage: 'https://images.unsplash.com/photo-1533234944761-2f5337579079?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
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
      'https://images.unsplash.com/photo-1533234944761-2f5337579079?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
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
    heroImage: 'https://images.unsplash.com/photo-1692681157014-2f7ee75c0ea0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Jonathan Ramesh is a Interdisciplinary Designer focusing on UX Design and Engineering. Jonathan combines his coding experince and design education to create products focused on bringing back human centered design',
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
      date: 'May-June 2025',
      company: 'Synechron',
      category: 'Fintech'
    },
    title: 'Synechron Cube',
    heroImage: synechronCubeHeaderImage,
    description: 'Jonathan Ramesh is a Interdisciplinary Designer focusing on UX Design and Engineering. Jonathan combines his coding experince and design education to create products focused on bringing back human centered design',
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
    quote: 'During my second internship, I had to build a flashy but lightweight 3D interface that ran on a 32-panel touch wall and on laptops. The touch wall drove everything-big gestures, fast response, and clarity from across the room-while still holding up in close-up demos. When the first version felt unclear, I stepped back, watched real client walkthroughs, and reworked the object metaphor so it made sense at a glance.',
    quotes: [
      'During my second internship, I had to build a flashy but lightweight 3D interface that ran on a 32-panel touch wall and on laptops. The touch wall drove everything-big gestures, fast response, and clarity from across the room-while still holding up in close-up demos. When the first version felt unclear, I stepped back, watched real client walkthroughs, and reworked the object metaphor so it made sense at a glance.',
      'Once the assets were ready, I moved into interaction design in Babylon. I prototyped motion and interaction ideas in Blender, then rebuilt them in Babylon for real-time testing. We brought colleagues to the touch wall to run through tasks and navigation, captured their feedback, and iterated until the flow felt clear and confident.'
    ],
    contentModules: [
      {
        layout: 'bento-up-left',
        title: 'Why A Cube?',
        description: "During my second internship, the 3D interface had to run on a 32-panel touch wall and laptops, so clarity and speed were everything. A Rubik's Cube clicked: six sides, nine tiles each, a structure that felt playful and familiar to engineering-heavy clients. We built the interface around rotating and tapping faces to pull up content fast.",
        images: [frame56AltImage, cubeSmallImage],
        overlayText: '8 faces'
      },
      {
        layout: 'bento-up-left',
        title: 'Process Sketches',
        description: 'I planned the cube navigation on paper first, sketching camera paths, touch gestures, and face transitions before touching 3D. Early iterations tried faces sliding out like drawers; another used a fixed cube with a moving camera orbit; and a third kept the camera steady while the cube rotated to the active side. I mapped each flow to quick pencil storyboards to test clarity, speed, and how it would read on a 32-panel wall versus a laptop, then refined the route that kept orientation and context intact.',
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
    bentoPairQuote: "This project reshaped how I think about interactive systems. As a designer and engineer, I built the cube experience, tested it on the 32-panel touch wall, and presented the iteration story to leadership with clear user feedback. It earned me a contract extension and a part-time role, and reinforced that clarity and usability must lead every decision.",
    bentoPairImagesSecondary: [cubeDetailImageOne, cubeDetailImageTwo]
  }
};

// Helper function to get other projects (excludes current project)
export const getOtherProjects = (currentProjectId) => {
  return Object.values(projectsData).filter(
    project => project.id !== currentProjectId
  );
};
