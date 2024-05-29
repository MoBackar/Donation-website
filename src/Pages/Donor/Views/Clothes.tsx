import ViewList from '../../../Components/ViewList';
import { TClothesItem } from '../../../types';

export default function Clothes() {
	function Cardbody(item: TClothesItem) {
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
						<div className="text-lg text-medium">Age group:</div>
						<div className="text-md">{item.ageGroup}</div>
					</div>
					<div className="flex justify-between items-center  px-2 py-1 rounded-md">
						<div className="text-lg text-medium">Season:</div>
						<div className="text-md">{item.season}</div>
					</div>
					<div className="flex justify-between items-center  px-2 py-1 rounded-md">
						<div className="text-lg text-medium">Gender:</div>
						<div className="text-md">{item.gender}</div>
					</div>
				</div>
			</>
		);
	}
	return <ViewList category="Clothes" Cardbody={Cardbody} />;
}
