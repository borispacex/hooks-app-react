import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import {HooksApp} from "./HooksApp.tsx";

import './index.css'
// import {PokemonPage} from "./03-examples/PokemonPage.tsx";
import {FocusScreen} from "./04-useRef/FocusScreen.tsx";
// import {TrafficLightWithEffect} from "./02-useEffect/TrafficLightWithEffect.tsx";
// import {TrafficLightWithHook} from "./02-useEffect/TrafficLightWithHook.tsx";
// import {TrafficLight} from "./01-useState/TrafficLight.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/*<HooksApp />*/}
    {/*  <TrafficLight />*/}
    {/*<TrafficLightWithEffect />*/}
    {/*  <TrafficLightWithHook />*/}
    {/*  <PokemonPage />*/}
    <FocusScreen />
  </StrictMode>,
)
