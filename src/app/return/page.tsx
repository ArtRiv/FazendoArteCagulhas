import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getPaymentStatus } from "@/services/return";

export default async function ReturnPage({
    searchParams,
}: {
    searchParams: { session_id: string }
}) {

    const { data: sessionData } = await getPaymentStatus(searchParams);

    return (
        <>
            <div className="w-full h-full min-h-96 flex flex-col items-center gap-8">
                <div className="flex flex-col justify-center items-center gap-3">
                    <h1 className="text-5xl text-font-color font-harmonia text-center">
                        Obrigado pela compra!
                    </h1>
                    <p className="w-1/2 text-sm text-font-color/70 text-center">
                        Seu produto será preparado com carinho e quando for postado para entrega mandaremos o código de rastreio no seu email <span className="italic text-sm text-font-color text-center">{sessionData?.customer_email}</span>
                    </p>
                    {/* <p>
                        Status de pagamento: {paymentStatus}
                    </p> */}
                </div>

                <Accordion type="single" collapsible className="w-1/2">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Como faço para acompanhar a entrega?</AccordionTrigger>
                        <AccordionContent>
                            Entre no site dos correios e coloque o código que será enviado para seu e-mail para poder acompanhar seu pedido!
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Meu código ainda não foi enviado, o que eu faço?</AccordionTrigger>
                        <AccordionContent>
                            Como o produto é feito a mão, o código só será enviado quando o produto for postado.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Tenho outras dúvidas, como posso contatar?</AccordionTrigger>
                        <AccordionContent>
                            Mande mensagem no nosso Instagram, <a className="relative animateBorderBottom text-font-color font-harmonia leading-line-height-small transition-all duration-300 hover:text-decoration" target="_blank" href="https://www.instagram.com/fazendoartecagulhas/">@fazendoartecagulhas</a>!
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </>
    )
}