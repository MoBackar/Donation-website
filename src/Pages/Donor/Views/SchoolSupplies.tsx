import ViewList from '../../../Components/ViewList';
import { TSchoolSuppliesItem } from '../../../types';

export default function SchoolSupplies() {
	function Cardbody(item: TSchoolSuppliesItem) {
		return (
			<>
				<div className="w-60 h-52 flex flex-col items-center justify-center bg-white border-[#171A21] border border-solid  rounded-lg">
					<img src={item.img} className="w-60 h-40 rounded-lg object-contain" />
				</div>
				<div className="flex flex-col py-2 justify-around w-full px-2">
					<div className="flex justify-between items-center  px-2 py-1 rounded-md">
						<div className="text-lg text-bold">Name:</div>
						<div className="text-md">{item.name}</div>
					</div>
					<div className="flex justify-between items-center  px-2 py-1 rounded-md">
						<div className="text-lg text-medium">Type:</div>
						<div className="text-md">{item.itemType}</div>
					</div>
				</div>
			</>
		);
	}
	return <ViewList category="School Supplies" Cardbody={Cardbody} />;
}
