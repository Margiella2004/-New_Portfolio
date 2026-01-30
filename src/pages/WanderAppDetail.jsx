import { useEffect } from 'react';
import ProjectDetailHeader from '../components/ProjectDetailHeader';
import ContentModule from '../components/ContentModule';
import OtherProjects from '../components/OtherProjects';
import Footer from '../Footer';
import { footerData } from '../footerData';
import { projectsData } from '../data/projectsData';
import heroImage from '../../img_assets/Wander_Screen.png';
import problemStatementImage from '../../img_assets/wander_app/ProblemStatement.png';
import affinityMapImage from '../../img_assets/wander_app/AffinityMap.png';
import affinityInsightsImage from '../../img_assets/wander_app/AffinityMap-1.png';
import affinityGapImage from '../../img_assets/wander_app/AffinityMap-2.png';
import affinityEndScreenImage from '../../img_assets/wander_app/AffinityMap-3.png';
import affinityVisualImage from '../../img_assets/wander_app/AffinityMap-4.png';
import affinityQuestionsImage from '../../img_assets/wander_app/AffinityMap-6.png';
import uxPilotImage from '../../img_assets/ux pilot.png';
import claudeMcpImage from '../../img_assets/Claude_MCP.png';
import finalSetScreensImage from '../../img_assets/Final_set_screens.png';
import wanderMotionPrimary from '../../img_assets/Screen Recording 2026-01-12 at 11.33.39 PM.mov';
import wanderMotionSecondary from '../../img_assets/Screen Recording 2026-01-12 at 11.34.07 PM.mov';
import heuristicAnalysisImage from '../../img_assets/Heursitic_analysis.png';
import protoPersonaImage from '../../img_assets/Proto Persona.png';
import surveyImage from '../../img_assets/Survey.png';
import mazeHeatMapImage from '../../img_assets/Maze Heat Map.png';
import capturedUserflowImage from '../../img_assets/Captured Userflow.png';
import prototypeStripImage from '../../img_assets/wander_app/wander_prototypet.png';
import usabilityAffinityImage from '../../img_assets/wander_app/UsabilityAffinityMap.png';
import usabilityAnalysisImage from '../../img_assets/wander_app/UsabilityAnalysis.png';
import strategicInsightImage from '../../img_assets/wander_app/Container.png';
import './WanderAppDetail.css';

export default function WanderAppDetail() {
  const project = {
    metadata: {
      date: 'June - July 2025',
      company: 'Wander',
      category: 'Travel'
    },
    title: 'Wander App',
    description:
      'Wander App was an experimental project created in my AI for UX Design class, where I used only AI tools to design and produce an app. The concept is a walking companion that reminds overworked tech professionals to take short breaks, explore their city, and improve both mindset and overall health through quick, AI-powered micro-journeys.',
    skills: ['UX Research', 'UI Design', 'Prototyping', 'Design Systems', 'React']
  };
  const quote =
    'The audit phase left me genuinely excited, and it pushed me into research with a clearer focus. I wanted to sharpen the problem statement and find credible data to support my thesis: as the tech industry continues to grow, burnout is becoming more common—and sedentary work has started to feel like the norm. Over time, that combination can contribute to a range of health issues that may not show up while you’re in the middle of your career, but often surface as you age.';
  const quoteSecondary =
    'Personas helped us check bias early, prioritize the right features, and keep the flow rooted in real travel routines.';
  const quoteTertiary =
    'After synthesizing the research, I created a user flow to define the core journey and key decision points. To stay aligned with the class theme of using AI throughout the process, I chose to skip traditional low-fidelity wireframes and instead moved directly into AI-assisted ideation and layout. I fed my user flow into a combination of tools—some were limited, but a few showed real potential and helped accelerate early design exploration';
  const quoteFinal =
    'Looking back, my early attempts to use AI as a substitute for more “traditional” UX techniques felt unpolished—but they were necessary. They helped me quickly identify which AI tools were genuinely useful versus which ones felt gimmicky, slowed me down, or produced lower-quality outputs. From there, I leaned into ChatGPT’s ability to simulate expertise. I fed in my Maze testing data and asked it to respond in the voice of an experienced UX designer, critiquing my screens and suggesting improvements based on the findings. I then implemented those changes in Figma and reviewed the designs live in both Figma Make and Claude. This workflow made it easier to explore different visual directions—like color and layout—iterate quickly, and ultimately build an animated final prototype to present at the end of the class.';
  const finalStackedTitle = '';
  const finalStackedDescription = '';
  const finalRightTitle = '';
  const finalRightDescription = '';
  const finalLeftTitle = '';
  const finalLeftDescription = '';
  const heuristicRightTitle = '';
  const heuristicRightDescription = '';
  const affinityRightTitle = 'AI Wireframes';
  const affinityRightDescription =
    'Using UX Pilot, I was able to generate wireframes quickly based on my UX research. I first used ChatGPT to help craft a clearer, more structured prompt that translated my user flow into descriptive text. Then I provided that prompt to UX Pilot to generate the wireframes. One limitation, however, was that these AI services had strict credit limits—so I ultimately recreated and refined the screens manually in Figma.';
  const affinityLeftTitle = 'Claude MCP Workflow';
  const affinityLeftDescription =
    'During this process, I discovered the Claude MCP server. At the time, it was still very new, and it gave me a way to bring my Figma prototypes into code. This essentially supercharged my workflow—I could iterate on UI changes much faster and preview the screens in a more “live” environment with motion and interaction, instead of relying only on static frames. It saved a significant amount of time, since building the same level of prototyping and animation manually in Figma would have taken far longer.';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ProjectDetailHeader />
      <main className="wander-app-page">
        <div className="wander-app-container">
          <header className="wander-app-header">
            <div className="wander-app-title-section">
              <div className="wander-app-metadata">
                <span className="wander-app-metadata-item">
                  {project.metadata.date}
                </span>
                <span className="wander-app-metadata-item wander-app-metadata-secondary">
                  {project.metadata.company}
                </span>
                <span className="wander-app-metadata-item wander-app-metadata-secondary">
                  {project.metadata.category}
                </span>
              </div>
              <h1 className="wander-app-title">{project.title}</h1>
            </div>
            <div className="wander-app-hero-image-container">
              <img
                src={heroImage}
                alt={project.title}
                className="wander-app-hero-image"
              />
            </div>
          </header>

          <section className="wander-app-bio-skills">
            <div className="wander-app-description">
              <p className="wander-app-description-text">
                {project.description}
              </p>
            </div>
            <div className="wander-app-skills">
              {project.skills.map((skill, index) => (
                <span key={index} className="wander-app-skill">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="wander-app-quote">
            <p className="wander-app-quote-text">The idea was inspired by a coworker at Synechron who would step out for a walk whenever he had a break. I kept running into him at the exact moments we were both entering or leaving the building. It made me think more deeply about the purpose of walking—especially in a city—and how the experience could be elevated beyond simple relaxation. In a complex but beautiful place like New York City, I started to imagine walks that not only help you reset, but also feel intentional and meaningful.</p>
          </section>

          <section className="wander-app-bento-section">
            <ContentModule
              layout="bento-up-right"
              title={heuristicRightTitle}
              description={heuristicRightDescription}
              images={[heuristicAnalysisImage]}
              hideTopImage={true}
              hideText={false}
              bentoTextAlign="left"
              className="wander-app-content-module wander-app-content-module-right"
              style={{
                '--content-module-bento-gap': '24px',
                '--content-module-bento-gap-desktop': '40px',
                '--content-module-bento-text-width': '30%',
                '--content-module-bento-media-width': '70%',
                '--content-module-image-height-bento': '560px',
                '--content-module-border-radius-mobile': '20px',
                '--content-module-border-radius-desktop': '34px'
              }}
            />
          </section>

          <section className="wander-app-quote">
            <p className="wander-app-quote-text">Through ChatGPT, I discovered how quickly I could run a competitor analysis. That process helped me identify several apps exploring similar ideas, and it also led to an assignment to complete a UX audit in the same space. To develop an AI chat interface for Wander, I studied existing products more closely. Even though I’d used ChatGPT since it was first released to the public, this audit showed me I understood far less about effective conversational UX than I assumed. I quickly saw how essential transparency and clear system feedback are for building user trust and confidence. I also noticed how much prompt chips accelerate onboarding—especially for beginners—by giving them an easy way to get started and “test the waters” with a new technology. My biggest takeaway was that the interface should actively guide users toward better prompts so they can get better outputs. By mapping a complex, end-to-end user flow for Mindtrip, I was able to translate my critiques and learnings into actionable design decisions that shaped my next steps.</p>
          </section>

          <section className="wander-app-bento-section">
            <ContentModule
              layout="bento-up-right"
              title=""
              description=""
              images={[capturedUserflowImage]}
              hideTopImage={true}
              hideText={true}
              className="wander-app-content-module"
              style={{
                '--content-module-bento-gap': '24px',
                '--content-module-bento-gap-desktop': '40px',
                '--content-module-bento-text-width': '30%',
                '--content-module-bento-media-width': '70%',
                '--content-module-image-height-bento': '560px',
                '--content-module-border-radius-mobile': '20px',
                '--content-module-border-radius-desktop': '34px'
              }}
            />
          </section>

          <section className="wander-app-quote">
            <p className="wander-app-quote-text">{quote}</p>
          </section>

          <section className="wander-app-bento-section">
            <ContentModule
              layout="stacked"
              title="Problem Statement"
              description=""
              images={[problemStatementImage]}
              hideText={true}
              className="wander-app-content-module"
              style={{
                '--content-module-border-radius-mobile': '20px',
                '--content-module-border-radius-desktop': '34px',
                '--content-module-image-height-large': '720px'
              }}
            />
          </section>

          <section className="wander-app-bento-section">
            <ContentModule
              layout="bento-up-right"
              title="Proto Personas"
              description="While I was waiting for responses to my user interview outreach, I leveraged AI’s ability to simulate patterns based on research. After inputting my findings, I generated several proto-personas to explore likely behaviors, motivations, and pain points. I took it a step further by “interviewing” these LLM-powered personas, which helped me pressure-test assumptions, refine my interview guide, and uncover new pain points I hadn’t considered. This practice run improved the quality of my questions and helped me go into live interviews with more confidence—and a calmer mindset. That said, while the simulated interviews were valuable, nothing replaced real user insights and personal stories."
              images={[protoPersonaImage]}
              hideTopImage={true}
              bentoTextAlign="left"
              className="wander-app-content-module wander-app-content-module-right"
              style={{
                '--content-module-bento-gap': '24px',
                '--content-module-bento-gap-desktop': '40px',
                '--content-module-bento-text-width': '30%',
                '--content-module-bento-media-width': '70%',
                '--content-module-image-height-bento': '560px',
                '--content-module-border-radius-mobile': '20px',
                '--content-module-border-radius-desktop': '34px'
              }}
            />
          </section>

          <section className="wander-app-bento-section">
            <ContentModule
              layout="bento-up-right"
              title="Survey Iteration"
              description="Using these personas also helped me refine my survey questions. Because I could iterate quickly, I was able to test and improve question wording in real time, then translate the final set into JSON and paste it directly into Typeform. This created a fast pipeline that supported a more iterative research process. I also created multiple versions of the survey tailored to different proto-personas, which helped me ask more targeted questions and capture more relevant insights."
              images={[surveyImage]}
              hideTopImage={true}
              hideText={false}
              className="wander-app-content-module"
              style={{
                '--content-module-bento-gap': '24px',
                '--content-module-bento-gap-desktop': '40px',
                '--content-module-bento-text-width': '30%',
                '--content-module-bento-media-width': '70%',
                '--content-module-image-height-bento': '560px',
                '--content-module-border-radius-mobile': '20px',
                '--content-module-border-radius-desktop': '34px'
              }}
            />
          </section>

          <section className="wander-app-quote">
            <p className="wander-app-quote-text">This AI-powered workflow helped me iterate on my interview questions and ultimately conduct stronger research. Using my proto-personas as a guide, I interviewed six participants who closely matched those profiles. After the interviews, I consolidated my notes and uploaded the data into ChatGPT. Working collaboratively with the AI, I created an affinity map that I could quickly sort, refine, and restructure—making it easier to identify themes and turn my conversations into clearer, more actionable insights.</p>
          </section>

          <section className="wander-app-bento-section">
            <ContentModule
              layout="stacked"
              title="Affinity Mapping"
              description=""
              images={[affinityMapImage]}
              hideText={true}
              className="wander-app-content-module"
              style={{
                '--content-module-border-radius-mobile': '20px',
                '--content-module-border-radius-desktop': '34px',
                '--content-module-image-height-large': '720px'
              }}
            />
          </section>

          <section className="wander-app-bento-section">
            <ContentModule
              layout="grid-2"
              title="Research Highlights"
              description=""
              images={[affinityInsightsImage, affinityQuestionsImage]}
              hideText={true}
              className="wander-app-content-module"
              style={{
                '--content-module-border-radius-grid-mobile': '16px',
                '--content-module-border-radius-grid-desktop': '28px'
              }}
            />
          </section>

          <section className="wander-app-quote">
            <p className="wander-app-quote-text">{quoteTertiary}</p>
          </section>

          <section className="wander-app-bento-section">
            <ContentModule
              layout="bento-up-right"
              title={affinityRightTitle}
              description={affinityRightDescription}
              images={[uxPilotImage]}
              hideTopImage={true}
              hideText={false}
              bentoTextAlign="left"
              className="wander-app-content-module wander-app-content-module-right"
              style={{
                '--content-module-bento-gap': '24px',
                '--content-module-bento-gap-desktop': '40px',
                '--content-module-bento-text-width': '30%',
                '--content-module-bento-media-width': '70%',
                '--content-module-image-height-bento': '560px',
                '--content-module-border-radius-mobile': '20px',
                '--content-module-border-radius-desktop': '34px'
              }}
            />
          </section>

          <section className="wander-app-bento-section">
            <ContentModule
              layout="bento-up-right"
              title={affinityLeftTitle}
              description={affinityLeftDescription}
              images={[claudeMcpImage]}
              hideTopImage={true}
              hideText={false}
              className="wander-app-content-module"
              style={{
                '--content-module-bento-gap': '24px',
                '--content-module-bento-gap-desktop': '40px',
                '--content-module-bento-text-width': '30%',
                '--content-module-bento-media-width': '70%',
                '--content-module-image-height-bento': '560px',
                '--content-module-border-radius-mobile': '20px',
                '--content-module-border-radius-desktop': '34px'
              }}
            />
          </section>

          <section className="wander-app-quote">
            <p className="wander-app-quote-text">Through this iterative process, I landed on an interface that clearly communicated the goal of the product while offering a more unique take on a chat-based experience. Instead of relying solely on freeform typing, I incorporated prompt chips and structured prompt components to make the interaction feel more guided and engaging. These elements helped reduce friction, supported users step-by-step, and made it as easy as possible to create a “journey.”</p>
          </section>

          <section className="wander-app-bento-section">
            <ContentModule
              layout="stacked"
              title="Prototype Screens"
              description=""
              images={[prototypeStripImage]}
              hideText={true}
              className="wander-app-content-module"
              style={{
                '--content-module-border-radius-mobile': '20px',
                '--content-module-border-radius-desktop': '34px',
                '--content-module-image-height-large': '560px'
              }}
            />
          </section>

          <section className="wander-app-bento-section">
            <ContentModule
              layout="bento-up-right"
              title="Maze Testing"
              description="I was surprised by how clearly the test inputs surfaced issues, which made me realize my own questions and microcopy needed refinement. The heatmaps were especially valuable—they helped me pinpoint where users hesitated, where errors occurred, and exactly where misclicks happened across the screens. The highest concentration of misclicks appeared on the final screen. At first, I couldn’t understand why the time section was getting the most clicks, because I believed the information was correct. I later realized the confusion came from my own input: I typed “15 minutes” instead of updating the time selection from 20 to 15. That small mismatch likely triggered the misunderstanding and could have been avoided with clearer UI logic and validation. If I were to run this again, I’d start with a single test session, refine the questions and copy based on what I learned, then run a second round to verify the improvements."
              images={[mazeHeatMapImage]}
              hideTopImage={true}
              hideText={false}
              bentoTextAlign="left"
              className="wander-app-content-module wander-app-content-module-right"
              style={{
                '--content-module-bento-gap': '24px',
                '--content-module-bento-gap-desktop': '40px',
                '--content-module-bento-text-width': '30%',
                '--content-module-bento-media-width': '70%',
                '--content-module-image-height-bento': '560px',
                '--content-module-border-radius-mobile': '20px',
                '--content-module-border-radius-desktop': '34px'
              }}
            />
          </section>

          <section className="wander-app-bento-section">
            <ContentModule
              layout="stacked"
              title="Usability Testing"
              description=""
              images={[usabilityAffinityImage]}
              hideText={true}
              className="wander-app-content-module"
              style={{
                '--content-module-border-radius-mobile': '20px',
                '--content-module-border-radius-desktop': '34px',
                '--content-module-image-height-large': '720px'
              }}
            />
          </section>

          <section className="wander-app-bento-section">
            <ContentModule
              layout="stacked"
              title="Analysis & Fixes"
              description=""
              images={[usabilityAnalysisImage]}
              hideText={true}
              className="wander-app-content-module"
              style={{
                '--content-module-border-radius-mobile': '20px',
                '--content-module-border-radius-desktop': '34px',
                '--content-module-image-height-large': '560px'
              }}
            />
          </section>

          <section className="wander-app-bento-section">
            <ContentModule
              layout="grid-2"
              title="Usability Pain Points"
              description=""
              images={[affinityEndScreenImage, affinityVisualImage]}
              hideText={true}
              className="wander-app-content-module"
              style={{
                '--content-module-border-radius-grid-mobile': '16px',
                '--content-module-border-radius-grid-desktop': '28px'
              }}
            />
          </section>

          <section className="wander-app-bento-section">
            <ContentModule
              layout="stacked"
              title="Strategic Insight"
              description=""
              images={[strategicInsightImage]}
              hideText={true}
              className="wander-app-content-module"
              style={{
                '--content-module-border-radius-mobile': '20px',
                '--content-module-border-radius-desktop': '34px',
                '--content-module-image-height-large': '560px'
              }}
            />
          </section>

          <section className="wander-app-quote">
            <p className="wander-app-quote-text">{quoteFinal}</p>
          </section>

          <section className="wander-app-bento-section">
            <ContentModule
              layout="stacked"
              title={finalStackedTitle}
              description={finalStackedDescription}
              images={[finalSetScreensImage]}
              hideText={true}
              className="wander-app-content-module"
              style={{
                '--content-module-border-radius-mobile': '20px',
                '--content-module-border-radius-desktop': '34px',
                '--content-module-image-height-large': '720px'
              }}
            />
          </section>

          <section className="wander-app-bento-section">
            <ContentModule
              layout="bento-up-right"
              title={finalRightTitle}
              description={finalRightDescription}
              images={[wanderMotionPrimary]}
              hideTopImage={true}
              hideText={false}
              bentoTextAlign="left"
              className="wander-app-content-module wander-app-content-module-right"
              style={{
                '--content-module-bento-gap': '24px',
                '--content-module-bento-gap-desktop': '40px',
                '--content-module-bento-text-width': '30%',
                '--content-module-bento-media-width': '70%',
                '--content-module-image-height-bento': '560px',
                '--content-module-border-radius-mobile': '20px',
                '--content-module-border-radius-desktop': '34px'
              }}
            />
          </section>

          <section className="wander-app-bento-section">
            <ContentModule
              layout="bento-up-right"
              title={finalLeftTitle}
              description={finalLeftDescription}
              images={[wanderMotionSecondary]}
              hideTopImage={true}
              hideText={false}
              className="wander-app-content-module"
              style={{
                '--content-module-bento-gap': '24px',
                '--content-module-bento-gap-desktop': '40px',
                '--content-module-bento-text-width': '30%',
                '--content-module-bento-media-width': '70%',
                '--content-module-image-height-bento': '560px',
                '--content-module-border-radius-mobile': '20px',
                '--content-module-border-radius-desktop': '34px'
              }}
            />
          </section>

          <section className="wander-app-quote">
            <p className="wander-app-quote-text">Wandering should be accessible to everyone, and a core goal of Wander is to support people with disabilities in navigating the city safely and confidently. During onboarding, the app uses profile preferences—only with explicit consent—to tailor routes based on accessibility needs. This includes prioritizing step-free paths, ramps, smoother surfaces, and adequate walking space, while filtering out routes that rely on dangerous, poorly maintained, or inaccessible sidewalks and roads. Users can control what data they share in their profile, including an accessibility toggle that’s clearly surfaced during onboarding. In addition to navigation support, Wander includes gentle reminders for hydration and meals, acknowledging the physical strain of walking in a dense city—and the reality of rising food and beverage prices.</p>
          </section>
        </div>
        <section className="wander-app-other-projects-stage">
          <OtherProjects project={projectsData.synechronCube} />
        </section>
        <div className="footer-layer wander-app-footer-layer">
          <Footer data={footerData} />
        </div>
      </main>
    </>
  );
}
