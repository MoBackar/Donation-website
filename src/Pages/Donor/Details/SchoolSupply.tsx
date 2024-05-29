import { TSchoolSuppliesItem } from '../../../types';
import { useParams } from 'react-router-dom';
import { schoolSupplies } from '../../../assets/dummyData';
import Book from './Book';
import Stationary from './Stationary';

export default function SchoolSupply({
	children,
}: {
	children?: React.ReactNode;
}) {
	const { id } = useParams<{ id: string }>();
	const schoolSupply = schoolSupplies.find(
		(item) => item.id.toString() === id
	) as TSchoolSuppliesItem;

	if (schoolSupply.itemType === 'book') {
		return <Book children={children} />;
	} else {
		return <Stationary children={children} />;
	}
}
