import ViewList from '../../../Components/ViewList';
import { TMedicalCase } from '../../../types';

export default function MedicalCases() {
	function Cardbody(item: TMedicalCase) {
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
						<div className="text-lg text-medium">Medical Specialty:</div>
						<div className="text-md">{item.specialty}</div>
					</div>
					<div className="flex justify-between items-center  px-2 py-1 rounded-md">
						<div className="text-lg text-medium">Organization Name:</div>
						<div className="text-md">{item.orgName}</div>
					</div>
					<div className="flex justify-between items-center  px-2 py-1 rounded-md">
						<div className="text-lg text-medium">Area:</div>
						<div className="text-md">{item.area}</div>
					</div>
					<div className="flex justify-between items-center  px-2 py-1 rounded-md">
						<div className="text-lg text-medium">Governorate:</div>
						<div className="text-md">{item.gov}</div>
					</div>
				</div>
			</>
		);
	}

	return <ViewList category="Medical Cases" Cardbody={Cardbody} />;
}
