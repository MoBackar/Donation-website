import { useState } from 'react';
import { Input } from './shadcn/ui/input';

interface SearchbarProps {
	data: any[]; // Replace 'any' with the type of your dummy data
	setData: (data: any[]) => void; // Replace 'any' with the type of your dummy data
	searchColumn: string;
}

export default function Searchbar({
	data,
	setData,
	searchColumn,
}: SearchbarProps) {
	const [searchTerm, setSearchTerm] = useState('');

	const handleSearch = () => {
		const filteredData = data.filter((item) =>
			item[searchColumn].toLowerCase().includes(searchTerm.toLowerCase())
		);
		setData(filteredData);
	};

	return (
		<Input
			type="text"
			className="bg-white w-30 h-10 mt-4 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
			placeholder="Search for a"
			value={searchTerm}
			onChange={(e) => {
				setSearchTerm(e.target.value);
				if (e.target.value === '') {
					setData(data);
				} else {
					handleSearch();
				}
			}}
		/>
	);
}
