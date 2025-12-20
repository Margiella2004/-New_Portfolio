import cubeTexturesImage from '../../img_assets/Cube_textures.png';
import frame56Image from '../../img_assets/Frame 56.png';
import frame56AltImage from '../../img_assets/Frame 56-1.png';
import rubixModelImage from '../../img_assets/RUBIX_MODEL.png';
import synechronCubeHeaderImage from '../../img_assets/Synechron Cube  header.png';
import introMovie from '../../movies_for_portfolio/Intro.mov';
import secondCubeMovie from '../../movies_for_portfolio/secondcube.mov';
import thirdCubeMovie from '../../movies_for_portfolio/thirdcube.mov';
import fourthCubeMovie from '../../movies_for_portfolio/fourthcube.mov';

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
    numberGridImage: '/Frame 58.png',
    quote: 'Jonathan Ramesh is a Interdisciplinary Designer focusing on UX Design and Engineering. Jonathan combines his coding experince and design education to create products focused on bringing back human centered design',
    contentModules: [
      {
        layout: 'bento-up-left',
        title: 'Why A Cube?',
        description: 'The 8 faces allowed for 8 diffrent topics to use when presenting wether that be new tools or 8 diffrent marketing slides',
        images: [frame56Image],
        overlayText: '8 faces'
      },
      {
        layout: 'bento-up-left',
        title: 'Process Sketches',
        description: 'The 8 faces allowed for 8 diffrent topics to use when presenting wether that be new tools or 8 diffrent marketing slides',
        images: [
          'https://images.unsplash.com/photo-1612171742307-341fb036ba03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwc2tldGNoJTIwd2lyZWZyYW1lJTIwd2hpdGV8ZW58MXx8fHwxNzY1OTQzNjEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
          'https://images.unsplash.com/photo-1756051277721-c65cb58fb207?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHdpcmVmcmFtZSUyMG1lc2glMjBkYXJrJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NjU5NDM2MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
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
        title: 'Prototype Flow',
        description: 'The 8 faces allowed for 8 diffrent topics to use when presenting wether that be new tools or 8 diffrent marketing slides',
        images: [secondCubeMovie]
      }
    },
    bentoPairImages: [thirdCubeMovie, fourthCubeMovie]
  }
};

// Helper function to get other projects (excludes current project)
export const getOtherProjects = (currentProjectId) => {
  return Object.values(projectsData).filter(
    project => project.id !== currentProjectId
  );
};
