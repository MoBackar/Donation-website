import React, { useState } from 'react';

import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

interface MarkerData {
	lat: number;
	lng: number;
	content: string;
	color: string;
}

interface EditableMapProps {
	markers: MarkerData[];
}

const EditableMap: React.FC<EditableMapProps> = ({ markers }) => {
	const [map, setMap] = useState<google.maps.Map | null>(null);
	const [editableMarkers, setEditableMarkers] = useState<MarkerData[]>(markers);
	const [newMarker, setNewMarker] = useState<MarkerData>({
		lat: 0,
		lng: 0,
		content: '',
		color: 'ed',
	});

	const handleMarkerAdd = (event: google.maps.MapMouseEvent) => {
		if (event.latLng) {
			const newMarker: MarkerData = {
				lat: event.latLng.lat(),
				lng: event.latLng.lng(),
				content: '',
				color: 'ed',
			};
			setEditableMarkers([...editableMarkers, newMarker]);
		}
	};

	const handleMarkerEdit = (index: number, newContent: string | null) => {
		if (newContent !== null) {
			const updatedMarkers = [...editableMarkers];
			updatedMarkers[index].content = newContent;
			setEditableMarkers(updatedMarkers);
		}
	};

	const handleMarkerDelete = (index: number) => {
		const updatedMarkers = [...editableMarkers];
		updatedMarkers.splice(index, 1);
		setEditableMarkers(updatedMarkers);
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setNewMarker((prevMarker: MarkerData) => ({
			...prevMarker,
			[name]: value,
		}));
	};

	return (
		<div>
			<form>
				<button
					type="button"
					onClick={() => {
						setEditableMarkers([...editableMarkers, newMarker]);
						setNewMarker({ lat: 0, lng: 0, content: '', color: 'red' });
					}}
					className="text-3xl  font-heading ml-1"
				>
					Add Marker
				</button>
			</form>

			<LoadScript
				googleMapsApiKey="AIzaSyCYG5qJiDS6VEhVTucACoUiSsV2IuNGykk"
				libraries={['places']}
			>
				<GoogleMap
					mapContainerStyle={{ height: '400px', width: '600px' }}
					zoom={7}
					center={{ lat: 26.8206, lng: 30.8025 }} // Initial center coordinates
					onClick={handleMarkerAdd}
					onLoad={(mapInstance: google.maps.Map) => setMap(mapInstance)}
				>
					{editableMarkers.map((marker: MarkerData, index: number) => (
						<Marker
							key={index}
							position={{ lat: marker.lat, lng: marker.lng }}
							icon={{
								path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
								fillColor: marker.color,
								fillOpacity: 1,
								strokeColor: '#000',
								strokeWeight: 2,
								scale: 1,
							}}
							onClick={() =>
								handleMarkerEdit(index, prompt('Edit marker content:'))
							}
						>
							<div className="marker-content">{marker.content}</div>
						</Marker>
					))}
				</GoogleMap>
			</LoadScript>
		</div>
	);
};

export default EditableMap;
