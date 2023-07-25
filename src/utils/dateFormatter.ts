const dateFormatter = (date: Date): string => {
    
    // DD/MM/YYYY

    console.log(date.getDate())

    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}
export default dateFormatter;