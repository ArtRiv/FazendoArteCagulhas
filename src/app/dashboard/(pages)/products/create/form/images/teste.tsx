"use server"

export async function uploadImage(formData: FormData) {
    console.log('teste upload image')
    try {
        const response = await fetch("http://localhost:3000/api/dashboard/image-upload", {
            method: "POST",
            body: formData,
        });

        console.log(response)

        const result = await response.json();

        console.log(result)

        return result;

    } catch (error) {
        console.error("An error occurred while uploading the image:", error);
    }
}