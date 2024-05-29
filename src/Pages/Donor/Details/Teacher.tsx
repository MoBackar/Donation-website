import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { teachingPosts } from '../../../assets/dummyData';
import { DetailsContextProvider } from '../../../Components/details/useDetailsContext';
import { TTeachingPost } from '../../../types';
import { Form } from '../../../Components/shadcn/ui/form';
import TextField from '../../../Components/details/fields/TextField';
import NumberField from '../../../Components/details/fields/NumberField';
import { useEffect } from 'react';
import ImageField from '../../../Components/details/fields/ImageField';
import Details from '../../../Components/details/Details';

export default function Teacher({ children }: { children?: React.ReactNode }) {
	const { id } = useParams<{ id: string }>();
	const teachingPost = teachingPosts.find((item) => item.id.toString() === id);

	const form = useForm<TTeachingPost>({
		defaultValues: {
			id: undefined,
			name: '',
			img: '',
			subject: '',
			students: 0,
			area: '',
			gov: '',
		},
	});

	useEffect(() => {
		if (teachingPost) {
			form.reset(teachingPost);
		}
	}, [teachingPost]);

	return (
		<Form {...form}>
			<DetailsContextProvider title="Teaching post" id={id} canEdit={false}>
				<Details acceptRequest={!children} canDelete={!!children}>
					<div className="grid grid-cols-2 gap-5 p-6">
						{children}
						<TextField
							name="name"
							label="Name"
							description="Name of the teacher"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<TextField
							name="subject"
							label="Subject"
							description="Subject taught by the teacher"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<NumberField
							name="students"
							label="Number of students"
							description="Number of students taught by the teacher"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<TextField
							name="area"
							label="Area"
							description="Area of the teacher"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<TextField
							name="gov"
							label="Governorate"
							description="Governorate of the teacher"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<ImageField
							name="img"
							label="Image"
							description="Image of the teacher"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
					</div>
				</Details>
			</DetailsContextProvider>
		</Form>
	);
}
