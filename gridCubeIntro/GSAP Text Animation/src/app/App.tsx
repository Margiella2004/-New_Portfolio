import React from 'react'
import GridCubeIntro from './gridcube/GridCubeIntro'
import HeroTextOverlay from './gridcube/HeroTextOverlay'

export default function App() {
  return (
    <div className="w-full h-screen bg-[#fbfbfa] overflow-hidden">
      <GridCubeIntro showLeva>
        <HeroTextOverlay />
      </GridCubeIntro>
    </div>
  )
}
