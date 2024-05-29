import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { medicalCases } from '../../../assets/dummyData';
import { DetailsContextProvider } from '../../../Components/details/useDetailsContext';
import { TMedicalCase } from '../../../types';
import { Form } from '../../../Components/shadcn/ui/form';
import TextField from '../../../Components/details/fields/TextField';
import NumberField from '../../../Components/details/fields/NumberField';
import { useEffect } from 'react';
import ImageField from '../../../Components/details/fields/ImageField';
import TextareaField from '../../../Components/details/fields/TextareaField';
import Details from '../../../Components/details/Details';
import MapField from '../../../Components/details/fields/MapField';

export default function MedicalCase({
	children,
}: {
	children?: React.ReactNode;
}) {
	const { id } = useParams<{ id: string }>();
	const medicalCase = medicalCases.find((item) => item.id.toString() === id);

	const form = useForm<TMedicalCase>({
		defaultValues: {
			id: undefined,
			name: '',
			quantity: 0,
			img: '',
			patientName: '',
			age: 0,
			gender: '',
			weight: 0,
			location: '',
			street: '',
			area: '',
			gov: '',
			specialty: '',
			description: '',
			orgName: '',
		},
	});

	useEffect(() => {
		if (medicalCase) {
			form.reset(medicalCase);
		}
	}, [medicalCase]);

	return (
		<Form {...form}>
			<DetailsContextProvider title="Medical case" id={id} canEdit={false}>
				<Details acceptRequest={!children} canDelete={!!children}>
					<div className="grid grid-cols-2 gap-5 p-6">
						{children}
						<TextField
							name="patientName"
							label="Patient Name"
							description="Name of the patient"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<NumberField
							name="age"
							label="Age"
							description="Age of the patient"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<TextField
							name="gender"
							label="Gender"
							description="Gender of the patient"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<NumberField
							name="weight"
							label="Weight"
							description="Weight of the patient"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<TextField
							name="street"
							label="Street"
							description="Street of the patient"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<TextField
							name="area"
							label="Area"
							description="Area of the patient"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<TextField
							name="gov"
							label="Governorate"
							description="Governorate of the patient"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<TextField
							name="orgName"
							label="Organization Name"
							description="Name of the organization"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<TextField
							name="specialty"
							label="Medical Specialty"
							description="Specialty of the doctor"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<TextareaField
							name="description"
							label="Description"
							description="Description of the medical case"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<MapField
							name="location"
							label="Location"
							description="Location of the patient"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<ImageField
							name="img"
							label="Image"
							description="Image of the medical case"
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
