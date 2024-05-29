import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { bloodCases } from '../../../assets/dummyData';
import { DetailsContextProvider } from '../../../Components/details/useDetailsContext';
import { TBloodDonation } from '../../../types';
import { Form } from '../../../Components/shadcn/ui/form';
import TextField from '../../../Components/details/fields/TextField';
import NumberField from '../../../Components/details/fields/NumberField';
import { useEffect } from 'react';
import ImageField from '../../../Components/details/fields/ImageField';
import Details from '../../../Components/details/Details';

export default function Blood({ children }: { children?: React.ReactNode }) {
	const { id } = useParams<{ id: string }>();
	const blood = bloodCases.find((item) => item.id.toString() === id);

	const formSchema = z.object({
		name: z
			.string({
				message: 'Please enter a valid name.',
			})
			.min(2, {
				message: 'Name must be at least 2 characters.',
			}),
		img: z
			.string({
				message: 'Please enter a valid URL.',
			})
			.url({
				message: 'Please enter a valid URL.',
			}),
		volume: z
			.number({
				message: 'Please enter a valid number.',
			})
			.min(0, {
				message: 'Volume must be a positive number.',
			}),
		bloodType: z
			.string({
				message: 'Please enter a valid blood type.',
			})
			.min(2, {
				message: 'Blood type must be at least 2 characters.',
			}),
		hospital: z
			.string({
				message: 'Please enter a valid hospital.',
			})
			.min(2, {
				message: 'Hospital must be at least 2 characters.',
			}),
		area: z
			.string({
				message: 'Please enter a valid area.',
			})
			.min(2, {
				message: 'Area must be at least 2 characters.',
			}),
		gov: z
			.string({
				message: 'Please enter a valid governorate.',
			})
			.min(2, {
				message: 'Governorate must be at least 2 characters.',
			}),
		address: z
			.string({
				message: 'Please enter a valid address.',
			})
			.min(2, {
				message: 'Address must be at least 2 characters.',
			}),
	});

	const form = useForm<TBloodDonation>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: undefined,
			name: '',
			img: '',
			volume: 0,
			bloodType: '',
			hospital: '',
			area: '',
			gov: '',
			address: '',
		},
	});

	useEffect(() => {
		if (blood) {
			form.reset(blood);
		}
	}, [blood]);

	return (
		<Form {...form}>
			<DetailsContextProvider title="Blood Donation" id={id} canEdit={false}>
				<Details acceptRequest={!children} canDelete={!!children}>
					<div className="grid grid-cols-2 gap-5 p-6">
						{children}
						<TextField
							name="name"
							label="Name"
							description="Name of the patient"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<TextField
							name="volume"
							label="Volume in liters"
							description="Volume of blood needed in liters"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<TextField
							name="bloodType"
							label="Blood Type"
							description="Blood type of the patient"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<NumberField
							name="hospital"
							label="Hospital"
							description="Hospital where the patient is admitted"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<TextField
							name="area"
							label="Area"
							description="Area of the hospital where the patient is admitted"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<TextField
							name="gov"
							label="Governorate"
							description="Governorate of the hospital where the patient is admitted"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<TextField
							name="address"
							label="Address"
							description="Address of the hospital where the patient is admitted"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<ImageField
							name="img"
							label="Image"
							description="Image of the patient"
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
