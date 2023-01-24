import { useForm } from "react-hook-form"

type UsersSearchFormDataType = {
	term: string | null
	friend: boolean | null
}

type Props = {
	findFilterUsers: (count: number, term: string | null, friend: boolean | null) => void
	count: number
	term: string | null
	friend: boolean | null
}

const UsersSearchForms: React.FC<Props> = ({ findFilterUsers, count, term, friend }) => {
	const { register, handleSubmit } = useForm<UsersSearchFormDataType>({
		defaultValues: {
			term: term,
			friend: friend
		}
	});

	const onSubmit = (formData: UsersSearchFormDataType) => {
		findFilterUsers(count, formData.term, formData.friend ? formData.friend : null)
	}

	return (
		<form className='flex flex-col items-start gap-2 mb-3' onSubmit={handleSubmit(onSubmit)}>
			<div className="flex gap-2">
				<label>Term:</label>
				<input className="flex-auto border-b" placeholder="Term" type='text' {...register('term')} />
			</div>
			<div className="flex gap-2">
				<label>Friends:</label>
				<input type='checkbox' {...register('friend')} />
			</div>
			<button className="border-2 py-1 px-5 rounded-[10px]">Find</button>
		</form>
	)
}

export default UsersSearchForms