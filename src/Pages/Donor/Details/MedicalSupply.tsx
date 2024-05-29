import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { medicalSupplies } from '../../../assets/dummyData';
import { DetailsContextProvider } from '../../../Components/details/useDetailsContext';
import { TMedicalSupply } from '../../../types';
import { Form } from '../../../Components/shadcn/ui/form';
import TextField from '../../../Components/details/fields/TextField';
import NumberField from '../../../Components/details/fields/NumberField';
import { useEffect } from 'react';
import ImageField from '../../../Components/details/fields/ImageField';
import Details from '../../../Components/details/Details';

export default function MedicalSupply({
	children,
}: {
	children?: React.ReactNode;
}) {
	const { id } = useParams<{ id: string }>();
	const medicalSupply = medicalSupplies.find(
		(item) => item.id.toString() === id
	);

	const form = useForm<TMedicalSupply>({
		defaultValues: {
			id: undefined,
			name: '',
			quantity: 0,
			img: '',
			type: '',
			use: '',
		},
	});

	useEffect(() => {
		if (medicalSupply) {
			form.reset(medicalSupply);
		}
	}, [medicalSupply]);

	return (
		<Form {...form}>
			<DetailsContextProvider title="Medical supply" id={id} canEdit={false}>
				<Details acceptRequest={!children} canDelete={!!children}>
					<div className="grid grid-cols-2 gap-5 p-6">
						{children}
						<TextField
							name="name"
							label="Name"
							description="Name of the medical supply"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<NumberField
							name="quantity"
							label="Quantity"
							description="Quantity of the medical supply"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<TextField
							name="type"
							label="Type"
							description="Type of the medical supply"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<TextField
							name="use"
							label="Use"
							description="Use of the medical supply"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<ImageField
							name="img"
							label="Image"
							description="Image of the medical supply"
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
