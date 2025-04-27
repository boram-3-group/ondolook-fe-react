import { useState } from 'react';
import { ReactElement } from 'react';

type StepProps = {
  children: React.ReactNode;
  name: string;
};

type FunnelProps = string[];

export const useFunnel = (steps: FunnelProps, stepAt: number = 0) => {
  const [currentStep, setCurrentStep] = useState(steps[stepAt]);

  const moveNext = () => {
    const currentIdx = steps.indexOf(currentStep);
    setCurrentStep(steps[currentIdx + 1]);
  };

  const movePrev = () => {
    const currentIdx = steps.indexOf(currentStep);
    setCurrentStep(steps[currentIdx - 1]);
  };

  const Funnel = ({ children }: { children: ReactElement<StepProps>[] }) => {
    const currentElement = children.find(child => child.props.name === currentStep);
    return <>{currentElement}</>;
  };

  const Step = ({ children }: StepProps) => {
    return <> {children} </>;
  };

  Funnel.Step = Step;

  return {
    Funnel,
    Step,
    currentStep,
    moveNext,
    movePrev,
  };
};
