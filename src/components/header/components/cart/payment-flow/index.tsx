import AddressStep from './address-step';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { BreadcrumbResponsive } from './address-step/breadcrumb';
import PaymentStep from './payment-step';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { usePathname, useRouter } from 'next/navigation';

export const CheckoutFlow = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const { isAuthenticated } = useKindeBrowserClient();
    const router = useRouter();
    const redirectPath = usePathname();

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

    const handleAuthentication = () => {
        if(!isAuthenticated) {
            router.push(`/api/auth/login?post_login_redirect_url=${redirectPath}`)
        }
        return;
    }

    return (
        <Dialog>
            {isAuthenticated &&
                <DialogTrigger asChild>
                    <Button variant="outline">Pagar</Button>
                </DialogTrigger>
            }
            {!isAuthenticated &&
                <Button onClick={handleAuthentication} variant="outline">
                    Pagar
                </Button>
            }
            <DialogContent className="sm:max-w-[425px] md:max-w-[625px] lg:max-w-[1125px] overflow-y-scroll h-[95%]">
                <BreadcrumbResponsive />
                {renderStep()}
            </DialogContent>
        </Dialog>
    );
};
