import React from "react";

function withSuspense<P extends object>(Component: React.ComponentType) {
	const NewComponent = (props: P) => {
		return (
			<React.Suspense fallback={<div className='text-start p-4'>Loading...</div>}>
				<Component {...props} />
			</React.Suspense>
		)
	}
	return NewComponent
}

export default withSuspense;