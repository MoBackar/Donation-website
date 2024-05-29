import { useState } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

export default function Stage3() {
	const [marker, setMarker] = useState({
		lat: 29.987031,
		lng: 31.440164,
	});
	return (
		<APIProvider apiKey={'AIzaSyCYG5qJiDS6VEhVTucACoUiSsV2IuNGykk'}>
			<Map
				zoom={12}
				center={{ lat: 29.987031, lng: 31.440164 }}
				style={{
					height: '400px',
					width: '600px',
				}}
				onClick={(event) => {
					// @ts-ignore
					setMarker(event.detail.latLng);
				}}
			>
				<Marker position={marker} />
			</Map>
		</APIProvider>
	);
}
