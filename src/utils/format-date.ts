export function formatUnixDateTime(unixTimestamp: number): string {
    const date = new Date(unixTimestamp * 1000); // Convert Unix timestamp to milliseconds
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    // const ampm = hours >= 12 ? 'PM' : 'AM';
    // hours = hours % 12 || 12; // Convert to 12-hour format and handle midnight (0)

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
    return formattedDate;
}