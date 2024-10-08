export default function InputField({
    name,
    type,
    placeholder,
    value,
    onChange
}: {
    name?: string
    type?: string
    placeholder: string
    value?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
    return (
        <input
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className='w-full h-[45px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400'
        />
    )
}
