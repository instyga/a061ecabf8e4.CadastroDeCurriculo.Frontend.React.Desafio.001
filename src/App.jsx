import { AppShell } from "@mantine/core";
import { AppFooter } from "./components/app-footer";
import { AppHeader } from "./components/app-header";
import { Home } from "./pages/home";
import { useState } from "react";

function App() {
  const [currentStep, setCurrentStep] = useState(0);

  const NextStep = ()=>{
    console.log("proximo")
    setCurrentStep((prev)=> Math.min(prev + 1,2));
  };

  const PrevStep = ()=>{
    console.log("anterior")
    setCurrentStep((prev)=> Math.max(prev -1, 0));
  }




  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 80 }}
      padding="md"
      bg="gray.0"
    >
      <AppShell.Header bg="blue">
        <AppHeader />
      </AppShell.Header>
      <AppShell.Main>
        <Home currentStep={currentStep}  />
      </AppShell.Main>
      <AppShell.Footer>
        <AppFooter
        onNext={NextStep} 
        onBack={PrevStep} />
      </AppShell.Footer>
    </AppShell>
  );
}

export default App;
