import { useParams } from 'react-router-dom';
import { orgPosts } from '../../../assets/dummyData';
import { TOrgPost } from '../../../types';
import Cloth from '../../Donor/Details/Cloth';
import { Book } from 'lucide-react';
import Blood from '../../Donor/Details/Blood';
import Food from '../../Donor/Details/Food';
import MedicalCase from '../../Donor/Details/MedicalCase';
import MedicalSupply from '../../Donor/Details/MedicalSupply';
import SchoolSupply from '../../Donor/Details/SchoolSupply';
import Toy from '../../Donor/Details/Toy';
import { Label } from '../../../Components/shadcn/ui/label';
import { FormDescription } from '../../../Components/shadcn/ui/form';
import Teacher from '../../Donor/Details/Teacher';

export default function Post() {
	const { id } = useParams<{ id: string }>();
	const post = orgPosts.find((item) => item.id.toString() === id) as TOrgPost;

	const children = (
		<>
			<div className="flex flex-col h-[100px] space-y-2">
				<Label>Post category</Label>
				<span className="flex h-9 w-full rounded-md px-3 py-2 text-sm indent-px bg-slate-300">
					{post.postCategory}
				</span>
				<FormDescription>Category of the post</FormDescription>
			</div>
			<div className="flex flex-col h-[100px] space-y-2">
				<Label>Fulfilled</Label>
				<span className="flex h-9 w-full rounded-md px-3 py-2 text-sm indent-px bg-slate-300">
					{post.condition ? 'Yes' : 'No'}
				</span>
				<FormDescription>Fulfilled or not</FormDescription>
			</div>
			{post.condition && (
				<>
					<div className="flex flex-col h-[100px] space-y-2">
						<Label>Donor name</Label>
						<span className="flex h-9 w-full rounded-md px-3 py-2 text-sm indent-px bg-slate-300">
							{post.donor.firstname} {post.donor.secondname}
						</span>
						<FormDescription>
							Name of donor who fulfilled donation
						</FormDescription>
					</div>
					<div className="flex flex-col h-[100px] space-y-2">
						<Label>Contanct Number</Label>
						<span className="flex h-9 w-full rounded-md px-3 py-2 text-sm indent-px bg-slate-300">
							{post.donor.contactPhone}
						</span>
						<FormDescription>Contact number of donor</FormDescription>
					</div>
					<div className="flex flex-col h-[100px] space-y-2">
						<Label>Contact email</Label>
						<span className="flex h-9 w-full rounded-md px-3 py-2 text-sm indent-px bg-slate-300">
							{post.donor.email}
						</span>
						<FormDescription>Contact email of donor</FormDescription>
					</div>
				</>
			)}
		</>
	);

	const postMap = {
		clothes: <Cloth children={children} />,
		toys: <Toy children={children} />,
		books: <Book children={children} />,
		food: <Food children={children} />,
		medicalSupplies: <MedicalSupply children={children} />,
		schoolSupplies: <SchoolSupply children={children} />,
		bloodDonation: <Blood children={children} />,
		teachingPosts: <Teacher children={children} />,
		medicalCases: <MedicalCase children={children} />,
	};

	return postMap[post.postCategory as keyof typeof postMap];
}
