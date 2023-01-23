import { useEffect, useState } from "react";

type propsType = {
	status: string | null
	saveStatus: (status: string | null) => void
	isOwner: boolean
}

const ProfileStatus: React.FC<propsType> = ({ status, saveStatus, isOwner }) => {
	let [editMode, setEditMode] = useState(false);
	let [statusValue, setStatusValue] = useState<string>(status ?? '');

	useEffect(() => {
		setStatusValue(status ?? '');
	}, [status])

	const activateEditMode = () => {
		if (isOwner) {
			setEditMode(true);
		}
	}

	const deactivateEditMode = () => {
		setEditMode(false);
		saveStatus(statusValue);
	}

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setStatusValue(e.currentTarget.value);
	}

	return (
		<div>
			{!editMode &&
				<div className='border-b min-w-[100px] text-start cursor-pointer'
					onDoubleClick={activateEditMode}>
					{status || '...'}
				</div>}

			{editMode &&
				<input className="border"
					autoFocus={true}
					onBlur={deactivateEditMode}
					value={statusValue}
					onChange={onChange} />}
		</div>
	)
}

export default ProfileStatus;