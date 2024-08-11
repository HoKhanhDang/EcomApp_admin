export default function ConvertDay(date: string) {
    const d = new Date(date)
    const time = d.toLocaleTimeString()
    const day = d.getDate()
    const month = d.getMonth() + 1
    const year = d.getFullYear()
    return `${time} ${day}/${month}/${year}`
}
