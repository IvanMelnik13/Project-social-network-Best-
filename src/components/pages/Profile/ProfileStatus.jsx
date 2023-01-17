import { useEffect, useState } from "react";

const ProfileStatus = ({ status, saveStatus, isOwner }) => {
	let [editMode, setEditMode] = useState(false);
	let [statusValue, setStatusValue] = useState(status);

	useEffect(() => {
		setStatusValue(status);
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

	const onChange = (e) => {
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