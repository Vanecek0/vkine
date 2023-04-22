import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useRef } from 'react';

let counter = 0;

const generateId = () => {
    return `ID-${++counter}`; // if it is necessary, use some better unique id generator
};

const DonateButton = () => {
    const buttonRef = useRef(null);
    const buttonId = useMemo(() => `ID-${generateId()}`, []);
    const router = useRouter();
    const code = router.locale == 'cs' ? 'X7LKEMZ77X6TA' : 'LGJCTLN7CUCGL';
    useEffect(() => {
        try {
            const button = window.PayPal.Donation.Button({
                env: 'production',
                hosted_button_id: code,
                image: {
                    src: 'https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif',
                    alt: 'Donate with PayPal button',
                    title: 'PayPal - The safer, easier way to pay online!',
                }
            });
            button.render(`#${buttonRef.current.id}`); // you can change the code and run it when DOM is ready
        } catch(e) {
            console.error(e)
        }
        
    }, []);
    return (
        <div ref={buttonRef} id={buttonId} />
    );
};

export default DonateButton;