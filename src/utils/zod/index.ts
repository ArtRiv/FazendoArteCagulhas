import { z } from "zod";

export const formSchema = z.object({
    address: z.object({
        name: z.string().min(1, 'Por favor, informe um nome válido'),
        postal_code: z.string().min(9, 'Por favor, insira um CEP válido (00000-000)'),
        street: z.string().min(1, 'Por favor, insira uma rua válida'),
        number: z.string().min(1, 'Por favor, insira um número válido'),
        complement: z.string().min(1, 'Por favor, insira um complemento válido'),
        district: z.string().min(1, 'Por favor, insira um bairro válido'),
        city: z.string().min(1, 'Por favor, insira uma cidade'),
        state_abbr: z.string().min(1, 'Por favor, insira um estado válido'),
    })
}).transform((field) => ({
    address: {
        postal_code: field.address.postal_code,
        name: field.address.name,
        street: field.address.street,
        number: field.address.number,
        complement: field.address.complement,
        district: field.address.district,
        city: field.address.city,
        state_abbr: field.address.state_abbr,
    }
}));