import ViewList from '../../../Components/ViewList';
import { TTeachingPost } from '../../../types';

export default function teachingPosts() {
	function Cardbody(item: TTeachingPost) {
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
						<div className="text-lg text-medium">Subject:</div>
						<div className="text-md">{item.subject}</div>
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
	return <ViewList category="TeachingPosts" Cardbody={Cardbody} />;
}
