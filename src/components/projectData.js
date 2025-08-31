// projectData.js
export const projectData = {
  "1700-spot": {
    title: "1700 Spot",
    heroImage: "/videos/hero-1.mp4",
    description: "1700 Spot is an interactive, real-time platform that gamifies community consultation by enabling residents to collaboratively visualize, and shape their neighbourhoods using immersive 3D experiences",
    aboutTitle: 'Russell Heights',
    aboutText: "This groundbreaking project transforms how communities engage with urban planning. By leveraging cutting-edge game engine technology, we've created an immersive platform where residents can walk through proposed developments, provide feedback in real-time, and collaborate on shaping their neighborhood's future. The platform features photorealistic rendering, real-time lighting simulation, and intuitive interaction systems that make complex architectural concepts accessible to everyone.",
    aboutImage: "/img/russell-deployment.png",
    featureTitle: "Interactive Community Engagement",
    featureDescription: '"Deployment day of the 1700SPOT application was one of the most exciting events Third Space Interactive has ever hosted! Seeing the joy on childrens faces as they explored their neighborhood revamp - and the excitement they shared about what to build next - was truly inspiring."',
    // Layout configuration for bento grid
    bentoLayout: "layout3", // or use layoutSeed: 1 for random generation
    bentoItems: [
      {
        src: "/videos/feature-1.mp4",
        title: "Real-time Collaboration",
        description: "Multiple users can explore and modify spaces simultaneously",
        isVideo: true,
        size: "large" // large, medium, small - for layout hints
      },
      {
        src: "/videos/feature-2.mp4", 
        title: "Interactive Elements",
        description: "Click, move, and customize every aspect of the environment",
        isVideo: true,
        size: "medium"
      },
      {
        src: "/img/bento-1.jpg",
        title: "Photorealistic Rendering",
        description: "Experience spaces with stunning visual fidelity",
        isVideo: false,
        size: "small"
      },
      {
        src: "/img/bento-2.jpg",
        title: "Community Feedback",
        description: "Integrated feedback systems for stakeholder input",
        isVideo: false,
        size: "small"
      },
      {
        src: "/videos/feature-3.mp4",
        title: "Community Workshops",
        description: "Host collaborative design sessions in virtual spaces",
        isVideo: true,
        size: "medium"
      },
      {
        src: "/img/bento-3.jpg",
        title: "Data Analytics",
        description: "Track engagement and gather insights from user interactions",
        isVideo: false,
        size: "small"
      }
    ]
  },
  "shoquba": {
    title: "Shoquba",
    heroImage: "/videos/shoquba-1.mp4",
    description: "Shoquba is a real-estate platform allowing users to choose and customize their retail spaces before its built - all within a fully interactive 3D environment.",
    aboutTitle: 'Russell Heights',
    aboutText: "Shoquba revolutionizes retail space planning by putting the power of customization directly into the hands of future tenants. Our platform combines advanced 3D visualization with intuitive design tools, allowing users to experiment with layouts, materials, lighting, and branding elements in real-time. This approach reduces uncertainty, accelerates decision-making, and ensures that retail spaces are perfectly tailored to each business's unique needs before construction begins.",
    aboutImage: "/img/project-about-2.jpg",
    featureTitle: "Customize Before You Build",
    featureDescription: "Design and visualize your perfect retail space with real-time 3D customization tools that bring your vision to life before construction begins.",
    bentoLayout: "layout2",
    bentoItems: [
      {
        src: "/videos/shoquba-feature-1.mp4",
        title: "Space Customization",
        description: "Design your retail space with drag-and-drop simplicity",
        isVideo: true,
        size: "large"
      },
      {
        src: "/videos/shoquba-feature-2.mp4",
        title: "Material Selection",
        description: "Choose from hundreds of materials and finishes",
        isVideo: true,
        size: "medium"
      },
      {
        src: "/img/shoquba-bento-1.jpg",
        title: "Lighting Simulation",
        description: "Preview your space under different lighting conditions",
        isVideo: false,
        size: "small"
      },
      {
        src: "/img/shoquba-bento-2.jpg",
        title: "Business Integration",
        description: "Visualize your brand within the space",
        isVideo: false,
        size: "medium"
      }
    ]
  }
  // Add more projects as needed
};