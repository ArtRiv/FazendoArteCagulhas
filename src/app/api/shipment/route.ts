export async function POST(request: Request) {
    try {
        const url = new URL(request.url);
        const toCEP = url.searchParams.get('toCEP');

        if (!toCEP) {
            throw new Error("The 'toCEP' query parameter is required");
        }

        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'User-Agent': 'Nome e versão da aplicação (email para contato técnico)',
                'content-type': 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTkyNDY5NzQsInN1YiI6IllEakJucnhMSmtOWjQ3MmZ5eU9SODM2UXNQVjIifQ.aeGlbhGcGNvQlRrBpV7IO5ua3XjAdZQVGlTBoMjbvcc'
            },
            body: JSON.stringify({
                from: { postal_code: '88025500' },
                to: { postal_code: toCEP },
                services: '1,2,17',
                options: {
                    own_hand: false,
                    receipt: false,
                    insurance_value: 0,
                    use_insurance_value: false
                },
                package: {
                    height: 10,
                    width: 24,
                    length: 15,
                    weight: 0.2
                }
            })
        };

        const response = await fetch('https://sandbox.superfrete.com/api/v0/calculator', options);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(`Error: ${data.message}`);
        }

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error: any) {
        console.error(error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
