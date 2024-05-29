import React, { createContext, useContext, useState } from 'react';
import { TDetailsContext } from './types';

export const DetailsContext = createContext<TDetailsContext>({
	canEdit: true,
	isAddMode: false,
	isEditMode: false,
	setIsAddMode: () => {},
	setIsEditMode: () => {},
	addEditMode: false,
	title: '',
	id: '',
});

export const useDetailsContext = () => useContext(DetailsContext);

export const DetailsContextProvider = ({
	children,
	canEdit = true,
	title,
	id,
}: React.PropsWithChildren<{
	canEdit?: boolean;
	title?: string;
	id?: string;
}>) => {
	const [isEditMode, setIsEditMode] = useState(false);
	const [isAddMode, setIsAddMode] = useState(id ? false : true);

	const value = {
		canEdit,
		isAddMode,
		isEditMode,
		setIsAddMode,
		setIsEditMode,
		addEditMode: isAddMode || isEditMode,
		title,
		id,
	};

	return (
		<DetailsContext.Provider value={value}>{children}</DetailsContext.Provider>
	);
};
