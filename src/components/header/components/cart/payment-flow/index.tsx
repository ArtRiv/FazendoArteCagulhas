import AddressStep from './address-step';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { BreadcrumbResponsive } from './address-step/breadcrumb';
import PaymentStep from './payment-step';

export const CheckoutFlow = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const handleNextStep = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    }

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <AddressStep onNext={handleNextStep} />
            case 2:
                return <PaymentStep />
            default:
                return null;
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Pagar</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:max-w-[625px] lg:max-w-[1125px] overflow-y-scroll h-[95%]">
                <BreadcrumbResponsive />
                {renderStep()}
            </DialogContent>
        </Dialog>
    );
};
